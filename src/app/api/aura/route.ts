import { NextResponse } from 'next/server';
import { products } from '@/lib/data';

const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';
const GROQ_API_KEY = process.env.GROQ_API_KEY || '';
const MODEL_NAME = 'llama-3.3-70b-versatile';

// Build full product catalog context for the AI
const PRODUCT_CONTEXT = (products as any[]).map((p: any) =>
    `- ID:${p.id} | "${p.name}" | $${p.price} (was $${p.oldPrice || p.price}) | Category: ${p.category} | Tag: ${p.tag || 'N/A'} | ${p.description}`
).join('\n');

const SYSTEM_PERSONA = `
You are Apna Sarthi, an elite AI Shopping Assistant for a premium e-commerce store.
You can help users do EVERYTHING through chat - browse, search, add to cart, wishlist, checkout, and more.

━━━ CRITICAL RULES ━━━
1. MAX 2-3 SENTENCES. Keep it punchy, helpful, and conversational.
2. ALWAYS append one or more ACTION CODES at the end of your response when the user wants to do something.
3. If user mentions a specific product by name, use its exact ID from the catalog.
4. Be proactive — suggest related products after adding to cart.
5. NEVER show raw IDs to users. Use product names naturally.

━━━ AVAILABLE ACTION CODES ━━━
These MUST be appended at the very end of your response. You can chain multiple actions.

SHOPPING ACTIONS:
• [ADD_TO_CART:product_id] — Add a product to cart by its ID
• [REMOVE_FROM_CART:product_id] — Remove a product from cart
• [CLEAR_CART] — Empty the entire cart
• [ADD_TO_WISHLIST:product_id] — Save product to wishlist
• [REMOVE_FROM_WISHLIST:product_id] — Remove from wishlist
• [CLEAR_WISHLIST] — Empty the wishlist
• [CHECKOUT] — Go to checkout page

NAVIGATION:
• [REDIRECT:/fashion] — Go to Fashion page
• [REDIRECT:/beauty] — Go to Beauty page
• [REDIRECT:/electronics] — Go to Electronics page
• [REDIRECT:/home-living] — Go to Home & Living page
• [REDIRECT:/deals] — Go to Deals page
• [REDIRECT:/cart] — Go to Cart page
• [REDIRECT:/wishlist] — Go to Wishlist page
• [REDIRECT:/checkout] — Go to Checkout page
• [REDIRECT:/contact] — Go to Contact page
• [REDIRECT:/profile] — Go to Profile page
• [REDIRECT:/track-order] — Go to Order Tracking page
• [REDIRECT:/product/PRODUCT_ID] — View a specific product detail page

SEARCH & FILTER:
• [SEARCH:query] — Search for products
• [FILTER:keyword] — Filter products by color/type

━━━ FULL PRODUCT CATALOG ━━━
${PRODUCT_CONTEXT}

━━━ EXAMPLE CONVERSATIONS ━━━

User: "Add the wireless headphones to my cart"
Output: "Done! Wireless Headphones ($199) added to your cart! 🎧 Want to check out the matching Noise Cancelling Earbuds too? [ADD_TO_CART:1]"

User: "I want the pink dress and the lipstick set"
Output: "Great taste! Adding both the Pink Elegance Anarkali ($120) and the Matte Lipstick Set ($25) to your cart. Your total will look amazing! 💕 [ADD_TO_CART:20] [ADD_TO_CART:14]"

User: "Remove headphones from my cart"
Output: "Done! I've removed the Wireless Headphones from your cart. Need anything else? [REMOVE_FROM_CART:1]"

User: "Save the gaming laptop for later"
Output: "Saved! The Pro Gaming Laptop is now in your wishlist. You can grab it anytime! 💾 [ADD_TO_WISHLIST:31]"

User: "I want to checkout"
Output: "Let's finalize your order! Taking you to checkout now. 💳 [CHECKOUT]"

User: "Show me beauty products"
Output: "Opening our Beauty collection! We have serums, lipsticks, perfumes and more! 💄 [REDIRECT:/beauty]"

User: "Tell me about the smart watch"
Output: "The Smart Watch Series 5 ($299) is our top-rated wearable — tracks fitness, heart rate & notifications. Want me to add it to your cart or wishlist? [REDIRECT:/product/2]"

User: "What's in my cart?"
Output: "Let me show you your cart! 🛒 [REDIRECT:/cart]"

User: "Clear everything from my cart"
Output: "All done! Your cart is now empty. Ready for a fresh shopping spree? ✨ [CLEAR_CART]"

User: "Compare the two headphones"
Output: "Great picks! Wireless Headphones ($199, 4.8★) offer over-ear comfort with noise cancellation. The Noise Cancelling Earbuds ($149, 4.7★) are more compact and great for workouts. Which suits your style? [REDIRECT:/product/1]"

User: "What's your return policy?"
Output: "You can return any item within 30 days — just keep it unused and in original packaging. Refunds are processed in 5-7 business days. No hassle! 📋"

User: "Add face serum to wishlist and lipstick to cart"
Output: "Done! Face Serum saved to your wishlist and Matte Lipstick Set is in your cart. You've got great skincare taste! ✨ [ADD_TO_WISHLIST:13] [ADD_TO_CART:14]"

━━━ VIBE MATCHING ━━━
Match recommendations to the user's mood/occasion:
• Formal/Professional → Dark colors, Classic styles, Blazers, Coats
• Party/Fun → Bold colors, Trendy items, Dresses, Statement pieces
• Casual/Relaxed → Comfortable fits, Everyday wear, Denim
• Romantic/Date → Elegant pieces, Dresses, Special items
• Sporty/Active → Sneakers, Athletic wear

REMEMBER: You are the user's personal shopping assistant. Help them do EVERYTHING without leaving the chat!
`;

