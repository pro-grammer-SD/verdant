import { cn } from '../../lib/utils';

interface TextProps extends React.HTMLAttributes<HTMLHeadingElement | HTMLParagraphElement | HTMLSpanElement> {
    variant?: 'display' | 'headline' | 'title' | 'body' | 'caption' | 'ui' | 'label-serif' | 'quote';
    as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div';
}

export const Text = ({
    variant = 'body',
    as,
    className,
    children,
    ...props
}: TextProps) => {
    const Component = as || (
        variant === 'display' ? 'h1' :
            variant === 'headline' ? 'h2' :
                variant === 'title' ? 'h3' :
                    variant === 'caption' ? 'span' : 'p'
    );

    const variants = {
        display: "font-serif text-[clamp(4rem,15vw,12rem)] leading-[0.9] tracking-tighter italic",
        headline: "font-serif text-[clamp(2.5rem,8vw,5rem)] leading-[1.1] tracking-tight italic",
        title: "font-serif text-[clamp(1.25rem,4vw,2rem)] leading-tight italic",
        body: "font-serif text-base md:text-lg leading-relaxed text-white/70 italic",
        caption: "font-sans text-[10px] uppercase tracking-[0.5em] font-black",
        ui: "font-sans text-[11px] font-black tracking-[0.2em] uppercase",
        "label-serif": "font-serif italic text-sm tracking-wide text-[var(--color-primary)]",
        quote: "font-serif italic text-2xl md:text-3xl leading-relaxed text-white/90"
    };

    return (
        <Component
            className={cn(variants[variant], className)}
            {...props as any}
        >
            {children}
        </Component>
    );
};
