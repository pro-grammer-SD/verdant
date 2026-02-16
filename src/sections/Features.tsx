import { motion } from 'framer-motion';
import { Card } from '../components/primitives/Card';
import { Text } from '../components/primitives/Text';
import { Droplets, Wind, Zap } from 'lucide-react';

const featureData = [
    {
        id: 1,
        title: "Omni-Grip Sole",
        description: "Proprietary tread patterns designed for maximum traction on both wet and dry surfaces.",
        icon: Zap,
        tag: "TRACTION+",
        offset: 0
    },
    {
        id: 2,
        title: "Kinetic Matrix",
        description: "Laser-cut perforations and a kinetic mesh lining allow for 360° airflow, keeping you cool.",
        icon: Wind,
        tag: "DRY-TECH",
        offset: 48 // Vertical offset for asymmetry
    },
    {
        id: 3,
        title: "Carbon Offset",
        description: "Sustainability meets durability. Every pair prevents 12 plastic bottles from reaching the ocean.",
        icon: Droplets,
        tag: "ETHICAL",
        offset: 0
    }
];

export const Features = () => {
    return (
        <section id="features" className="py-64 px-8 bg-[var(--color-surface-900)] relative overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <div className="mb-32 space-y-4">
                    <Text variant="caption" className="text-[var(--color-primary)] tracking-[0.4em] font-black uppercase">Engineered for the Elements</Text>
                    <Text variant="headline" className="text-white text-5xl md:text-8xl max-w-3xl leading-tight">
                        The New Horizon of <span className="italic text-[var(--color-primary)]">Performance.</span>
                    </Text>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {featureData.map((feature, index) => (
                        <motion.div
                            key={feature.id}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: index * 0.2, ease: [0.16, 1, 0.3, 1] }}
                            style={{ translateY: typeof window !== 'undefined' && window.innerWidth > 768 ? feature.offset : 0 }}
                            className="h-full"
                        >
                            <Card
                                className="h-full flex flex-col gap-12 group hover:border-[var(--color-primary)]/40 hover:bg-white/[0.05]"
                                hoverEffect="lift"
                            >
                                <div className="w-16 h-16 rounded-xl bg-[var(--color-primary)]/10 flex items-center justify-center text-[var(--color-primary)] group-hover:bg-[var(--color-primary)] group-hover:text-[var(--color-surface-900)] transition-all duration-700">
                                    <feature.icon className="w-8 h-8" />
                                </div>

                                <div className="space-y-4">
                                    <Text variant="title" className="text-white text-3xl font-bold">
                                        {feature.title}
                                    </Text>
                                    <Text variant="body" className="text-white/40 leading-relaxed font-light text-lg">
                                        {feature.description}
                                    </Text>
                                </div>

                                <div className="mt-auto pt-8 flex items-center gap-4 text-[10px] font-black tracking-widest text-white/30 group-hover:text-[var(--color-primary)] transition-colors">
                                    <Zap size={10} fill="currentColor" />
                                    <span>{feature.tag}</span>
                                </div>
                            </Card>
                        </motion.div>
                    ))}
                </div>

                {/* Side Stats as per legacy 02 spec */}
                <div className="mt-48 border-t border-white/5 pt-20 grid grid-cols-2 lg:grid-cols-4 gap-12">
                    {[
                        { label: "Total Weight", val: "240g" },
                        { label: "Heel Drop", val: "10mm" },
                        { label: "Energy Return", val: "98%" },
                        { label: "Certified Tech", val: "ISO" }
                    ].map((stat) => (
                        <div key={stat.label} className="flex flex-col gap-2">
                            <span className="text-[var(--color-primary)] font-bold text-4xl">{stat.val}</span>
                            <span className="text-[10px] uppercase tracking-widest text-white/30 font-black">{stat.label}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
