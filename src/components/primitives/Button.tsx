import { useRef, useState, forwardRef, useImperativeHandle } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'ghost' | 'outline' | 'glow';
    size?: 'sm' | 'md' | 'lg';
    magnetic?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = 'primary', size = 'md', magnetic = true, children, ...props }, ref) => {
        const buttonRef = useRef<HTMLButtonElement>(null);
        const [position, setPosition] = useState({ x: 0, y: 0 });

        useImperativeHandle(ref, () => buttonRef.current!);

        const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
            if (!magnetic || !buttonRef.current) return;

            const { clientX, clientY } = e;
            const { left, top, width, height } = buttonRef.current.getBoundingClientRect();

            const x = clientX - (left + width / 2);
            const y = clientY - (top + height / 2);

            setPosition({ x: x * 0.35, y: y * 0.35 });
        };

        const handleMouseLeave = () => {
            setPosition({ x: 0, y: 0 });
        };

        const variants = {
            primary: "bg-[var(--color-primary)] text-[var(--color-surface-900)] hover:brightness-110",
            secondary: "bg-white text-[var(--color-surface-900)] hover:bg-[var(--color-surface-50)]",
            ghost: "bg-transparent text-white hover:bg-white/5",
            outline: "bg-transparent border border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-[var(--color-surface-900)]",
            glow: "bg-[var(--color-primary)] text-[var(--color-surface-900)] shadow-[0_0_20px_rgba(17,212,17,0.3)] hover:shadow-[0_0_35px_rgba(17,212,17,0.6)]"
        };

        const sizes = {
            sm: "px-6 py-2 text-[10px] tracking-[0.2em] font-bold uppercase",
            md: "px-8 py-3 text-[11px] tracking-[0.3em] font-bold uppercase",
            lg: "px-10 py-5 text-[12px] tracking-[0.4em] font-bold uppercase"
        };

        return (
            <motion.button
                ref={buttonRef}
                className={cn(
                    "relative inline-flex items-center justify-center overflow-hidden rounded-full transition-all duration-500",
                    "cursor-pointer active:scale-95 disabled:pointer-events-none disabled:opacity-50",
                    variants[variant],
                    sizes[size],
                    className
                )}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                animate={{ x: position.x, y: position.y }}
                transition={{ type: "spring", stiffness: 200, damping: 20, mass: 0.1 }}
                {...props as any}
            >
                <span className="relative z-10 flex items-center gap-2">
                    {children}
                </span>
            </motion.button>
        );
    }
);

Button.displayName = 'Button';