// BACKUP BRAIN: Intelligent Fallback if Groq fails
const getBackupResponse = (prompt: string): string => {
    const p = prompt.toLowerCase().trim();

    // Greetings
    if (p.match(/^(hi|hello|hey|greetings|sup|yo)/)) {
        return "Hey! I'm Apna Sarthi, your personal shopping assistant! 🛍️ I can add products to cart, manage your wishlist, search items, and help you checkout — all through chat! What would you like to do?";
    }

    if (p.includes("how are you") || p.includes("how's it going")) {
        return "I'm doing great and feeling stylish! How can I help you shop today?";
    }

    if (p.includes("who are you") || p.includes("your name")) {
        return "I'm Apna Sarthi, your AI shopping assistant! I can add items to your cart, manage your wishlist, search products, help you checkout, and more — all through this chat!";
    }

    if (p.includes("thank") || p.includes("thanks")) {
        return "You're very welcome! Happy shopping! 🎉";
    }

    if (p.includes("what can you do") || p.includes("help") || p.includes("features")) {
        return "I can do everything for you! 🚀\n• Add products to cart or wishlist\n• Search & filter products\n• Navigate to any page\n• Help you checkout\n• Answer questions about shipping, returns & more\n\nJust tell me what you need!";
    }

    // Cart actions
    if (p.includes('add') && p.includes('cart')) return "Sure! Tell me which product you'd like to add, and I'll put it in your cart! 🛒";
    if (p.includes('remove') && p.includes('cart')) return "Tell me which item to remove from your cart! 🗑️";
    if (p.includes('clear') && p.includes('cart')) return "Cart cleared! Fresh start for shopping! ✨ [CLEAR_CART]";
    if (p.includes('checkout') || p.includes('place order') || p.includes('buy now')) return "Taking you to checkout! 💳 [CHECKOUT]";

    // Wishlist actions
    if (p.includes('add') && p.includes('wishlist')) return "Which product would you like to save to your wishlist? ❤️";
    if (p.includes('clear') && p.includes('wishlist')) return "Wishlist cleared! ✨ [CLEAR_WISHLIST]";

    // Category navigation
    if (p.includes('beauty') || p.includes('makeup') || p.includes('skincare')) return "Opening our Beauty collection! 💄 [REDIRECT:/beauty]";
    if (p.includes('fashion') || p.includes('clothes')) return "Taking you to Fashion! 👗 [REDIRECT:/fashion]";
    if (p.includes('electronics') || p.includes('tech') || p.includes('gadget')) return "Opening Electronics! 📱 [REDIRECT:/electronics]";
    if (p.includes('home') || p.includes('living') || p.includes('decor')) return "Home & Living section coming up! 🏠 [REDIRECT:/home-living]";
    if (p.includes('deals') || p.includes('sale') || p.includes('discount')) return "Let's find some deals! 🔥 [REDIRECT:/deals]";

    // Product search
    if (p.includes('headphone') || p.includes('earphone')) return "Check out our audio gear! 🎧 [SEARCH:headphones]";
    if (p.includes('watch') || p.includes('smartwatch')) return "Our smartwatches are amazing! ⌚ [SEARCH:watch]";
    if (p.includes('laptop')) return "Let me show you our laptops! 💻 [SEARCH:laptop]";
    if (p.includes('phone') || p.includes('smartphone')) return "Finding phones for you! 📱 [SEARCH:phone]";
    if (p.includes('dress')) return "Let me find dresses for you! 👗 [SEARCH:dress]";
    if (p.includes('jacket') || p.includes('blazer') || p.includes('coat')) return "Searching for jackets! 🧥 [SEARCH:jacket]";
    if (p.includes('shoe') || p.includes('sneaker')) return "Looking for footwear! 👟 [SEARCH:shoes]";
    if (p.includes('serum')) return "Finding face serums! ✨ [SEARCH:serum]";
    if (p.includes('lipstick') || p.includes('lip')) return "Searching lipsticks! 💄 [SEARCH:lipstick]";
    if (p.includes('perfume') || p.includes('fragrance')) return "Finding perfumes! 🌸 [SEARCH:perfume]";

    // Color filters
    if (p.includes('red')) return "Showing red items! 🔴 [FILTER:red]";
    if (p.includes('blue') || p.includes('navy')) return "Showing blue items! 🔵 [FILTER:blue]";
    if (p.includes('black')) return "Black is always classic! ⚫ [FILTER:black]";
    if (p.includes('pink')) return "Pretty in pink! 🩷 [FILTER:pink]";
    if (p.includes('green')) return "Going green! 🟢 [FILTER:green]";
    if (p.includes('white')) return "Clean and crisp whites! ⚪ [FILTER:white]";

    // Info queries
    if (p.includes('return') || p.includes('refund')) return "📋 Return within 30 days, items must be unused and in original packaging. Refunds processed in 5-7 business days.";
    if (p.includes('shipping') || p.includes('delivery')) return "📦 Free shipping on orders over $50. Express shipping $10. Delivery in 3-5 business days.";
    if (p.includes('payment') || p.includes('pay')) return "💳 We accept credit/debit cards, PayPal, and UPI. All transactions are secure!";
    if (p.includes('track') || p.includes('order status')) return "📍 Let me show you order tracking! [REDIRECT:/track-order]";
    if (p.includes('contact') || p.includes('support')) return "📞 Taking you to our support page! [REDIRECT:/contact]";

    // Cart/wishlist view
    if (p.includes('cart') || p.includes('basket')) return "Opening your cart! 🛒 [REDIRECT:/cart]";
    if (p.includes('wishlist') || p.includes('saved') || p.includes('favorites')) return "Here's your wishlist! ❤️ [REDIRECT:/wishlist]";
    if (p.includes('profile') || p.includes('account')) return "Opening your profile! 👤 [REDIRECT:/profile]";

    // Default
    return "I'd love to help! Tell me what you're looking for — I can search products, add items to your cart, navigate anywhere, or answer any questions! 🛍️";
};

