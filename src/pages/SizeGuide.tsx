import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Text } from '../components/primitives/Text';
import { Button } from '../components/primitives/Button';
import { X, Ruler, Info, ChevronRight, ArrowLeft } from 'lucide-react';
import { motionConfig } from '../config/motion';
import { cn } from '../lib/utils';

export const SizeGuide = ({ onClose }: { onClose: () => void }) => {
    const [unit, setUnit] = useState<'US' | 'EU' | 'UK'>('US');

    // Prevent background scrolling when technical documentation is open
    useEffect(() => {
        const originalStyle = window.getComputedStyle(document.body).overflow;
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = originalStyle;
        };
    }, []);

    const sizes = [
        { us: "7", eu: "40", uk: "6", cm: "25.0" },
        { us: "8", eu: "41", uk: "7", cm: "26.0" },
        { us: "8.5", eu: "42", uk: "7.5", cm: "26.5" },
        { us: "9", eu: "42.5", uk: "8", cm: "27.0" },
        { us: "9.5", eu: "43", uk: "8.5", cm: "27.5" },
        { us: "10", eu: "44", uk: "9", cm: "28.0" },
        { us: "11", eu: "45", uk: "10", cm: "29.0" },
        { us: "12", eu: "46", uk: "11", cm: "30.0" }
    ];

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1000] flex items-center justify-center p-6 md:p-12 overflow-hidden"
        >
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onClick={onClose}
                className="absolute inset-0 bg-[#0c0a09]/98 backdrop-blur-[100px]"
            />

            <motion.div
                initial={{ y: 50, opacity: 0, scale: 0.98 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                exit={{ y: 50, opacity: 0, scale: 0.98 }}
                transition={{ duration: 1, ease: motionConfig.curves.apple }}
                className="relative w-full max-w-6xl glass-panel rounded-[40px] overflow-hidden flex flex-col md:flex-row h-full max-h-[85vh] shadow-[0_120px_240px_-60px_rgba(0,0,0,0.9)]"
            >
                {/* Left: Technical Art & Info */}
                <div className="w-full md:w-80 bg-black/20 p-12 flex flex-col justify-between border-r border-white/5">
                    <div className="space-y-12">
                        <button
                            onClick={onClose}
                            className="flex items-center gap-4 text-white/30 hover:text-white transition-colors group"
                        >
                            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                            <Text variant="ui" className="text-[10px] font-black uppercase tracking-[0.4em] font-sans">Return</Text>
                        </button>

                        <div className="space-y-6">
                            <div className="size-16 bg-[var(--color-primary)]/10 rounded-2xl flex items-center justify-center">
                                <Ruler className="text-[var(--color-primary)]" size={28} />
                            </div>
                            <Text variant="headline" className="text-4xl text-white italic leading-tight">Fit <br />Mastery</Text>
                            <Text variant="body" className="text-white/40 text-sm leading-relaxed">
                                Verdant shoes use a race-tuned last. We recommend a high-precision measurement for the most responsive feel.
                            </Text>
                        </div>
                    </div>

                    <div className="space-y-8">
                        <div className="glass-panel p-6 rounded-2xl space-y-4 border-white/5">
                            <Text variant="ui" className="text-[10px] text-[var(--color-primary)] font-black uppercase tracking-widest font-sans flex items-center gap-2">
                                <Info size={14} /> Pro Tip
                            </Text>
                            <Text variant="body" className="text-xs text-white/40 leading-relaxed">
                                Measure your feet in the afternoon when they are at their largest.
                            </Text>
                        </div>
                    </div>
                </div>

                {/* Right: Size Converter & Table */}
                <div className="flex-1 flex flex-col overflow-hidden relative">
                    {/* Perspective Gradient Overlays */}
                    <div className="absolute top-[100px] inset-x-0 h-12 bg-gradient-to-b from-[#0c0a09] to-transparent z-20 pointer-events-none" />
                    <div className="absolute bottom-[80px] inset-x-0 h-12 bg-gradient-to-t from-[#0c0a09] to-transparent z-20 pointer-events-none" />

                    <div className="p-12 pb-0 flex justify-between items-end border-b border-white/5 relative z-30">
                        <div className="flex gap-12">
                            {['US', 'EU', 'UK'].map((u) => (
                                <button
                                    key={u}
                                    onClick={() => setUnit(u as any)}
                                    className={cn(
                                        "pb-8 text-[11px] font-black tracking-[0.5em] uppercase transition-all relative font-sans",
                                        unit === u ? "text-white" : "text-white/20 hover:text-white/40"
                                    )}
                                >
                                    {u} Systems
                                    {unit === u && (
                                        <motion.div layoutId="unitUnderline" className="absolute bottom-0 left-0 w-full h-1 bg-[var(--color-primary)] shadow-[0_0_15px_rgba(17,212,17,0.5)]" />
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto p-12 pt-20 custom-scrollbar relative z-10">
                        <div className="grid grid-cols-1 gap-1">
                            {/* Table Header */}
                            <div className="grid grid-cols-4 py-6 px-4 border-b border-white/10 mb-4 items-center">
                                <Text variant="ui" className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20 font-sans">Brand Target</Text>
                                <Text variant="ui" className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20 font-sans">Region Scale</Text>
                                <Text variant="ui" className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20 font-sans">Millimeters</Text>
                                <Text variant="ui" className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20 font-sans text-right">Availability</Text>
                            </div>

                            {/* Rows */}
                            {sizes.map((row, i) => (
                                <motion.div
                                    key={row.us}
                                    initial={{ opacity: 0, x: -10 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.05 }}
                                    className="grid grid-cols-4 py-12 px-8 hover:bg-white/[0.04] transition-all rounded-3xl group border-b border-white/[0.03] items-center"
                                >
                                    <div className="flex items-center gap-6">
                                        <Text variant="ui" className="text-3xl text-white tracking-widest">{row.us}</Text>
                                        <div className="px-2 py-0.5 border border-white/10 rounded uppercase text-[8px] opacity-40">Target</div>
                                    </div>
                                    <Text variant="ui" className="text-2xl text-white/30">
                                        {unit === 'US' ? row.us : unit === 'EU' ? row.eu : row.uk} {unit}
                                    </Text>
                                    <div className="flex items-center gap-4">
                                        <Text variant="ui" className="text-2xl text-[var(--color-primary)]">{row.cm}</Text>
                                        <Text variant="ui" className="text-[10px] opacity-10">Metric</Text>
                                    </div>
                                    <div className="flex justify-end">
                                        {row.us === '11' ? (
                                            <div className="px-6 py-2 border border-red-900/40 text-red-500/80 text-[10px] uppercase tracking-[0.5em] rounded-full bg-red-950/20">Sold Out</div>
                                        ) : (
                                            <div className="px-6 py-2 border border-[var(--color-primary)]/20 text-[var(--color-primary)] text-[10px] uppercase tracking-[0.5em] rounded-full bg-emerald-950/20 shadow-[0_0_20px_rgba(17,212,17,0.1)]">In Stock</div>
                                        )}
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Measurement Instructions */}
                        <div className="mt-24 space-y-12">
                            <Text variant="display" className="text-4xl text-white italic">Technical Measurement</Text>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {[
                                    { title: "Point of Contact", desc: "Place a sheet of paper on the floor against a wall. High-precision surface only." },
                                    { title: "Peak Length", desc: "Mark the longest part of your foot (heel-to-toe) on the paper. Use scientific metric." },
                                    { title: "Dynamic Offset", desc: "Verdant Stratos features an 8mm drop—allow for 5mm of toe clearance." }
                                ].map((step, idx) => (
                                    <div key={idx} className="glass-panel p-8 rounded-3xl border-white/5 space-y-4">
                                        <div className="size-8 bg-white/5 rounded-full flex items-center justify-center text-[var(--color-primary)] text-[10px] font-black font-sans">{idx + 1}</div>
                                        <Text variant="title" className="text-xl text-white font-serif italic">{step.title}</Text>
                                        <Text variant="body" className="text-xs text-white/40 leading-relaxed font-sans">{step.desc}</Text>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="p-12 border-t border-white/5 bg-black/10 flex justify-between items-center relative z-30">
                        <Text variant="ui" className="text-[9px] font-black uppercase tracking-[0.5em] text-white/20 font-sans">Verdant Support Engineering . {new Date().getFullYear()}</Text>
                        <Button variant="outline" size="sm" onClick={onClose} className="font-sans font-black tracking-widest">Exit Portal</Button>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};
