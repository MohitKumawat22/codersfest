import { Product } from "./catalog";

export type FastBrainAction =
    | { type: 'REDIRECT'; payload: string }
    | { type: 'ADD_TO_CART'; payload: string }
    | { type: 'ADD_TO_WISHLIST'; payload: string }
    | { type: 'REMOVE_FROM_CART'; payload: string }
    | { type: 'REMOVE_FROM_WISHLIST'; payload: string }
    | { type: 'CLEAR_CART' }
    | { type: 'CLEAR_WISHLIST' }
    | { type: 'SHOW_WISHLIST' }
    | { type: 'SHOW_CART' }
    | { type: 'CHECKOUT' }
    | { type: 'VIEW_PRODUCT'; payload: string }
    | { type: 'SEARCH'; payload: string }
    | { type: 'INFO'; payload: string }
    | { type: 'FILTER_PRODUCT'; payload: string }
    | { type: 'COMPARE_PRODUCTS'; payload: string }
    | { type: 'NONE' };

interface IntentRule {
    keywords: string[];
    // Some rules need multi-word matching to avoid false positives
    requireAll?: string[][];
    action: FastBrainAction['type'];
    payload: string;
    response?: string;
}

const RULES: IntentRule[] = [
    // === CART ACTIONS (Higher priority - must come before navigation) ===
    { keywords: ['add to cart', 'put in cart', 'add this to cart', 'buy this'], action: 'ADD_TO_CART', payload: '__FROM_AI__', response: '🛒 Adding that to your cart!' },
    { keywords: ['remove from cart', 'delete from cart', 'take out of cart'], action: 'REMOVE_FROM_CART', payload: '__FROM_AI__', response: '🗑️ Removing that from your cart!' },
    { keywords: ['clear cart', 'empty cart', 'remove all from cart', 'clear my cart'], action: 'CLEAR_CART', payload: '', response: '🧹 Cart cleared!' },
    { keywords: ['checkout', 'place order', 'buy now', 'proceed to checkout', 'place my order'], action: 'CHECKOUT', payload: '', response: '💳 Taking you to checkout!' },

    // === WISHLIST ACTIONS ===
    { keywords: ['add to wishlist', 'save for later', 'add to favorites', 'wishlist this'], action: 'ADD_TO_WISHLIST', payload: '__FROM_AI__', response: '❤️ Added to your wishlist!' },
    { keywords: ['remove from wishlist', 'delete from wishlist'], action: 'REMOVE_FROM_WISHLIST', payload: '__FROM_AI__', response: '💔 Removed from your wishlist!' },
    { keywords: ['clear wishlist', 'empty wishlist', 'clear my wishlist'], action: 'CLEAR_WISHLIST', payload: '', response: '🧹 Wishlist cleared!' },

    // Navigation - Category Pages
    { keywords: ['fashion', 'clothes', 'apparel', 'wear'], action: 'REDIRECT', payload: '/fashion', response: '👗 Taking you to our Fashion collection!' },
    { keywords: ['beauty', 'makeup', 'cosmetic', 'skincare'], action: 'REDIRECT', payload: '/beauty', response: '💄 Showing you our Beauty products!' },
    { keywords: ['electronics', 'gadget', 'tech', 'device'], action: 'REDIRECT', payload: '/electronics', response: '📱 Navigating to Electronics!' },
    { keywords: ['home', 'living', 'furniture', 'decor'], action: 'REDIRECT', payload: '/home-living', response: '🏠 Opening Home & Living section!' },
    { keywords: ['deals', 'sale', 'discount', 'offer'], action: 'REDIRECT', payload: '/deals', response: '🔥 Showing you our Hot Deals!' },

    // Specific Products
    { keywords: ['shoes', 'footwear', 'sneakers', 'boots'], action: 'SEARCH', payload: 'sneakers', response: '👟 Searching for shoes...' },
    { keywords: ['dress', 'gown', 'frock'], action: 'SEARCH', payload: 'dress', response: '👗 Finding dresses for you...' },
    { keywords: ['jacket', 'coat', 'blazer'], action: 'SEARCH', payload: 'jacket', response: '🧥 Looking for jackets...' },
    { keywords: ['bag', 'purse', 'handbag'], action: 'SEARCH', payload: 'bag', response: '👜 Searching for bags...' },
    { keywords: ['headphone', 'earphone', 'earbud', 'airpod'], action: 'SEARCH', payload: 'headphones', response: '🎧 Finding headphones...' },
    { keywords: ['watch', 'smartwatch'], action: 'SEARCH', payload: 'watch', response: '⌚ Searching for watches...' },
    { keywords: ['laptop', 'computer', 'macbook'], action: 'SEARCH', payload: 'laptop', response: '💻 Searching for laptops...' },
    { keywords: ['phone', 'smartphone', 'iphone', 'mobile'], action: 'SEARCH', payload: 'phone', response: '📱 Searching for phones...' },
    { keywords: ['tv', 'television'], action: 'SEARCH', payload: 'tv', response: '📺 Looking for TVs...' },
    { keywords: ['camera', 'dslr'], action: 'SEARCH', payload: 'camera', response: '📷 Searching for cameras...' },
    { keywords: ['tablet', 'ipad'], action: 'SEARCH', payload: 'tablet', response: '📱 Looking for tablets...' },
    { keywords: ['speaker', 'bluetooth speaker'], action: 'SEARCH', payload: 'speaker', response: '🔊 Searching for speakers...' },
    { keywords: ['serum', 'face serum'], action: 'SEARCH', payload: 'serum', response: '✨ Looking for serums...' },
    { keywords: ['lipstick', 'lip'], action: 'SEARCH', payload: 'lipstick', response: '💄 Searching for lipsticks...' },
    { keywords: ['perfume', 'fragrance', 'scent'], action: 'SEARCH', payload: 'perfume', response: '🌸 Finding perfumes...' },
    { keywords: ['moisturizer', 'lotion', 'cream'], action: 'SEARCH', payload: 'moisturizer', response: '🧴 Searching for moisturizers...' },
    { keywords: ['console', 'playstation', 'xbox', 'gaming console'], action: 'SEARCH', payload: 'console', response: '🎮 Looking for gaming consoles...' },

    // Color Filters
    { keywords: ['red', 'crimson', 'maroon'], action: 'FILTER_PRODUCT', payload: 'red', response: '🔴 Filtering for red items!' },
    { keywords: ['blue', 'navy', 'azure'], action: 'FILTER_PRODUCT', payload: 'blue', response: '🔵 Showing blue products!' },
    { keywords: ['black', 'dark'], action: 'FILTER_PRODUCT', payload: 'black', response: '⚫ Filtering for black items!' },
    { keywords: ['white', 'cream'], action: 'FILTER_PRODUCT', payload: 'white', response: '⚪ Showing white products!' },
    { keywords: ['green', 'emerald'], action: 'FILTER_PRODUCT', payload: 'green', response: '🟢 Filtering for green items!' },
    { keywords: ['pink'], action: 'FILTER_PRODUCT', payload: 'pink', response: '🩷 Filtering for pink items!' },

    // Cart & Wishlist View
    { keywords: ['cart', 'shopping cart', 'basket', 'my cart', 'view cart', 'show cart', 'open cart'], action: 'SHOW_CART', payload: '', response: '🛒 Opening your shopping cart!' },
    { keywords: ['wishlist', 'saved', 'favorites', 'wish list', 'my wishlist', 'show wishlist'], action: 'SHOW_WISHLIST', payload: '', response: '❤️ Here\'s your wishlist!' },

    // Information Queries
    { keywords: ['return', 'refund', 'exchange'], action: 'INFO', payload: 'return_policy', response: '📋 Our return policy: You can return items within 30 days of purchase. Items must be unused and in original packaging. Refunds are processed within 5-7 business days.' },
    { keywords: ['shipping', 'delivery', 'courier'], action: 'INFO', payload: 'shipping', response: '📦 We offer free standard shipping on orders over $50. Express shipping is available for $10. Delivery takes 3-5 business days.' },
    { keywords: ['payment', 'pay', 'card'], action: 'INFO', payload: 'payment', response: '💳 We accept all major credit/debit cards, PayPal, and UPI. All transactions are secure and encrypted.' },
    { keywords: ['contact', 'support', 'customer service'], action: 'REDIRECT', payload: '/contact', response: '📞 Taking you to our contact page!' },
    { keywords: ['profile', 'account', 'my account'], action: 'REDIRECT', payload: '/profile', response: '👤 Opening your profile!' },
    { keywords: ['track', 'order status', 'where is my order'], action: 'REDIRECT', payload: '/track-order', response: '📍 Taking you to order tracking!' },
    { keywords: ['privacy', 'privacy policy'], action: 'REDIRECT', payload: '/privacy-policy', response: '🔒 Opening our privacy policy!' },
    { keywords: ['hours', 'open', 'timing'], action: 'INFO', payload: 'hours', response: '🕐 Our customer service is available Monday-Friday: 9am-6pm, Saturday: 10am-4pm. Shop online 24/7!' },
    { keywords: ['price', 'cost', 'expensive', 'cheap', 'budget'], action: 'INFO', payload: 'pricing', response: '💰 We have products for every budget! Check out our Deals section for great discounts!' },
    { keywords: ['size', 'sizing', 'size guide', 'fit'], action: 'INFO', payload: 'sizing', response: '📏 We offer sizes XS through XXL. Check individual product pages for detailed size charts. When in doubt, size up!' },
    { keywords: ['warranty', 'guarantee'], action: 'INFO', payload: 'warranty', response: '🛡️ All electronics come with a 1-year manufacturer warranty. Fashion items have a 6-month quality guarantee.' },
];

export const processFastBrain = (input: string): FastBrainAction | null => {
    const lowerInput = input.toLowerCase();

    // Find the first matching rule
    for (const rule of RULES) {
        if (rule.keywords.some(k => lowerInput.includes(k))) {
            return {
                type: rule.action,
                payload: rule.payload
            } as FastBrainAction;
        }
    }

    return null; // Fallback to Smart Brain (Groq)
};

// Get contextual response for a fast action
export const getFastBrainResponse = (input: string): string | null => {
    const lowerInput = input.toLowerCase();

    for (const rule of RULES) {
        if (rule.keywords.some(k => lowerInput.includes(k))) {
            return rule.response || "Let me help you with that!";
        }
    }

    return null;
};
