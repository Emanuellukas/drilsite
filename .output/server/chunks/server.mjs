import { version, getCurrentInstance, inject, ref, watchEffect, watch, useSSRContext, createApp, reactive, unref, provide, onErrorCaptured, onServerPrefetch, createVNode, resolveDynamicComponent, toRef, h, isReadonly, defineAsyncComponent, isRef, mergeProps, withCtx, createTextVNode } from 'vue';
import { $fetch } from 'ofetch';
import { createHooks } from 'hookable';
import { getContext } from 'unctx';
import { renderSSRHead } from '@unhead/ssr';
import { getActiveHead, createServerHead as createServerHead$1 } from 'unhead';
import { defineHeadPlugin } from '@unhead/shared';
import { hasProtocol, parseURL, joinURL, isEqual, stringifyParsedURL, stringifyQuery, parseQuery } from 'ufo';
import { createError as createError$1, sendRedirect } from 'h3';
import { ssrRenderSuspense, ssrRenderComponent, ssrRenderVNode, ssrRenderAttrs, ssrRenderAttr, ssrRenderList, ssrInterpolate, ssrRenderSlot, ssrRenderStyle } from 'vue/server-renderer';
import { a as useRuntimeConfig$1 } from './node-server.mjs';
import 'node-fetch-native/polyfill';
import 'node:http';
import 'node:https';
import 'destr';
import 'unenv/runtime/fetch/index';
import 'scule';
import 'defu';
import 'ohash';
import 'unstorage';
import 'radix3';
import 'node:fs';
import 'node:url';
import 'pathe';

