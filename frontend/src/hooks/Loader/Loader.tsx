import { useState } from "react";

interface LoadFn {
    (promise: Promise<any>): [boolean, () => void]
}

const loader = (): [boolean, LoadFn] => {
    const [loading, setLoading] = useState(false);
    let cancelled = false;
    const cancel = () => {
        cancelled = true;
    };
    const load: LoadFn = (promise) => {
        setLoading(true);
        promise.finally(() => {
            if (cancelled) return;
            setLoading(false);
        });
        return [cancelled, cancel];
    }
    return [loading, load];
}

export default loader;