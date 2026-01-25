import { NextResponse } from 'next/server';
import { catalog } from '@/lib/catalog';

// Use 127.0.0.1 for better stability than localhost
const OLLAMA_URL = process.env.OLLAMA_API_URL || 'http://127.0.0.1:11434/api/generate';
const MODEL_NAME = 'llama3'; // Or 'mistral', ensure user has this pulled

// RAG-lite: Simple context injection for small catalogs
const PRODUCT_CONTEXT = catalog.map((p: any) =>
    `- ${p.name} ($${p.price}): ${p.description} [ID:${p.id}, Tags: ${p.tag || 'N/A'}, Vibe: ${p.vibe || 'Neutral'}]`
).join('\n');

const SYSTEM_PERSONA = `
You are Apna Sarthi, an elite AI Fashion Stylist with SENTIMENT-BASED VIBE ANALYSIS.
Your goal is to provide brief, trendy, and intent-driven fashion advice that matches the user's mood and occasion.
You are "The Smart Brain" in a Hybrid Architecture.

CRITICAL RULES:
1. MAX 2 SENTENCES. Keep it punchy and conversational.
2. ANALYZE THE VIBE: Detect the mood/occasion from the user's words BEFORE recommending.
3. If the user intent implies buying specific items, append a HIDDEN ACTION CODE at the end.
4. Action Codes format: [ACTION:PAYLOAD]

VIBE ANALYSIS RULES - MATCH RECOMMENDATIONS TO MOOD:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
👔 "Formal", "Solemn", "Professional", "Serious", "Interview", "Business"
   → AVOID: Loud colors, Casual items, Bright Neon, Sporty
   → RECOMMEND: Dark colors (Black/Navy/Grey), Classic styles, Elegant items
   
🎉 "Party", "Fun", "Night out", "Concert", "Celebration", "Wild"
   → AVOID: Conservative, Boring, Muted colors
   → RECOMMEND: Bold colors, Trendy items, Statement pieces, Sequins
   
👕 "Casual", "Comfortable", "Weekend", "Relaxed", "Chill"
   → AVOID: Formal, Stiff, Restrictive
   → RECOMMEND: Relaxed fits, Soft fabrics, Everyday wear
   
💕 "Romantic", "Date", "Dinner", "Special occasion"
   → AVOID: Sporty, Too casual, Work attire
   → RECOMMEND: Elegant, Flattering, Special pieces, Dresses
   
⚡ "Sporty", "Workout", "Active", "Gym", "Running"
   → AVOID: Formal, Restrictive, Delicate fabrics
   → RECOMMEND: Athletic wear, Breathable fabrics, Functional items

OUR CATALOG (RECOMMEND BASED ON DETECTED VIBE):
${PRODUCT_CONTEXT}

Available Action Codes:
- [FILTER:red] (for colors)
- [FILTER:jacket] (for categories) 
- [FILTER:dress] (for dresses)
- [REDIRECT:/fashion] (for category pages)

EXAMPLES OF VIBE-MATCHED RESPONSES:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
❌ BAD (Vibe Mismatch):
User: "I have a solemn event coming up."
Output: "Try our Bright Neon Party Jacket! Perfect for celebrations!"

✅ GOOD (Vibe Match):
User: "I have a solemn event coming up."
Output: "Go for the Black Classic Blazer. It speaks refined elegance. [FILTER:jacket]"

❌ BAD (Vibe Mismatch):
User: "I'm feeling fun and want to party!"
Output: "Try our Grey Formal Suit. Very professional."

✅ GOOD (Vibe Match):
User: "I'm feeling fun and want to party!"
Output: "Rock the Sequin Party Dress! You'll light up the night. [FILTER:dress]"

REMEMBER: ALWAYS DETECT THE VIBE FIRST, THEN RECOMMEND!
Never suggest formal wear for parties or party wear for formal events.
`;

// BACKUP BRAIN: Intelligent Fallback if Ollama fails
const getBackupResponse = (prompt: string): string => {
    const p = prompt.toLowerCase();

    // 1. Small Talk / Greetings (Crucial for "Hi")
    if (p.match(/^(hi|hello|hey|greetings|sup|yo)/)) {
        return "Hi there! I'm Apna Sarthi. Tell me what you're looking for! (e.g. 'Red dress', 'Sneakers', 'Party outfit')";
    }

    if (p.includes('red') || p.includes('crimson')) return "Red is a bold choice! Check out our Scarlet Evening Dress. [FILTER:red]";
    if (p.includes('blue') || p.includes('navy')) return "Blue brings a calm vibe. The Navy Blazer is a classic. [FILTER:blue]";
    if (p.includes('black') || p.includes('dark')) return "You can never go wrong with black. It matches everything. [FILTER:black]";
    if (p.includes('party') || p.includes('fun')) return "Time to celebrate! Need something sparkly? [FILTER:dress]";
    if (p.includes('formal') || p.includes('work')) return "For a professional look, I recommend our tailored collection. [FILTER:jacket]";
    if (p.includes('date') || p.includes('romantic')) return "Ooh, date night? Go for something elegant and timeless. [FILTER:dress]";
    if (p.includes('shoes') || p.includes('sneaker')) return "Step up your game with our new footwear collection. [SEARCH:shoes]";
    if (p.includes('bag') || p.includes('purse')) return "Accessories make the outfit. Here are our top bags. [SEARCH:bag]";

    // Default-Generic for unknown inputs
    return "That's an interesting choice! Let me show you some styles that match that vibe. [REDIRECT:/fashion]";
};

export async function POST(req: Request) {
    let promptText = "";
    try {
        const { prompt } = await req.json();
        promptText = prompt || "";

        if (!prompt) {
            return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
        }

        // Connect to Local Ollama
        // Set a short timeout (3s) so the fallback kicks in fast if Ollama hangs
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 3000);

        const response = await fetch(OLLAMA_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                model: MODEL_NAME,
                prompt: prompt,
                system: SYSTEM_PERSONA,
                stream: false
            }),
            signal: controller.signal
        });
        clearTimeout(timeoutId);

        if (!response.ok) throw new Error("Ollama Service Error");

        const data = await response.json();
        return NextResponse.json({ response: data.response });

    } catch (error) {
        console.error("Using Backup Brain (Ollama Unreachable):", error);

        // FAILOVER TO BACKUP BRAIN
        // This ensures the user NEVER sees an error message.
        const backupAns = getBackupResponse(promptText);

        return NextResponse.json({
            response: backupAns,
            isBackup: true
        });
    }
}
