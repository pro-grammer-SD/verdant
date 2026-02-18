import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    LineChart, Line, Legend
} from 'recharts';
import { Text } from '../components/primitives/Text';
import { Typewriter } from '../components/motion/Typewriter';
import { designConfig } from '../config/design';

const data = [
    { name: 'Alpha', value: 400, yield: 240, velocity: 2400 },
    { name: 'Beta', value: 300, yield: 139, velocity: 2210 },
    { name: 'Gamma', value: 200, yield: 980, velocity: 2290 },
    { name: 'Delta', value: 278, yield: 390, velocity: 2000 },
    { name: 'Epsilon', value: 189, yield: 480, velocity: 2181 },
    { name: 'Zeta', value: 239, yield: 380, velocity: 2500 },
    { name: 'Eta', value: 349, yield: 430, velocity: 2100 },
];

export const Analytics = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section
            id="analytics"
            ref={ref}
            className={`relative w-full ${designConfig.spacing.section} bg-[var(--color-surface-900)] overflow-hidden`}
        >
            <div className={`max-w-7xl mx-auto ${designConfig.spacing.safe} space-y-24`}>
                {/* Header Narrative */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-end">
                    <div className="space-y-8">
                        <Text variant="caption" className="text-[var(--color-primary)] tracking-[0.6em]">TECHNICAL PERFORMANCE</Text>
                        <Text variant="headline" className="text-white text-6xl md:text-8xl italic leading-none">
                            <Typewriter text="Measured." delay={0.5} speed={0.05} /> <br />
                            <span className="text-[var(--color-primary)]">
                                <Typewriter text="Engineered. Perfection." delay={1.2} speed={0.04} />
                            </span>
                        </Text>
                    </div>
                    <div className="max-w-md pb-4">
                        <Text variant="body" className="text-white/40 text-sm leading-relaxed font-sans font-medium uppercase tracking-wider">
                            Live telemetry data from the Verdant Stratos lab. Our serialized nitrogen injection system results in a 42% performance delta against traditional foam composites.
                        </Text>
                    </div>
                </div>

                {/* Chart HUD */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 1.5, ease: [0.23, 1, 0.32, 1] }}
                    className="glass-panel p-8 md:p-12 rounded-[40px] border-white/5 relative group"
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

                    <div className="h-[500px] w-full relative z-10">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid
                                    strokeDasharray="3 3"
                                    stroke="rgba(255,255,255,0.03)"
                                    vertical={false}
                                />
                                <XAxis
                                    dataKey="name"
                                    stroke="rgba(255,255,255,0.2)"
                                    fontSize={10}
                                    tickLine={false}
                                    axisLine={false}
                                    tick={{ fill: 'rgba(255,255,255,0.3)', fontWeight: 900, fontFamily: 'Satoshi' }}
                                    dy={10}
                                />
                                <YAxis
                                    stroke="rgba(255,255,255,0.2)"
                                    fontSize={10}
                                    tickLine={false}
                                    axisLine={false}
                                    tick={{ fill: 'rgba(255,255,255,0.3)', fontWeight: 900, fontFamily: 'Satoshi' }}
                                />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: '#0c0a09',
                                        border: '1px solid rgba(255,255,255,0.1)',
                                        borderRadius: '16px',
                                        fontFamily: 'Satoshi',
                                        fontSize: '12px',
                                        fontWeight: 900
                                    }}
                                    itemStyle={{ color: 'var(--color-primary)' }}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="yield"
                                    stroke="var(--color-primary)"
                                    strokeWidth={3}
                                    fillOpacity={1}
                                    fill="url(#colorValue)"
                                    animationDuration={3000}
                                    animationBegin={500}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="value"
                                    stroke="rgba(255,255,255,0.2)"
                                    strokeWidth={1}
                                    fill="transparent"
                                    animationDuration={4000}
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Chart Legend / Stats Overlay */}
                    <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-8 pt-12 border-t border-white/5 relative z-10">
                        {[
                            { label: "Stability Index", value: "98.4%", delta: "+1.2%" },
                            { label: "Energy Return", value: "94.2%", delta: "+4.5%" },
                            { label: "Lateral G-Force", value: "2.4G", delta: "-0.3%" },
                            { label: "Thermal Offset", value: "-4.2°C", delta: "Optimized" },
                        ].map((stat, i) => (
                            <div key={i} className="space-y-2">
                                <Text variant="ui" className="text-white/20 text-[9px] tracking-[0.3em]">{stat.label}</Text>
                                <div className="flex items-baseline gap-4">
                                    <Text variant="ui" className="text-3xl text-white tracking-widest">{stat.value}</Text>
                                    <span className="text-[9px] text-[var(--color-primary)] font-black tracking-widest">{stat.delta}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* Background Narrative Watermark */}
            <div className="absolute -bottom-24 -right-24 opacity-[0.02] pointer-events-none">
                <h2 className="text-[30vw] font-serif leading-none italic select-none">DATA</h2>
            </div>
        </section>
    );
};
