export const contentConfig = {
    product: {
        name: "Verdant Stratos",
        price: "$845",
        variants: [
            { id: "emerald", name: "Emerald", hex: "#11d411" },
            { id: "umber", name: "Umber Earth", hex: "#451a03" }, // Premium Brown variant
            { id: "phantom", name: "Phantom Grey", hex: "#334155" }
        ],
        sizes: ['7', '8', '8.5', '9', '9.5', '10', '11', '12'],
        specs: [
            { label: "Mass (Size 9)", val: "184.2g" },
            { label: "Structural Drop", val: "8.0mm" },
            { label: "Foam Density", val: "94.5% NITRO" }
        ]
    },
    features: [
        {
            id: 1,
            label: "Architecture",
            title: "Kinetic Ocean Mesh",
            desc: "100% recycled ocean plastics woven into a high-tensile mesh.",
            pos: { top: "30%", left: "40%" }
        },
        {
            id: 2,
            label: "Performance",
            title: "Bio-Dynamic Foam V3",
            desc: "Serialized titanium mesh fused with bio-neutral nitrogen foam.",
            pos: { bottom: "35%", right: "30%" }
        }
    ]
};
