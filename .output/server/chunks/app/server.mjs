import { version, hasInjectionContext, getCurrentInstance, inject, ref, watchEffect, watch, useSSRContext, createApp, reactive, unref, provide, onErrorCaptured, onServerPrefetch, createVNode, resolveDynamicComponent, toRef, h, isReadonly, defineAsyncComponent, isRef, isShallow, isReactive, toRaw, mergeProps, withCtx, createTextVNode } from 'vue';
import { $fetch } from 'ofetch';
import { createHooks } from 'hookable';
import { getContext } from 'unctx';
import { createError as createError$1, sanitizeStatusCode } from 'h3';
import { hasProtocol, parseURL, joinURL, isEqual, stringifyParsedURL, stringifyQuery, parseQuery } from 'ufo';
import { renderSSRHead } from '@unhead/ssr';
import { getActiveHead, createServerHead as createServerHead$1 } from 'unhead';
import { defineHeadPlugin } from '@unhead/shared';
import { ssrRenderSuspense, ssrRenderComponent, ssrRenderVNode, ssrRenderAttrs, ssrRenderAttr, ssrRenderList, ssrInterpolate, ssrRenderStyle, ssrRenderSlot } from 'vue/server-renderer';
import { a as useRuntimeConfig$1 } from '../nitro/node-server.mjs';
import 'node-fetch-native/polyfill';
import 'node:http';
import 'node:https';
import 'destr';
import 'unenv/runtime/fetch/index';
import 'scule';
import 'klona';
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
        return "3.5.2";
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
    runWithContext: (fn) => callWithNuxt(nuxtApp, fn),
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
        await nuxtApp.runWithContext(() => hook(...args));
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
  nuxtApp.provide("config", runtimeConfig);
  return nuxtApp;
}
async function applyPlugin(nuxtApp, plugin) {
  if (typeof plugin !== "function") {
    return;
  }
  const { provide: provide2 } = await nuxtApp.runWithContext(() => plugin(nuxtApp)) || {};
  if (provide2 && typeof provide2 === "object") {
    for (const key in provide2) {
      nuxtApp.provide(key, provide2[key]);
    }
  }
}
async function applyPlugins(nuxtApp, plugins2) {
  var _a;
  const parallels = [];
  const errors = [];
  for (const plugin of plugins2) {
    const promise = applyPlugin(nuxtApp, plugin);
    if ((_a = plugin.meta) == null ? void 0 : _a.parallel) {
      parallels.push(promise.catch((e) => errors.push(e)));
    } else {
      await promise;
    }
  }
  await Promise.all(parallels);
  if (errors.length) {
    throw errors[0];
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
    parallel: plugin.parallel,
    order: (meta == null ? void 0 : meta.order) || plugin.order || orderMap[plugin.enforce || "default"] || orderMap.default
  };
  wrapper[NuxtPluginIndicator] = true;
  return wrapper;
}
function callWithNuxt(nuxt, setup, args) {
  const fn = () => args ? setup(...args) : setup();
  {
    return nuxt.vueApp.runWithContext(() => nuxtAppCtx.callAsync(nuxt, fn));
  }
}
function useNuxtApp() {
  var _a;
  let nuxtAppInstance;
  if (hasInjectionContext()) {
    nuxtAppInstance = (_a = getCurrentInstance()) == null ? void 0 : _a.appContext.app.$nuxt;
  }
  nuxtAppInstance = nuxtAppInstance || nuxtAppCtx.tryUse();
  if (!nuxtAppInstance) {
    {
      throw new Error("[nuxt] instance unavailable");
    }
  }
  return nuxtAppInstance;
}
function useRuntimeConfig() {
  return useNuxtApp().$config;
}
function defineGetter(obj, key, val) {
  Object.defineProperty(obj, key, { get: () => val });
}
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
function VueReactiveUseHeadPlugin() {
  return defineHeadPlugin({
    hooks: {
      "entries:resolve": function(ctx) {
        for (const entry2 of ctx.entries)
          entry2.resolvedInput = resolveUnrefHeadInput(entry2.input);
      }
    }
  });
}
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
function definePayloadReducer(name, reduce) {
  {
    useNuxtApp().ssrContext._payloadReducers[name] = reduce;
  }
}
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
  if (hasInjectionContext()) {
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
    if (nuxtApp.ssrContext) {
      const fullPath = typeof to === "string" || isExternal ? toPath : router.resolve(to).fullPath || "/";
      const location2 = isExternal ? toPath : joinURL(useRuntimeConfig().app.baseURL, fullPath);
      async function redirect() {
        await nuxtApp.callHook("app:redirected");
        const encodedLoc = location2.replace(/"/g, "%22");
        nuxtApp.ssrContext._renderResponse = {
          statusCode: sanitizeStatusCode((options == null ? void 0 : options.redirectCode) || 302, 302),
          body: `<!DOCTYPE html><html><head><meta http-equiv="refresh" content="0; url=${encodedLoc}"></head></html>`,
          headers: { location: location2 }
        };
        return inMiddleware ? (
          /* abort route navigation */
          false
        ) : void 0;
      }
      if (!isExternal && inMiddleware) {
        router.afterEach((final) => final.fullPath === fullPath ? redirect() : void 0);
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
    const error = useError();
    if (false)
      ;
    error.value = error.value || err;
  } catch {
    throw err;
  }
  return err;
};
const isNuxtError = (err) => !!(err && typeof err === "object" && "__nuxt_error" in err);
const createError = (err) => {
  const _err = createError$1(err);
  _err.__nuxt_error = true;
  return _err;
};
const reducers = {
  NuxtError: (data) => isNuxtError(data) && data.toJSON(),
  EmptyShallowRef: (data) => isRef(data) && isShallow(data) && !data.value && (JSON.stringify(data.value) || "_"),
  EmptyRef: (data) => isRef(data) && !data.value && (JSON.stringify(data.value) || "_"),
  ShallowRef: (data) => isRef(data) && isShallow(data) && data.value,
  ShallowReactive: (data) => isReactive(data) && isShallow(data) && toRaw(data),
  Ref: (data) => isRef(data) && data.value,
  Reactive: (data) => isReactive(data) && toRaw(data)
};
const revive_payload_server_eJ33V7gbc6 = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:revive-payload:server",
  setup() {
    for (const reducer in reducers) {
      definePayloadReducer(reducer, reducers[reducer]);
    }
  }
});
const components_plugin_KR1HBZs4kY = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:global-components"
});
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
        var _a;
        to.meta = reactive(to.meta || {});
        if (nuxtApp.isHydrating && initialLayout.value && !isReadonly(to.meta.layout)) {
          to.meta.layout = initialLayout.value;
        }
        nuxtApp._processingMiddleware = true;
        if (!((_a = nuxtApp.ssrContext) == null ? void 0 : _a.islandContext)) {
          const middlewareEntries = /* @__PURE__ */ new Set([...globalMiddleware, ...nuxtApp._middleware.global]);
          for (const middleware of middlewareEntries) {
            const result = await nuxtApp.runWithContext(() => middleware(to, from));
            {
              if (result === false || result instanceof Error) {
                const error = result || createError$1({
                  statusCode: 404,
                  statusMessage: `Page Not Found: ${initialURL}`
                });
                delete nuxtApp._processingMiddleware;
                return nuxtApp.runWithContext(() => showError(error));
              }
            }
            if (result || result === false) {
              return result;
            }
          }
        }
      });
      router.afterEach(() => {
        delete nuxtApp._processingMiddleware;
      });
      await router.replace(initialURL);
      if (!isEqual(route.fullPath, initialURL)) {
        await nuxtApp.runWithContext(() => navigateTo(route.fullPath));
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
  revive_payload_server_eJ33V7gbc6,
  components_plugin_KR1HBZs4kY,
  unhead_KgADcZ0jPj,
  router_CaKIoANnI2
];
const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const _sfc_main$a = {
  name: "ButtonCta",
  props: ["text", "btnClass"]
};
function _sfc_ssrRender$9(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<button${ssrRenderAttrs(mergeProps({
    class: `rounded-lg normal-case px-6 py-3 satoshi font-bold duration-150 ${$props.btnClass}`
  }, _attrs))}>`);
  ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
  _push(`</button>`);
}
const _sfc_setup$a = _sfc_main$a.setup;
_sfc_main$a.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ButtonCta.vue");
  return _sfc_setup$a ? _sfc_setup$a(props, ctx) : void 0;
};
const __nuxt_component_0$2 = /* @__PURE__ */ _export_sfc(_sfc_main$a, [["ssrRender", _sfc_ssrRender$9]]);
const useMenu = () => useState("menu", () => [
  {
    route: "servicos",
    label: "Serviços"
  },
  {
    label: "Clientes",
    route: "clientes"
  },
  {
    label: "Sobre Nós",
    route: "sobre"
  },
  {
    label: "Fale Conosco",
    route: "form"
  }
]);
const _imports_0$4 = "" + __buildAssetsURL("logo.12c5d87b.svg");
const _sfc_main$9 = {};
function _sfc_ssrRender$8(_ctx, _push, _parent, _attrs) {
  const _component_ButtonCta = __nuxt_component_0$2;
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "menu container mx-auto flex flex-row justify-between satoshi mx-auto lg:py-20 lg:px-12 px-10 py-10" }, _attrs))}><img${ssrRenderAttr("src", _imports_0$4)} class="w-1/10"><div class="text-xl text-white justify-evenly w-7/12 items-center font-lighter hidden md:flex"><!--[-->`);
  ssrRenderList(("useMenu" in _ctx ? _ctx.useMenu : unref(useMenu))().value, (menu, index) => {
    _push(`<a${ssrRenderAttr("href", "#" + menu.route)} class="menu-item cursor-pointer relative">${ssrInterpolate(menu.label)}</a>`);
  });
  _push(`<!--]-->`);
  _push(ssrRenderComponent(_component_ButtonCta, { btnClass: "text-2xl px-10 border text-white normal-case border-white" }, {
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
const _sfc_setup$9 = _sfc_main$9.setup;
_sfc_main$9.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Menu.vue");
  return _sfc_setup$9 ? _sfc_setup$9(props, ctx) : void 0;
};
const __nuxt_component_0$1 = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["ssrRender", _sfc_ssrRender$8]]);
const _imports_0$3 = "" + __buildAssetsURL("hero.bd4a1596.svg");
const _imports_1$4 = "" + __buildAssetsURL("arrow-down.f36a3f35.svg");
const _sfc_main$8 = {};
function _sfc_ssrRender$7(_ctx, _push, _parent, _attrs) {
  const _component_ButtonCta = __nuxt_component_0$2;
  _push(`<section${ssrRenderAttrs(mergeProps({ class: "container mx-auto grid lg:grid-cols-3 grid-col-1 gap-0 lg:gap-4 items-center lg:px-0 px-6 lg:w-5/6 w-full relative lg:py-10 mx-auto" }, _attrs))}><div class="lg:col-span-2"><h1 class="lg:text-7xl text-5xl text-white mb-7 leading-tight font-black"> A parceria ideal para <br> sua expansão digital. </h1><p class="lg:text-2xl text-xl text-white lg:text-left text-center w-full lg:w-11/12 lg:mb-10 mb-3"> Alcance ótimos resultados na internet trabalhando de forma colaborativa com profissionais especializados em dar vida e personalidade para a sua marca, otimizar seus sistemas e <br> aumentar a sua presença digital. </p>`);
  _push(ssrRenderComponent(_component_ButtonCta, { btnClass: "bg-[#8A00FF] md:w-1/3 w-full lg:my-0 my-8 text-2xl text-white normal-case shadow-lg hover:shadow-[#8A00FF]/50" }, {
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
  _push(`</div><div class="relative h-full col-span-1 hidden lg:block"><img${ssrRenderAttr("src", _imports_0$3)} class="absolute hero"></div><div class="col-span-3 _text-center lg:pt-20 sm:pt-5"><img${ssrRenderAttr("src", _imports_1$4)} class="mx-auto cursor-pointer"></div></section>`);
}
const _sfc_setup$8 = _sfc_main$8.setup;
_sfc_main$8.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Topo.vue");
  return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
const __nuxt_component_1$1 = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["ssrRender", _sfc_ssrRender$7]]);
const _imports_1$3 = "" + __buildAssetsURL("design-icon.9d38a8d7.svg");
const _imports_2$2 = "" + __buildAssetsURL("engine-icon.fd494993.svg");
const _imports_3$2 = "" + __buildAssetsURL("trafego-icon.11aab078.svg");
const _sfc_main$7 = {
  name: "CardServico",
  props: {
    data: {
      default: []
    }
  }
};
function _sfc_ssrRender$6(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "card bg-white rounded-md" }, _attrs))}><div class="flex p-3"><img${ssrRenderAttr("src", _imports_1$3)} style="${ssrRenderStyle($props.data.icons.includes("dg") ? null : { display: "none" })}"><img${ssrRenderAttr("src", _imports_2$2)} style="${ssrRenderStyle($props.data.icons.includes("ds") ? null : { display: "none" })}"><img${ssrRenderAttr("src", _imports_3$2)} style="${ssrRenderStyle($props.data.icons.includes("tr") ? null : { display: "none" })}"></div><div class="card-body p-2 text-center flex"><p class="text-black mx-auto my-auto text-base font-bold flex leading-tight mb-2">${$props.data.title}</p></div></div>`);
}
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/CardServico.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["ssrRender", _sfc_ssrRender$6]]);
const _imports_0$2 = "" + __buildAssetsURL("check.866d68e8.svg");
const _sfc_main$6 = {
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
function _sfc_ssrRender$5(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_CardServico = __nuxt_component_0;
  const _component_ButtonCta = __nuxt_component_0$2;
  _push(`<div${ssrRenderAttrs(mergeProps({
    class: "servicos text-center container lg:pt-28 lg:pb-40 pt-20 pb-20 lg:px-0 px-4",
    id: "servicos"
  }, _attrs))}><div class="title"><h2 class="text-white lg:text-3xl text-2xl satoshi-black font-black relative"> O que podemos <br class="block lg:hidden">fazer pela sua empresa </h2></div><div class="list lg:mt-20 mt-10 lg:px-8"><div class="flex flex-col mx-auto"><div class="lg:w-6/12 w-10/12 mx-auto lg:px-2 flex flex-col justify-between"><div class="flex items-center text-gray-600 mb-5 lg:mb-3 mx-auto"><img${ssrRenderAttr("src", _imports_0$2)} class="mr-5"><h3 class="text-sm font-bold mb-0 text-[#808080]" style="${ssrRenderStyle({ "letter-spacing": "1em" })}">RESULTADOS REAIS</h3></div><p class="text-gray-300 text-lg mb-5 lg:mb-10"> Nós sabemos que cada empresa é única e por isso, traçamos estratégias personalizadas para que a sua alcance resultados incríveis na internet. Nossos serviços são focados em criar uma identidade única com personalidade para a sua marca, desenvolver e otimizar sistemas de alta performance, aumentar sua visibilidade e estabelecer uma comunicação direta e eficaz com o seu cliente ideal. </p></div><div class="lg:w-7/12 w-8/10 lg:py-0 py-8 mx-auto text-white text-xl lg:flex-row flex flex-col mb-5 justify-evenly"><div class="flex items-center lg:mb-0 mb-3"><img${ssrRenderAttr("src", _imports_1$3)} class="setor-icon"><span>Design</span></div><div class="flex items-center lg:mb-0 mb-3"><img${ssrRenderAttr("src", _imports_2$2)} class="setor-icon"><span>Desenvolvimento</span></div><div class="flex items-center lg:mb-0 mb-3"><img${ssrRenderAttr("src", _imports_3$2)} class="setor-icon"><span>Tráfego Pago</span></div></div><div class="lg:w-8/12 mx-auto w-full mb-4"><div class="grid lg:grid-cols-4 grid-cols-2 gap-3"><!--[-->`);
  ssrRenderList($data.servicos, (card, index) => {
    _push(ssrRenderComponent(_component_CardServico, {
      key: index,
      data: card
    }, null, _parent));
  });
  _push(`<!--]--></div></div><div class="mt-4">`);
  _push(ssrRenderComponent(_component_ButtonCta, { btnClass: "bg-[#8A00FF] text-2xl text-white normal-case shadow-lg hover:shadow-[#8A00FF]/50" }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(` Peça um orçamento `);
      } else {
        return [
          createTextVNode(" Peça um orçamento ")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div></div></div></div>`);
}
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Servicos.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const __nuxt_component_2 = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["ssrRender", _sfc_ssrRender$5]]);
const _imports_0$1 = "" + __buildAssetsURL("quote.eb2a5021.svg");
const _imports_1$2 = "" + __buildAssetsURL("catia.453a3f93.jpg");
const _imports_2$1 = "" + __buildAssetsURL("yt-gradient-icon.be5792cd.svg");
const _imports_3$1 = "" + __buildAssetsURL("ig-gradient-icon.7e9cf540.svg");
const _imports_4$1 = "" + __buildAssetsURL("tk-gradient-icon.c835d485.svg");
const _sfc_main$5 = {};
function _sfc_ssrRender$4(_ctx, _push, _parent, _attrs) {
  const _component_ButtonCta = __nuxt_component_0$2;
  _push(`<section${ssrRenderAttrs(mergeProps({
    id: "clientes",
    class: "bg-white lg:py-24 py-10 clientes relative"
  }, _attrs))}><div class="mx-auto container"><div class="w-full text-center lg:mb-0 mb-14"><div class="title"><h2 class="text-gray-800 lg:text-3xl text-2xl satoshi-black font-black relative"> O que nossos <br class="lg:hidden block"> clientes dizem sobre nós </h2></div></div><div class="lg:w-8/12 w-10/12 mx-auto grid lg:grid-cols-12 grid-cols-1 gap-5 lg:mt-24"><div class="lg:col-span-4"><div class="card w-full bg-white shadow-2xl text-center relative"><img${ssrRenderAttr("src", _imports_0$1)} class="absolute -right-6 -top-6"><figure><img class="w-full"${ssrRenderAttr("src", _imports_1$2)} alt="Cátia Damasceno"></figure><div class="card-body text-black p-3 shadow shadow-xl rounded-b-lg"><h6 class="text-xl font-black satoshi-black -mb-2">Cátia Damasceno</h6><span class="text-sm satoshi font-normal">Influencer Digital</span></div></div></div><div class="lg:col-span-7 lg:col-start-6"><p class="depoimento text-xl text-black font-normal mb-4 relative"> Estou extremamente satisfeita com os serviços prestados pela DRIL. É uma agência extremamente profissional e ofereçem serviços de alta qualidade em criação e gerenciamento de sites. Além disso, sua equipe está sempre disponível para ajudar em qualquer momento, o que nos proporciona uma grande tranquilidade. Eu os recomendo altamente como parceiros de negócios para qualquer empresa que precise de serviços de marketing digital. </p><div class="redes grid lg:grid-cols-4 grid-cols-3 gap-1 text-black mb-8"><div class="flex items-center"><img${ssrRenderAttr("src", _imports_2$1)} class="mr-2"><p class="text-xs leading-none"><b class="text-sm">10 milhões</b> <br> de inscritos </p></div><div class="flex items-center"><img${ssrRenderAttr("src", _imports_3$1)} class="mr-2"><p class="text-xs leading-none"><b class="text-sm">8 milhões</b> <br> de inscritos </p></div><div class="flex items-center"><img${ssrRenderAttr("src", _imports_4$1)} class="mr-2"><p class="text-xs leading-none"><b class="text-sm">8 milhões</b> <br> de inscritos </p></div></div>`);
  _push(ssrRenderComponent(_component_ButtonCta, { btnClass: "lg:w-9/12 w-full bg-[#8A00FF] text-2xl text-white normal-case shadow-lg hover:shadow-[#8A00FF]/50" }, {
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
  _push(`</div></div></div></section>`);
}
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Clientes.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const __nuxt_component_3 = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["ssrRender", _sfc_ssrRender$4]]);
const _sfc_main$4 = {};
function _sfc_ssrRender$3(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_button_cta = __nuxt_component_0$2;
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "lg:p-10 p-8 w-full bg-white rounded-lg" }, _attrs))}><h4 class="text-4xl text-gray-900 mb-3">Fale com nossos especialistas</h4><p class="text-sm text-gray-500">Preencha os campos abaixo para entrar em contato conosco</p><form action="" class="grid lg:grid-cols-2 grid-cols-1 gap-3 lg:w-6/12 w-full mx-auto mt-10"><input type="text" placeholder="Nome" class="bg-gray-200 px-2 py-3 rounded-md placeholder:text-gray-400"><input type="text" placeholder="Telefone ex.: dd988884444" class="bg-gray-200 px-2 py-3 rounded-md placeholder:text-gray-400"><input type="email" placeholder="E-mail" class="bg-gray-200 px-2 py-3 rounded-md placeholder:text-gray-400"><input type="text" placeholder="Empresa" class="bg-gray-200 px-2 py-3 rounded-md placeholder:text-gray-400"><textarea class="lg:col-span-2 bg-gray-200 p-3 rounded-md" name="objetivo" placeholder="Objetivo de marketing" rows="10"></textarea>`);
  _push(ssrRenderComponent(_component_button_cta, { btnClass: "mt-6 col-span-2 mx-auto bg-[#8A00FF] text-2xl text-white normal-case shadow-lg hover:shadow-[#8A00FF]/50" }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(` Enviar formulário `);
      } else {
        return [
          createTextVNode(" Enviar formulário ")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</form></div>`);
}
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/CustomForm.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["ssrRender", _sfc_ssrRender$3]]);
const _imports_1$1 = "" + __buildAssetsURL("funcionario.0b815caa.jpg");
const _sfc_main$3 = {
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
function _sfc_ssrRender$2(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_button_cta = __nuxt_component_0$2;
  const _component_custom_form = __nuxt_component_1;
  _push(`<div${ssrRenderAttrs(mergeProps({
    id: "sobre",
    class: "sobre relative text-center container lg:py-28 pt-16 pb-2"
  }, _attrs))}><div class="title"><h2 class="text-white lg:text-3xl text-2xl satoshi-black font-black relative"> Profissionais aptos a gerar resultados para seu negócio </h2></div><div class="flex flex-col lg:mt-24 mt-10 lg:mb-28 mb-8"><div class="lg:w-6/12 mx-auto flex flex-col justify-center"><div class="flex items-center text-gray-600 mb-3 mx-auto"><img${ssrRenderAttr("src", _imports_0$2)} class="mr-5"><h3 class="text-sm font-bold mb-0 text-[#808080]" style="${ssrRenderStyle({ "letter-spacing": ".8em" })}">PROFISSIONAIS CAPACITADOS</h3></div><p class="text-white text-lg mb-5 font-light">Nossa equipe é composta por profissionais altamente capacitados com mais de 14 anos de experiência trabalhando estrategicamente em projeto complexos ao lado de grandes nomes do mercado de marketing digital. Possuimos um histórico de sucesso sempre ajudando a trazer soluções eficazes e inovadoras para a mesa.</p></div><div class="lg:w-8/12 w-full mx-auto mt-6 grid lg:grid-cols-4 grid-cols-2 gap-4"><!--[-->`);
  ssrRenderList($data.equipe, (a, index) => {
    _push(`<div class="rounded bg-white shadow-2xl text-center relative"><img class="w-full"${ssrRenderAttr("src", _imports_1$1)} alt="funcionario" height="179px"><div class="card-body text-black p-3"><h6 class="text-xl font-black satoshi-black -mb-2">${ssrInterpolate(a.name)}</h6><span class="text-sm satoshi font-normal">${ssrInterpolate(a.func)}</span></div></div>`);
  });
  _push(`<!--]--></div>`);
  _push(ssrRenderComponent(_component_button_cta, { btnClass: "mt-6 mx-auto bg-[#8A00FF] text-2xl text-white normal-case shadow-lg hover:shadow-[#8A00FF]/50" }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(` Fale com a nossa equipe `);
      } else {
        return [
          createTextVNode(" Fale com a nossa equipe ")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div>`);
  _push(ssrRenderComponent(_component_custom_form, null, null, _parent));
  _push(`</div>`);
}
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Sobre.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const __nuxt_component_4 = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["ssrRender", _sfc_ssrRender$2]]);
const _imports_0 = "" + __buildAssetsURL("line-vertical.bc058706.svg");
const _imports_1 = "" + __buildAssetsURL("email.a593551c.svg");
const _imports_2 = "" + __buildAssetsURL("whatsapp.6ba5a285.svg");
const _imports_3 = "" + __buildAssetsURL("instagram.ca32b529.svg");
const _imports_4 = "" + __buildAssetsURL("linkedin.f359a3cc.svg");
const _imports_5 = "" + __buildAssetsURL("logo-box-vertical.4e700c13.svg");
const _sfc_main$2 = {};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs) {
  _push(`<footer${ssrRenderAttrs(mergeProps({ class: "footer text-lg text-white flex flex-col container lg:px-0 px-8" }, _attrs))}><img${ssrRenderAttr("src", _imports_0)} class="w-full mx-auto h-8"><div class="flex lg:flex-row flex-col w-full justify-evenly align-center mx-auto py-4"><div class="flex flex-col text-center lg:text-left mb-6 lg:mb-0"><!--[-->`);
  ssrRenderList(("useMenu" in _ctx ? _ctx.useMenu : unref(useMenu))().value, (menu, index) => {
    _push(`<a${ssrRenderAttr("href", "#" + menu.route)} class="footer-menu-item relative cursor-pointer lg:mb-0 mb-2">${ssrInterpolate(menu.label)}</a>`);
  });
  _push(`<!--]--></div><div class="flex lg:flex-row flex-col items-center justify-between w-full lg:w-5/12 lg:mb-0 mb-8"><div class="lg:mb-0 mb-6"><p class="font-bold mb-4 text-xl">Entre em contato</p><a target="_blank" href="mailto: agenciadril@gmail.com"><img${ssrRenderAttr("src", _imports_1)}> Contato via email </a><a target="_blank" href="https://whatsa.me/5561994455643/?t=Teste%20de%20mensagem"><img${ssrRenderAttr("src", _imports_2)}> Contato via whatsapp </a></div><div><p class="font-bold mb-4 text-xl">Nos acompanhe nas redes</p><a target="_blank" href="https://www.instagram.com/agenciadril/"><img${ssrRenderAttr("src", _imports_3)}> Instagram </a><a target="_blank" href="https://www.linkedin.com/company/agenciadril/"><img${ssrRenderAttr("src", _imports_4)}> LinkedIn </a></div></div><div class="flex items-center"><img${ssrRenderAttr("src", _imports_5)} class="lg:w-full w-1/3 mx-auto"></div></div></footer>`);
}
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Footer.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_5 = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["ssrRender", _sfc_ssrRender$1]]);
const _sfc_main$1 = {
  name: "App"
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_Menu = __nuxt_component_0$1;
  const _component_Topo = __nuxt_component_1$1;
  const _component_Servicos = __nuxt_component_2;
  const _component_Clientes = __nuxt_component_3;
  const _component_Sobre = __nuxt_component_4;
  const _component_Footer = __nuxt_component_5;
  _push(`<div${ssrRenderAttrs(mergeProps({
    class: "relative scroll-smooth",
    style: { "z-index": "0" }
  }, _attrs))}>`);
  _push(ssrRenderComponent(_component_Menu, null, null, _parent));
  _push(ssrRenderComponent(_component_Topo, null, null, _parent));
  _push(ssrRenderComponent(_component_Servicos, null, null, _parent));
  _push(ssrRenderComponent(_component_Clientes, null, null, _parent));
  _push(ssrRenderComponent(_component_Sobre, null, null, _parent));
  _push(ssrRenderComponent(_component_Footer, null, null, _parent));
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
    const ErrorComponent = /* @__PURE__ */ defineAsyncComponent(() => import('./_nuxt/error-component-157273dc.mjs').then((r) => r.default || r));
    const IslandRenderer = /* @__PURE__ */ defineAsyncComponent(() => import('./_nuxt/island-renderer-6cd81aa4.mjs').then((r) => r.default || r));
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
        const p = nuxtApp.runWithContext(() => showError(err));
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
