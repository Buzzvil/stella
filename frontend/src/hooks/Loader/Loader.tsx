import { useState } from "react";

interface LoadFn {
    (promise: Promise<any>): [() => boolean, () => void]
}

interface LoadCreator {
    (initial?: boolean): [boolean, LoadFn]
}

const loader: LoadCreator = (initial = false) => {
    const [loading, setLoading] = useState(initial);
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
        return [() => cancelled, cancel];
    }
    return [loading, load];
}

export default loader;