import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import { contentConfig } from '../config/content';

interface ProductContextType {
    selectedVariant: typeof contentConfig.product.variants[0];
    setSelectedVariant: React.Dispatch<React.SetStateAction<typeof contentConfig.product.variants[0]>>;
    rotation: number;
    setRotation: React.Dispatch<React.SetStateAction<number>>;
    hoveredFeature: number | null;
    setHoveredFeature: React.Dispatch<React.SetStateAction<number | null>>;
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