const appConfig = useRuntimeConfig$1().app;
const baseURL = () => appConfig.baseURL;
const nuxtAppCtx = /* @__PURE__ */ getContext("nuxt-app");
const NuxtPluginIndicator = "__nuxt_plugin";
function createNuxtApp(options) {
  let hydratingCount = 0;
  const nuxtApp = {
    provide: void 0,
    globalName: "nuxt",
    versions: {
      get nuxt() {
        return "3.4.1";
      },
      get vue() {
        return nuxtApp.vueApp.version;
      }
    },
    payload: reactive({
      data: {},
      state: {},
      _errors: {},
      ...{ serverRendered: true }
    }),
    static: {
      data: {}
    },
    isHydrating: false,
    deferHydration() {
      if (!nuxtApp.isHydrating) {
        return () => {
        };
      }
      hydratingCount++;
      let called = false;
      return () => {
        if (called) {
          return;
        }
        called = true;
        hydratingCount--;
        if (hydratingCount === 0) {
          nuxtApp.isHydrating = false;
          return nuxtApp.callHook("app:suspense:resolve");
        }
      };
    },
    _asyncDataPromises: {},
    _asyncData: {},
    _payloadRevivers: {},
    ...options
  };
  nuxtApp.hooks = createHooks();
  nuxtApp.hook = nuxtApp.hooks.hook;
  {
    async function contextCaller(hooks, args) {
      for (const hook of hooks) {
        await nuxtAppCtx.call(nuxtApp, () => hook(...args));
      }
    }
    nuxtApp.hooks.callHook = (name, ...args) => nuxtApp.hooks.callHookWith(contextCaller, name, ...args);
  }
  nuxtApp.callHook = nuxtApp.hooks.callHook;
  nuxtApp.provide = (name, value) => {
    const $name = "$" + name;
    defineGetter(nuxtApp, $name, value);
    defineGetter(nuxtApp.vueApp.config.globalProperties, $name, value);
  };
  defineGetter(nuxtApp.vueApp, "$nuxt", nuxtApp);
  defineGetter(nuxtApp.vueApp.config.globalProperties, "$nuxt", nuxtApp);
  {
    if (nuxtApp.ssrContext) {
      nuxtApp.ssrContext.nuxt = nuxtApp;
    }
    if (nuxtApp.ssrContext) {
      nuxtApp.ssrContext._payloadReducers = {};
    }
    nuxtApp.ssrContext = nuxtApp.ssrContext || {};
    if (nuxtApp.ssrContext.payload) {
      Object.assign(nuxtApp.payload, nuxtApp.ssrContext.payload);
    }
    nuxtApp.ssrContext.payload = nuxtApp.payload;
    nuxtApp.ssrContext.config = {
      public: options.ssrContext.runtimeConfig.public,
      app: options.ssrContext.runtimeConfig.app
    };
  }
  const runtimeConfig = options.ssrContext.runtimeConfig;
  const compatibilityConfig = new Proxy(runtimeConfig, {
    get(target, prop) {
      if (prop in target) {
        return target[prop];
      }
      return target.public[prop];
    },
    set(target, prop, value) {
      {
        return false;
      }
    }
  });
  nuxtApp.provide("config", compatibilityConfig);
  return nuxtApp;
}
async function applyPlugin(nuxtApp, plugin) {
  if (typeof plugin !== "function") {
    return;
  }
  const { provide: provide2 } = await callWithNuxt(nuxtApp, plugin, [nuxtApp]) || {};
  if (provide2 && typeof provide2 === "object") {
    for (const key in provide2) {
      nuxtApp.provide(key, provide2[key]);
    }
  }
}
async function applyPlugins(nuxtApp, plugins2) {
  for (const plugin of plugins2) {
    await applyPlugin(nuxtApp, plugin);
  }
}
function normalizePlugins(_plugins2) {
  const plugins2 = [];
  for (const plugin of _plugins2) {
    if (typeof plugin !== "function") {
      continue;
    }
    let _plugin = plugin;
    if (plugin.length > 1) {
      _plugin = (nuxtApp) => plugin(nuxtApp, nuxtApp.provide);
    }
    plugins2.push(_plugin);
  }
  plugins2.sort((a, b) => {
    var _a, _b;
    return (((_a = a.meta) == null ? void 0 : _a.order) || orderMap.default) - (((_b = b.meta) == null ? void 0 : _b.order) || orderMap.default);
  });
  return plugins2;
}
const orderMap = {
  pre: -20,
  default: 0,
  post: 20
};
function defineNuxtPlugin(plugin, meta) {
  var _a;
  if (typeof plugin === "function") {
    return /* @__PURE__ */ defineNuxtPlugin({ setup: plugin }, meta);
  }
  const wrapper = (nuxtApp) => {
    if (plugin.hooks) {
      nuxtApp.hooks.addHooks(plugin.hooks);
    }
    if (plugin.setup) {
      return plugin.setup(nuxtApp);
    }
  };
  wrapper.meta = {
    name: (meta == null ? void 0 : meta.name) || plugin.name || ((_a = plugin.setup) == null ? void 0 : _a.name),
    order: (meta == null ? void 0 : meta.order) || plugin.order || orderMap[plugin.enforce || "default"] || orderMap.default
  };
  wrapper[NuxtPluginIndicator] = true;
  return wrapper;
}
function callWithNuxt(nuxt, setup, args) {
  const fn = () => args ? setup(...args) : setup();
  {
    return nuxtAppCtx.callAsync(nuxt, fn);
  }
}
function useNuxtApp() {
  const nuxtAppInstance = nuxtAppCtx.tryUse();
  if (!nuxtAppInstance) {
    const vm = getCurrentInstance();
    if (!vm) {
      throw new Error("nuxt instance unavailable");
    }
    return vm.appContext.app.$nuxt;
  }
  return nuxtAppInstance;
}
function useRuntimeConfig() {
  return useNuxtApp().$config;
}
function defineGetter(obj, key, val) {
  Object.defineProperty(obj, key, { get: () => val });
}
const components = {};
const components_plugin_KR1HBZs4kY = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:global-components",
  setup(nuxtApp) {
    for (const name in components) {
      nuxtApp.vueApp.component(name, components[name]);
      nuxtApp.vueApp.component("Lazy" + name, components[name]);
    }
  }
});
function resolveUnref(r) {
  return typeof r === "function" ? r() : unref(r);
}
function resolveUnrefHeadInput(ref2, lastKey = "") {
  if (ref2 instanceof Promise)
    return ref2;
  const root = resolveUnref(ref2);
  if (!ref2 || !root)
    return root;
  if (Array.isArray(root))
    return root.map((r) => resolveUnrefHeadInput(r, lastKey));
  if (typeof root === "object") {
    return Object.fromEntries(
      Object.entries(root).map(([k, v]) => {
        if (k === "titleTemplate" || k.startsWith("on"))
          return [k, unref(v)];
        return [k, resolveUnrefHeadInput(v, k)];
      })
    );
  }
  return root;
}
const Vue3 = version.startsWith("3");
const headSymbol = "usehead";
function injectHead() {
  return getCurrentInstance() && inject(headSymbol) || getActiveHead();
}
function vueInstall(head) {
  const plugin = {
    install(app) {
      if (Vue3) {
        app.config.globalProperties.$unhead = head;
        app.config.globalProperties.$head = head;
        app.provide(headSymbol, head);
      }
    }
  };
  return plugin.install;
}
function createServerHead(options = {}) {
  const head = createServerHead$1({
    ...options,
    plugins: [
      VueReactiveUseHeadPlugin(),
      ...(options == null ? void 0 : options.plugins) || []
    ]
  });
  head.install = vueInstall(head);
  return head;
}
const VueReactiveUseHeadPlugin = () => {
  return defineHeadPlugin({
    hooks: {
      "entries:resolve": function(ctx) {
        for (const entry2 of ctx.entries)
          entry2.resolvedInput = resolveUnrefHeadInput(entry2.input);
      }
    }
  });
};
function clientUseHead(input, options = {}) {
  const head = injectHead();
  const deactivated = ref(false);
  const resolvedInput = ref({});
  watchEffect(() => {
    resolvedInput.value = deactivated.value ? {} : resolveUnrefHeadInput(input);
  });
  const entry2 = head.push(resolvedInput.value, options);
  watch(resolvedInput, (e) => {
    entry2.patch(e);
  });
  getCurrentInstance();
  return entry2;
}
function serverUseHead(input, options = {}) {
  const head = injectHead();
  return head.push(input, options);
}
function useHead(input, options = {}) {
  var _a;
  const head = injectHead();
  if (head) {
    const isBrowser = !!((_a = head.resolvedOptions) == null ? void 0 : _a.document);
    if (options.mode === "server" && isBrowser || options.mode === "client" && !isBrowser)
      return;
    return isBrowser ? clientUseHead(input, options) : serverUseHead(input, options);
  }
}
const appHead = { "meta": [{ "name": "viewport", "content": "width=device-width, initial-scale=1" }, { "charset": "utf-8" }], "link": [], "style": [], "script": [], "noscript": [] };
const unhead_KgADcZ0jPj = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:head",
  setup(nuxtApp) {
    const createHead = createServerHead;
    const head = createHead();
    head.push(appHead);
    nuxtApp.vueApp.use(head);
    {
      nuxtApp.ssrContext.renderMeta = async () => {
        const meta = await renderSSRHead(head);
        return {
          ...meta,
          bodyScriptsPrepend: meta.bodyTagsOpen,
          // resolves naming difference with NuxtMeta and Unhead
          bodyScripts: meta.bodyTags
        };
      };
    }
  }
});
function useState(...args) {
  const autoKey = typeof args[args.length - 1] === "string" ? args.pop() : void 0;
  if (typeof args[0] !== "string") {
    args.unshift(autoKey);
  }
  const [_key, init] = args;
  if (!_key || typeof _key !== "string") {
    throw new TypeError("[nuxt] [useState] key must be a string: " + _key);
  }
  if (init !== void 0 && typeof init !== "function") {
    throw new Error("[nuxt] [useState] init must be a function: " + init);
  }
  const key = "$s" + _key;
  const nuxt = useNuxtApp();
  const state = toRef(nuxt.payload.state, key);
  if (state.value === void 0 && init) {
    const initialValue = init();
    if (isRef(initialValue)) {
      nuxt.payload.state[key] = initialValue;
      return initialValue;
    }
    state.value = initialValue;
  }
  return state;
}
const useRouter = () => {
  var _a;
  return (_a = useNuxtApp()) == null ? void 0 : _a.$router;
};
const useRoute = () => {
  if (getCurrentInstance()) {
    return inject("_route", useNuxtApp()._route);
  }
  return useNuxtApp()._route;
};
const isProcessingMiddleware = () => {
  try {
    if (useNuxtApp()._processingMiddleware) {
      return true;
    }
  } catch {
    return true;
  }
  return false;
};
const navigateTo = (to, options) => {
  if (!to) {
    to = "/";
  }
  const toPath = typeof to === "string" ? to : to.path || "/";
  const isExternal = (options == null ? void 0 : options.external) || hasProtocol(toPath, { acceptRelative: true });
  if (isExternal && !(options == null ? void 0 : options.external)) {
    throw new Error("Navigating to external URL is not allowed by default. Use `navigateTo (url, { external: true })`.");
  }
  if (isExternal && parseURL(toPath).protocol === "script:") {
    throw new Error("Cannot navigate to an URL with script protocol.");
  }
  const inMiddleware = isProcessingMiddleware();
  const router = useRouter();
  {
    const nuxtApp = useNuxtApp();
    if (nuxtApp.ssrContext && nuxtApp.ssrContext.event) {
      const fullPath = typeof to === "string" || isExternal ? toPath : router.resolve(to).fullPath || "/";
      const redirectLocation = isExternal ? toPath : joinURL(useRuntimeConfig().app.baseURL, fullPath);
      const redirect = () => nuxtApp.callHook("app:redirected").then(() => sendRedirect(nuxtApp.ssrContext.event, redirectLocation, (options == null ? void 0 : options.redirectCode) || 302)).then(() => inMiddleware ? (
        /* abort route navigation */
        false
      ) : void 0);
      if (!isExternal && inMiddleware) {
        router.beforeEach((final) => final.fullPath === fullPath ? redirect() : void 0);
        return to;
      }
      return redirect();
    }
  }
  if (isExternal) {
    if (options == null ? void 0 : options.replace) {
      location.replace(toPath);
    } else {
      location.href = toPath;
    }
    return Promise.resolve();
  }
  return (options == null ? void 0 : options.replace) ? router.replace(to) : router.push(to);
};
const useError = () => toRef(useNuxtApp().payload, "error");
const showError = (_err) => {
  const err = createError(_err);
  try {
    const nuxtApp = useNuxtApp();
    nuxtApp.callHook("app:error", err);
    const error = useError();
    error.value = error.value || err;
  } catch {
    throw err;
  }
  return err;
};
const createError = (err) => {
  const _err = createError$1(err);
  _err.__nuxt_error = true;
  return _err;
};
function useRequestEvent(nuxtApp = useNuxtApp()) {
  var _a;
  return (_a = nuxtApp.ssrContext) == null ? void 0 : _a.event;
}
const globalMiddleware = [];
function getRouteFromPath(fullPath) {
  if (typeof fullPath === "object") {
    fullPath = stringifyParsedURL({
      pathname: fullPath.path || "",
      search: stringifyQuery(fullPath.query || {}),
      hash: fullPath.hash || ""
    });
  }
  const url = parseURL(fullPath.toString());
  return {
    path: url.pathname,
    fullPath,
    query: parseQuery(url.search),
    hash: url.hash,
    // stub properties for compat with vue-router
    params: {},
    name: void 0,
    matched: [],
    redirectedFrom: void 0,
    meta: {},
    href: fullPath
  };
}
const router_CaKIoANnI2 = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:router",
  enforce: "pre",
  setup(nuxtApp) {
    const initialURL = nuxtApp.ssrContext.url;
    const routes = [];
    const hooks = {
      "navigate:before": [],
      "resolve:before": [],
      "navigate:after": [],
      error: []
    };
    const registerHook = (hook, guard) => {
      hooks[hook].push(guard);
      return () => hooks[hook].splice(hooks[hook].indexOf(guard), 1);
    };
    useRuntimeConfig().app.baseURL;
    const route = reactive(getRouteFromPath(initialURL));
    async function handleNavigation(url, replace) {
      try {
        const to = getRouteFromPath(url);
        for (const middleware of hooks["navigate:before"]) {
          const result = await middleware(to, route);
          if (result === false || result instanceof Error) {
            return;
          }
          if (result) {
            return handleNavigation(result, true);
          }
        }
        for (const handler of hooks["resolve:before"]) {
          await handler(to, route);
        }
        Object.assign(route, to);
        if (false)
          ;
        for (const middleware of hooks["navigate:after"]) {
          await middleware(to, route);
        }
      } catch (err) {
        for (const handler of hooks.error) {
          await handler(err);
        }
      }
    }
    const router = {
      currentRoute: route,
      isReady: () => Promise.resolve(),
      // These options provide a similar API to vue-router but have no effect
      options: {},
      install: () => Promise.resolve(),
      // Navigation
      push: (url) => handleNavigation(url),
      replace: (url) => handleNavigation(url),
      back: () => window.history.go(-1),
      go: (delta) => window.history.go(delta),
      forward: () => window.history.go(1),
      // Guards
      beforeResolve: (guard) => registerHook("resolve:before", guard),
      beforeEach: (guard) => registerHook("navigate:before", guard),
      afterEach: (guard) => registerHook("navigate:after", guard),
      onError: (handler) => registerHook("error", handler),
      // Routes
      resolve: getRouteFromPath,
      addRoute: (parentName, route2) => {
        routes.push(route2);
      },
      getRoutes: () => routes,
      hasRoute: (name) => routes.some((route2) => route2.name === name),
      removeRoute: (name) => {
        const index = routes.findIndex((route2) => route2.name === name);
        if (index !== -1) {
          routes.splice(index, 1);
        }
      }
    };
    nuxtApp.vueApp.component("RouterLink", {
      functional: true,
      props: {
        to: String,
        custom: Boolean,
        replace: Boolean,
        // Not implemented
        activeClass: String,
        exactActiveClass: String,
        ariaCurrentValue: String
      },
      setup: (props, { slots }) => {
        const navigate = () => handleNavigation(props.to, props.replace);
        return () => {
          var _a;
          const route2 = router.resolve(props.to);
          return props.custom ? (_a = slots.default) == null ? void 0 : _a.call(slots, { href: props.to, navigate, route: route2 }) : h("a", { href: props.to, onClick: (e) => {
            e.preventDefault();
            return navigate();
          } }, slots);
        };
      }
    });
    nuxtApp._route = route;
    nuxtApp._middleware = nuxtApp._middleware || {
      global: [],
      named: {}
    };
    const initialLayout = useState("_layout");
    nuxtApp.hooks.hookOnce("app:created", async () => {
      router.beforeEach(async (to, from) => {
        to.meta = reactive(to.meta || {});
        if (nuxtApp.isHydrating && initialLayout.value && !isReadonly(to.meta.layout)) {
          to.meta.layout = initialLayout.value;
        }
        nuxtApp._processingMiddleware = true;
        const middlewareEntries = /* @__PURE__ */ new Set([...globalMiddleware, ...nuxtApp._middleware.global]);
        for (const middleware of middlewareEntries) {
          const result = await callWithNuxt(nuxtApp, middleware, [to, from]);
          {
            if (result === false || result instanceof Error) {
              const error = result || createError$1({
                statusCode: 404,
                statusMessage: `Page Not Found: ${initialURL}`
              });
              delete nuxtApp._processingMiddleware;
              return callWithNuxt(nuxtApp, showError, [error]);
            }
          }
          if (result || result === false) {
            return result;
          }
        }
      });
      router.afterEach(() => {
        delete nuxtApp._processingMiddleware;
      });
      await router.replace(initialURL);
      if (!isEqual(route.fullPath, initialURL)) {
        const event = await callWithNuxt(nuxtApp, useRequestEvent);
        const options = { redirectCode: event.node.res.statusCode !== 200 ? event.node.res.statusCode || 302 : 302 };
        await callWithNuxt(nuxtApp, navigateTo, [route.fullPath, options]);
      }
    });
    return {
      provide: {
        route,
        router
      }
    };
  }
});
const _plugins = [
  components_plugin_KR1HBZs4kY,
  unhead_KgADcZ0jPj,
  router_CaKIoANnI2
];
const _imports_0$5 = "" + __buildAssetsURL("logo-elemento-purple.2c8e6029.svg");
const _imports_0$4 = "" + __buildAssetsURL("logo-elemento-blue.1a2f8020.svg");
const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const _sfc_main$9 = {};
function _sfc_ssrRender$8(_ctx, _push, _parent, _attrs) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "display-elements back" }, _attrs))}><div class="left"><img${ssrRenderAttr("src", _imports_0$5)} class="animate-spin"><div class="gradient-blue-blur"></div></div><div class="right"><img${ssrRenderAttr("src", _imports_0$4)} class="animate-spin"><div class="gradient-purple-blur"></div></div></div>`);
}
const _sfc_setup$9 = _sfc_main$9.setup;
_sfc_main$9.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Background.vue");
  return _sfc_setup$9 ? _sfc_setup$9(props, ctx) : void 0;
};
const __nuxt_component_0$2 = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["ssrRender", _sfc_ssrRender$8]]);
const _sfc_main$8 = {
  name: "ButtonCta",
  props: ["text", "btnClass"]
};
function _sfc_ssrRender$7(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<button${ssrRenderAttrs(mergeProps({
    class: `btn rounded-full normal-case ${$props.btnClass}`
  }, _attrs))}>`);
  ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
  _push(`</button>`);
}
const _sfc_setup$8 = _sfc_main$8.setup;
_sfc_main$8.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ButtonCta.vue");
  return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
