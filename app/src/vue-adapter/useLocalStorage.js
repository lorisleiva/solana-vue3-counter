import { customRef } from '@vue/reactivity';
export function useLocalStorage(key, defaultValue = null) {
    return customRef((track, trigger) => ({
        get: () => {
            track();
            const value = localStorage.getItem(key);
            return value ? JSON.parse(value) : defaultValue;
        },
        set: value => {
            if (value === null) {
                localStorage.removeItem(key);
            }
            else {
                localStorage.setItem(key, JSON.stringify(value));
            }
            trigger();
        },
    }));
}
//# sourceMappingURL=useLocalStorage.js.map