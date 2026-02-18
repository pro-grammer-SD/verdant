import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Text } from '../components/primitives/Text';
import { Button } from '../components/primitives/Button';
import { Check, ShoppingBag, ShieldCheck, Info, ArrowRight } from 'lucide-react';
import { cn } from '../lib/utils';
import { contentConfig } from '../config/content';

export const Purchase = ({ onOpenSizeGuide }: { onOpenSizeGuide: () => void }) => {
    const [isComplete, setIsComplete] = useState(false);
    const [selectedSize, setSelectedSize] = useState('8.5');

    const handlePurchase = () => {
        setIsComplete(true);
        setTimeout(() => setIsComplete(false), 4000);
    };

    return (
        <section id="purchase" className="relative z-[70] max-w-7xl mx-auto px-8 pb-48">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">

                {/* Technical Documentation - Left on Desktop, Bottom on Mobile */}
                <motion.div
                    id="technical-docs"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, ease: [0.23, 1, 0.32, 1] }}
                    className="order-2 lg:order-1 lg:col-span-7 space-y-12"
                >
                    <div className="glass-panel rounded-3xl p-10 md:p-16 overflow-hidden relative border-white/5 bg-white/[0.02]">
                        <div className="absolute top-0 right-0 w-80 h-80 bg-[var(--color-primary)]/5 rounded-full blur-[100px] -mr-40 -mt-40" />

                        <div className="relative z-10">
                            <Text variant="caption" className="text-[var(--color-primary)] mb-12 block">Engineering Specs</Text>
                            <Text variant="headline" className="text-5xl md:text-7xl text-white italic mb-16 leading-tight">
                                Technical <br /> Documentation
                            </Text>

                            <div className="space-y-12">
                                {contentConfig.product.specs.map((s) => (
                                    <div key={s.label} className="group border-b border-white/5 pb-8 transition-colors hover:border-[var(--color-primary)]/20">
                                        <div className="flex justify-between items-baseline">
                                            <div className="space-y-2">
                                                <Text variant="ui" className="text-white/20 text-[10px] tracking-[0.4em] font-black uppercase font-sans group-hover:text-[var(--color-primary)] transition-colors">{s.label}</Text>
                                                <Text variant="ui" className="text-3xl md:text-5xl text-white tracking-widest font-black uppercase font-sans">{s.val}</Text>
                                            </div>
                                            <ArrowRight size={24} className="text-[var(--color-primary)] opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500" />
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-20 p-8 rounded-2xl bg-white/[0.03] border border-white/5">
                                <Text variant="body" className="text-white/40 text-sm leading-relaxed lowercase italic tracking-wide font-medium">
                                    VERDANT STRATOS // SERIALIZED NITROGEN INJECTION CORE. ALL METRICS CALCULATED AT 20°C / 1ATM.
                                    SUBJECT: RUNNER-X PROTOCOL.
                                </Text>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Sticky Purchase Module - Right on Desktop, Top on Mobile */}
                <aside className="order-1 lg:order-2 lg:col-span-5">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, ease: [0.23, 1, 0.32, 1] }}
                        className="sticky top-32 space-y-10"
                    >
                        <div className="glass-panel rounded-3xl p-8 lg:p-12 border-t-[3px] border-[var(--color-primary)] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)]">
                            <div className="flex justify-between items-start mb-12">
                                <div className="space-y-2">
                                    <Text variant="ui" className="text-[var(--color-primary)] tracking-[0.5em] font-black uppercase font-sans">Pre-order Active</Text>
                                    <Text variant="headline" className="text-4xl text-white leading-tight">Verdant Stratos</Text>
                                </div>
                                <div className="text-right">
                                    <Text variant="title" className="text-3xl text-[var(--color-primary)]">$845</Text>
                                    <Text variant="ui" className="text-white/30 tracking-[0.4em] font-black uppercase font-sans">Limited Edition</Text>
                                </div>
                            </div>

                            {/* Description */}
                            <Text variant="body" className="block mb-12">
                                Engineered in the Black Forest Dynamics Lab, each pair is crafted from carbon-neutral PEBAX® NITRO foam and serialized titanium.
                            </Text>

                            {/* Size Selector */}
                            <div className="space-y-6 mb-12">
                                <div className="flex justify-between items-center">
                                    <Text variant="ui" className="text-white/40 uppercase tracking-[0.4em] font-black font-sans">Select Size (US)</Text>
                                    <Text variant="ui"
                                        onClick={onOpenSizeGuide}
                                        className="text-[var(--color-primary)]/60 underline cursor-pointer hover:text-[var(--color-primary)] transition-colors font-sans font-black"
                                    >Size Guide</Text>
                                </div>
                                <div className="grid grid-cols-4 gap-4">
                                    {contentConfig.product.sizes.map((size) => (
                                        <button
                                            key={size}
                                            onClick={() => size !== '11' && setSelectedSize(size)}
                                            className={cn(
                                                "h-14 flex items-center justify-center border font-sans text-xs transition-all duration-500 rounded-xl font-black",
                                                selectedSize === size && size !== '11'
                                                    ? "border-[var(--color-primary)] text-[var(--color-primary)] bg-[var(--color-primary)]/[0.08] shadow-[0_0_20px_rgba(17,212,17,0.15)]"
                                                    : "border-white/5 text-white/30 hover:border-white/20 bg-white/[0.02]",
                                                size === '11' && "opacity-20 cursor-not-allowed grayscale"
                                            )}
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                                <div className="flex items-center gap-3">
                                    <Info size={14} className="text-[var(--color-primary)] opacity-50" />
                                    <Text variant="ui" className="text-white/30 tracking-wider font-medium normal-case font-sans">Size 11 is currently out of stock.</Text>
                                </div>
                            </div>

                            {/* CTA */}
                            <Button
                                variant="glow"
                                size="lg"
                                onClick={handlePurchase}
                                className="w-full rounded-2xl h-24 group px-0 font-sans"
                            >
                                <AnimatePresence mode="wait">
                                    {isComplete ? (
                                        <motion.div
                                            key="success"
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            className="flex items-center gap-4 text-xs font-black uppercase tracking-[0.4em]"
                                        >
                                            <Check size={20} strokeWidth={4} />
                                            <span>Reservation Confirmed</span>
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            key="default"
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="flex items-center gap-4 text-xs font-black uppercase tracking-[0.4em]"
                                        >
                                            <span>Begin Pre-order</span>
                                            <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform duration-500" />
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </Button>

                            <div className="mt-12 flex justify-center items-center gap-12">
                                <div className="flex items-center gap-3">
                                    <ShieldCheck size={16} className="text-[var(--color-primary)]" />
                                    <Text variant="ui" className="text-white/30 tracking-[0.3em] font-black uppercase font-sans">Secured</Text>
                                </div>
                                <div className="flex items-center gap-3">
                                    <ShoppingBag size={16} className="text-[var(--color-primary)]" />
                                    <Text variant="ui" className="text-white/30 tracking-[0.3em] font-black uppercase font-sans">Priority</Text>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </aside>
            </div>
        </section>
    );
};