const __nuxt_component_0$1 = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["ssrRender", _sfc_ssrRender$7]]);
const _imports_0$3 = "" + __buildAssetsURL("logo.12c5d87b.svg");
const _sfc_main$7 = {};
function _sfc_ssrRender$6(_ctx, _push, _parent, _attrs) {
  const _component_ButtonCta = __nuxt_component_0$1;
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "menu flex flex-row justify-between satoshi mx-auto" }, _attrs))}><img${ssrRenderAttr("src", _imports_0$3)} class="w-1/10"><div class="text-xl text-white justify-evenly flex w-7/12 items-center font-lighter"><p>Serviços</p><p>Clientes</p><p>Sobre Nós</p><p>Fale Conosco</p>`);
  _push(ssrRenderComponent(_component_ButtonCta, { btnClass: "text-2xl px-10 btn-outline text-white normal-case" }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(` Vamos conversar `);
      } else {
        return [
          createTextVNode(" Vamos conversar ")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div></div>`);
}
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Menu.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["ssrRender", _sfc_ssrRender$6]]);
const _imports_0$2 = "" + __buildAssetsURL("hero.4b6389cb.svg");
const _imports_1$3 = "" + __buildAssetsURL("arrow-down.f36a3f35.svg");
const _sfc_main$6 = {};
function _sfc_ssrRender$5(_ctx, _push, _parent, _attrs) {
  const _component_ButtonCta = __nuxt_component_0$1;
  _push(`<section${ssrRenderAttrs(mergeProps({ class: "grid grid-cols-3 gap-4 items-center w-5/6 relative py-10 mx-auto lg:pl-12 sm:pl-2" }, _attrs))}><div class="col-span-2"><h1 class="text-7xl text-white mb-7 leading-tight font-black"> A parceria ideal para <br> sua expansão digital. </h1><p class="text-2xl text-white text-left w-11/12 lg:mb-10 mb-4"> Alcance ótimos resultados na internet trabalhando de forma colaborativa com profissionais especializados em dar vida e personalidade para a sua marca, otimizar seus sistemas e <br> aumentar a sua presença digital. </p>`);
  _push(ssrRenderComponent(_component_ButtonCta, { btnClass: "text-2xl lg:w-2/4 text-black bg-white normal-case" }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(` Vamos conversar `);
      } else {
        return [
          createTextVNode(" Vamos conversar ")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div><div class="relative h-full col-span-1 sm:hidden lg:block"><img${ssrRenderAttr("src", _imports_0$2)} class="absolute hero"></div><div class="col-span-3 _text-center lg:pt-20 sm:pt-5"><img${ssrRenderAttr("src", _imports_1$3)} class="mx-auto"></div></section>`);
}
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Topo.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const __nuxt_component_2 = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["ssrRender", _sfc_ssrRender$5]]);
const _imports_0$1 = "" + __buildAssetsURL("design-icon.d814e3ae.svg");
const _imports_2$2 = "" + __buildAssetsURL("engine-icon.ef0a94b6.svg");
const _imports_3$1 = "" + __buildAssetsURL("trafego-icon.911df75d.svg");
const _sfc_main$5 = {
  name: "CardServico",
  props: {
    data: {
      default: []
    }
  }
};
function _sfc_ssrRender$4(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "card bg-white rounded-md" }, _attrs))}><div class="flex p-3 pb-0"><img${ssrRenderAttr("src", _imports_0$1)} style="${ssrRenderStyle($props.data.icons.includes("dg") ? null : { display: "none" })}"><img${ssrRenderAttr("src", _imports_2$2)} style="${ssrRenderStyle($props.data.icons.includes("ds") ? null : { display: "none" })}"><img${ssrRenderAttr("src", _imports_3$1)} style="${ssrRenderStyle($props.data.icons.includes("tr") ? null : { display: "none" })}"></div><div class="card-body p-3 text-center flex pt-2"><p class="text-black text-base font-bold flex items-center justify-center leading-tight mb-2">${$props.data.title}</p></div></div>`);
}
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/CardServico.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["ssrRender", _sfc_ssrRender$4]]);
const _imports_1$2 = "" + __buildAssetsURL("line.1cc7280f.svg");
const _imports_1$1 = "" + __buildAssetsURL("check.c7854f02.svg");
const _sfc_main$4 = {
  name: "Servicos",
  data() {
    return {
      servicos: [
        { icons: ["dg"], title: "Criação de logotipo <br/> e identidade visual" },
        { icons: ["dg", "tr"], title: "Anúncios <br/> patrocinados" },
        { icons: ["dg", "tr"], title: "Pacotes de criativos <br/> para redes sociais" },
        { icons: ["dg", "tr"], title: "Pacote de criativos <br/> para anúncios" },
        { icons: ["ds", "tr"], title: "Gestão de SEO" },
        { icons: ["dg", "ds"], title: "Criação de <br/> aplicativos" },
        { icons: ["dg", "tr"], title: "Criação de perfil estratégico para <br/> redes sociais" },
        { icons: ["dg", "tr"], title: "Gestão de redes <br/> sociais" },
        { icons: ["dg", "ds"], title: "Criação de sistemas personalizados" },
        { icons: ["ds", "tr"], title: "Perfil da empresa no Google" },
        { icons: ["dg", "ds"], title: "Criação de websites" },
        { icons: ["ds"], title: "Hospedagem de websites" }
      ]
    };
  }
};
function _sfc_ssrRender$3(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_CardServico = __nuxt_component_0;
  const _component_ButtonCta = __nuxt_component_0$1;
  _push(`<div${ssrRenderAttrs(mergeProps({
    class: "servicos",
    id: "servicos"
  }, _attrs))}><div class="title lg:mb-10 sm:mb-5"><h2 class="text-white text-3xl satoshi-black font-black relative"> O que podemos fazer pela sua empresa </h2></div><div class="list px-8"><div class="w-7/12 text-white text-xl flex mb-5 justify-evenly"><div class="flex items-center"><img${ssrRenderAttr("src", _imports_0$1)} class="setor-icon"><span>Design</span></div><img${ssrRenderAttr("src", _imports_1$2)} class="mx-10"><div class="flex items-center"><img${ssrRenderAttr("src", _imports_2$2)} class="setor-icon"><span>Desenvolvimento</span></div><img${ssrRenderAttr("src", _imports_1$2)} class="mx-10"><div class="flex items-center"><img${ssrRenderAttr("src", _imports_3$1)} class="setor-icon"><span>Tráfego Pago</span></div></div><div class="grid grid-cols-12 gap-4 mx-auto"><div class="col-span-7"><div class="grid grid-cols-4 gap-3"><!--[-->`);
  ssrRenderList($data.servicos, (card, index) => {
    _push(ssrRenderComponent(_component_CardServico, {
      key: index,
      data: card
    }, null, _parent));
  });
  _push(`<!--]--></div></div><div class="col-span-5 px-10 flex flex-col justify-between"><div class="flex items-center mb-3"><img${ssrRenderAttr("src", _imports_1$1)} class="mr-3"><h3 class="text-sm font-bold mb-0 text-white">RESULTADOS REAIS</h3></div><p class="text-white text-lg mb-5">Nós sabemos que cada empresa é única e por isso, traçamos estratégias personalizadas para que a sua alcance resultados incríveis na internet. Nossos serviços são focados em criar uma identidade única com personalidade para a sua marca, desenvolver e otimizar sistemas de alta performance, aumentar sua visibilidade e estabelecer uma comunicação direta e eficaz com o seu cliente ideal.</p>`);
  _push(ssrRenderComponent(_component_ButtonCta, { btnClass: "text-2xl text-black bg-white w-full mb-3" }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(` Contrate nossos serviços `);
      } else {
        return [
          createTextVNode(" Contrate nossos serviços ")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div></div></div></div>`);
}
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Servicos.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const __nuxt_component_3 = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["ssrRender", _sfc_ssrRender$3]]);
const _imports_0 = "" + __buildAssetsURL("quote.eb2a5021.svg");
const _imports_1 = "" + __buildAssetsURL("catia.453a3f93.jpg");
const _imports_2$1 = "" + __buildAssetsURL("yt-gradient-icon.4d2e66c6.svg");
const _imports_3 = "" + __buildAssetsURL("ig-gradient-icon.7c58a0f1.svg");
const _imports_4 = "" + __buildAssetsURL("tk-gradient-icon.04296f68.svg");
const _sfc_main$3 = {};
function _sfc_ssrRender$2(_ctx, _push, _parent, _attrs) {
  const _component_ButtonCta = __nuxt_component_0$1;
  _push(`<section${ssrRenderAttrs(mergeProps({ class: "bg-white lg:py-24 clientes relative" }, _attrs))}><div class="custom-container"><div class="title lg:mb-20 sm:mb-5"><h2 class="text-black text-3xl satoshi-black font-black relative"> O que podemos fazer pela sua empresa </h2></div><div class="w-9/12 mx-auto grid grid-cols-12 gap-5"><div class="col-span-4"><div class="card w-full bg-white shadow-2xl text-center relative"><img${ssrRenderAttr("src", _imports_0)} class="absolute -right-6 -top-6"><figure><img class="w-full"${ssrRenderAttr("src", _imports_1)} alt="Cátia Damasceno"></figure><div class="card-body text-black p-3"><h6 class="text-xl font-black satoshi-black -mb-2">Cátia Damasceno</h6><span class="text-sm satoshi font-normal">Influencer Digital</span></div></div></div><div class="col-span-7 col-start-6"><p class="depoimento text-xl text-black font-normal mb-4 relative"> Estou extremamente satisfeita com os serviços prestados pela DRIL. É uma agência extremamente profissional e ofereçem serviços de alta qualidade em criação e gerenciamento de sites. Além disso, sua equipe está sempre disponível para ajudar em qualquer momento, o que nos proporciona uma grande tranquilidade. Eu os recomendo altamente como parceiros de negócios para qualquer empresa que precise de serviços de marketing digital. </p><div class="redes grid grid-cols-4 gap-1 text-black lg:mb-8"><div class="flex items-center"><img${ssrRenderAttr("src", _imports_2$1)} class="mr-2"><p class="text-xs leading-none"><b class="text-sm">10 milhões</b> <br> de inscritos </p></div><div class="flex items-center"><img${ssrRenderAttr("src", _imports_3)} class="mr-2"><p class="text-xs leading-none"><b class="text-sm">8 milhões</b> <br> de inscritos </p></div><div class="flex items-center"><img${ssrRenderAttr("src", _imports_4)} class="mr-2"><p class="text-xs leading-none"><b class="text-sm">8 milhões</b> <br> de inscritos </p></div></div><div class="">`);
  _push(ssrRenderComponent(_component_ButtonCta, { btnClass: "hover:bg-black hover:text-white hover:border-black text-black btn-black w-2/3 btn-outline text-xl font-black border-2 PY-2" }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(` Vamos trabalhar juntos `);
      } else {
        return [
          createTextVNode(" Vamos trabalhar juntos ")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div></div></div></div><img${ssrRenderAttr("src", _imports_0$4)} class="logo"></section>`);
}
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Clientes.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const __nuxt_component_4 = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["ssrRender", _sfc_ssrRender$2]]);
const _imports_2 = "" + __buildAssetsURL("funcionario.a77d8058.jpg");
const _sfc_main$2 = {
  name: "Sobre",
  data() {
    return {
      equipe: [
        { name: "Douglas Matos", func: "Desenvolvedor" },
        { name: "Ricardo Schmidt", func: "Diretor de Arte" },
        { name: "Iury Toledo", func: "Gestor de Tráfego" },
        { name: "Lucas Emanuel", func: "Desenvolvedor" }
      ]
    };
  }
};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_ButtonCta = __nuxt_component_0$1;
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "sobre relative" }, _attrs))}><div class="backdrop"><div class="left"><div class="gradient-blue-blur"></div><img${ssrRenderAttr("src", _imports_0$4)} class="logo"></div><div class="gradient-purple-blur right"></div></div><div class="title lg:mb-10 sm:mb-5"><h2 class="text-white text-3xl satoshi-black font-black relative"> Profissionais aptos a gerar resultados para seu negócio </h2></div><div class="grid grid-cols-12 gap-5 mx-auto p-8"><div class="col-span-5 col-start-2 px-14 flex flex-col justify-center"><div class="flex items-center mb-3"><img${ssrRenderAttr("src", _imports_1$1)} class="mr-3"><h3 class="text-sm font-bold mb-0 text-white uppercase">Profissionais capacitados</h3></div><p class="text-white text-lg mb-5 font-light">Nossa equipe é composta por profissionais altamente capacitados com mais de 14 anos de experiência trabalhando estrategicamente em projeto complexos ao lado de grandes nomes do mercado de marketing digital. Possuimos um histórico de sucesso sempre ajudando a trazer soluções eficazes e inovadoras para a mesa.</p>`);
  _push(ssrRenderComponent(_component_ButtonCta, { btnClass: "text-2xl text-black bg-white w-full mb-3" }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(` Fale com nossa equipe `);
      } else {
        return [
          createTextVNode(" Fale com nossa equipe ")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div><div class="col-span-5 grid grid-cols-2 gap-4"><!--[-->`);
  ssrRenderList($data.equipe, (a, index) => {
    _push(`<div class="card bg-white shadow-2xl text-center relative"><figure><img class="w-full"${ssrRenderAttr("src", _imports_2)} alt="Cátia Damasceno" height="179px"></figure><div class="card-body text-black p-3"><h6 class="text-xl font-black satoshi-black -mb-2">${ssrInterpolate(a.name)}</h6><span class="text-sm satoshi font-normal">${ssrInterpolate(a.func)}</span></div></div>`);
  });
  _push(`<!--]--></div></div></div>`);
}
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Sobre.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_5 = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["ssrRender", _sfc_ssrRender$1]]);
const _sfc_main$1 = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_Background = __nuxt_component_0$2;
  const _component_Menu = __nuxt_component_1;
  const _component_Topo = __nuxt_component_2;
  const _component_Servicos = __nuxt_component_3;
  const _component_Clientes = __nuxt_component_4;
  const _component_Sobre = __nuxt_component_5;
  _push(`<div${ssrRenderAttrs(mergeProps({
    class: "relative",
    style: { "z-index": "0" }
  }, _attrs))}>`);
  _push(ssrRenderComponent(_component_Background, null, null, _parent));
  _push(ssrRenderComponent(_component_Menu, null, null, _parent));
  _push(ssrRenderComponent(_component_Topo, null, null, _parent));
  _push(ssrRenderComponent(_component_Servicos, null, null, _parent));
  _push(ssrRenderComponent(_component_Clientes, null, null, _parent));
  _push(ssrRenderComponent(_component_Sobre, null, null, _parent));
  _push(`</div>`);
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("app.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const AppComponent = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender]]);
const _sfc_main = {
  __name: "nuxt-root",
  __ssrInlineRender: true,
  setup(__props) {
    const ErrorComponent = /* @__PURE__ */ defineAsyncComponent(() => import('./error-component-0132f829.mjs').then((r) => r.default || r));
    const IslandRenderer = /* @__PURE__ */ defineAsyncComponent(() => import('./island-renderer-98b9b2e7.mjs').then((r) => r.default || r));
    const nuxtApp = useNuxtApp();
    nuxtApp.deferHydration();
    nuxtApp.ssrContext.url;
    const SingleRenderer = false;
    provide("_route", useRoute());
    nuxtApp.hooks.callHookWith((hooks) => hooks.map((hook) => hook()), "vue:setup");
    const error = useError();
    onErrorCaptured((err, target, info) => {
      nuxtApp.hooks.callHook("vue:error", err, target, info).catch((hookError) => console.error("[nuxt] Error in `vue:error` hook", hookError));
      {
        const p = callWithNuxt(nuxtApp, showError, [err]);
        onServerPrefetch(() => p);
        return false;
      }
    });
    const { islandContext } = nuxtApp.ssrContext;
    return (_ctx, _push, _parent, _attrs) => {
      ssrRenderSuspense(_push, {
        default: () => {
          if (unref(error)) {
            _push(ssrRenderComponent(unref(ErrorComponent), { error: unref(error) }, null, _parent));
          } else if (unref(islandContext)) {
            _push(ssrRenderComponent(unref(IslandRenderer), { context: unref(islandContext) }, null, _parent));
          } else if (unref(SingleRenderer)) {
            ssrRenderVNode(_push, createVNode(resolveDynamicComponent(unref(SingleRenderer)), null, null), _parent);
          } else {
            _push(ssrRenderComponent(unref(AppComponent), null, null, _parent));
          }
        },
        _: 1
      });
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/nuxt/dist/app/components/nuxt-root.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const RootComponent = _sfc_main;
if (!globalThis.$fetch) {
  globalThis.$fetch = $fetch.create({
    baseURL: baseURL()
  });
}
let entry;
const plugins = normalizePlugins(_plugins);
{
  entry = async function createNuxtAppServer(ssrContext) {
    const vueApp = createApp(RootComponent);
    const nuxt = createNuxtApp({ vueApp, ssrContext });
    try {
      await applyPlugins(nuxt, plugins);
      await nuxt.hooks.callHook("app:created", vueApp);
    } catch (err) {
      await nuxt.hooks.callHook("app:error", err);
      nuxt.payload.error = nuxt.payload.error || err;
    }
    return vueApp;
  };
}
const entry$1 = (ctx) => entry(ctx);

export { _export_sfc as _, useHead as a, createError as c, entry$1 as default, navigateTo as n, useRouter as u };
//# sourceMappingURL=server.mjs.map