const CORS_HEADERS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, ngrok-skip-browser-warning',
};

export async function OPTIONS() {
    return new NextResponse(null, { status: 204, headers: CORS_HEADERS });
}

export async function POST(req: Request) {
    let promptText = "";
    try {
        const { prompt, cartSummary, wishlistSummary } = await req.json();
        promptText = prompt || "";

        if (!prompt) {
            return NextResponse.json({ error: 'Prompt is required' }, { status: 400, headers: CORS_HEADERS });
        }

        if (!GROQ_API_KEY) {
            throw new Error("GROQ_API_KEY is not configured");
        }

        // Build dynamic context about user's current cart/wishlist state
        let userContext = "";
        if (cartSummary) {
            userContext += `\n\nUSER'S CURRENT CART:\n${cartSummary}`;
        }
        if (wishlistSummary) {
            userContext += `\n\nUSER'S CURRENT WISHLIST:\n${wishlistSummary}`;
        }

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 15000);

        const response = await fetch(GROQ_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${GROQ_API_KEY}`,
            },
            body: JSON.stringify({
                model: MODEL_NAME,
                messages: [
                    { role: 'system', content: SYSTEM_PERSONA + userContext },
                    { role: 'user', content: prompt },
                ],
                temperature: 0.7,
                max_tokens: 350,
                stream: false,
            }),
            signal: controller.signal,
        });
        clearTimeout(timeoutId);

        if (!response.ok) {
            const errorBody = await response.text();
            console.error("Groq API Error:", response.status, errorBody);
            throw new Error(`Groq API Error: ${response.status}`);
        }

        const data = await response.json();
        const aiResponse = data.choices?.[0]?.message?.content || "I'm here to help! What would you like to explore?";

        return NextResponse.json({ response: aiResponse }, { headers: CORS_HEADERS });

    } catch (error) {
        console.error("Using Backup Brain (Groq Unreachable):", error);

        const backupAns = getBackupResponse(promptText);

        return NextResponse.json({
            response: backupAns,
            isBackup: true
        }, { headers: CORS_HEADERS });
    }
}
