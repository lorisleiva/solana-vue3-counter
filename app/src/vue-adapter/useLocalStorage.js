import { customRef } from '@vue/reactivity';
export function useLocalStorage(key, defaultValue = null) {
    return customRef((track, trigger) => ({
        get: () => {
            track();
            const value = localStorage.getItem(key);
            try {
                return value ? JSON.parse(value) : defaultValue;
            }
            catch (error) {
                return defaultValue;
            }
        },
        set: value => {
            if (value === null) {
                localStorage.removeItem(key);
            }
            else {
                try {
                    localStorage.setItem(key, JSON.stringify(value));
                }
                catch (error) {
                    // Fail silently...
                }
            }
            trigger();
        },
    }));
}
//# sourceMappingURL=useLocalStorage.js.map