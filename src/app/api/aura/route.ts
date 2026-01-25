import { NextResponse } from 'next/server';
import { catalog } from '@/lib/catalog';

// Use environment variable with fallback to localhost for development
const OLLAMA_URL = process.env.OLLAMA_API_URL || 'http://localhost:11434/api/generate';
const MODEL_NAME = 'llama3'; // Or 'mistral', ensure user has this pulled

// RAG-lite: Simple context injection for small catalogs
const PRODUCT_CONTEXT = catalog.map(p =>
    `- ${p.name} ($${p.price}): ${p.description} [ID:${p.id}]`
).join('\n');

const SYSTEM_PERSONA = `
You are Aura, an elite AI Fashion Stylist. 
Your goal is to provide brief, trendy, and intent-driven fashion advice.
You are "The Smart Brain" in a Hybrid Architecture.

CRITICAL RULES:
1. MAX 2 SENTENCES. Keep it punchy.
2. If the user intent implies buying specific items, append a HIDDEN ACTION CODE at the end.
3. Action Codes format: [ACTION:PAYLOAD]

OUR CATALOG (RECOMMEND THESE):
${PRODUCT_CONTEXT}

Available Action Codes:
- [FILTER:red] (for colors)
- [FILTER:jacket] (for categories)
- [REDIRECT:/shop] (for general shopping)

Example User: "I need a dark vibe."
Example Output: "Go for the Cyberpunk Leather Jacket. It screams night-city chic. [FILTER:jacket]"
`;

export async function POST(req: Request) {
    try {
        const { prompt } = await req.json();

        if (!prompt) {
            return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
        }

        // Connect to Local Ollama
        const response = await fetch(OLLAMA_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: MODEL_NAME,
                prompt: prompt,
                system: SYSTEM_PERSONA,
                stream: false
            }),
        });

        if (!response.ok) {
            console.error("Ollama Connect Error:", response.statusText);
            // Fallback mock if Ollama isn't running (for hackathon demo safety)
            return NextResponse.json({
                response: "I can't reach my neural core (Ollama) right now, but you'd look great in red! [FILTER:red]",
                isFallback: true
            });
        }

        const data = await response.json();
        return NextResponse.json({ response: data.response });

    } catch (error) {
        console.error("Smart Brain Error:", error);
        return NextResponse.json({
            response: "My connection is hazy. Try 'Show me jackets' for a quick fix.",
            error: true
        });
    }
}
