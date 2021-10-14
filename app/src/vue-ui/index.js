import { inject, ref, provide, defineComponent, openBlock, createElementBlock, normalizeStyle, renderSlot, createCommentVNode, computed, resolveComponent, createBlock, createSlots, withCtx, createTextVNode, toDisplayString, createVNode, watchPostEffect, Teleport, createElementVNode, normalizeClass, withModifiers, Fragment, renderList, watchEffect } from "vue";
import { useWallet } from "../vue-adapter";
const walletModalStoreKey = Symbol();
const useWalletModal = () => {
  return inject(walletModalStoreKey);
};
const initWalletModal = (initiallyVisible = false) => {
  const visible = ref(initiallyVisible);
  const showModal = () => visible.value = true;
  const hideModal = () => visible.value = false;
  provide(walletModalStoreKey, { visible, showModal, hideModal });
};
var _export_sfc = (sfc, props) => {
  for (const [key, val] of props) {
    sfc[key] = val;
  }
  return sfc;
};
const _sfc_main$8 = defineComponent({
  name: "wallet-button",
  setup(props, { slots }) {
    const justifyContent = slots["end-icon"] || slots["start-icon"] ? "space-between" : "center";
    return { justifyContent };
  }
});
const _hoisted_1$4 = {
  key: 0,
  className: "wallet-adapter-button-start-icon"
};
const _hoisted_2$1 = {
  key: 1,
  className: "wallet-adapter-button-end-icon"
};
function _sfc_render$8(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("button", {
    class: "wallet-adapter-button",
    style: normalizeStyle(`justify-content: ${_ctx.justifyContent};`)
  }, [
    _ctx.$slots["start-icon"] ? (openBlock(), createElementBlock("i", _hoisted_1$4, [
      renderSlot(_ctx.$slots, "start-icon")
    ])) : createCommentVNode("", true),
    renderSlot(_ctx.$slots, "default"),
    _ctx.$slots["end-icon"] ? (openBlock(), createElementBlock("i", _hoisted_2$1, [
      renderSlot(_ctx.$slots, "end-icon")
    ])) : createCommentVNode("", true)
  ], 4);
}
var WalletButton = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["render", _sfc_render$8]]);
const _sfc_main$7 = defineComponent({
  name: "wallet-icon",
  props: {
    wallet: Object
  },
  setup({ wallet }) {
    return { wallet };
  }
});
const _hoisted_1$3 = ["src", "alt"];
function _sfc_render$7(_ctx, _cache, $props, $setup, $data, $options) {
  return _ctx.wallet ? (openBlock(), createElementBlock("img", {
    key: 0,
    src: _ctx.wallet.icon,
    alt: `${_ctx.wallet.name} icon`
  }, null, 8, _hoisted_1$3)) : createCommentVNode("", true);
}
var WalletIcon = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["render", _sfc_render$7]]);
const _sfc_main$6 = defineComponent({
  name: "wallet-connect-button",
  components: {
    WalletButton,
    WalletIcon
  },
  props: {
    disabled: Boolean
  },
  setup({ disabled }, { emit }) {
    const { wallet, connect, connecting, connected } = useWallet();
    const content = computed(() => {
      if (connecting.value)
        return "Connecting ...";
      if (connected.value)
        return "Connected";
      if (wallet.value)
        return "Connect";
      return "Connect Wallet";
    });
    const handleClick = (event) => {
      emit("click", event);
      if (event.defaultPrevented)
        return;
      connect().catch(() => {
      });
    };
    return {
      wallet,
      disabled,
      connecting,
      connected,
      content,
      handleClick
    };
  }
});
function _sfc_render$6(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_wallet_icon = resolveComponent("wallet-icon");
  const _component_wallet_button = resolveComponent("wallet-button");
  return openBlock(), createBlock(_component_wallet_button, {
    class: "wallet-adapter-button-trigger",
    disabled: _ctx.disabled || !_ctx.wallet || _ctx.connecting || _ctx.connected,
    onClick: _ctx.handleClick
  }, createSlots({
    default: withCtx(() => [
      renderSlot(_ctx.$slots, "default", {}, () => [
        createTextVNode(toDisplayString(_ctx.content), 1)
      ])
    ]),
    _: 2
  }, [
    _ctx.wallet ? {
      name: "start-icon",
      fn: withCtx(() => [
        createVNode(_component_wallet_icon, { wallet: _ctx.wallet }, null, 8, ["wallet"])
      ])
    } : void 0
  ]), 1032, ["disabled", "onClick"]);
}
var WalletConnectButton = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["render", _sfc_render$6]]);
const _sfc_main$5 = defineComponent({
  name: "wallet-disconnect-button",
  components: {
    WalletButton,
    WalletIcon
  },
  props: {
    disabled: Boolean
  },
  setup({ disabled }, { emit }) {
    const { wallet, disconnect, disconnecting } = useWallet();
    const content = computed(() => {
      if (disconnecting.value)
        return "Disconnecting ...";
      if (wallet.value)
        return "Disconnect";
      return "Disconnect Wallet";
    });
    const handleClick = (event) => {
      emit("click", event);
      if (event.defaultPrevented)
        return;
      disconnect().catch(() => {
      });
    };
    return {
      wallet,
      disconnecting,
      disabled,
      content,
      handleClick
    };
  }
});
function _sfc_render$5(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_wallet_icon = resolveComponent("wallet-icon");
  const _component_wallet_button = resolveComponent("wallet-button");
  return openBlock(), createBlock(_component_wallet_button, {
    class: "wallet-adapter-button-trigger",
    disabled: _ctx.disabled || _ctx.disconnecting || !_ctx.wallet,
    onClick: _ctx.handleClick
  }, createSlots({
    default: withCtx(() => [
      renderSlot(_ctx.$slots, "default", {}, () => [
        createTextVNode(toDisplayString(_ctx.content), 1)
      ])
    ]),
    _: 2
  }, [
    _ctx.wallet ? {
      name: "start-icon",
      fn: withCtx(() => [
        createVNode(_component_wallet_icon, { wallet: _ctx.wallet }, null, 8, ["wallet"])
      ])
    } : void 0
  ]), 1032, ["disabled", "onClick"]);
}
var WalletDisconnectButton = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["render", _sfc_render$5]]);
const _sfc_main$4 = defineComponent({
  name: "wallet-list-item",
  components: {
    WalletButton,
    WalletIcon
  },
  props: {
    wallet: Object
  },
  setup({ wallet }) {
    return { wallet };
  }
});
function _sfc_render$4(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_wallet_icon = resolveComponent("wallet-icon");
  const _component_wallet_button = resolveComponent("wallet-button");
  return openBlock(), createElementBlock("li", null, [
    createVNode(_component_wallet_button, {
      onClick: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("click"))
    }, {
      "end-icon": withCtx(() => [
        createVNode(_component_wallet_icon, { wallet: _ctx.wallet }, null, 8, ["wallet"])
      ]),
      default: withCtx(() => [
        renderSlot(_ctx.$slots, "default", {}, () => [
          createTextVNode(toDisplayString(_ctx.wallet.name), 1)
        ])
      ]),
      _: 3
    })
  ]);
}
var WalletListItem = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["render", _sfc_render$4]]);
const _sfc_main$3 = defineComponent({
  name: "wallet-modal",
  components: {
    WalletButton,
    WalletListItem
  },
  props: {
    featuredWallets: { type: Number, default: 3 },
    container: { type: String, default: "body" },
    logo: String
  },
  setup({ featuredWallets: featuredWalletsNumber, container, logo }) {
    const { wallets, select } = useWallet();
    const { visible, hideModal } = useWalletModal();
    const modal = ref();
    const expanded = ref(false);
    const featuredWallets = computed(() => wallets.slice(0, featuredWalletsNumber));
    const otherWallets = computed(() => wallets.slice(featuredWalletsNumber));
    const selectWallet = (walletName) => {
      select(walletName);
      hideModal();
    };
    const handleTabKey = (event) => {
      const node = modal.value;
      if (!node)
        return;
      const focusableElements = node.querySelectorAll("button");
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];
      if (event.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement.focus();
          event.preventDefault();
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement.focus();
          event.preventDefault();
        }
      }
    };
    watchPostEffect((onInvalidate) => {
      const handleKeyDown = (event) => {
        if (event.key === "Escape") {
          hideModal();
        } else if (event.key === "Tab") {
          handleTabKey(event);
        }
      };
      const { overflow } = window.getComputedStyle(document.body);
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown, false);
      onInvalidate(() => {
        document.body.style.overflow = overflow;
        window.removeEventListener("keydown", handleKeyDown, false);
      });
    });
    return {
      container,
      logo,
      visible,
      expanded,
      featuredWallets,
      otherWallets,
      modal,
      selectWallet,
      hideModal
    };
  }
});
const _hoisted_1$2 = {
  "aria-labelledby": "wallet-adapter-modal-title",
  "aria-modal": "true",
  class: "wallet-adapter-modal wallet-adapter-modal-fade-in",
  ref: "modal",
  role: "dialog"
};
const _hoisted_2 = { class: "wallet-adapter-modal-container" };
const _hoisted_3 = {
  key: 0,
  class: "wallet-adapter-modal-logo-wrapper"
};
const _hoisted_4 = ["src"];
const _hoisted_5 = /* @__PURE__ */ createElementVNode("h1", {
  class: "wallet-adapter-modal-title",
  id: "wallet-adapter-modal-title"
}, " Connect Wallet ", -1);
const _hoisted_6 = /* @__PURE__ */ createElementVNode("svg", {
  width: "14",
  height: "14"
}, [
  /* @__PURE__ */ createElementVNode("path", { d: "M14 12.461 8.3 6.772l5.234-5.233L12.006 0 6.772 5.234 1.54 0 0 1.539l5.234 5.233L0 12.006l1.539 1.528L6.772 8.3l5.69 5.7L14 12.461z" })
], -1);
const _hoisted_7 = [
  _hoisted_6
];
const _hoisted_8 = { class: "wallet-adapter-modal-list" };
const _hoisted_9 = {
  key: 0,
  class: "wallet-adapter-modal-list"
};
const _hoisted_10 = /* @__PURE__ */ createElementVNode("svg", {
  width: "11",
  height: "6",
  xmlns: "http://www.w3.org/2000/svg"
}, [
  /* @__PURE__ */ createElementVNode("path", { d: "m5.938 5.73 4.28-4.126a.915.915 0 0 0 0-1.322 1 1 0 0 0-1.371 0L5.253 3.736 1.659.272a1 1 0 0 0-1.371 0A.93.93 0 0 0 0 .932c0 .246.1.48.288.662l4.28 4.125a.99.99 0 0 0 1.37.01z" })
], -1);
function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_wallet_list_item = resolveComponent("wallet-list-item");
  const _component_wallet_button = resolveComponent("wallet-button");
  return _ctx.visible ? (openBlock(), createBlock(Teleport, {
    key: 0,
    to: _ctx.container
  }, [
    createElementVNode("div", _hoisted_1$2, [
      createElementVNode("div", _hoisted_2, [
        createElementVNode("div", {
          class: normalizeClass(["wallet-adapter-modal-wrapper", { "wallet-adapter-modal-wrapper-no-logo": !_ctx.$slots.logo }])
        }, [
          _ctx.$slots.logo ? (openBlock(), createElementBlock("div", _hoisted_3, [
            renderSlot(_ctx.$slots, "logo", {}, () => [
              createElementVNode("img", {
                alt: "logo",
                class: "wallet-adapter-modal-logo",
                src: _ctx.logo
              }, null, 8, _hoisted_4)
            ])
          ])) : createCommentVNode("", true),
          _hoisted_5,
          createElementVNode("button", {
            onClick: _cache[0] || (_cache[0] = withModifiers((...args) => _ctx.hideModal && _ctx.hideModal(...args), ["prevent"])),
            class: "wallet-adapter-modal-button-close"
          }, _hoisted_7),
          createElementVNode("ul", _hoisted_8, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.featuredWallets, (wallet) => {
              return openBlock(), createBlock(_component_wallet_list_item, {
                key: wallet.name,
                wallet,
                onClick: ($event) => _ctx.selectWallet(wallet.name)
              }, null, 8, ["wallet", "onClick"]);
            }), 128))
          ]),
          _ctx.otherWallets.length > 0 ? (openBlock(), createElementBlock(Fragment, { key: 1 }, [
            _ctx.expanded ? (openBlock(), createElementBlock("ul", _hoisted_9, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.otherWallets, (wallet) => {
                return openBlock(), createBlock(_component_wallet_list_item, {
                  key: wallet.name,
                  wallet,
                  onClick: ($event) => _ctx.selectWallet(wallet.name)
                }, null, 8, ["wallet", "onClick"]);
              }), 128))
            ])) : createCommentVNode("", true),
            createVNode(_component_wallet_button, {
              "aria-controls": "wallet-adapter-modal-collapse",
              "aria-expanded": _ctx.expanded,
              class: normalizeClass(["wallet-adapter-modal-collapse-button", { "wallet-adapter-modal-collapse-button-active": _ctx.expanded }]),
              onClick: _cache[1] || (_cache[1] = ($event) => _ctx.expanded = !_ctx.expanded)
            }, {
              "end-icon": withCtx(() => [
                _hoisted_10
              ]),
              default: withCtx(() => [
                createTextVNode(toDisplayString(_ctx.expanded ? "Less" : "More") + " options ", 1)
              ]),
              _: 1
            }, 8, ["aria-expanded", "class"])
          ], 64)) : createCommentVNode("", true)
        ], 2)
      ]),
      createElementVNode("div", {
        class: "wallet-adapter-modal-overlay",
        onMousedown: _cache[2] || (_cache[2] = (...args) => _ctx.hideModal && _ctx.hideModal(...args))
      }, null, 32)
    ], 512)
  ], 8, ["to"])) : createCommentVNode("", true);
}
var WalletModal = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["render", _sfc_render$3]]);
const _sfc_main$2 = defineComponent({
  name: "wallet-modal-button",
  components: {
    WalletButton
  },
  setup() {
    const { showModal } = useWalletModal();
    return { showModal };
  }
});
const _hoisted_1$1 = /* @__PURE__ */ createTextVNode("Select Wallet");
function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_wallet_button = resolveComponent("wallet-button");
  return openBlock(), createBlock(_component_wallet_button, {
    class: "wallet-adapter-button-trigger",
    onClick: _ctx.showModal
  }, {
    default: withCtx(() => [
      renderSlot(_ctx.$slots, "default", {}, () => [
        _hoisted_1$1
      ])
    ]),
    _: 3
  }, 8, ["onClick"]);
}
var WalletModalButton = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$2]]);
const _sfc_main$1 = defineComponent({
  name: "wallet-modal-provider",
  components: {
    WalletModal
  },
  props: {
    visible: Boolean
  },
  setup({ visible }) {
    initWalletModal(visible);
  }
});
function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_wallet_modal = resolveComponent("wallet-modal");
  return openBlock(), createElementBlock(Fragment, null, [
    renderSlot(_ctx.$slots, "default"),
    createVNode(_component_wallet_modal)
  ], 64);
}
var WalletModalProvider = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render$1]]);
const _sfc_main = defineComponent({
  name: "wallet-multi-button",
  components: {
    WalletConnectButton,
    WalletModalButton,
    WalletButton,
    WalletIcon
  },
  setup() {
    const { publicKey, wallet, disconnect } = useWallet();
    const { showModal } = useWalletModal();
    const copied = ref(false);
    const active = ref(false);
    const dropdown = ref();
    const base58 = computed(() => {
      var _a;
      return (_a = publicKey.value) == null ? void 0 : _a.toBase58();
    });
    const content = computed(() => {
      if (!wallet.value || !base58.value)
        return null;
      return base58.value.slice(0, 4) + ".." + base58.value.slice(-4);
    });
    const copyAddress = async () => {
      if (!base58.value)
        return;
      await navigator.clipboard.writeText(base58.value);
      copied.value = true;
      setTimeout(() => copied.value = false, 400);
    };
    const openDropdown = () => active.value = true;
    const closeDropdown = () => active.value = false;
    const openModal = () => {
      showModal();
      closeDropdown();
    };
    watchEffect((onInvalidate) => {
      const listener = (event) => {
        const node = dropdown.value;
        if (!node || node.contains(event.target))
          return;
        closeDropdown();
      };
      document.addEventListener("mousedown", listener);
      document.addEventListener("touchstart", listener);
      onInvalidate(() => {
        document.removeEventListener("mousedown", listener);
        document.removeEventListener("touchstart", listener);
      });
    });
    return {
      wallet,
      content,
      base58,
      active,
      copied,
      dropdown,
      openDropdown,
      openModal,
      copyAddress,
      disconnect
    };
  }
});
const _hoisted_1 = {
  key: 2,
  class: "wallet-adapter-dropdown"
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_wallet_modal_button = resolveComponent("wallet-modal-button");
  const _component_wallet_connect_button = resolveComponent("wallet-connect-button");
  const _component_wallet_icon = resolveComponent("wallet-icon");
  const _component_wallet_button = resolveComponent("wallet-button");
  return !_ctx.wallet ? (openBlock(), createBlock(_component_wallet_modal_button, { key: 0 }, {
    default: withCtx(() => [
      renderSlot(_ctx.$slots, "default")
    ]),
    _: 3
  })) : !_ctx.base58 ? (openBlock(), createBlock(_component_wallet_connect_button, { key: 1 }, {
    default: withCtx(() => [
      renderSlot(_ctx.$slots, "default")
    ]),
    _: 3
  })) : (openBlock(), createElementBlock("div", _hoisted_1, [
    createVNode(_component_wallet_button, {
      class: "wallet-adapter-button-trigger",
      style: normalizeStyle({ pointerEvents: _ctx.active ? "none" : "auto" }),
      "aria-expanded": _ctx.active,
      onClick: _ctx.openDropdown
    }, {
      "start-icon": withCtx(() => [
        createVNode(_component_wallet_icon, { wallet: _ctx.wallet }, null, 8, ["wallet"])
      ]),
      default: withCtx(() => [
        renderSlot(_ctx.$slots, "default", {}, () => [
          createTextVNode(toDisplayString(_ctx.content), 1)
        ])
      ]),
      _: 3
    }, 8, ["style", "aria-expanded", "onClick"]),
    createElementVNode("ul", {
      "aria-label": "dropdown-list",
      class: normalizeClass(["wallet-adapter-dropdown-list", { "wallet-adapter-dropdown-list-active": _ctx.active }]),
      ref: "dropdown",
      role: "menu"
    }, [
      createElementVNode("li", {
        onClick: _cache[0] || (_cache[0] = (...args) => _ctx.copyAddress && _ctx.copyAddress(...args)),
        class: "wallet-adapter-dropdown-list-item",
        role: "menuitem"
      }, toDisplayString(_ctx.copied ? "Copied" : "Copy address"), 1),
      createElementVNode("li", {
        onClick: _cache[1] || (_cache[1] = (...args) => _ctx.openModal && _ctx.openModal(...args)),
        class: "wallet-adapter-dropdown-list-item",
        role: "menuitem"
      }, " Connect a different wallet "),
      createElementVNode("li", {
        onClick: _cache[2] || (_cache[2] = (...args) => _ctx.disconnect && _ctx.disconnect(...args)),
        class: "wallet-adapter-dropdown-list-item",
        role: "menuitem"
      }, " Disconnect ")
    ], 2)
  ]));
}
var WalletMultiButton = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export { WalletConnectButton, WalletDisconnectButton, WalletIcon, WalletModal, WalletModalButton, WalletModalProvider, WalletMultiButton, initWalletModal, useWalletModal };
