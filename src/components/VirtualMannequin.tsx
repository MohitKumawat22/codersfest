"use client";
import React, { useState, useRef, useEffect } from 'react';
import { Camera, RefreshCcw, Shirt, X, User, ShoppingBag } from 'lucide-react';
import { Product } from '@/lib/catalog';

interface VirtualMannequinProps {
    isOpen: boolean;
    onClose: () => void;
    product: Product | null;
}

export default function VirtualMannequin({ isOpen, onClose, product }: VirtualMannequinProps) {
    const [height, setHeight] = useState(170);
    const [weight, setWeight] = useState(70);
    const [mode, setMode] = useState<'MANNEQUIN' | 'CAMERA' | 'PHOTO'>('MANNEQUIN');
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [capturedImage, setCapturedImage] = useState<string | null>(null);

    // Reset when opening
    useEffect(() => {
        if (isOpen) {
            setMode('MANNEQUIN');
            setCapturedImage(null);
        }
    }, [isOpen]);

    if (!isOpen || !product) return null;

    // 1. Body Morphing Logic
    const calculateMorph = () => {
        const scaleY = height / 170;
        const hM = height / 100;
        const bmi = weight / (hM * hM);
        const standardBmi = 22;
        const scaleX = 1 + ((bmi - standardBmi) / 50);
        return { transform: `scale(${scaleX}, ${scaleY})` };
    };

    // 2. Camera Functions
    const startCamera = async () => {
        setMode('CAMERA');
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
            }
        } catch (err) {
            console.error("Camera access denied:", err);
            // Fallback to mannequin mode gracefully
            setMode('MANNEQUIN');
        }
    };

    const takePhoto = () => {
        if (videoRef.current && canvasRef.current) {
            const context = canvasRef.current.getContext('2d');
            if (context) {
                context.drawImage(videoRef.current, 0, 0, 300, 500);
                setCapturedImage(canvasRef.current.toDataURL('image/png'));
                setMode('PHOTO');
                const stream = videoRef.current.srcObject as MediaStream;
                stream?.getTracks().forEach(track => track.stop());
            }
        }
    };

    const retake = () => {
        setCapturedImage(null);
        startCamera();
    };

    // Determine overlay color/style based on product category/name (Mock Logic)
    // In a real app, this would come from product metadata (e.g., texture URL)
    const getClothStyle = () => {
        const name = product.name.toLowerCase();
        let color = 'rgba(255, 255, 255, 0.5)';

        if (name.includes('red') || name.includes('jacket')) color = 'rgba(239, 68, 68, 0.8)';
        else if (name.includes('blue') || name.includes('shirt')) color = 'rgba(59, 130, 246, 0.8)';
        else if (name.includes('green') || name.includes('dress')) color = 'rgba(34, 197, 94, 0.8)';
        else if (name.includes('black')) color = 'rgba(0, 0, 0, 0.8)';

        return {
            backgroundColor: color,
            // maskImage removed - not used in current implementation
            clipPath: 'polygon(20% 0%, 80% 0%, 100% 20%, 100% 100%, 0% 100%, 0% 20%)',
            borderRadius: '10px'
        };
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="relative flex flex-col md:flex-row gap-6 p-6 bg-[#1a1a1a] rounded-3xl border border-white/10 max-w-5xl w-full max-h-[90vh] shadow-2xl overflow-y-auto md:overflow-hidden">

                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors z-50"
                >
                    <X size={20} />
                </button>

                {/* LEFT: Controls & Product Info */}
                <div className="flex-1 space-y-6">
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <h2 className="text-2xl font-bold text-white">Apna Sarthi-Fit™</h2>
                            <span className="bg-purple-600 text-[10px] font-bold px-2 py-0.5 rounded text-white uppercase">Live</span>
                        </div>
                        <p className="text-gray-400 text-sm">Visualize this item on your body type.</p>
                    </div>

                    {/* Selected Product Review */}
                    <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl border border-white/5">
                        <div className="w-16 h-16 relative bg-white rounded-lg overflow-hidden">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={product.image} alt={product.name} className="object-cover w-full h-full" />
                        </div>
                        <div>
                            <h3 className="font-bold text-white">{product.name}</h3>
                            <p className="text-sm text-gray-400">${product.price}</p>
                        </div>
                    </div>

                    <div className="space-y-4 bg-black/20 p-4 rounded-xl">
                        {/* Mode Toggles */}
                        <div className="flex gap-2 p-1 bg-black/50 rounded-lg">
                            <button
                                onClick={() => setMode('MANNEQUIN')}
                                className={`flex-1 py-2 rounded-md text-xs font-bold flex items-center justify-center gap-2 transition-all ${mode === 'MANNEQUIN' ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-white'}`}
                            >
                                <User size={14} /> Mannequin
                            </button>
                            <button
                                onClick={startCamera}
                                className={`flex-1 py-2 rounded-md text-xs font-bold flex items-center justify-center gap-2 transition-all ${mode === 'CAMERA' || mode === 'PHOTO' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'}`}
                            >
                                <Camera size={14} /> My Camera
                            </button>
                        </div>

                        {/* Sliders */}
                        {mode === 'MANNEQUIN' && (
                            <div className="space-y-4 pt-2">
                                <div>
                                    <div className="flex justify-between text-xs text-gray-400 uppercase mb-1">
                                        <span>Height</span>
                                        <span>{height} cm</span>
                                    </div>
                                    <input type="range" min="150" max="200" value={height} onChange={(e) => setHeight(Number(e.target.value))} className="w-full h-1 bg-gray-700 rounded-lg accent-purple-500 appearance-none" />
                                </div>
                                <div>
                                    <div className="flex justify-between text-xs text-gray-400 uppercase mb-1">
                                        <span>Weight</span>
                                        <span>{weight} kg</span>
                                    </div>
                                    <input type="range" min="40" max="150" value={weight} onChange={(e) => setWeight(Number(e.target.value))} className="w-full h-1 bg-gray-700 rounded-lg accent-blue-500 appearance-none" />
                                </div>
                            </div>
                        )}
                    </div>

                    <button className="w-full py-3 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-colors flex items-center justify-center gap-2">
                        <ShoppingBag size={18} /> Add to Cart (Fits Perfect!)
                    </button>
                </div>

                {/* RIGHT: Mirror Display */}
                <div className="flex-shrink-0 flex justify-center">
                    <div className="relative w-[300px] h-[500px] bg-gray-900 rounded-[30px] border-8 border-gray-800 shadow-2xl overflow-hidden flex items-center justify-center group">

                        {/* 1. Mannequin Mode */}
                        {mode === 'MANNEQUIN' && (
                            <div
                                className="relative transition-transform duration-500 ease-out will-change-transform"
                                style={calculateMorph()}
                            >
                                <svg viewBox="0 0 100 220" className="h-[450px] w-auto text-gray-300 drop-shadow-2xl" fill="currentColor">
                                    <path d="M50 10 C55 10 58 14 58 20 C58 24 65 28 75 30 L72 80 C70 85 65 90 65 110 L68 180 L60 180 L58 120 L55 120 L55 180 L45 180 L45 120 L42 120 L40 180 L32 180 L35 110 C35 90 30 85 28 80 L25 30 C35 28 42 24 42 20 C42 14 45 10 50 10 Z" />
                                </svg>
                            </div>
                        )}

                        {/* 2. Camera Stream */}
                        {mode === 'CAMERA' && (
                            <div className="relative w-full h-full">
                                <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover transform scale-x-[-1]" />
                                <button
                                    onClick={takePhoto}
                                    className="absolute bottom-6 left-1/2 -translate-x-1/2 w-14 h-14 rounded-full border-4 border-white flex items-center justify-center hover:scale-110 transition-transform bg-white/20 backdrop-blur-sm z-50"
                                >
                                    <div className="w-10 h-10 bg-white rounded-full"></div>
                                </button>
                            </div>
                        )}

                        {/* 3. Photo Captured */}
                        {mode === 'PHOTO' && capturedImage && (
                            <div className="relative w-full h-full">
                                <img src={capturedImage} className="w-full h-full object-cover" alt="You" />
                                <button
                                    onClick={retake}
                                    className="absolute top-4 right-4 p-2 bg-black/50 text-white rounded-full hover:bg-black transition-colors z-50"
                                >
                                    <RefreshCcw size={14} />
                                </button>
                            </div>
                        )}

                        {/* Common: PRODUCT OVERLAY */}
                        {(mode === 'MANNEQUIN' || mode === 'PHOTO') && (
                            <div
                                className="absolute top-[22%] left-1/2 -translate-x-1/2 w-[60%] h-[45%] pointer-events-none mix-blend-overlay opacity-90 transition-all duration-500"
                                style={getClothStyle()}
                            >
                                <div className="w-full h-full opacity-30" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '4px 4px' }}></div>
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[10px] uppercase font-mono text-white/50 tracking-wider rotate-[-10deg]">
                                    Apna Sarthi
                                </div>
                            </div>
                        )}

                        <canvas ref={canvasRef} width="300" height="500" className="hidden" />

                    </div>
                </div>
            </div>
        </div>
    );
}
