import { useState, useEffect } from "react";

export function useDebounce(value, delay) {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        // Đặt một timer để cập nhật giá trị sau một khoảng thời gian
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        // Hủy timer cũ nếu user tiếp tục gõ trước khi hết delay
        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
}
