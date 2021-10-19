import { Ref } from '@vue/reactivity';
export declare function useLocalStorage<T>(key: string, defaultValue?: T | null): Ref<T | null>;
