export const motionConfig = {
    curves: {
        apple: [0.23, 1, 0.32, 1], // Quintic
        cinematic: [0.76, 0, 0.24, 1], // In-Out
        bounce: {
            type: "spring",
            stiffness: 260,
            damping: 20
        }
    },
    timing: {
        micro: 0.2,
        base: 0.4,
        slow: 0.8,
        cinematic: 1.5
    },
    stagger: {
        fast: 0.05,
        base: 0.1,
        slow: 0.2
    }
};
