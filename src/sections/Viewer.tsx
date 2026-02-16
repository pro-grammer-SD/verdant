import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Text } from '../components/primitives/Text';
import { Button } from '../components/primitives/Button';
import { cn } from '../lib/utils';
import { RotateCcw, RotateCw } from 'lucide-react';

const COLORS = [
    { id: 'forest', name: 'Forest Green', hex: '#11d411', themeColor: 'emerald' },
    { id: 'obsidian', name: 'Obsidian Black', hex: '#121212', themeColor: 'zinc' },
    { id: 'arctic', name: 'Arctic White', hex: '#f6f8f6', themeColor: 'stone' }
];

export const Viewer = () => {
    const [selectedColor, setSelectedColor] = useState(COLORS[0]);

    return (
        <section className="py-64 bg-[var(--color-surface-900)] overflow-hidden relative">
            {/* Background Glows */}
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[var(--color-primary)]/10 rounded-full blur-[120px] -z-0" />
            <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-[var(--color-primary)]/5 rounded-full blur-[100px] -z-0" />

            <div className="max-w-7xl mx-auto px-6 grid grid-cols-12 gap-8 items-center relative z-10">

                {/* Left Side: Content */}
                <div className="col-span-12 lg:col-span-4 space-y-12">
                    <div className="space-y-4">
                        <Text variant="caption" className="text-[var(--color-primary)]">Engineered for the Elements</Text>
                        <Text variant="headline" className="leading-tight text-white block">
                            The New Horizon of <span className="text-[var(--color-primary)]">Performance</span>
                        </Text>
                    </div>

                    {/* Colorway Toggle */}
                    <div className="space-y-6">
                        <Text variant="ui" className="text-white/40 uppercase tracking-[0.4em] font-black">Select Atmosphere</Text>
                        <div className="flex gap-4">
                            {COLORS.map((color) => (
                                <button
                                    key={color.id}
                                    onClick={() => setSelectedColor(color)}
                                    className={cn(
                                        "w-12 h-12 rounded-full border-2 transition-all p-1",
                                        selectedColor.id === color.id ? "border-[var(--color-primary)] scale-110" : "border-transparent hover:border-white/20"
                                    )}
                                >
                                    <div className="w-full h-full rounded-full" style={{ backgroundColor: color.hex }} />
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="pt-8">
                        <Button variant="outline" size="lg" className="w-full lg:w-auto">
                            Technical Manifesto
                        </Button>
                    </div>
                </div>

                {/* Center/Right: Interactive Viewer */}
                <div className="col-span-12 lg:col-span-8 relative aspect-square lg:h-[800px] flex items-center justify-center mt-12 lg:mt-0">
                    <div className="relative w-full h-full flex items-center justify-center overflow-visible">

                        <AnimatePresence mode="wait">
                            <motion.div
                                key={selectedColor.id}
                                initial={{ opacity: 0, x: 50, filter: "blur(20px)" }}
                                animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                                exit={{ opacity: 0, x: -50, filter: "blur(20px)" }}
                                transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                                className="relative w-full h-full flex items-center justify-center"
                            >
                                <img
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDSKLjUFvaU1rLUzAJcDDRURe3Gw6ImEbdre8VFKCtF8rf23yK2LsyIpmg8ayb-gVHRZWVZK8wxB_MbVcp_Dgc3DVxIG_QDgq3HlX7wKyxlsLS72QOGpe5mMVD6iNz-SWpuxkYbBBgpRn67w8qH2hTD25hE2cx5fir_L7OY4gE-p7yxkLqZOX4D8flUfaUq1Tbb8oWyuKmJ1Q1zcpn8snCqoUtF1aj3kc8ZvPfKJH3zPnTV91UqiPghUVD6NbPn_y6yYCMM3szCm5nK"
                                    alt="Product"
                                    className="w-full max-w-[320px] md:max-w-[500px] lg:max-w-[700px] z-10 drop-shadow-[0_50px_50px_rgba(0,0,0,0.5)] cursor-crosshair transition-all grayscale brightness-[0.8] hover:grayscale-0 hover:brightness-100 duration-1000"
                                />

                                {/* Hotspots */}
                                <div className="absolute top-[30%] left-[40%] group z-20">
                                    <div className="w-3 h-3 bg-[var(--color-primary)] rounded-full hotspot-pulse cursor-pointer" />
                                    <div className="absolute left-8 top-1/2 -translate-y-1/2 glass-panel px-6 py-3 rounded-xl opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-500 whitespace-nowrap translate-x-4 group-hover:translate-x-0">
                                        <Text variant="label-serif" className="block text-[8px] tracking-[0.2em] font-sans font-black uppercase text-[var(--color-primary)]">Upper</Text>
                                        <Text variant="ui" className="text-white/80">Breathable Matrix Mesh</Text>
                                    </div>
                                </div>

                                <div className="absolute bottom-[35%] right-[30%] group z-20">
                                    <div className="w-3 h-3 bg-[var(--color-primary)] rounded-full hotspot-pulse cursor-pointer" />
                                    <div className="absolute right-8 top-1/2 -translate-y-1/2 glass-panel px-6 py-3 rounded-xl opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-500 whitespace-nowrap -translate-x-4 group-hover:translate-x-0 text-right">
                                        <Text variant="label-serif" className="block text-[8px] tracking-[0.2em] font-sans font-black uppercase text-[var(--color-primary)]">Outsole</Text>
                                        <Text variant="ui" className="text-white/80">Bio-Dynamic Foam Tech</Text>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>

                        {/* Rotation Controls */}
                        <div className="absolute bottom-4 lg:bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-6 glass-panel px-8 py-4 rounded-full border-white/5 shadow-2xl scale-90 lg:scale-100">
                            <button className="text-white/40 hover:text-[var(--color-primary)] transition-colors"><RotateCcw size={18} /></button>
                            <div className="h-4 w-px bg-white/10" />
                            <Text variant="ui" className="text-white/60 tracking-[0.4em] font-black uppercase">360° Inspection</Text>
                            <div className="h-4 w-px bg-white/10" />
                            <button className="text-white/40 hover:text-[var(--color-primary)] transition-colors"><RotateCw size={18} /></button>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
};
