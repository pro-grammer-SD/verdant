import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface TypewriterProps {
    text: string;
    delay?: number;
    speed?: number;
    className?: string;
    onComplete?: () => void;
    glitchDuration?: number;
}

export const Typewriter = ({
    text,
    delay = 0,
    speed = 0.05,
    className,
    onComplete,
    glitchDuration = 1000
}: TypewriterProps) => {
    const [displayText, setDisplayText] = useState('');
    const [isComplete, setIsComplete] = useState(false);
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+';

    useEffect(() => {
        let timeout: NodeJS.Timeout;
        let currentText = '';
        let index = 0;

        const type = () => {
            if (index < text.length) {
                // Hacker decode effect: show random characters before the real one
                const iterations = 3;
                let count = 0;

                const decode = setInterval(() => {
                    if (count < iterations) {
                        setDisplayText(currentText + characters[Math.floor(Math.random() * characters.length)]);
                        count++;
                    } else {
                        clearInterval(decode);
                        currentText += text[index];
                        setDisplayText(currentText);
                        index++;
                        timeout = setTimeout(type, speed * 1000);
                    }
                }, 30);
            } else {
                setIsComplete(true);
                onComplete?.();
            }
        };

        const startTimeout = setTimeout(type, delay * 1000);

        return () => {
            clearTimeout(startTimeout);
            clearTimeout(timeout);
        };
    }, [text, delay, speed]);

    return (
        <span className={className}>
            {displayText}
            {!isComplete && (
                <motion.span
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ repeat: Infinity, duration: 0.8 }}
                    className="inline-block w-[2px] h-[1em] bg-[var(--color-primary)] ml-1 translate-y-[10%]"
                />
            )}
        </span>
    );
};
