import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useSpring, useMotionValue, useTransform } from 'framer-motion';
import { Text } from '../components/primitives/Text';
import { Button } from '../components/primitives/Button';
import { RotateCw, RotateCcw } from 'lucide-react';
import { contentConfig } from '../config/content';
import { motionConfig } from '../config/motion';
import { useProduct } from '../context/ProductContext';
import { cn } from '../lib/utils';

export const Viewer = () => {
    const {
        selectedVariant,
        setSelectedVariant,
        rotation,
        setRotation,
        hoveredFeature,
        setHoveredFeature
    } = useProduct();

    const containerRef = useRef<HTMLDivElement>(null);
    const isDragging = useRef(false);
    const startX = useRef(0);
    const startRotation = useRef(0);

    // Smooth rotation spring
    const rotationSpring = useSpring(rotation, {
        stiffness: 120,
        damping: 20,
        mass: 1
    });

    useEffect(() => {
        rotationSpring.set(rotation);
    }, [rotation]);

    // Drag interaction logic
    const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
        isDragging.current = true;
        startX.current = 'touches' in e ? e.touches[0].clientX : e.clientX;
        startRotation.current = rotation;
        document.body.style.cursor = 'grabbing';
    };

    const handleDragMove = (e: MouseEvent | TouchEvent) => {
        if (!isDragging.current) return;

        const currentX = 'touches' in e ? e.touches[0].clientX : e.clientX;
        const diff = (currentX - startX.current) / 10;
        const nextRotation = (startRotation.current - diff) % 360;
        setRotation(nextRotation < 0 ? 360 + nextRotation : nextRotation);
    };

    const handleDragEnd = () => {
        isDragging.current = false;
        document.body.style.cursor = 'auto';
    };

    useEffect(() => {
        window.addEventListener('mousemove', handleDragMove);
        window.addEventListener('mouseup', handleDragEnd);
        window.addEventListener('touchmove', handleDragMove);
        window.addEventListener('touchend', handleDragEnd);
        return () => {
            window.removeEventListener('mousemove', handleDragMove);
            window.removeEventListener('mouseup', handleDragEnd);
            window.removeEventListener('touchmove', handleDragMove);
            window.removeEventListener('touchend', handleDragEnd);
        };
    }, [rotation]);

    const rotateBy = (amount: number) => {
        setRotation((prev) => (prev + amount) % 360);
    };

    const renderExplodedModel = () => {
        const isExploded = hoveredFeature !== null;

        // Use rotation to drive a "pseudo-3D" effect using CSS transforms
        // In a real production app, we would swap images from a 36-frame sequence here.
        // For this template, we use high-fidelity CSS perspective rotation.

        return (
            <div className="relative w-full h-full flex items-center justify-center p-12 perspective-2000">
                <motion.div
                    style={{ rotateY: rotationSpring }}
                    className="relative w-full max-w-[750px] aspect-[4/3] flex items-center justify-center preserve-3d"
                >
                    {/* Outsole Layer */}
                    <motion.img
                        animate={{
                            y: hoveredFeature === 2 ? 80 : 0,
                            z: hoveredFeature === 2 ? 100 : 0,
                            opacity: isExploded && hoveredFeature !== 2 ? 0.3 : 1,
                        }}
                        transition={{ duration: 0.8, ease: motionConfig.curves.apple }}
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDSKLjUFvaU1rLUzAJcDDRURe3Gw6ImEbdre8VFKCtF8rf23yK2LsyIpmg8ayb-gVHRZWVZK8wxB_MbVcp_Dgc3DVxIG_QDgq3HlX7wKyxlsLS72QOGpe5mMVD6iNz-SWpuxkYbBBgpRn67w8qH2hTD25hE2cx5fir_L7OY4gE-p7yxkLqZOX4D8flUfaUq1Tbb8oWyuKmJ1Q1zcpn8snCqoUtF1aj3kc8ZvPfKJH3zPnTV91UqiPghUVD6NbPn_y6yYCMM3szCm5nK"
                        className="absolute w-full z-10 brightness-[0.9] drop-shadow-2xl translate-z-0"
                        style={{ filter: selectedVariant.id === 'umber' ? 'hue-rotate(220deg) brightness(0.6)' : selectedVariant.id === 'phantom' ? 'grayscale(1)' : 'none' }}
                    />

                    {/* Midsole / Tech Layer */}
                    <motion.div
                        animate={{
                            opacity: isExploded ? 0.8 : 0,
                            y: hoveredFeature === 1 ? -40 : 0,
                            z: isExploded ? 50 : 0
                        }}
                        className="absolute inset-x-0 h-1 bg-[var(--color-primary)]/20 blur-xl z-15"
                    />

                    {/* Upper Layer */}
                    <motion.img
                        animate={{
                            y: hoveredFeature === 1 ? -80 : 0,
                            z: hoveredFeature === 1 ? 150 : 50,
                            opacity: isExploded && hoveredFeature !== 1 ? 0.3 : 1,
                        }}
                        transition={{ duration: 0.8, ease: motionConfig.curves.apple }}
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDSKLjUFvaU1rLUzAJcDDRURe3Gw6ImEbdre8VFKCtF8rf23yK2LsyIpmg8ayb-gVHRZWVZK8wxB_MbVcp_Dgc3DVxIG_QDgq3HlX7wKyxlsLS72QOGpe5mMVD6iNz-SWpuxkYbBBgpRn67w8qH2hTD25hE2cx5fir_L7OY4gE-p7yxkLqZOX4D8flUfaUq1Tbb8oWyuKmJ1Q1zcpn8snCqoUtF1aj3kc8ZvPfKJH3zPnTV91UqiPghUVD6NbPn_y6yYCMM3szCm5nK"
                        className="absolute w-full z-20 mix-blend-screen opacity-100 translate-z-[50px]"
                        style={{ filter: selectedVariant.id === 'umber' ? 'hue-rotate(220deg) brightness(0.8)' : selectedVariant.id === 'phantom' ? 'grayscale(1)' : 'none' }}
                    />
                </motion.div>
            </div>
        );
    };

    return (
        <section id="viewer" ref={containerRef} className="min-h-screen py-48 bg-[var(--color-surface-900)] overflow-hidden flex flex-col items-center">
            <div className="max-w-7xl mx-auto px-8 w-full grid grid-cols-12 gap-16 items-center">

                {/* Left Side: Content */}
                <div className="col-span-12 lg:col-span-4 space-y-12">
                    <div className="space-y-12">
                        <Text variant="caption" className="text-[var(--color-primary)] tracking-[0.5em] uppercase">Precision Engineering</Text>
                        <Text variant="headline" className="text-white leading-[0.9] block italic">
                            The New <br /> Horizon of <span className="text-[var(--color-primary)]">Unity</span>
                        </Text>
                    </div>

                    {/* Colorway Selection */}
                    <div className="space-y-12">
                        <Text variant="ui" className="text-white/40 tracking-[0.4em]">Atmosphere Selection</Text>
                        <div className="flex gap-8">
                            {contentConfig.product.variants.map((v) => (
                                <button
                                    key={v.id}
                                    onClick={() => setSelectedVariant(v)}
                                    className={cn(
                                        "w-16 h-16 rounded-full border-2 transition-all p-1 group relative",
                                        selectedVariant.id === v.id ? "border-[var(--color-primary)] scale-110" : "border-transparent hover:border-white/20"
                                    )}
                                >
                                    <div className="w-full h-full rounded-full shadow-inner" style={{ backgroundColor: v.hex }} />
                                    {selectedVariant.id === v.id && (
                                        <motion.div layoutId="glow" className="absolute -inset-2 bg-[var(--color-primary)]/10 blur-xl rounded-full -z-10" />
                                    )}
                                </button>
                            ))}
                        </div>
                        <Text variant="ui" className="text-white/80 block tracking-widest">{selectedVariant.name}</Text>
                    </div>

                    <div className="pt-24">
                        <Button
                            variant="outline"
                            size="lg"
                            className="px-12 font-black tracking-[0.3em]"
                            onClick={() => document.getElementById('technical-docs')?.scrollIntoView({ behavior: 'smooth' })}
                        >
                            Technical Manifesto
                        </Button>
                    </div>
                </div>

                {/* Right Side: Interactive Viewer */}
                <div className="col-span-12 lg:col-span-8 relative aspect-square lg:h-[900px] flex flex-col">
                    <div
                        className="absolute inset-0 flex items-center justify-center cursor-grab active:cursor-grabbing"
                        onMouseDown={handleDragStart}
                        onTouchStart={handleDragStart}
                    >
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={selectedVariant.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 1.1 }}
                                transition={{ duration: 1.2, ease: motionConfig.curves.apple }}
                                className="w-full h-full relative"
                            >
                                {renderExplodedModel()}
                            </motion.div>
                        </AnimatePresence>

                        {/* Interactive technical Hotspots */}
                        {contentConfig.features.map((feature) => (
                            <div
                                key={feature.id}
                                className="absolute pointer-events-auto group z-50"
                                style={feature.pos}
                                onMouseEnter={() => setHoveredFeature(feature.id)}
                                onMouseLeave={() => setHoveredFeature(null)}
                            >
                                <div className="w-6 h-6 bg-[var(--color-primary)] rounded-full hotspot-pulse cursor-pointer flex items-center justify-center">
                                    <div className="w-2 h-2 bg-black rounded-full" />
                                </div>

                                <motion.div
                                    initial={{ opacity: 0, x: 20, filter: "blur(10px)" }}
                                    animate={{
                                        opacity: hoveredFeature === feature.id ? 1 : 0,
                                        x: hoveredFeature === feature.id ? 0 : 20,
                                        filter: hoveredFeature === feature.id ? "blur(0px)" : "blur(10px)"
                                    }}
                                    className="absolute left-14 top-1/2 -translate-y-1/2 glass-panel p-8 rounded-2xl w-72 pointer-events-none border-l-4 border-l-[var(--color-primary)] shadow-2xl"
                                >
                                    <Text variant="ui" className="text-[var(--color-primary)] mb-2 block tracking-[0.4em]">{feature.label}</Text>
                                    <Text variant="title" className="text-white mb-2 block text-2xl">{feature.title}</Text>
                                    <Text variant="body" className="text-xs text-white/50 leading-relaxed font-sans font-medium">{feature.desc}</Text>
                                </motion.div>
                            </div>
                        ))}

                        {/* Floor Shadow */}
                        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-black/50 blur-[130px] rounded-full -z-10" />
                    </div>

                    {/* Rotation Console */}
                    <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-12 glass-panel px-10 py-6 rounded-full z-[200] shadow-2xl backdrop-blur-3xl border-white/5">
                        <button
                            onClick={() => rotateBy(-15)}
                            className="text-white/20 hover:text-[var(--color-primary)] transition-colors p-2"
                        >
                            <RotateCcw size={24} />
                        </button>
                        <div className="flex flex-col items-center">
                            <Text variant="ui" className="text-white/40 tracking-[0.5em] whitespace-nowrap text-[9px]">
                                360° Technical Inspection
                            </Text>
                        </div>
                        <button
                            onClick={() => rotateBy(15)}
                            className="text-white/20 hover:text-[var(--color-primary)] transition-colors p-2"
                        >
                            <RotateCw size={24} />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};
