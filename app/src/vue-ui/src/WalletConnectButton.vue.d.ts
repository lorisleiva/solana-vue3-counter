declare const _default: import("vue").DefineComponent<{
    disabled: BooleanConstructor;
}, {
    wallet: any;
    disabled: boolean;
    connecting: any;
    connected: any;
    content: import("vue").ComputedRef<"Connecting ..." | "Connected" | "Connect" | "Connect Wallet">;
    handleClick: (event: MouseEvent) => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    disabled?: unknown;
} & {
    disabled: boolean;
} & {}>, {
    disabled: boolean;
}>;
export default _default;
