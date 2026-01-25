export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    category: 'top' | 'bottom' | 'shoes' | 'full';
    image: string; // The standalone product image
    overlayImage: string; // The transparent PNG to overlay on the avatar
    tags: string[];
}

export const catalog: Product[] = [
    {
        id: 'p1',
        name: 'Cyberpunk Leather Jacket',
        description: 'High-collar red leather jacket with LED accents.',
        price: 120,
        category: 'top',
        image: 'https://placehold.co/400x400/330000/red/png?text=Red+Jacket',
        overlayImage: 'https://placehold.co/400x600/transparent/red/png?text=Jacket+Overlay',
        tags: ['cyberpunk', 'red', 'jacket', 'night'],
    },
    {
        id: 'p2',
        name: 'Neo-Tokyo Denim',
        description: 'Distressed blue jeans with holographic patches.',
        price: 85,
        category: 'bottom',
        image: 'https://placehold.co/400x400/000033/blue/png?text=Blue+Jeans',
        overlayImage: 'https://placehold.co/400x600/transparent/blue/png?text=Jeans+Overlay',
        tags: ['casual', 'denim', 'blue', 'streetwear'],
    },
    {
        id: 'p3',
        name: 'Ethereal Summer Dress',
        description: 'Lightweight floral dress for day events.',
        price: 95,
        category: 'full',
        image: 'https://placehold.co/400x400/333300/yellow/png?text=Summer+Dress',
        overlayImage: 'https://placehold.co/400x600/transparent/yellow/png?text=Dress+Overlay',
        tags: ['summer', 'floral', 'dress', 'day'],
    },
];
