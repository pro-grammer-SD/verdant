import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Text } from '../primitives/Text';
import { motionConfig } from '../../config/motion';

export const Loader = ({ onComplete }: { onComplete: () => void }) => {
    const [progress, setProgress] = useState(0);
    const [isExiting, setIsExiting] = useState(false);

    useEffect(() => {
        // High-fidelity progress simulation (mimicking asset buffering)
        const loadTimeline = [
            { target: 30, duration: 1200 },
            { target: 45, duration: 800 },
            { target: 85, duration: 1500 },
            { target: 100, duration: 600 }
        ];

        let currentStep = 0;
        const startStep = () => {
            if (currentStep >= loadTimeline.length) return;

            const step = loadTimeline[currentStep];
            const startTime = performance.now();
            const startProgress = progress;

            const animate = (time: number) => {
                const elapsed = time - startTime;
                const p = Math.min(elapsed / step.duration, 1);
                const eased = p === 1 ? 1 : 1 - Math.pow(2, -10 * p); // Expo Out

                const nextProgress = startProgress + (step.target - startProgress) * eased;
                setProgress(nextProgress);

                if (p < 1) {
                    requestAnimationFrame(animate);
                } else {
                    currentStep++;
                    if (currentStep < loadTimeline.length) {
                        startStep();
                    } else {
                        setTimeout(() => setIsExiting(true), 400);
                        setTimeout(onComplete, 1600);
                    }
                }
            };
            requestAnimationFrame(animate);
        };

        startStep();
    }, []);

    return (
        <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: isExiting ? 0 : 1 }}
            transition={{ duration: 1.2, ease: motionConfig.curves.cinematic }}
            className="fixed inset-0 z-[1000] bg-[var(--color-surface-900)] flex flex-col items-center justify-center p-12 overflow-hidden"
        >
            {/* Cinematic Background Atmosphere */}
            <div className="absolute inset-0 opacity-20">
                <motion.div
                    animate={{
                        x: ['-50%', '50%'],
                        opacity: [0.1, 0.3, 0.1]
                    }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--color-primary)]/10 to-transparent blur-[160px]"
                />
            </div>

            <div className="w-full max-w-xl space-y-12 relative z-10">
                <div className="flex flex-col items-center gap-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-4"
                    >
                        <div className="size-10 bg-[var(--color-primary)] rounded-xl flex items-center justify-center text-[var(--color-surface-900)] shadow-[0_0_30px_rgba(17,212,17,0.3)]">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="w-6 h-6">
                                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                            </svg>
                        </div>
                        <Text variant="display" className="text-3xl text-white tracking-[0.4em] uppercase font-sans font-black">
                            Verdant
                        </Text>
                    </motion.div>
                </div>

                <div className="space-y-4">
                    <div className="flex justify-between items-end px-2">
                        <Text variant="ui" className="text-[10px] text-white/20 uppercase tracking-[0.5em] font-sans font-black">
                            Initializing Technical Core
                        </Text>
                        <Text variant="ui" className="text-[var(--color-primary)] font-mono text-sm premium-glow">
                            {Math.round(progress)}%
                        </Text>
                    </div>

                    <div className="relative w-full h-[2px] bg-white/[0.03] overflow-hidden rounded-full">
                        {/* Shimmering Progress Bar */}
                        <motion.div
                            style={{ scaleX: progress / 100 }}
                            className="absolute inset-0 bg-gradient-to-r from-[var(--color-primary-dark)] via-[var(--color-primary)] to-[var(--color-primary-light)] origin-left premium-glow"
                        >
                            <motion.div
                                animate={{ x: ['-100%', '100%'] }}
                                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                            />
                        </motion.div>
                    </div>

                    <div className="flex justify-center">
                        <Text variant="ui" className="text-[9px] text-white/10 tracking-[0.6em] uppercase font-sans font-black italic">
                            Nature Engineered . Serialized Dynamics . V3.0
                        </Text>
                    </div>
                </div>
            </div>

            {/* Exit Light Flash */}
            <AnimatePresence>
                {isExiting && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-white z-[1100]"
                        transition={{ duration: 0.2 }}
                    />
                )}
            </AnimatePresence>
        </motion.div>
    );
};
