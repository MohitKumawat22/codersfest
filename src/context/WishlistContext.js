"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
    const [wishlist, setWishlist] = useState([]);

    // Load wishlist from local storage on mount (with SSR check)
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const savedWishlist = localStorage.getItem("wishlist");
            if (savedWishlist) {
                try {
                    setWishlist(JSON.parse(savedWishlist));
                } catch (error) {
                    console.error("Failed to parse wishlist from localStorage:", error);
                    localStorage.removeItem("wishlist");
                }
            }
        }
    }, []);

    // Save wishlist to local storage whenever it changes (with SSR check)
    useEffect(() => {
        if (typeof window !== 'undefined' && wishlist.length >= 0) {
            localStorage.setItem("wishlist", JSON.stringify(wishlist));
        }
    }, [wishlist]);

    const addToWishlist = (product) => {
        setWishlist((prevWishlist) => {
            const exists = prevWishlist.find((item) => item.id === product.id);
            if (exists) {
                return prevWishlist; // Already in wishlist
            }
            return [...prevWishlist, product];
        });
    };

    const removeFromWishlist = (productId) => {
        setWishlist((prevWishlist) => prevWishlist.filter((item) => item.id !== productId));
    };

    const toggleWishlist = (product) => {
        const exists = wishlist.find((item) => item.id === product.id);
        if (exists) {
            removeFromWishlist(product.id);
        } else {
            addToWishlist(product);
        }
    };

    const isInWishlist = (productId) => {
        return wishlist.some((item) => item.id === productId);
    };

    const clearWishlist = () => {
        setWishlist([]);
    };

    const wishlistCount = wishlist.length;

    return (
        <WishlistContext.Provider
            value={{ wishlist, addToWishlist, removeFromWishlist, toggleWishlist, isInWishlist, clearWishlist, wishlistCount }}
        >
            {children}
        </WishlistContext.Provider>
    );
};

export const useWishlist = () => useContext(WishlistContext);
