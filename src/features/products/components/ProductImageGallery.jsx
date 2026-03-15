import { useState, useEffect } from "react";
import ImageGallery from "@/components/shared/ImageGallery";

export default function ProductImageGallery({ product, selectedColor }) {
    const [images, setImages] = useState(product?.images || []);

    // Cập nhật ảnh theo màu đang chọn
    useEffect(() => {
        if (selectedColor?.images?.length) {
            setImages(selectedColor.images);
        } else {
            setImages(product?.images || []);
        }
    }, [selectedColor, product]);

    return <ImageGallery images={images} productName={product?.name || ""} />;
}
