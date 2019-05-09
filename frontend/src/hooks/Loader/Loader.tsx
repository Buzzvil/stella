import { useState } from "react";

export default () => {
    const [loading, setLoading] = useState(false);
    const load = (p: Promise<any>) => {
        setLoading(true);
        p.finally(() => {
            setLoading(false);
        });
    }
    return {loading, load};
}