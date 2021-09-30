import { ref } from 'vue';

const visible = ref(false);
const showModal = () => visible.value = true;
const hideModal = () => visible.value = false;
const modalStore = { visible, showModal, hideModal };

export const useWalletModal = () => modalStore
