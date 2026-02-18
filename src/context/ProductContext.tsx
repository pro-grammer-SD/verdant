import React, { createContext, useContext, useState, ReactNode } from 'react';
import { contentConfig } from '../config/content';

interface ProductContextType {
    selectedVariant: typeof contentConfig.product.variants[0];
    setSelectedVariant: (variant: typeof contentConfig.product.variants[0]) => void;
    rotation: number;
    setRotation: (rotation: number) => void;
    hoveredFeature: number | null;
    setHoveredFeature: (id: number | null) => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider = ({ children }: { children: ReactNode }) => {
    const [selectedVariant, setSelectedVariant] = useState(contentConfig.product.variants[0]);
    const [rotation, setRotation] = useState(0); // 0-35 representing 360 degrees
    const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);

    return (
        <ProductContext.Provider value={{
            selectedVariant,
            setSelectedVariant,
            rotation,
            setRotation,
            hoveredFeature,
            setHoveredFeature
        }}>
            {children}
        </ProductContext.Provider>
    );
};

export const useProduct = () => {
    const context = useContext(ProductContext);
    if (!context) throw new Error('useProduct must be used within a ProductProvider');
    return context;
};
