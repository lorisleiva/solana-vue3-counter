import { Ref } from 'vue';
export interface WalletModalStore {
    visible: Ref<boolean>;
    showModal: () => void;
    hideModal: () => void;
}
export declare const useWalletModal: () => WalletModalStore | undefined;
export declare const initWalletModal: (initiallyVisible?: boolean) => void;
