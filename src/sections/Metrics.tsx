import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Text } from '../components/primitives/Text';
import { Quote } from 'lucide-react';

const stats = [
    {
        id: 1,
        value: "92",
        label: "Cloud-Density",
        sub: "Cushioning",
        desc: "Proprietary molecular foam lattice for 40% more impact dispersion.",
        percentage: 75
    },
    {
        id: 2,
        value: "88%",
        label: "Kinetic Load",
        sub: "Energy Return",
        desc: "Dual-carbon shank integration converts downward force into propulsion.",
        percentage: 88
    },
];

const MetricDial = ({ stat, index }: { stat: typeof stats[0], index: number }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.2, delay: index * 0.2, ease: [0.23, 1, 0.32, 1] }}
            className="glass-panel p-12 rounded-3xl flex items-center gap-14 group hover:border-[var(--color-primary)]/50 transition-all duration-1000"
        >
            <div className="relative w-36 h-36 flex items-center justify-center shrink-0">
                <div className="absolute inset-0 rounded-full border-[1px] border-white/5" />
                <motion.div
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={isInView ? { rotate: 45, opacity: 1 } : {}}
                    transition={{ duration: 2.5, ease: "circOut" as const }}
                    className="absolute inset-0 rounded-full border-[2px] border-[var(--color-primary)] border-t-transparent"
                />
                <span className="text-4xl font-light font-serif italic text-white">{stat.value}</span>
            </div>

            <div className="space-y-4">
                <Text variant="ui" className="text-[var(--color-primary)] tracking-[0.6em] font-black uppercase opacity-80">{stat.label}</Text>
                <Text variant="headline" className="text-5xl md:text-7xl text-white/95 leading-none block">{stat.sub}</Text>
                <Text variant="body" className="text-sm text-white/40 block max-w-xs">{stat.desc}</Text>
            </div>
        </motion.div>
    );
};

export const Metrics = () => {
    return (
        <section id="metrics" className="py-72 px-8 bg-[var(--color-surface-900)] relative overflow-hidden">
            <div className="max-w-7xl mx-auto space-y-48 relative z-10">

                {/* Metrics Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    {stats.map((stat, index) => (
                        <MetricDial key={stat.id} stat={stat} index={index} />
                    ))}
                </div>

                {/* Floating Testimonials - Editorial Refinement */}
                <div className="relative h-[600px] flex items-center justify-center">
                    <motion.div
                        initial={{ opacity: 0, x: -80, rotate: -3 }}
                        whileInView={{ opacity: 1, x: 60, rotate: -3 }}
                        transition={{ duration: 2, ease: [0.23, 1, 0.32, 1] }}
                        className="absolute left-0 z-20 w-[450px] glass-panel p-14 rounded-3xl shadow-2xl space-y-8"
                    >
                        <Quote size={48} className="text-[var(--color-primary)] opacity-30" />
                        <Text variant="quote">"The technical precision is unlike anything on the track. It feels like an extension of the nervous system."</Text>
                        <div className="flex items-center gap-6 pt-4">
                            <div className="w-12 h-12 rounded-full bg-[var(--color-surface-800)] border border-[var(--color-primary)]/30 overflow-hidden">
                                <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuAkHSQ-chEFpCAyUeHNHkGqJOMQDo8E6wggJmV3aPnx_9Pydnz6zjbN7g872AxHLmSvDH_rkE2Tn8S3IuBYjStT8g8tpZPNFfu5uRKSbDadpCF2lcIhbW6YARyni9DShrrqMLWqBdkggpXbgVzm8xq1mf6vBltHwwd6JwtQRLjFzwJ_7eWhBkUgyv3wTX7t4NZ3AljB9HQ68HZEdCTMs6_YoIiB-TRXGdyP9lwtSt27_3IlR6ipf5G6ukagqov5G6o1GQ82hLO0583s" alt="Athlete" />
                            </div>
                            <div className="space-y-1">
                                <span className="text-[10px] uppercase tracking-[0.3em] font-black text-white/90">Marcus Sterling</span>
                                <p className="text-[var(--color-primary)] font-serif italic text-xs">Olympic Sprint Gold</p>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 80, rotate: 4 }}
                        whileInView={{ opacity: 1, x: -60, rotate: 4 }}
                        transition={{ duration: 2, ease: [0.23, 1, 0.32, 1], delay: 0.2 }}
                        className="absolute right-0 z-30 w-[450px] glass-panel p-14 rounded-3xl shadow-2xl space-y-8"
                    >
                        <Quote size={48} className="text-[var(--color-primary)] opacity-30" />
                        <Text variant="quote">"Finally, a performance shoe that understands the aesthetic requirements of high-end luxury."</Text>
                        <div className="flex items-center gap-6 pt-4 justify-end text-right">
                            <div className="space-y-1">
                                <span className="text-[10px] uppercase tracking-[0.3em] font-black text-white/90">Elena Rossi</span>
                                <p className="text-[var(--color-primary)] font-serif italic text-xs">Chief Editor, Vogue Tech</p>
                            </div>
                            <div className="w-12 h-12 rounded-full bg-[var(--color-surface-800)] border border-[var(--color-primary)]/30 overflow-hidden">
                                <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuAfrGttE9xvchB5607DH_734MbVgto57pcrdh-JGrsLQyvKk8wpr8viBBEk4WWbE0cnNrv-8lIvq8RInR3hZfRaHVydVC791MEW6Hvy8Fq9AgyJGRaYw5J_kI05KZwIuqz2XCvRSFkPDu3MyCffBjUZ_gT6Bw6IbwxwwaI3jh4sooPRnO-a1bSkMCXBMmmXjrtNHH8YXhXM4ehTR_f4lY5xPVm9rlZthJEzcC2BWJ-maLqb0__evR_pyAoX4W-jG2y2Ei1BAm8OFCei" alt="Editor" />
                            </div>
                        </div>
                    </motion.div>

                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-[var(--color-primary)]/40 to-transparent opacity-20" />
                </div>
            </div>
        </section>
    );
};
