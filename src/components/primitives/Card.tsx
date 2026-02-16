import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    hoverEffect?: 'lift' | 'depth' | 'none';
    children: React.ReactNode;
}

export const Card = ({ className, hoverEffect = 'depth', children, ...props }: CardProps) => {
    const hoverVariants = {
        lift: {
            y: -10,
            borderColor: "rgba(17, 212, 17, 0.4)",
            boxShadow: "0 20px 40px -10px rgba(17, 212, 17, 0.2)"
        },
        depth: {
            scale: 1.02,
            borderColor: "rgba(17, 212, 17, 0.3)",
            boxShadow: "0 10px 30px -5px rgba(17, 212, 17, 0.15)"
        },
        none: {}
    };

    return (
        <motion.div
            className={cn(
                "glass-panel rounded-2xl p-8",
                "transition-all duration-700",
                className
            )}
            whileHover={hoverVariants[hoverEffect]}
            transition={{ type: "spring", stiffness: 150, damping: 20 }}
            {...props as any}
        >
            {children}
        </motion.div>
    );
};
