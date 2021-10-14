declare const _default: import("vue").DefineComponent<{}, {
    wallet: any;
    content: import("vue").ComputedRef<string | null>;
    base58: import("vue").ComputedRef<any>;
    active: import("vue").Ref<boolean>;
    copied: import("vue").Ref<boolean>;
    dropdown: import("vue").Ref<Element | undefined>;
    openDropdown: () => boolean;
    openModal: () => void;
    copyAddress: () => Promise<void>;
    disconnect: any;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, import("vue").EmitsOptions, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{} & {} & {}>, {}>;
export default _default;
