import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Text } from '../primitives/Text';

export const Loader = ({ onComplete }: { onComplete: () => void }) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(timer);
                    setTimeout(onComplete, 500);
                    return 100;
                }
                return prev + 1;
            });
        }, 20);

        return () => clearInterval(timer);
    }, [onComplete]);

    return (
        <motion.div
            exit={{ y: '-100%' }}
            transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[100] bg-[var(--color-surface-900)] flex flex-col items-center justify-center p-12"
        >
            <div className="w-full max-w-sm space-y-8">
                <div className="flex justify-between items-end">
                    <Text variant="display" className="text-white text-2xl tracking-[0.3em] uppercase opacity-80">
                        Verdant
                    </Text>
                    <Text variant="caption" className="text-[var(--color-accent)] font-mono">
                        {progress}%
                    </Text>
                </div>

                <div className="relative w-full h-[1px] bg-white/10 overflow-hidden">
                    <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: progress / 100 }}
                        className="absolute inset-0 bg-[var(--color-accent)] origin-left"
                    />
                </div>

                <Text variant="caption" className="text-white/40 tracking-[0.5em] text-center w-full block">
                    Nature Engineered
                </Text>
            </div>
        </motion.div>
    );
};
