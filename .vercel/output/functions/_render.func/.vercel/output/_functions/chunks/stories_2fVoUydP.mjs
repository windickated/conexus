import { c as createComponent, r as renderTemplate, b as addAttribute, e as createAstro, a as renderComponent, f as renderHead, u as unescapeHTML, g as renderSlot } from './astro/server_CmcIHm7_.mjs';
import 'kleur/colors';
/* empty css                           */
import 'clsx';
import { BrowserProvider } from 'ethers';
import detectProvider from '@metamask/detect-provider';

const $$Astro$1 = createAstro();
const $$ViewTransitions = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$ViewTransitions;
  const { fallback = "animate" } = Astro2.props;
  return renderTemplate`<meta name="astro-view-transitions-enabled" content="true"><meta name="astro-view-transitions-fallback"${addAttribute(fallback, "content")}>`;
}, "/Users/dima/Desktop/conexus/node_modules/astro/components/ViewTransitions.astro", void 0);

/** @returns {void} */
function noop() {}

// Adapted from https://github.com/then/is-promise/blob/master/index.js
// Distributed under MIT License https://github.com/then/is-promise/blob/master/LICENSE
/**
 * @param {any} value
 * @returns {value is PromiseLike<any>}
 */
function is_promise(value) {
	return (
		!!value &&
		(typeof value === 'object' || typeof value === 'function') &&
		typeof (/** @type {any} */ (value).then) === 'function'
	);
}

function run(fn) {
	return fn();
}

function blank_object() {
	return Object.create(null);
}

/**
 * @param {Function[]} fns
 * @returns {void}
 */
function run_all(fns) {
	fns.forEach(run);
}

/** @returns {boolean} */
function safe_not_equal(a, b) {
	return a != a ? b == b : a !== b || (a && typeof a === 'object') || typeof a === 'function';
}

function subscribe(store, ...callbacks) {
	if (store == null) {
		for (const callback of callbacks) {
			callback(undefined);
		}
		return noop;
	}
	const unsub = store.subscribe(...callbacks);
	return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
}

/**
 * Get the current value from a store by subscribing and immediately unsubscribing.
 *
 * https://svelte.dev/docs/svelte-store#get
 * @template T
 * @param {import('../store/public.js').Readable<T>} store
 * @returns {T}
 */
function get_store_value(store) {
	let value;
	subscribe(store, (_) => (value = _))();
	return value;
}

function null_to_empty(value) {
	return value == null ? '' : value;
}

let current_component;

/** @returns {void} */
function set_current_component(component) {
	current_component = component;
}

// general each functions:

function ensure_array_like(array_like_or_iterator) {
	return array_like_or_iterator?.length !== undefined
		? array_like_or_iterator
		: Array.from(array_like_or_iterator);
}

const ATTR_REGEX = /[&"]/g;
const CONTENT_REGEX = /[&<]/g;

/**
 * Note: this method is performance sensitive and has been optimized
 * https://github.com/sveltejs/svelte/pull/5701
 * @param {unknown} value
 * @returns {string}
 */
function escape(value, is_attr = false) {
	const str = String(value);
	const pattern = is_attr ? ATTR_REGEX : CONTENT_REGEX;
	pattern.lastIndex = 0;
	let escaped = '';
	let last = 0;
	while (pattern.test(str)) {
		const i = pattern.lastIndex - 1;
		const ch = str[i];
		escaped += str.substring(last, i) + (ch === '&' ? '&amp;' : ch === '"' ? '&quot;' : '&lt;');
		last = i + 1;
	}
	return escaped + str.substring(last);
}

/** @returns {string} */
function each(items, fn) {
	items = ensure_array_like(items);
	let str = '';
	for (let i = 0; i < items.length; i += 1) {
		str += fn(items[i], i);
	}
	return str;
}

function validate_component(component, name) {
	if (!component || !component.$$render) {
		if (name === 'svelte:component') name += ' this={...}';
		throw new Error(
			`<${name}> is not a valid SSR component. You may need to review your build config to ensure that dependencies are compiled, rather than imported as pre-compiled modules. Otherwise you may need to fix a <${name}>.`
		);
	}
	return component;
}

let on_destroy;

/** @returns {{ render: (props?: {}, { $$slots, context }?: { $$slots?: {}; context?: Map<any, any>; }) => { html: any; css: { code: string; map: any; }; head: string; }; $$render: (result: any, props: any, bindings: any, slots: any, context: any) => any; }} */
function create_ssr_component(fn) {
	function $$render(result, props, bindings, slots, context) {
		const parent_component = current_component;
		const $$ = {
			on_destroy,
			context: new Map(context || (parent_component ? parent_component.$$.context : [])),
			// these will be immediately discarded
			on_mount: [],
			before_update: [],
			after_update: [],
			callbacks: blank_object()
		};
		set_current_component({ $$ });
		const html = fn(result, props, bindings, slots);
		set_current_component(parent_component);
		return html;
	}
	return {
		render: (props = {}, { $$slots = {}, context = new Map() } = {}) => {
			on_destroy = [];
			const result = { title: '', head: '', css: new Set() };
			const html = $$render(result, props, {}, $$slots, context);
			run_all(on_destroy);
			return {
				html,
				css: {
					code: Array.from(result.css)
						.map((css) => css.code)
						.join('\n'),
					map: null // TODO
				},
				head: result.title + result.head
			};
		},
		$$render
	};
}

/** @returns {string} */
function add_attribute(name, value, boolean) {
	if (value == null || (boolean)) return '';
	const assignment = `="${escape(value, true)}"`;
	return ` ${name}${assignment}`;
}

const subscriber_queue = [];

/**
 * Create a `Writable` store that allows both updating and reading by subscription.
 *
 * https://svelte.dev/docs/svelte-store#writable
 * @template T
 * @param {T} [value] initial value
 * @param {import('./public.js').StartStopNotifier<T>} [start]
 * @returns {import('./public.js').Writable<T>}
 */
function writable(value, start = noop) {
	/** @type {import('./public.js').Unsubscriber} */
	let stop;
	/** @type {Set<import('./private.js').SubscribeInvalidateTuple<T>>} */
	const subscribers = new Set();
	/** @param {T} new_value
	 * @returns {void}
	 */
	function set(new_value) {
		if (safe_not_equal(value, new_value)) {
			value = new_value;
			if (stop) {
				// store is ready
				const run_queue = !subscriber_queue.length;
				for (const subscriber of subscribers) {
					subscriber[1]();
					subscriber_queue.push(subscriber, value);
				}
				if (run_queue) {
					for (let i = 0; i < subscriber_queue.length; i += 2) {
						subscriber_queue[i][0](subscriber_queue[i + 1]);
					}
					subscriber_queue.length = 0;
				}
			}
		}
	}

	/**
	 * @param {import('./public.js').Updater<T>} fn
	 * @returns {void}
	 */
	function update(fn) {
		set(fn(value));
	}

	/**
	 * @param {import('./public.js').Subscriber<T>} run
	 * @param {import('./private.js').Invalidator<T>} [invalidate]
	 * @returns {import('./public.js').Unsubscriber}
	 */
	function subscribe(run, invalidate = noop) {
		/** @type {import('./private.js').SubscribeInvalidateTuple<T>} */
		const subscriber = [run, invalidate];
		subscribers.add(subscriber);
		if (subscribers.size === 1) {
			stop = start(set, update) || noop;
		}
		run(value);
		return () => {
			subscribers.delete(subscriber);
			if (subscribers.size === 0 && stop) {
				stop();
				stop = null;
			}
		};
	}
	return { set, update, subscribe };
}

function createToastStore() {
  const { subscribe, update } = writable([]);
  return {
    subscribe,
    show: (message, type = "info", duration = 5e3) => {
      const id = Date.now();
      update((toasts) => [...toasts, { id, message, type, duration }]);
      setTimeout(() => {
        update((toasts) => toasts.filter((toast) => toast.id !== id));
      }, duration);
    },
    close: (id) => {
      update((toasts) => toasts.filter((toast) => toast.id !== id));
    }
  };
}
const toastStore = createToastStore();

const new_error = (error) => {
  if (error.log) {
    toastStore.show(`Error ${error.code}: ${error.error}`, "error");
  }
};

class Web3Provider {
  #provider;
  constructor(provider) {
    this.#provider = provider;
  }
  static async init() {
    const metamaskProvider = await detectProvider();
    if (metamaskProvider === null) {
      throw new Error("Metamask not installed");
    }
    const provider = new BrowserProvider(metamaskProvider, "any");
    return new Web3Provider(provider);
  }
  async userAddress() {
    const signer = await this.#provider.getSigner();
    return signer.getAddress();
  }
  async sign(message) {
    const signer = await this.#provider.getSigner();
    return signer.signMessage(message);
  }
}

function get_cookie(cookie_name) {
  const c_name = cookie_name + "=";
  const cookie_decoded = decodeURIComponent(document.cookie);
  const cookie_parts = cookie_decoded.split(";");
  for (const c of cookie_parts) {
    c.trim();
    if (c.indexOf(c_name) === 0) {
      return c.substring(c_name.length, c.length);
    }
  }
  return "";
}

const web3LoggedIn = writable(false);
const wallet = writable("Connect Wallet");
const authenticated = writable({ user: null, loggedIn: false });
const referralCodes = writable([]);

const url$1 = "/api";
const message = (nonce) => `
Sign this message to prove you're an Inception Ark NFT holder.

It will not cause a blockchain transaction, nor any gas fees.

Nonce:
${nonce}`;
class Account {
  #username;
  #admin;
  constructor(username, admin) {
    this.#username = username;
    this.#admin = admin;
  }
  static async cookie() {
    const cookiePresent = get_cookie("logged") === "true";
    web3LoggedIn.set(cookiePresent);
  }
  static async logged_in() {
    return true;
  }
  static async log_in() {
    const provider = await Web3Provider.init();
    const nonce = await Account.get_nonce();
    const signature = await provider.sign(message(nonce));
    const userWallet = await provider.userAddress();
    const response = await fetch(`${url$1}/login`, {
      method: "POST",
      body: JSON.stringify({
        wallet: userWallet,
        signature
      })
    });
    if (!response.ok) {
      new_error({ code: response.status, error: await response.text() });
    }
    web3LoggedIn.set(true);
    let maskedWallet = userWallet.slice(0, 6) + "..." + userWallet.slice(-4);
    wallet.set(maskedWallet);
    toastStore.show("Successfully logged in", "info");
    return new Account("username", false);
  }
  static async get_nonce() {
    const provider = await Web3Provider.init();
    const response = await fetch(`${url$1}/nonce`, {
      method: "POST",
      body: JSON.stringify({
        wallet: await provider.userAddress()
      })
    });
    if (!response.ok) {
      new_error({ code: response.status, error: await response.text() });
    }
    return await response.text();
  }
  static async log_out() {
    await fetch(`${url$1}/logout`, {
      method: "POST"
    });
    web3LoggedIn.set(false);
  }
  static async signin(data) {
    try {
      const response = await fetch(`${url$1}/signin`, {
        method: "POST",
        body: JSON.stringify(data)
      });
      if (!response.ok) {
        new_error({ code: response.status, error: await response.text() });
      }
      const resp = await response.json();
      authenticated.set({ user: resp.user, loggedIn: true });
    } catch (error) {
      new_error({ code: 500, error });
    }
  }
  static async me() {
    try {
      const response = await fetch(`${url$1}/me`);
      if (!response.ok) {
        new_error({ code: response.status, error: await response.text() });
      }
      const resp = await response.json();
      authenticated.set({ user: resp.user, loggedIn: true });
    } catch (error) {
      new_error({ code: 500, error: `Error fetching user: ${error}`, log: false });
    }
  }
  static async signup(data) {
    const response = await fetch(`${url$1}/signup`, {
      method: "POST",
      body: JSON.stringify(data)
    });
    if (!response.ok) {
      new_error({ code: response.status, error: await response.text() });
    }
    const resp = await response.json();
    authenticated.set({ user: resp.user, loggedIn: true });
  }
  static async signupReferral(data) {
    const response = await fetch(`${url$1}/signup-referral`, {
      method: "POST",
      body: JSON.stringify(data)
    });
    if (!response.ok) {
      new_error({ code: response.status, error: await response.text() });
    }
    const resp = await response.json();
    authenticated.set({ user: resp.user, loggedIn: true });
  }
  static async signout() {
    await Account.log_out();
    const response = await fetch(`${url$1}/logout`, {
      method: "POST"
    });
    if (!response.ok) {
      new_error({ code: response.status, error: await response.text() });
    }
    authenticated.set({ user: null, loggedIn: false });
  }
  static async referraLCodes() {
    try {
      const response = await fetch(`${url$1}/referral/get`, {
        method: "GET"
      });
      if (!response.ok) {
        new_error({ code: response.status, error: await response.text() });
      }
      const referralC = await response.json();
      referralCodes.set(referralC.codes);
    } catch (error) {
      new_error({ code: 500, error });
    }
  }
}

const story = writable(null);
const loading = writable(false);
const background_music = writable(null);
const background_image = writable(null);
const fullscreen = writable(false);

const url = "/api";
const tracks = [
  "/music/coNexus/track01.mp3",
  "/music/coNexus/track02.mp3",
  "/music/coNexus/track03.mp3"
];
const shuffle = (array) => {
  let currentIndex = array.length, randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex]
    ];
  }
  return array;
};
let storyTitle;
class CoNexus {
  step_data;
  #id;
  hasFetched = false;
  jobID = null;
  interval = null;
  maxStep = 0;
  constructor(id) {
    this.#id = id;
    this.step_data = {};
  }
  static async available() {
    const response = await fetch(`${url}/available`, {
      method: "POST"
    });
    if (!response.ok) {
      new_error({ code: response.status, error: await response.text() });
    }
    const available = await response.json();
    available.continuable ??= [];
    return available;
  }
  static async start(category) {
    CoNexus.#play_music(category);
    CoNexus.#background_image(category);
    loading.set(true);
    const response = await fetch(`${url}/start`, {
      body: JSON.stringify({
        category
      }),
      method: "POST"
    });
    if (!response.ok) {
      new_error({ code: response.status, error: await response.text() });
    }
    const game_data = await response.json();
    const story2 = new CoNexus(game_data.id);
    await story2.#set(game_data);
    return story2;
  }
  static async continue(continuable) {
    const story_id = continuable.story_id;
    const category = continuable.category;
    CoNexus.#play_music(category);
    CoNexus.#background_image(category);
    const response = await fetch(`${url}/continue`, {
      body: JSON.stringify({ story_id }),
      method: "POST"
    });
    if (!response.ok) {
      new_error({ code: response.status, error: await response.text() });
    }
    const game_data = await response.json();
    const story2 = new CoNexus(game_data.id);
    await story2.#set(game_data);
    return story2;
  }
  async loadStep(step) {
    const story_id = this.#id;
    const response = await fetch(`${url}/step/${step}`, {
      body: JSON.stringify({ story_id }),
      method: "POST"
    });
    if (!response.ok) {
      new_error({ code: response.status, error: await response.text() });
    }
    const game_data = await response.json();
    this.step_data = game_data;
    story.set(this);
    loading.set(false);
    await this.#loadStepImage(step);
  }
  async #loadStepImage(step) {
    const story_id = this.#id;
    const response = await fetch(`${url}/step-image/${step}`, {
      body: JSON.stringify({ story_id }),
      method: "POST"
    });
    if (!response.ok) {
      new_error({ code: response.status, error: await response.text() });
    }
    this.step_data.image = await response.text();
    story.set(this);
    loading.set(false);
  }
  static async delete(story_id) {
    const response = await fetch(`${url}/story/${story_id}`, {
      method: "DELETE"
    });
    if (!response.ok) {
      new_error({ code: response.status, error: await response.text() });
    }
  }
  static #formatFileName(category) {
    let fileName = category.toLowerCase();
    let formattedFileName = fileName.replace(/[\s.\-\/]+/g, "");
    storyTitle = category;
    return formattedFileName;
  }
  static async fetchRandomMusicUrl(category) {
    const formattedFileName = CoNexus.#formatFileName(category);
    const folderURL = `/conexus-categories/music/${formattedFileName}`;
    const response = await fetch(folderURL);
    if (!response.ok) {
      return null;
    }
    const files = await response.json();
    if (Array.isArray(files) && files.length > 0) {
      let randomFile = files[Math.floor(Math.random() * files.length)];
      let url2 = `${folderURL}/${randomFile.name}`;
      return url2;
    }
    return null;
  }
  static async #play_music(category) {
    let queue = JSON.parse(localStorage.getItem("queue") ?? "[]");
    let categoryTrackURL = null;
    if (category) {
      categoryTrackURL = await CoNexus.fetchRandomMusicUrl(category);
      if (categoryTrackURL) {
        const categoryFileExists = await fetch(categoryTrackURL).then(
          (res) => res.ok
        );
        if (categoryFileExists) {
          background_music.set(categoryTrackURL);
          return;
        }
      }
    }
    if (queue.length === 0) {
      queue = shuffle([...tracks]);
    }
    background_music.set(queue.pop());
    localStorage.setItem("queue", JSON.stringify(queue));
  }
  static #isValidImageUrl(url2) {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = url2;
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
    });
  }
  static async #background_image(category) {
    let formattedFileName = CoNexus.#formatFileName(category);
    let folderUrl = `/conexus-categories/images/${formattedFileName}`;
    let response = await fetch(folderUrl);
    let files = await response.json();
    if (Array.isArray(files) && files.length > 0) {
      let randomFile = files[Math.floor(Math.random() * files.length)];
      let url2 = `${folderUrl}/${randomFile.name}`;
      let valid = await CoNexus.#isValidImageUrl(url2);
      if (valid) {
        background_image.set(url2);
      }
    }
  }
  async next_step(choice) {
    loading.set(true);
    const response = await fetch(`${url}/respond`, {
      method: "POST",
      body: JSON.stringify({
        story_id: this.#id,
        choice
      })
    });
    if (!response.ok) {
      new_error({ code: response.status, error: await response.text() });
    }
    await this.#set(await response.json());
  }
  async #check_image_status() {
    try {
      const response = await fetch(`${url}/new-image-status/${this.jobID}`);
      const data = await response.json();
      if (data.status === "error") {
        this.#clear_interval();
        return;
      }
      if (data.status === "ready") {
        this.step_data.image = data.image;
        story.set(this);
        loading.set(false);
        this.#clear_interval();
      }
    } catch (error) {
      console.error("Failed to check image status:", error);
    } finally {
      setTimeout(() => {
        this.hasFetched = false;
      }, 5e3);
    }
  }
  #start_interval() {
    this.interval = setInterval(async () => {
      await this.#check_image_status();
    }, 1e4);
  }
  #clear_interval() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }
  async #new_generate_image() {
    try {
      const response = await fetch(`${url}/new-image`, {
        method: "POST",
        body: JSON.stringify({ story_id: this.#id })
      });
      if (!response.ok) {
        throw new Error(await response.text());
      }
      const data = await response.json();
      this.jobID = data.jobID;
      this.hasFetched = true;
      this.#start_interval();
    } catch (error) {
      console.error("Image generation failed:", error);
    }
  }
  async #generate_image() {
    const response = await fetch(`${url}/image`, {
      method: "POST",
      body: JSON.stringify({ story_id: this.#id })
    });
    if (!response.ok) {
      new_error({ code: response.status, error: await response.text() });
    }
    this.step_data.image = await response.text();
    story.set(this);
    loading.set(false);
  }
  async #tts() {
    const response = await fetch(`${url}/tts`, {
      method: "POST",
      body: JSON.stringify({ story_id: this.#id })
    });
    if (!response.ok) {
      new_error({ code: response.status, error: await response.text() });
    }
    this.step_data.tts = await response.blob();
    story.set(this);
  }
  async #set(data) {
    this.step_data = data;
    this.maxStep = data.step;
    story.set(this);
    loading.set(false);
    await Promise.all([this.#new_generate_image(), this.#tts()]);
  }
}

/* src/components/Profile.svelte generated by Svelte v4.2.18 */

const css$2 = {
	code: "button.svelte-1ujcupb.svelte-1ujcupb{padding:1vw 2vw;border:0.05vw solid rgba(51, 226, 230, 0.75);border-radius:2vw;font-size:2vw;line-height:3vw;color:rgba(51, 226, 230, 0.75);background-color:rgba(51, 226, 230, 0.1);filter:drop-shadow(0 0 0.1vw rgba(51, 226, 230, 0.4))}button.svelte-1ujcupb.svelte-1ujcupb:hover,button.svelte-1ujcupb.svelte-1ujcupb:active{color:rgba(51, 226, 230, 1);background-color:rgba(51, 226, 230, 0.5);filter:drop-shadow(0 0 1vw rgba(51, 226, 230, 0.4));transform:scale(1.05);transition:transform 0.15s ease-in-out}button.svelte-1ujcupb.svelte-1ujcupb:disabled,button.svelte-1ujcupb.svelte-1ujcupb:disabled:hover,button.svelte-1ujcupb.svelte-1ujcupb:disabled:active{opacity:0.5;color:rgba(51, 226, 230, 0.75);background-color:rgba(51, 226, 230, 0.1);filter:drop-shadow(0 0 0.1vw rgba(51, 226, 230, 0.4));cursor:not-allowed}hr.svelte-1ujcupb.svelte-1ujcupb{margin:2vw 0;border:0.1vw solid rgba(51, 226, 230, 0.5)}.validation-check.svelte-1ujcupb.svelte-1ujcupb{display:none;text-align:center;font-size:1.5vw;margin-bottom:2vw;margin-top:1vw;color:rgba(255, 50, 50, 0.8)}.password-visibility-button.svelte-1ujcupb.svelte-1ujcupb,.copy-button.svelte-1ujcupb.svelte-1ujcupb{padding:0;margin:0;border:none;border-radius:0;background-color:rgba(0, 0, 0, 0);opacity:0.75}.password-visibility-button.svelte-1ujcupb.svelte-1ujcupb:hover,.password-visibility-button.svelte-1ujcupb.svelte-1ujcupb:active,.copy-button.svelte-1ujcupb.svelte-1ujcupb:hover,.copy-button.svelte-1ujcupb.svelte-1ujcupb:active{filter:none;background-color:rgba(0, 0, 0, 0);color:rgba(0, 0, 0, 0);opacity:1}.profile-container.svelte-1ujcupb.svelte-1ujcupb{padding:1.5vw;width:65vw;height:90%;background-color:rgba(1, 0, 32, 0.75);border:0.05vw solid rgba(51, 226, 230, 0.75);border-radius:2.5vw;overflow-x:hidden}.profile-container.svelte-1ujcupb.svelte-1ujcupb::-webkit-scrollbar{width:0.5vw}.profile-container.svelte-1ujcupb.svelte-1ujcupb::-webkit-scrollbar-track{background-color:rgba(0, 0, 0, 0)}.profile-container.svelte-1ujcupb.svelte-1ujcupb::-webkit-scrollbar-thumb{background:linear-gradient(\n      to bottom,\n      rgba(0, 0, 0, 0),\n      rgba(51, 226, 230, 0.5),\n      rgba(0, 0, 0, 0)\n    );border-radius:0.5vw}.profile-container.svelte-1ujcupb.svelte-1ujcupb::backdrop{background:rgba(0, 0, 0, 0.75)}.profile-container[open].svelte-1ujcupb.svelte-1ujcupb{animation:svelte-1ujcupb-zoom 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)}.profile-container[open].svelte-1ujcupb.svelte-1ujcupb::backdrop{animation:svelte-1ujcupb-fade 0.25s ease-out}.profile-container.svelte-1ujcupb>div.svelte-1ujcupb{display:flex;flex-flow:column nowrap}.profile-navigation.svelte-1ujcupb.svelte-1ujcupb{display:flex;flex-flow:row nowrap;justify-content:space-between;align-items:center}.close-button.svelte-1ujcupb.svelte-1ujcupb{padding:1.5vw;font-size:2vw;line-height:2vw}.buttons-container.svelte-1ujcupb.svelte-1ujcupb{position:relative;display:flex;flex-flow:column nowrap;gap:2vw;padding-inline:10vw}.sign-button.svelte-1ujcupb.svelte-1ujcupb{display:flex;flex-flow:row nowrap;justify-content:space-between;align-items:center}.sign-icon.svelte-1ujcupb.svelte-1ujcupb{opacity:0.9;height:2.5vw;width:auto}.sign-lable.svelte-1ujcupb.svelte-1ujcupb{font-size:2vw;width:100%}.sign-title.svelte-1ujcupb.svelte-1ujcupb{text-align:center;color:#dedede;font-size:3vw}.login-form.svelte-1ujcupb.svelte-1ujcupb,.signup-form.svelte-1ujcupb.svelte-1ujcupb,.ref-code-form.svelte-1ujcupb.svelte-1ujcupb{display:flex;flex-flow:column nowrap;align-items:center;justify-content:space-between}.input-label.svelte-1ujcupb.svelte-1ujcupb{font-size:1.5vw;line-height:1.5vw;margin-bottom:0.5vw;color:rgba(255, 255, 255, 0.5)}.user-input.svelte-1ujcupb.svelte-1ujcupb{width:30vw;font-size:2vw;line-height:2.5vw;padding:2vw;margin-bottom:2vw;color:rgba(51, 226, 230, 0.75);border:0.1vw solid rgba(51, 226, 230, 0.5);border-radius:2.5vw;background-color:rgba(1, 0, 32, 0.75);outline:none}.forgot-password.svelte-1ujcupb.svelte-1ujcupb{color:rgba(51, 226, 230, 0.65);font-size:1.5vw;padding-top:2vw}.submit-button.svelte-1ujcupb.svelte-1ujcupb{min-width:30vw;padding:1vw 2vw;color:rgba(51, 226, 230, 0.75);background-color:rgba(51, 226, 230, 0.1);cursor:pointer}.user-profile-info.svelte-1ujcupb.svelte-1ujcupb,.wallet-connect.svelte-1ujcupb.svelte-1ujcupb,.google-connect.svelte-1ujcupb.svelte-1ujcupb{display:flex;flex-flow:row nowrap;justify-content:space-around;align-items:center}.agreements-container.svelte-1ujcupb.svelte-1ujcupb{display:flex;flex-flow:column nowrap;width:85%;padding-bottom:2vw}.agreement.svelte-1ujcupb.svelte-1ujcupb{display:flex;flex-flow:row nowrap;align-items:center;justify-content:baseline;padding:1vw}#terms.svelte-1ujcupb.svelte-1ujcupb,#newsletter.svelte-1ujcupb.svelte-1ujcupb{-webkit-transform:scale(3);transform:scale(3);flex:1;accent-color:rgba(51, 226, 230, 0.75)}.terms.svelte-1ujcupb.svelte-1ujcupb,.newsletter.svelte-1ujcupb.svelte-1ujcupb{font-size:1.75vw;line-height:3vw;padding-left:1vw;flex:10;color:rgba(255, 255, 255, 0.65)}.terms.svelte-1ujcupb>a.svelte-1ujcupb{color:rgba(255, 255, 255, 0.75)}.signup-label.svelte-1ujcupb.svelte-1ujcupb{text-align:center;color:#bebebe;font-size:2vw;margin-block:1vw 3vw}.signup-label.svelte-1ujcupb a.svelte-1ujcupb{color:rgba(255, 255, 255, 0.9)}#refferal-code.svelte-1ujcupb.svelte-1ujcupb{text-align:center}.user-properties.svelte-1ujcupb.svelte-1ujcupb{display:flex;flex-flow:column nowrap;align-items:center}.user-prop.svelte-1ujcupb.svelte-1ujcupb{font-size:2vw;line-height:4vw;color:rgba(255, 255, 255, 0.5)}.user-prop-value.svelte-1ujcupb.svelte-1ujcupb{text-align:center;width:45vw;height:5vw;font-size:2vw;line-height:4vw;border:0.05vw solid rgba(51, 226, 230, 0.5);border-radius:2.5vw;outline:none;color:rgba(255, 255, 255, 0.7);background-color:rgba(51, 226, 230, 0.05);margin-bottom:1vw}.user-prop-value.svelte-1ujcupb.svelte-1ujcupb:disabled{opacity:1}.password-container.svelte-1ujcupb.svelte-1ujcupb{display:flex;justify-content:space-between;align-items:center;margin-left:4vw;margin-bottom:1vw}#password.svelte-1ujcupb.svelte-1ujcupb{margin-bottom:0}#password-confirmation.svelte-1ujcupb.svelte-1ujcupb{border:0.2vw solid rgba(51, 226, 230, 0.75)}.password-visibility-button.svelte-1ujcupb.svelte-1ujcupb{margin-left:1vw;width:3vw;height:3vw;background-image:url(\"/icons/invisibleicon.png\");background-size:contain;background-repeat:no-repeat}.password-visibility-button.svelte-1ujcupb.svelte-1ujcupb:active{background-image:url(\"/icons/visibleicon.png\")}.edit-buttons.svelte-1ujcupb.svelte-1ujcupb{display:flex;justify-content:center;margin-inline:auto}.edit-username.svelte-1ujcupb.svelte-1ujcupb,.edit-password.svelte-1ujcupb.svelte-1ujcupb,.save-changes.svelte-1ujcupb.svelte-1ujcupb{margin:2vw 1vw;font-size:1.75vw;line-height:2vw}.story-games-container.svelte-1ujcupb.svelte-1ujcupb{display:flex;flex-flow:column nowrap;align-items:center}.story-games-number-label.svelte-1ujcupb.svelte-1ujcupb{margin:1vw 0;color:rgba(51, 226, 230, 0.65);font-size:1.5vw}.story-games-number.svelte-1ujcupb.svelte-1ujcupb{color:rgba(51, 226, 230, 0.9);font-size:1.6vw}.refferal-codes-legend.svelte-1ujcupb.svelte-1ujcupb{text-align:center;font-size:2vw;line-height:4vw;color:rgba(255, 255, 255, 0.7)}.refferal-codes.svelte-1ujcupb.svelte-1ujcupb{width:90%;padding:2vw;margin-inline:auto;display:grid;grid-template-columns:50% 50%;justify-content:center;gap:1vw;border:0.1vw solid rgba(51, 226, 230, 0.5);border-radius:2.5vw;background-color:rgba(51, 226, 230, 0.1)}.ref-code-container.svelte-1ujcupb.svelte-1ujcupb{display:flex;flex-flow:row nowrap;align-items:center;justify-content:space-between;background-color:rgba(0, 0, 0, 0.1);border:0.05vw solid rgba(51, 226, 230, 0.25);border-radius:1.5vw;padding:0.5vw 1vw}.ref-code.svelte-1ujcupb.svelte-1ujcupb{text-align:ridht;font-size:1.8vw;line-height:4vw;color:rgba(255, 255, 255, 0.5);border:none;outline:none;background-color:rgba(0, 0, 0, 0)}.ref-code.svelte-1ujcupb.svelte-1ujcupb:disabled{opacity:1}.copy-button.svelte-1ujcupb.svelte-1ujcupb{width:2vw;height:2vw;background-image:url(\"/icons/copyicon.png\");background-size:contain;background-repeat:no-repeat}.copy-button.svelte-1ujcupb.svelte-1ujcupb:active{background-image:url(\"/icons/checkmark.png\")}.used.svelte-1ujcupb.svelte-1ujcupb{color:rgba(255, 255, 255, 0.35);-webkit-text-stroke:0.05vw rgba(255, 0, 0, 0.35)}.not-used.svelte-1ujcupb.svelte-1ujcupb{color:rgba(255, 255, 255, 0.75);filter:drop-shadow(0 0 0.1vw rgba(51, 226, 230, 0.9))}.profile-icon.svelte-1ujcupb.svelte-1ujcupb{position:absolute;top:2vw;right:2vw;height:7vw;width:7vw;cursor:pointer;background-image:url(\"/icons/profileIcon.avif\");background-size:contain;opacity:0.4;z-index:1}.profile-icon.svelte-1ujcupb.svelte-1ujcupb:hover,.profile-icon.svelte-1ujcupb.svelte-1ujcupb:active{filter:drop-shadow(0 0 1vw rgba(51, 226, 230, 0.5));opacity:0.75}@media only screen and (max-width: 600px){hr.svelte-1ujcupb.svelte-1ujcupb{margin:2em 0}button.svelte-1ujcupb.svelte-1ujcupb{font-size:1.4em;line-height:1.4em;padding:0.25em 1em}.close-button.svelte-1ujcupb.svelte-1ujcupb{padding:0.5em;font-size:1.5em;line-height:1em}.buttons-container.svelte-1ujcupb.svelte-1ujcupb{gap:1em;padding-inline:5vw}.sign-icon.svelte-1ujcupb.svelte-1ujcupb{height:1em}.sign-lable.svelte-1ujcupb.svelte-1ujcupb{font-size:1em;line-height:1.5em}.sign-title.svelte-1ujcupb.svelte-1ujcupb{text-align:center;color:#dedede;font-size:1.5em}.signup-label.svelte-1ujcupb.svelte-1ujcupb{font-size:1.1em;line-height:1.5em;padding-inline:5vw;margin-bottom:1em}.validation-check.svelte-1ujcupb.svelte-1ujcupb{font-size:0.9em;margin:0.5em 0}.forgot-password.svelte-1ujcupb.svelte-1ujcupb{font-size:0.9em;padding-top:1.5em}.profile-container.svelte-1ujcupb.svelte-1ujcupb{padding:1em;width:85vw;height:65%;border-radius:1em;overflow-y:scroll}.input-label.svelte-1ujcupb.svelte-1ujcupb{font-size:0.9em;line-height:0.9em;padding-bottom:0.5em}.user-input.svelte-1ujcupb.svelte-1ujcupb{width:80vw;font-size:1.4em;line-height:1.6em;margin-bottom:1em}.agreements-container.svelte-1ujcupb.svelte-1ujcupb{width:95%;padding-bottom:1em}.terms.svelte-1ujcupb.svelte-1ujcupb,.newsletter.svelte-1ujcupb.svelte-1ujcupb{font-size:1em;line-height:1.5em;padding-left:1em}#terms.svelte-1ujcupb.svelte-1ujcupb,#newsletter.svelte-1ujcupb.svelte-1ujcupb{-webkit-transform:scale(1.5);transform:scale(1.5)}.submit-button.svelte-1ujcupb.svelte-1ujcupb{width:50vw}.story-games-number-label.svelte-1ujcupb.svelte-1ujcupb{margin:0.5em 0 1em 0;font-size:0.9em}.story-games-number.svelte-1ujcupb.svelte-1ujcupb{font-size:1em}.user-prop.svelte-1ujcupb.svelte-1ujcupb,.user-prop-value.svelte-1ujcupb.svelte-1ujcupb,.refferal-codes-legend.svelte-1ujcupb.svelte-1ujcupb{font-size:1em;line-height:2.5em}.user-prop-value.svelte-1ujcupb.svelte-1ujcupb{width:70vw;height:2.5em;margin-bottom:0.5em}.password-container.svelte-1ujcupb.svelte-1ujcupb{margin-left:1.75em;margin-bottom:0.5em}.password-visibility-button.svelte-1ujcupb.svelte-1ujcupb{width:1em;height:1em;margin-left:0.25em}.edit-username.svelte-1ujcupb.svelte-1ujcupb,.edit-password.svelte-1ujcupb.svelte-1ujcupb,.save-changes.svelte-1ujcupb.svelte-1ujcupb{margin:1em 0.5em;font-size:1em;line-height:2em}.refferal-codes.svelte-1ujcupb.svelte-1ujcupb{grid-template-columns:100%;gap:0.5em;padding:0.5em;width:95%}.ref-code-container.svelte-1ujcupb.svelte-1ujcupb{padding:0 1em;border-radius:0.5em}.ref-code.svelte-1ujcupb.svelte-1ujcupb{font-size:1.2em;line-height:3em}.copy-button.svelte-1ujcupb.svelte-1ujcupb{width:1em;height:1em}.profile-icon.svelte-1ujcupb.svelte-1ujcupb{width:3em;height:3em;top:1em;right:0.5em}}@keyframes svelte-1ujcupb-zoom{from{transform:scale(1.5)}to{transform:scale(1)}}@keyframes svelte-1ujcupb-fade{from{opacity:0}to{opacity:1}}",
	map: "{\"version\":3,\"file\":\"Profile.svelte\",\"sources\":[\"Profile.svelte\"],\"sourcesContent\":[\"<script lang=\\\"ts\\\">import Account from \\\"@lib/auth\\\";\\nimport { CoNexus } from \\\"@lib/conexus\\\";\\nimport {\\n  authenticated,\\n  referralCodes,\\n  wallet,\\n  web3LoggedIn\\n} from \\\"@stores/account\\\";\\nimport { onMount } from \\\"svelte\\\";\\nAccount.me();\\nAccount.logged_in();\\nonMount(async () => {\\n  Account.cookie();\\n});\\nlet showModal;\\nlet dialog;\\n$: if (dialog && showModal) dialog.showModal();\\nlet isLogged;\\nlet signUp;\\nlet user;\\nlet loginMail;\\nlet loginPassword;\\nlet signInWithEmail;\\nlet signUpRefCodeEntered;\\nlet signUpWithEmail;\\nfunction closeProfileWindow() {\\n  dialog.close();\\n  if (!isLogged) {\\n    signUp = false;\\n    signInWithEmail = false;\\n    signUpRefCodeEntered = false;\\n    signUpWithEmail = false;\\n  }\\n}\\nconst alternativeSignIn = {\\n  google: () => {\\n    console.log(\\\"Sign in with Google\\\");\\n  },\\n  coinbaseWallet: () => {\\n    console.log(\\\"Sign in with Coinbase Smart Wallet\\\");\\n  },\\n  browserWallet: () => {\\n    console.log(\\\"Sign in with browser wallet\\\");\\n  }\\n};\\nconst alternativeSignUp = {\\n  google: () => {\\n    console.log(\\\"Sign up with Google\\\");\\n  },\\n  coinbaseWallet: () => {\\n    console.log(\\\"Sign up with Coinbase Smart Wallet\\\");\\n  },\\n  browserWallet: () => {\\n    console.log(\\\"Sign up with browser wallet\\\");\\n  }\\n};\\nauthenticated.subscribe((value) => {\\n  user = value.user;\\n  isLogged = value.loggedIn;\\n});\\n$: if (isLogged) {\\n  Account.referraLCodes();\\n}\\nlet refCodes;\\nreferralCodes.subscribe((codes) => {\\n  refCodes = codes;\\n});\\nfunction copyRefCode(event) {\\n  navigator.clipboard.writeText(event.target.id);\\n}\\nlet walletAddress;\\nwallet.subscribe((value) => {\\n  walletAddress = value;\\n});\\nfunction connectWallet() {\\n  Account.log_in();\\n}\\nlet mandatoryCheckbox;\\nlet createAccountButton;\\nfunction validate() {\\n  if (mandatoryCheckbox.checked) {\\n    createAccountButton.disabled = false;\\n  } else {\\n    createAccountButton.disabled = true;\\n  }\\n}\\nlet firstNameInput;\\nlet lastNameInput;\\nlet passwordInput;\\nlet passwordConfirmInput;\\nlet passwordConfirmLabel;\\nlet passwordMatchValidation;\\nlet editUsernameBtn;\\nlet editPasswordBtn;\\nlet saveChangesBtn;\\nconst passwordVisible = () => passwordInput.type = \\\"text\\\";\\nconst passwordInvisible = () => passwordInput.type = \\\"password\\\";\\nlet isEditing = false;\\nfunction changeUserData() {\\n  if (this.className.match(\\\"username\\\")) {\\n    isEditing = \\\"username\\\";\\n  } else if (this.className.match(\\\"password\\\")) {\\n    isEditing = \\\"password\\\";\\n  } else if (this.className.match(\\\"save\\\")) {\\n    if (isEditing === \\\"password\\\") {\\n      if (passwordInput.value != passwordConfirmInput.value) {\\n        passwordMatchValidation.style.display = \\\"block\\\";\\n        throw new Error(\\\"Passwords do not match!\\\");\\n      } else {\\n        passwordMatchValidation.style.display = \\\"none\\\";\\n      }\\n    }\\n    isEditing = false;\\n  }\\n}\\n</script>\\n\\n<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->\\n<span\\n  class=\\\"profile-icon\\\"\\n  role=\\\"button\\\"\\n  tabindex=\\\"0\\\"\\n  on:click={() => (showModal = true)}\\n/>\\n\\n<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->\\n<dialog\\n  class=\\\"profile-container blur\\\"\\n  bind:this={dialog}\\n  on:close={() => (showModal = false)}\\n  on:click|self={closeProfileWindow}\\n>\\n  <!-- svelte-ignore a11y-no-static-element-interactions -->\\n  <div on:click|stopPropagation>\\n    <div class=\\\"profile-navigation\\\">\\n      <button\\n        class=\\\"close-button\\\"\\n        on:click|stopPropagation={closeProfileWindow}\\n      >\\n        ❌\\n      </button>\\n      {#if isLogged}\\n        <button\\n          class=\\\"login-button\\\"\\n          on:click={() => {\\n            Account.signout();\\n          }}>Log out</button\\n        >\\n      {/if}\\n    </div>\\n\\n    {#if isLogged}\\n      <!-- USER PROFILE -->\\n      {#if $web3LoggedIn}\\n        <hr />\\n        {#await CoNexus.available()}\\n          <div class=\\\"story-games-container\\\">\\n            <p class=\\\"story-games-number-label\\\">Available story games...</p>\\n          </div>\\n        {:then available}\\n          <div class=\\\"story-games-container\\\">\\n            <p class=\\\"story-games-number-label\\\">\\n              You have used\\n              <span class=\\\"story-games-number\\\"\\n                >{available.used} / {available.available} weekly</span\\n              >\\n              stories\\n            </p>\\n\\n            {#if available.bonus > 0}\\n              <p class=\\\"story-games-number-label\\\">\\n                You have\\n                <span class=\\\"story-games-number\\\">\\n                  {available.bonus} bonus\\n                </span>\\n                lives\\n              </p>\\n            {/if}\\n          </div>\\n        {/await}\\n      {/if}\\n\\n      <hr />\\n\\n      <div class=\\\"user-profile-info\\\">\\n        <div class=\\\"user-properties\\\">\\n          <label for=\\\"mail\\\" class=\\\"user-prop\\\">Email</label>\\n          <input\\n            class=\\\"user-prop-value\\\"\\n            id=\\\"mail\\\"\\n            type=\\\"email\\\"\\n            value={user.email}\\n            disabled\\n          />\\n          <label for=\\\"password\\\" class=\\\"user-prop\\\">Password</label>\\n          <div class=\\\"password-container\\\">\\n            <input\\n              bind:this={passwordInput}\\n              class=\\\"user-prop-value\\\"\\n              id=\\\"password\\\"\\n              type=\\\"password\\\"\\n              value={user.password}\\n              disabled={isEditing === \\\"password\\\" ? false : true}\\n              style={isEditing === \\\"password\\\"\\n                ? \\\"border: 0.2vw solid rgba(51, 226, 230, 0.75)\\\"\\n                : \\\"\\\"}\\n            />\\n            <button\\n              class=\\\"password-visibility-button\\\"\\n              on:mousedown={passwordVisible}\\n              on:mouseup={passwordInvisible}\\n              on:touchstart={passwordVisible}\\n              on:touchend={passwordInvisible}\\n            />\\n          </div>\\n          {#if isEditing === \\\"password\\\"}\\n            <label\\n              bind:this={passwordConfirmLabel}\\n              for=\\\"password-confirmation\\\"\\n              class=\\\"user-prop\\\"\\n              id=\\\"password-confirmation-label\\\">Confirm password</label\\n            >\\n            <input\\n              bind:this={passwordConfirmInput}\\n              class=\\\"user-prop-value\\\"\\n              id=\\\"password-confirmation\\\"\\n              type=\\\"password\\\"\\n            />\\n          {/if}\\n          <label for=\\\"first-name\\\" class=\\\"user-prop\\\">First name</label>\\n          <input\\n            bind:this={firstNameInput}\\n            class=\\\"user-prop-value\\\"\\n            id=\\\"first-name\\\"\\n            type=\\\"text\\\"\\n            value={user.first_name}\\n            disabled={isEditing === \\\"username\\\" ? false : true}\\n            style={isEditing === \\\"username\\\"\\n              ? \\\"border: 0.2vw solid rgba(51, 226, 230, 0.75)\\\"\\n              : \\\"\\\"}\\n          />\\n          <label for=\\\"last-name\\\" class=\\\"user-prop\\\">Last name</label>\\n          <input\\n            bind:this={lastNameInput}\\n            class=\\\"user-prop-value\\\"\\n            id=\\\"last-name\\\"\\n            type=\\\"text\\\"\\n            value={user.last_name}\\n            disabled={isEditing === \\\"username\\\" ? false : true}\\n            style={isEditing === \\\"username\\\"\\n              ? \\\"border: 0.2vw solid rgba(51, 226, 230, 0.75)\\\"\\n              : \\\"\\\"}\\n          />\\n        </div>\\n      </div>\\n\\n      <p bind:this={passwordMatchValidation} class=\\\"validation-check\\\">\\n        Passwords do not match!\\n      </p>\\n\\n      <div class=\\\"edit-buttons\\\">\\n        {#if isEditing}\\n          <button\\n            bind:this={saveChangesBtn}\\n            class=\\\"save-changes\\\"\\n            on:click={changeUserData}\\n          >\\n            Save\\n          </button>\\n        {:else}\\n          <button\\n            bind:this={editUsernameBtn}\\n            class=\\\"edit-username\\\"\\n            on:click={changeUserData}\\n          >\\n            Change name\\n          </button>\\n          <button\\n            bind:this={editPasswordBtn}\\n            class=\\\"edit-password\\\"\\n            on:click={changeUserData}\\n          >\\n            Change password\\n          </button>\\n        {/if}\\n      </div>\\n\\n      <hr />\\n\\n      <div class=\\\"wallet-connect\\\">\\n        <p class=\\\"user-prop\\\">Web3 account:</p>\\n\\n        <button class=\\\"wallet-button\\\" on:click={connectWallet}>\\n          {#if !$web3LoggedIn}\\n            Connect Wallet\\n          {:else if $web3LoggedIn}\\n            {walletAddress}\\n          {/if}\\n        </button>\\n      </div>\\n\\n      <hr />\\n\\n      <div class=\\\"google-connect\\\">\\n        <p class=\\\"user-prop\\\">Web2 account:</p>\\n\\n        <button class=\\\"google-button\\\"> Connect Google </button>\\n      </div>\\n\\n      <hr />\\n\\n      <p class=\\\"refferal-codes-legend\\\">Your referral codes</p>\\n      {#if refCodes != null}\\n        <div class=\\\"refferal-codes\\\">\\n          {#each refCodes as code}\\n            <div class=\\\"ref-code-container\\\">\\n              <input\\n                class=\\\"ref-code\\\"\\n                id={code.code}\\n                class:used={code.is_used}\\n                class:not-used={!code.is_used}\\n                value={code.code}\\n                disabled\\n              />\\n              <!-- svelte-ignore a11y-no-noninteractive-element-to-interactive-role -->\\n              <button\\n                id={code.code}\\n                class=\\\"copy-button\\\"\\n                on:click={copyRefCode}\\n              />\\n            </div>\\n          {/each}\\n        </div>\\n      {:else}\\n        <button\\n          on:click={() => {\\n            console.log(\\\"get codes\\\");\\n          }}\\n        >\\n          Get referral codes\\n        </button>\\n      {/if}\\n    {:else if !isLogged}\\n      <section class=\\\"signin\\\">\\n        <p class=\\\"sign-title\\\">{signUp ? \\\"Sign up\\\" : \\\"Sign in\\\"}</p>\\n\\n        <hr />\\n\\n        {#if !signUp}\\n          <!-- SIGNIN WINDOW -->\\n\\n          {#if signInWithEmail}\\n            <form class=\\\"login-form\\\">\\n              <label class=\\\"input-label\\\" for=\\\"user-mail\\\">Email</label>\\n              <input\\n                bind:this={loginMail}\\n                class=\\\"user-input\\\"\\n                type=\\\"email\\\"\\n                id=\\\"user-mail\\\"\\n                placeholder=\\\"Enter your email\\\"\\n                required\\n              />\\n              <label class=\\\"input-label\\\" for=\\\"user-password\\\">Password</label>\\n              <input\\n                bind:this={loginPassword}\\n                class=\\\"user-input\\\"\\n                type=\\\"password\\\"\\n                id=\\\"user-password\\\"\\n                placeholder=\\\"Enter your password\\\"\\n                minlength=\\\"8\\\"\\n                required\\n              />\\n              <p class=\\\"validation-check\\\">Invalid credentials!</p>\\n              <button\\n                class=\\\"submit-button\\\"\\n                type=\\\"submit\\\"\\n                on:click={() =>\\n                  Account.signin({\\n                    email: loginMail.value,\\n                    password: loginPassword.value,\\n                  })}>Sign in</button\\n              >\\n              <a class=\\\"forgot-password\\\" href=\\\"/\\\">Forgot password?</a>\\n            </form>\\n          {:else}\\n            <div class=\\\"buttons-container\\\">\\n              <button class=\\\"sign-button\\\" on:click={alternativeSignIn.google}>\\n                <img class=\\\"sign-icon\\\" src=\\\"/icons/google.png\\\" alt=\\\"Google\\\" />\\n                <p class=\\\"sign-lable\\\">with Google</p>\\n              </button>\\n              <button\\n                class=\\\"sign-button\\\"\\n                on:click={() => {\\n                  signInWithEmail = true;\\n                }}\\n              >\\n                <img class=\\\"sign-icon\\\" src=\\\"/icons/email.png\\\" alt=\\\"Google\\\" />\\n                <p class=\\\"sign-lable\\\">with email</p>\\n              </button>\\n              <button\\n                class=\\\"sign-button\\\"\\n                on:click={alternativeSignIn.coinbaseWallet}\\n              >\\n                <img class=\\\"sign-icon\\\" src=\\\"/icons/coinbase.png\\\" alt=\\\"Google\\\" />\\n                <p class=\\\"sign-lable\\\">with Coinbase Smart Wallet</p></button\\n              >\\n              <button\\n                class=\\\"sign-button\\\"\\n                on:click={alternativeSignIn.browserWallet}\\n              >\\n                <img\\n                  class=\\\"sign-icon\\\"\\n                  src=\\\"/icons/walletconnect.png\\\"\\n                  alt=\\\"Google\\\"\\n                />\\n                <p class=\\\"sign-lable\\\">with browser wallet</p></button\\n              >\\n            </div>\\n          {/if}\\n\\n          <hr />\\n\\n          <p class=\\\"signup-label\\\">Don't have an existing CoNexus account?</p>\\n\\n          <div class=\\\"buttons-container\\\">\\n            <button\\n              class=\\\"sign-button\\\"\\n              on:click={() => {\\n                signUp = true;\\n              }}\\n            >\\n              <p class=\\\"sign-lable\\\">Sign Up</p>\\n            </button>\\n          </div>\\n        {:else}\\n          <!-- SIGNUP WINDOW -->\\n\\n          {#if signUpWithEmail}\\n            <form class=\\\"signup-form\\\">\\n              <label class=\\\"input-label\\\" for=\\\"new-user-mail\\\">Mail</label>\\n              <input\\n                class=\\\"user-input\\\"\\n                type=\\\"email\\\"\\n                id=\\\"new-user-mail\\\"\\n                placeholder=\\\"Your email\\\"\\n                required\\n              />\\n              <label class=\\\"input-label\\\" for=\\\"new-user-password\\\">Password</label\\n              >\\n              <input\\n                class=\\\"user-input\\\"\\n                type=\\\"password\\\"\\n                id=\\\"new-user-password\\\"\\n                placeholder=\\\"Your password\\\"\\n                minlength=\\\"8\\\"\\n                required\\n              />\\n              <input\\n                class=\\\"user-input\\\"\\n                type=\\\"password\\\"\\n                id=\\\"confirm-new-user-password\\\"\\n                placeholder=\\\"Confirm password\\\"\\n                required\\n              />\\n              <label class=\\\"input-label\\\" for=\\\"user-first-name\\\">First name</label\\n              >\\n              <input\\n                class=\\\"user-input\\\"\\n                type=\\\"text\\\"\\n                id=\\\"user-first-name\\\"\\n                placeholder=\\\"Your First name\\\"\\n              />\\n              <label class=\\\"input-label\\\" for=\\\"user-last-name\\\">Last name</label>\\n              <input\\n                class=\\\"user-input\\\"\\n                type=\\\"text\\\"\\n                id=\\\"user-last-name\\\"\\n                placeholder=\\\"Your Last name\\\"\\n              />\\n              <div class=\\\"agreements-container\\\">\\n                <div class=\\\"agreement\\\">\\n                  <input\\n                    bind:this={mandatoryCheckbox}\\n                    type=\\\"checkbox\\\"\\n                    id=\\\"terms\\\"\\n                    on:click={validate}\\n                  />\\n                  <label for=\\\"terms\\\" class=\\\"terms\\\">\\n                    * I have read and agree to the <a\\n                      href=\\\"https://docs.google.com/document/d/1fEemq6HVM_h8ZTbc_Fl_k3RvlPdjYd70TI1iloT5gXA/edit?usp=sharing\\\"\\n                      target=\\\"_blank\\\"\\n                    >\\n                      Terms of Service</a\\n                    >.\\n                  </label>\\n                </div>\\n                <div class=\\\"agreement\\\">\\n                  <input type=\\\"checkbox\\\" id=\\\"newsletter\\\" />\\n                  <label for=\\\"newsletter\\\" class=\\\"newsletter\\\">\\n                    I'd like to receive news 1-4 times a month.\\n                  </label>\\n                </div>\\n              </div>\\n              <p class=\\\"validation-check\\\">Fill in all required fields!</p>\\n              <button\\n                bind:this={createAccountButton}\\n                class=\\\"submit-button\\\"\\n                on:click={() => {\\n                  isLogged = true;\\n                }}\\n                disabled>Create account</button\\n              >\\n            </form>\\n          {:else if signUpRefCodeEntered}\\n            <div class=\\\"buttons-container\\\">\\n              <button class=\\\"sign-button\\\" on:click={alternativeSignUp.google}>\\n                <img class=\\\"sign-icon\\\" src=\\\"/icons/google.png\\\" alt=\\\"Google\\\" />\\n                <p class=\\\"sign-lable\\\">with Google</p>\\n              </button>\\n              <button\\n                class=\\\"sign-button\\\"\\n                on:click={() => {\\n                  signUpWithEmail = true;\\n                }}\\n              >\\n                <img class=\\\"sign-icon\\\" src=\\\"/icons/email.png\\\" alt=\\\"Google\\\" />\\n                <p class=\\\"sign-lable\\\">with email</p>\\n              </button>\\n              <button\\n                class=\\\"sign-button\\\"\\n                on:click={alternativeSignUp.coinbaseWallet}\\n              >\\n                <img class=\\\"sign-icon\\\" src=\\\"/icons/coinbase.png\\\" alt=\\\"Google\\\" />\\n                <p class=\\\"sign-lable\\\">with Coinbase Smart Wallet</p></button\\n              >\\n              <button\\n                class=\\\"sign-button\\\"\\n                on:click={alternativeSignUp.browserWallet}\\n              >\\n                <img\\n                  class=\\\"sign-icon\\\"\\n                  src=\\\"/icons/walletconnect.png\\\"\\n                  alt=\\\"Google\\\"\\n                />\\n                <p class=\\\"sign-lable\\\">with browser wallet</p></button\\n              >\\n            </div>\\n          {:else}\\n            <form class=\\\"ref-code-form\\\">\\n              <p class=\\\"signup-label\\\">Enter your referral code:</p>\\n              <input\\n                class=\\\"user-input\\\"\\n                type=\\\"text\\\"\\n                id=\\\"refferal-code\\\"\\n                placeholder=\\\"A11A7528D9C82915 \\\"\\n                minlength=\\\"16\\\"\\n                maxlength=\\\"16\\\"\\n                required\\n              />\\n              <p class=\\\"signup-label\\\">\\n                Don't have one yet? Find yours <a\\n                  href=\\\"https://discord.gg/349FgMSUK8\\\">here</a\\n                >!\\n              </p>\\n              <button\\n                class=\\\"submit-button\\\"\\n                type=\\\"submit\\\"\\n                on:click={() => (signUpRefCodeEntered = true)}>Done</button\\n              >\\n            </form>\\n          {/if}\\n        {/if}\\n      </section>\\n    {/if}\\n  </div>\\n</dialog>\\n\\n<style>\\n  button {\\n    padding: 1vw 2vw;\\n    border: 0.05vw solid rgba(51, 226, 230, 0.75);\\n    border-radius: 2vw;\\n    font-size: 2vw;\\n    line-height: 3vw;\\n    color: rgba(51, 226, 230, 0.75);\\n    background-color: rgba(51, 226, 230, 0.1);\\n    filter: drop-shadow(0 0 0.1vw rgba(51, 226, 230, 0.4));\\n  }\\n\\n  button:hover,\\n  button:active {\\n    color: rgba(51, 226, 230, 1);\\n    background-color: rgba(51, 226, 230, 0.5);\\n    filter: drop-shadow(0 0 1vw rgba(51, 226, 230, 0.4));\\n    transform: scale(1.05);\\n    transition: transform 0.15s ease-in-out;\\n  }\\n\\n  button:disabled,\\n  button:disabled:hover,\\n  button:disabled:active {\\n    opacity: 0.5;\\n    color: rgba(51, 226, 230, 0.75);\\n    background-color: rgba(51, 226, 230, 0.1);\\n    filter: drop-shadow(0 0 0.1vw rgba(51, 226, 230, 0.4));\\n    cursor: not-allowed;\\n  }\\n\\n  hr {\\n    margin: 2vw 0;\\n    border: 0.1vw solid rgba(51, 226, 230, 0.5);\\n  }\\n\\n  .validation-check {\\n    display: none;\\n    text-align: center;\\n    font-size: 1.5vw;\\n    margin-bottom: 2vw;\\n    margin-top: 1vw;\\n    color: rgba(255, 50, 50, 0.8);\\n  }\\n\\n  /* Reset button styling for icons */\\n\\n  .password-visibility-button,\\n  .copy-button {\\n    padding: 0;\\n    margin: 0;\\n    border: none;\\n    border-radius: 0;\\n    background-color: rgba(0, 0, 0, 0);\\n    opacity: 0.75;\\n  }\\n\\n  .password-visibility-button:hover,\\n  .password-visibility-button:active,\\n  .copy-button:hover,\\n  .copy-button:active {\\n    filter: none;\\n    background-color: rgba(0, 0, 0, 0);\\n    color: rgba(0, 0, 0, 0);\\n    opacity: 1;\\n  }\\n\\n  /* Profile dialog window */\\n\\n  .profile-container {\\n    padding: 1.5vw;\\n    width: 65vw;\\n    height: 90%;\\n    background-color: rgba(1, 0, 32, 0.75);\\n    border: 0.05vw solid rgba(51, 226, 230, 0.75);\\n    border-radius: 2.5vw;\\n    overflow-x: hidden;\\n  }\\n\\n  .profile-container::-webkit-scrollbar {\\n    width: 0.5vw;\\n  }\\n\\n  .profile-container::-webkit-scrollbar-track {\\n    background-color: rgba(0, 0, 0, 0);\\n  }\\n\\n  .profile-container::-webkit-scrollbar-thumb {\\n    background: linear-gradient(\\n      to bottom,\\n      rgba(0, 0, 0, 0),\\n      rgba(51, 226, 230, 0.5),\\n      rgba(0, 0, 0, 0)\\n    );\\n    border-radius: 0.5vw;\\n  }\\n\\n  .profile-container::backdrop {\\n    background: rgba(0, 0, 0, 0.75);\\n  }\\n\\n  .profile-container[open] {\\n    animation: zoom 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);\\n  }\\n\\n  .profile-container[open]::backdrop {\\n    animation: fade 0.25s ease-out;\\n  }\\n\\n  .profile-container > div {\\n    display: flex;\\n    flex-flow: column nowrap;\\n  }\\n\\n  .profile-navigation {\\n    display: flex;\\n    flex-flow: row nowrap;\\n    justify-content: space-between;\\n    align-items: center;\\n  }\\n\\n  .close-button {\\n    padding: 1.5vw;\\n    font-size: 2vw;\\n    line-height: 2vw;\\n  }\\n\\n  .buttons-container {\\n    position: relative;\\n    display: flex;\\n    flex-flow: column nowrap;\\n    gap: 2vw;\\n    padding-inline: 10vw;\\n  }\\n\\n  .sign-button {\\n    display: flex;\\n    flex-flow: row nowrap;\\n    justify-content: space-between;\\n    align-items: center;\\n  }\\n\\n  .sign-icon {\\n    opacity: 0.9;\\n    height: 2.5vw;\\n    width: auto;\\n  }\\n\\n  .sign-lable {\\n    font-size: 2vw;\\n    width: 100%;\\n  }\\n\\n  .sign-title {\\n    text-align: center;\\n    color: #dedede;\\n    font-size: 3vw;\\n  }\\n\\n  /* SIGNIN with EMAIL */\\n\\n  .login-form,\\n  .signup-form,\\n  .ref-code-form {\\n    display: flex;\\n    flex-flow: column nowrap;\\n    align-items: center;\\n    justify-content: space-between;\\n  }\\n\\n  .input-label {\\n    font-size: 1.5vw;\\n    line-height: 1.5vw;\\n    margin-bottom: 0.5vw;\\n    color: rgba(255, 255, 255, 0.5);\\n  }\\n\\n  .user-input {\\n    width: 30vw;\\n    font-size: 2vw;\\n    line-height: 2.5vw;\\n    padding: 2vw;\\n    margin-bottom: 2vw;\\n    color: rgba(51, 226, 230, 0.75);\\n    border: 0.1vw solid rgba(51, 226, 230, 0.5);\\n    border-radius: 2.5vw;\\n    background-color: rgba(1, 0, 32, 0.75);\\n    outline: none;\\n  }\\n\\n  .forgot-password {\\n    color: rgba(51, 226, 230, 0.65);\\n    font-size: 1.5vw;\\n    padding-top: 2vw;\\n  }\\n\\n  .submit-button {\\n    min-width: 30vw;\\n    padding: 1vw 2vw;\\n    color: rgba(51, 226, 230, 0.75);\\n    background-color: rgba(51, 226, 230, 0.1);\\n    cursor: pointer;\\n  }\\n\\n  .user-profile-info,\\n  .wallet-connect,\\n  .google-connect {\\n    display: flex;\\n    flex-flow: row nowrap;\\n    justify-content: space-around;\\n    align-items: center;\\n  }\\n\\n  .agreements-container {\\n    display: flex;\\n    flex-flow: column nowrap;\\n    width: 85%;\\n    padding-bottom: 2vw;\\n  }\\n\\n  .agreement {\\n    display: flex;\\n    flex-flow: row nowrap;\\n    align-items: center;\\n    justify-content: baseline;\\n    padding: 1vw;\\n  }\\n\\n  #terms,\\n  #newsletter {\\n    -webkit-transform: scale(3);\\n    transform: scale(3);\\n    flex: 1;\\n    accent-color: rgba(51, 226, 230, 0.75);\\n  }\\n\\n  .terms,\\n  .newsletter {\\n    font-size: 1.75vw;\\n    line-height: 3vw;\\n    padding-left: 1vw;\\n    flex: 10;\\n    color: rgba(255, 255, 255, 0.65);\\n  }\\n\\n  .terms > a {\\n    color: rgba(255, 255, 255, 0.75);\\n  }\\n\\n  /* SIGNIN */\\n\\n  .signup-label {\\n    text-align: center;\\n    color: #bebebe;\\n    font-size: 2vw;\\n    margin-block: 1vw 3vw;\\n  }\\n\\n  .signup-label a {\\n    color: rgba(255, 255, 255, 0.9);\\n  }\\n\\n  #refferal-code {\\n    text-align: center;\\n  }\\n\\n  /* User logged in */\\n\\n  .user-properties {\\n    display: flex;\\n    flex-flow: column nowrap;\\n    align-items: center;\\n  }\\n\\n  .user-prop {\\n    font-size: 2vw;\\n    line-height: 4vw;\\n    color: rgba(255, 255, 255, 0.5);\\n  }\\n\\n  .user-prop-value {\\n    text-align: center;\\n    width: 45vw;\\n    height: 5vw;\\n    font-size: 2vw;\\n    line-height: 4vw;\\n    border: 0.05vw solid rgba(51, 226, 230, 0.5);\\n    border-radius: 2.5vw;\\n    outline: none;\\n    color: rgba(255, 255, 255, 0.7);\\n    background-color: rgba(51, 226, 230, 0.05);\\n    margin-bottom: 1vw;\\n  }\\n\\n  .user-prop-value:disabled {\\n    opacity: 1; /* for iOS */\\n  }\\n\\n  .password-container {\\n    display: flex;\\n    justify-content: space-between;\\n    align-items: center;\\n    margin-left: 4vw;\\n    margin-bottom: 1vw;\\n  }\\n\\n  #password {\\n    margin-bottom: 0;\\n  }\\n\\n  #password-confirmation {\\n    border: 0.2vw solid rgba(51, 226, 230, 0.75);\\n  }\\n\\n  .password-visibility-button {\\n    margin-left: 1vw;\\n    width: 3vw;\\n    height: 3vw;\\n    background-image: url(\\\"/icons/invisibleicon.png\\\");\\n    background-size: contain;\\n    background-repeat: no-repeat;\\n  }\\n\\n  .password-visibility-button:active {\\n    background-image: url(\\\"/icons/visibleicon.png\\\");\\n  }\\n\\n  .edit-buttons {\\n    display: flex;\\n    justify-content: center;\\n    margin-inline: auto;\\n  }\\n\\n  .edit-username,\\n  .edit-password,\\n  .save-changes {\\n    margin: 2vw 1vw;\\n    font-size: 1.75vw;\\n    line-height: 2vw;\\n  }\\n\\n  /* Story games number */\\n\\n  .story-games-container {\\n    display: flex;\\n    flex-flow: column nowrap;\\n    align-items: center;\\n  }\\n\\n  .story-games-number-label {\\n    margin: 1vw 0;\\n    color: rgba(51, 226, 230, 0.65);\\n    font-size: 1.5vw;\\n  }\\n\\n  .story-games-number {\\n    color: rgba(51, 226, 230, 0.9);\\n    font-size: 1.6vw;\\n  }\\n\\n  /* Referral codes container */\\n\\n  .refferal-codes-legend {\\n    text-align: center;\\n    font-size: 2vw;\\n    line-height: 4vw;\\n    color: rgba(255, 255, 255, 0.7);\\n  }\\n\\n  .refferal-codes {\\n    width: 90%;\\n    padding: 2vw;\\n    margin-inline: auto;\\n    display: grid;\\n    grid-template-columns: 50% 50%;\\n    justify-content: center;\\n    gap: 1vw;\\n    border: 0.1vw solid rgba(51, 226, 230, 0.5);\\n    border-radius: 2.5vw;\\n    background-color: rgba(51, 226, 230, 0.1);\\n  }\\n\\n  .ref-code-container {\\n    display: flex;\\n    flex-flow: row nowrap;\\n    align-items: center;\\n    justify-content: space-between;\\n    background-color: rgba(0, 0, 0, 0.1);\\n    border: 0.05vw solid rgba(51, 226, 230, 0.25);\\n    border-radius: 1.5vw;\\n    padding: 0.5vw 1vw;\\n  }\\n\\n  .ref-code {\\n    text-align: ridht;\\n    font-size: 1.8vw;\\n    line-height: 4vw;\\n    color: rgba(255, 255, 255, 0.5);\\n    border: none;\\n    outline: none;\\n    background-color: rgba(0, 0, 0, 0);\\n  }\\n\\n  .ref-code:disabled {\\n    opacity: 1; /* for iOS */\\n  }\\n\\n  .copy-button {\\n    width: 2vw;\\n    height: 2vw;\\n    background-image: url(\\\"/icons/copyicon.png\\\");\\n    background-size: contain;\\n    background-repeat: no-repeat;\\n  }\\n\\n  .copy-button:active {\\n    background-image: url(\\\"/icons/checkmark.png\\\");\\n  }\\n\\n  .used {\\n    color: rgba(255, 255, 255, 0.35);\\n    -webkit-text-stroke: 0.05vw rgba(255, 0, 0, 0.35);\\n  }\\n\\n  .not-used {\\n    color: rgba(255, 255, 255, 0.75);\\n    filter: drop-shadow(0 0 0.1vw rgba(51, 226, 230, 0.9));\\n  }\\n\\n  /* Profile icon */\\n\\n  .profile-icon {\\n    position: absolute;\\n    top: 2vw;\\n    right: 2vw;\\n    height: 7vw;\\n    width: 7vw;\\n    cursor: pointer;\\n    background-image: url(\\\"/icons/profileIcon.avif\\\");\\n    background-size: contain;\\n    opacity: 0.4;\\n    z-index: 1;\\n  }\\n\\n  .profile-icon:hover,\\n  .profile-icon:active {\\n    filter: drop-shadow(0 0 1vw rgba(51, 226, 230, 0.5));\\n    opacity: 0.75;\\n  }\\n\\n  @media only screen and (max-width: 600px) {\\n    hr {\\n      margin: 2em 0;\\n    }\\n\\n    button {\\n      font-size: 1.4em;\\n      line-height: 1.4em;\\n      padding: 0.25em 1em;\\n    }\\n\\n    .close-button {\\n      padding: 0.5em;\\n      font-size: 1.5em;\\n      line-height: 1em;\\n    }\\n\\n    .buttons-container {\\n      gap: 1em;\\n      padding-inline: 5vw;\\n    }\\n\\n    .sign-icon {\\n      height: 1em;\\n    }\\n\\n    .sign-lable {\\n      font-size: 1em;\\n      line-height: 1.5em;\\n    }\\n\\n    .sign-title {\\n      text-align: center;\\n      color: #dedede;\\n      font-size: 1.5em;\\n    }\\n\\n    .signup-label {\\n      font-size: 1.1em;\\n      line-height: 1.5em;\\n      padding-inline: 5vw;\\n      margin-bottom: 1em;\\n    }\\n\\n    .validation-check {\\n      font-size: 0.9em;\\n      margin: 0.5em 0;\\n    }\\n\\n    .forgot-password {\\n      font-size: 0.9em;\\n      padding-top: 1.5em;\\n    }\\n\\n    .profile-container {\\n      padding: 1em;\\n      width: 85vw;\\n      height: 65%;\\n      border-radius: 1em;\\n      overflow-y: scroll;\\n    }\\n\\n    .input-label {\\n      font-size: 0.9em;\\n      line-height: 0.9em;\\n      padding-bottom: 0.5em;\\n    }\\n\\n    .user-input {\\n      width: 80vw;\\n      font-size: 1.4em;\\n      line-height: 1.6em;\\n      margin-bottom: 1em;\\n    }\\n\\n    .agreements-container {\\n      width: 95%;\\n      padding-bottom: 1em;\\n    }\\n\\n    .terms,\\n    .newsletter {\\n      font-size: 1em;\\n      line-height: 1.5em;\\n      padding-left: 1em;\\n    }\\n\\n    #terms,\\n    #newsletter {\\n      -webkit-transform: scale(1.5);\\n      transform: scale(1.5);\\n    }\\n\\n    .submit-button {\\n      width: 50vw;\\n    }\\n\\n    .story-games-number-label {\\n      margin: 0.5em 0 1em 0;\\n      font-size: 0.9em;\\n    }\\n\\n    .story-games-number {\\n      font-size: 1em;\\n    }\\n\\n    .user-prop,\\n    .user-prop-value,\\n    .refferal-codes-legend {\\n      font-size: 1em;\\n      line-height: 2.5em;\\n    }\\n\\n    .user-prop-value {\\n      width: 70vw;\\n      height: 2.5em;\\n      margin-bottom: 0.5em;\\n    }\\n\\n    .password-container {\\n      margin-left: 1.75em;\\n      margin-bottom: 0.5em;\\n    }\\n\\n    .password-visibility-button {\\n      width: 1em;\\n      height: 1em;\\n      margin-left: 0.25em;\\n    }\\n\\n    .edit-username,\\n    .edit-password,\\n    .save-changes {\\n      margin: 1em 0.5em;\\n      font-size: 1em;\\n      line-height: 2em;\\n    }\\n\\n    .refferal-codes {\\n      grid-template-columns: 100%;\\n      gap: 0.5em;\\n      padding: 0.5em;\\n      width: 95%;\\n    }\\n\\n    .ref-code-container {\\n      padding: 0 1em;\\n      border-radius: 0.5em;\\n    }\\n\\n    .ref-code {\\n      font-size: 1.2em;\\n      line-height: 3em;\\n    }\\n\\n    .copy-button {\\n      width: 1em;\\n      height: 1em;\\n    }\\n\\n    .profile-icon {\\n      width: 3em;\\n      height: 3em;\\n      top: 1em;\\n      right: 0.5em;\\n    }\\n  }\\n\\n  @keyframes zoom {\\n    from {\\n      transform: scale(1.5);\\n    }\\n    to {\\n      transform: scale(1);\\n    }\\n  }\\n\\n  @keyframes fade {\\n    from {\\n      opacity: 0;\\n    }\\n    to {\\n      opacity: 1;\\n    }\\n  }\\n</style>\\n\"],\"names\":[],\"mappings\":\"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\"}"
};

const Profile = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	let $web3LoggedIn, $$unsubscribe_web3LoggedIn;
	$$unsubscribe_web3LoggedIn = subscribe(web3LoggedIn, value => $web3LoggedIn = value);
	Account.me();
	Account.logged_in();
	let dialog;
	let isLogged;
	let user;

	authenticated.subscribe(value => {
		user = value.user;
		isLogged = value.loggedIn;
	});

	let refCodes;

	referralCodes.subscribe(codes => {
		refCodes = codes;
	});

	let walletAddress;

	wallet.subscribe(value => {
		walletAddress = value;
	});

	let firstNameInput;
	let lastNameInput;
	let passwordInput;
	let passwordMatchValidation;
	let editUsernameBtn;
	let editPasswordBtn;

	$$result.css.add(css$2);

	{
		if (isLogged) {
			Account.referraLCodes();
		}
	}

	$$unsubscribe_web3LoggedIn();

	return ` <span class="profile-icon svelte-1ujcupb" role="button" tabindex="0"></span>  <dialog class="profile-container blur svelte-1ujcupb"${add_attribute("this", dialog, 0)}> <div class="svelte-1ujcupb"><div class="profile-navigation svelte-1ujcupb"><button class="close-button svelte-1ujcupb" data-svelte-h="svelte-1p4qbix">❌</button> ${isLogged
	? `<button class="login-button svelte-1ujcupb" data-svelte-h="svelte-oz0rhl">Log out</button>`
	: ``}</div> ${isLogged
	? ` ${$web3LoggedIn
		? `<hr class="svelte-1ujcupb"> ${(function (__value) {
				if (is_promise(__value)) {
					__value.then(null, noop);
					return ` <div class="story-games-container svelte-1ujcupb" data-svelte-h="svelte-42oydf"><p class="story-games-number-label svelte-1ujcupb">Available story games...</p></div> `;
				}

				return (function (available) {
					return ` <div class="story-games-container svelte-1ujcupb"><p class="story-games-number-label svelte-1ujcupb">You have used
              <span class="story-games-number svelte-1ujcupb">${escape(available.used)} / ${escape(available.available)} weekly</span>
              stories</p> ${available.bonus > 0
					? `<p class="story-games-number-label svelte-1ujcupb">You have
                <span class="story-games-number svelte-1ujcupb">${escape(available.bonus)} bonus</span>
                lives</p>`
					: ``}</div> `;
				})(__value);
			})(CoNexus.available())}`
		: ``} <hr class="svelte-1ujcupb"> <div class="user-profile-info svelte-1ujcupb"><div class="user-properties svelte-1ujcupb"><label for="mail" class="user-prop svelte-1ujcupb" data-svelte-h="svelte-zxs1m5">Email</label> <input class="user-prop-value svelte-1ujcupb" id="mail" type="email"${add_attribute("value", user.email, 0)} disabled> <label for="password" class="user-prop svelte-1ujcupb" data-svelte-h="svelte-x7burm">Password</label> <div class="password-container svelte-1ujcupb"><input class="user-prop-value svelte-1ujcupb" id="password" type="password"${add_attribute("value", user.password, 0)} ${"disabled"
		}${add_attribute(
			"style",
			"",
			0
		)}${add_attribute("this", passwordInput, 0)}> <button class="password-visibility-button svelte-1ujcupb"></button></div> ${``} <label for="first-name" class="user-prop svelte-1ujcupb" data-svelte-h="svelte-79jh6x">First name</label> <input class="user-prop-value svelte-1ujcupb" id="first-name" type="text"${add_attribute("value", user.first_name, 0)} ${"disabled"
		}${add_attribute(
			"style",
			"",
			0
		)}${add_attribute("this", firstNameInput, 0)}> <label for="last-name" class="user-prop svelte-1ujcupb" data-svelte-h="svelte-fyh3h1">Last name</label> <input class="user-prop-value svelte-1ujcupb" id="last-name" type="text"${add_attribute("value", user.last_name, 0)} ${"disabled"
		}${add_attribute(
			"style",
			"",
			0
		)}${add_attribute("this", lastNameInput, 0)}></div></div> <p class="validation-check svelte-1ujcupb"${add_attribute("this", passwordMatchValidation, 0)} data-svelte-h="svelte-s91z1y">Passwords do not match!</p> <div class="edit-buttons svelte-1ujcupb">${`<button class="edit-username svelte-1ujcupb"${add_attribute("this", editUsernameBtn, 0)} data-svelte-h="svelte-1ytescm">Change name</button> <button class="edit-password svelte-1ujcupb"${add_attribute("this", editPasswordBtn, 0)} data-svelte-h="svelte-blxcue">Change password</button>`}</div> <hr class="svelte-1ujcupb"> <div class="wallet-connect svelte-1ujcupb"><p class="user-prop svelte-1ujcupb" data-svelte-h="svelte-1fphi0y">Web3 account:</p> <button class="wallet-button svelte-1ujcupb">${!$web3LoggedIn
		? `Connect Wallet`
		: `${$web3LoggedIn ? `${escape(walletAddress)}` : ``}`}</button></div> <hr class="svelte-1ujcupb"> <div class="google-connect svelte-1ujcupb" data-svelte-h="svelte-xeqsnu"><p class="user-prop svelte-1ujcupb">Web2 account:</p> <button class="google-button svelte-1ujcupb">Connect Google</button></div> <hr class="svelte-1ujcupb"> <p class="refferal-codes-legend svelte-1ujcupb" data-svelte-h="svelte-yafqx5">Your referral codes</p> ${refCodes != null
		? `<div class="refferal-codes svelte-1ujcupb">${each(refCodes, code => {
				return `<div class="ref-code-container svelte-1ujcupb"><input class="${[
					"ref-code svelte-1ujcupb",
					(code.is_used ? "used" : "") + ' ' + (!code.is_used ? "not-used" : "")
				].join(' ').trim()}"${add_attribute("id", code.code, 0)}${add_attribute("value", code.code, 0)} disabled>  <button${add_attribute("id", code.code, 0)} class="copy-button svelte-1ujcupb"></button> </div>`;
			})}</div>`
		: `<button class="svelte-1ujcupb" data-svelte-h="svelte-11mb52m">Get referral codes</button>`}`
	: `${!isLogged
		? `<section class="signin"><p class="sign-title svelte-1ujcupb">${escape("Sign in")}</p> <hr class="svelte-1ujcupb"> ${` ${`<div class="buttons-container svelte-1ujcupb"><button class="sign-button svelte-1ujcupb" data-svelte-h="svelte-12c6xra"><img class="sign-icon svelte-1ujcupb" src="/icons/google.png" alt="Google"> <p class="sign-lable svelte-1ujcupb">with Google</p></button> <button class="sign-button svelte-1ujcupb" data-svelte-h="svelte-im6h3u"><img class="sign-icon svelte-1ujcupb" src="/icons/email.png" alt="Google"> <p class="sign-lable svelte-1ujcupb">with email</p></button> <button class="sign-button svelte-1ujcupb" data-svelte-h="svelte-vvhjng"><img class="sign-icon svelte-1ujcupb" src="/icons/coinbase.png" alt="Google"> <p class="sign-lable svelte-1ujcupb">with Coinbase Smart Wallet</p></button> <button class="sign-button svelte-1ujcupb" data-svelte-h="svelte-t9bkq2"><img class="sign-icon svelte-1ujcupb" src="/icons/walletconnect.png" alt="Google"> <p class="sign-lable svelte-1ujcupb">with browser wallet</p></button></div>`} <hr class="svelte-1ujcupb"> <p class="signup-label svelte-1ujcupb" data-svelte-h="svelte-vwmqn">Don&#39;t have an existing CoNexus account?</p> <div class="buttons-container svelte-1ujcupb"><button class="sign-button svelte-1ujcupb" data-svelte-h="svelte-1wahl6h"><p class="sign-lable svelte-1ujcupb">Sign Up</p></button></div>`
			}</section>`
		: ``}`}</div> </dialog>`;
});

/* src/components/Toast.svelte generated by Svelte v4.2.18 */

const css$1 = {
	code: ".toast.svelte-16cm9u9{position:fixed;top:20px;left:50%;transform:translateX(-50%);padding:10px 20px;border-radius:5px;color:white;display:flex;justify-content:space-between;align-items:center;opacity:1;transition:opacity 0.3s;width:350px}.toast.hidden.svelte-16cm9u9{opacity:0}.toast.info.svelte-16cm9u9{background-color:green}.toast.error.svelte-16cm9u9{background-color:red}.close-btn.svelte-16cm9u9{margin-left:10px;cursor:pointer}",
	map: "{\"version\":3,\"file\":\"Toast.svelte\",\"sources\":[\"Toast.svelte\"],\"sourcesContent\":[\"<script>\\n    import { onMount } from 'svelte';\\n    export let message = '';\\n    export let type = 'info';\\n    export let duration = 5000;\\n    export let onClose;\\n  \\n    let visible = true;\\n  \\n    const closeToast = () => {\\n      visible = false;\\n      if (onClose) onClose();\\n    };\\n  \\n    onMount(() => {\\n      const timer = setTimeout(() => {\\n        closeToast();\\n      }, duration);\\n  \\n      return () => {\\n        clearTimeout(timer);\\n      };\\n    });\\n  </script>\\n  \\n  <style>\\n    .toast {\\n      position: fixed;\\n      top: 20px;\\n      left: 50%;\\n      transform: translateX(-50%);\\n      padding: 10px 20px;\\n      border-radius: 5px;\\n      color: white;\\n      display: flex;\\n      justify-content: space-between;\\n      align-items: center;\\n      opacity: 1;\\n      transition: opacity 0.3s;\\n      width: 350px;\\n    }\\n  \\n    .toast.hidden {\\n      opacity: 0;\\n    }\\n  \\n    .toast.info {\\n      background-color: green;\\n    }\\n  \\n    .toast.error {\\n      background-color: red;\\n    }\\n  \\n    .close-btn {\\n      margin-left: 10px;\\n      cursor: pointer;\\n    }\\n  </style>\\n  \\n  {#if visible}\\n    <div class={`toast ${type} ${visible ? '' : 'hidden'}`}>\\n      <div>{message}</div>\\n      <!-- svelte-ignore a11y-click-events-have-key-events -->\\n      <!-- svelte-ignore a11y-no-static-element-interactions -->\\n      <div class=\\\"close-btn\\\" on:click={closeToast}>✖</div>\\n    </div>\\n  {/if}\\n  \"],\"names\":[],\"mappings\":\"AA0BI,qBAAO,CACL,QAAQ,CAAE,KAAK,CACf,GAAG,CAAE,IAAI,CACT,IAAI,CAAE,GAAG,CACT,SAAS,CAAE,WAAW,IAAI,CAAC,CAC3B,OAAO,CAAE,IAAI,CAAC,IAAI,CAClB,aAAa,CAAE,GAAG,CAClB,KAAK,CAAE,KAAK,CACZ,OAAO,CAAE,IAAI,CACb,eAAe,CAAE,aAAa,CAC9B,WAAW,CAAE,MAAM,CACnB,OAAO,CAAE,CAAC,CACV,UAAU,CAAE,OAAO,CAAC,IAAI,CACxB,KAAK,CAAE,KACT,CAEA,MAAM,sBAAQ,CACZ,OAAO,CAAE,CACX,CAEA,MAAM,oBAAM,CACV,gBAAgB,CAAE,KACpB,CAEA,MAAM,qBAAO,CACX,gBAAgB,CAAE,GACpB,CAEA,yBAAW,CACT,WAAW,CAAE,IAAI,CACjB,MAAM,CAAE,OACV\"}"
};

const Toast = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	let { message = '' } = $$props;
	let { type = 'info' } = $$props;
	let { duration = 5000 } = $$props;
	let { onClose } = $$props;

	if ($$props.message === void 0 && $$bindings.message && message !== void 0) $$bindings.message(message);
	if ($$props.type === void 0 && $$bindings.type && type !== void 0) $$bindings.type(type);
	if ($$props.duration === void 0 && $$bindings.duration && duration !== void 0) $$bindings.duration(duration);
	if ($$props.onClose === void 0 && $$bindings.onClose && onClose !== void 0) $$bindings.onClose(onClose);
	$$result.css.add(css$1);

	return `${`<div class="${escape(null_to_empty(`toast ${type} ${'' }`), true) + " svelte-16cm9u9"}"><div>${escape(message)}</div>   <div class="close-btn svelte-16cm9u9" data-svelte-h="svelte-1dws4u9">✖</div></div>`
	}`;
});

/* src/components/ToastContainer.svelte generated by Svelte v4.2.18 */

const css = {
	code: ".toast-container.svelte-1hsmcre{position:fixed;top:0;left:50%;transform:translateX(-50%);z-index:100}",
	map: "{\"version\":3,\"file\":\"ToastContainer.svelte\",\"sources\":[\"ToastContainer.svelte\"],\"sourcesContent\":[\"<script>\\n    import { toastStore } from '@stores/toast';\\n    import Toast from './Toast.svelte';\\n  \\n    let toasts = [];\\n    toastStore.subscribe(value => {\\n      toasts = value;\\n    });\\n  \\n    const handleClose = (id) => {\\n      toastStore.close(id);\\n    };\\n  </script>\\n  \\n  <style>\\n    .toast-container {\\n      position: fixed;\\n      top: 0;\\n      left: 50%;\\n      transform: translateX(-50%);\\n      z-index: 100;\\n    }\\n  </style>\\n  \\n  <div class=\\\"toast-container\\\">\\n    {#each toasts as { id, message, type, duration }}\\n      <Toast {message} {type} {duration} onClose={() => handleClose(id)} />\\n    {/each}\\n  </div>\\n  \"],\"names\":[],\"mappings\":\"AAeI,+BAAiB,CACf,QAAQ,CAAE,KAAK,CACf,GAAG,CAAE,CAAC,CACN,IAAI,CAAE,GAAG,CACT,SAAS,CAAE,WAAW,IAAI,CAAC,CAC3B,OAAO,CAAE,GACX\"}"
};

const ToastContainer = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	let toasts = [];

	toastStore.subscribe(value => {
		toasts = value;
	});

	const handleClose = id => {
		toastStore.close(id);
	};

	$$result.css.add(css);

	return `<div class="toast-container svelte-1hsmcre">${each(toasts, ({ id, message, type, duration }) => {
		return `${validate_component(Toast, "Toast").$$render(
			$$result,
			{
				message,
				type,
				duration,
				onClose: () => handleClose(id)
			},
			{},
			{}
		)}`;
	})}</div>`;
});

const $$Astro = createAstro();
const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Layout;
  const { title, header, subheading, menuText, footerText, arrow } = Astro2.props;
  return renderTemplate`<html lang="en" data-astro-cid-sckkx6r4> <head><title>${title}</title><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><link rel="icon" type="image/x-icon" href="/favicon.png"><meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests">${renderComponent($$result, "ViewTransitions", $$ViewTransitions, { "data-astro-cid-sckkx6r4": true })}${renderHead()}</head> <body data-astro-cid-sckkx6r4> ${renderComponent($$result, "ToastContainer", ToastContainer, { "data-astro-cid-sckkx6r4": true })} <section class="container" data-astro-cid-sckkx6r4> ${arrow && renderTemplate`<a class="icon arrow" href="../" aria-label="back-arrow" data-astro-cid-sckkx6r4></a>`} ${!arrow && renderTemplate`<a class="icon logo" href="https://degenerousdao.com/" target="_blank" aria-label="dgrs-logo" data-astro-cid-sckkx6r4></a>`} ${header === "CoNexus" ? renderTemplate`<picture data-astro-cid-sckkx6r4> <source srcset="title.avif" type="image/avif" data-astro-cid-sckkx6r4> <img class="title blur" src="title.png" alt="CoNexus" data-astro-cid-sckkx6r4> </picture>` : renderTemplate`<p class="header" data-astro-cid-sckkx6r4>${header}</p>`} ${renderComponent($$result, "Profile", Profile, { "client:load": true, "client:component-hydration": "load", "client:component-path": "@components/Profile.svelte", "client:component-export": "default", "data-astro-cid-sckkx6r4": true })} </section> <p class="subheading" data-astro-cid-sckkx6r4>${unescapeHTML(subheading)}</p> ${renderSlot($$result, $$slots["default"])} ${footerText && footerText.map((text) => renderTemplate`<p class="footer-text" data-astro-cid-sckkx6r4>${text}</p>`)}  </body> </html> <!-- Copyright DeGenerous
Society - All Rights Reserved
Unauthorized copying of this file, via any medium is strictly prohibited
Proprietary and confidential -->`;
}, "/Users/dima/Desktop/conexus/src/layouts/Layout.astro", void 0);

const stories = [
  {
    section: "Community Picks",
    subsection: [
      {
        name: "",
        story: [
          {
            title: "Trojan War",
            description: `
              Play as Achilles to shape the destiny of the Greeks and Trojans while fighting to claim justice for your fallen comrade Patroclus, and avenge the slight against your honor when the beautiful Helen is stolen.
            `,
            storyLink: "",
            primaryThumbnail: "/src/data/titlePicture/CommunityPicks/TrojanWar.avif",
            descriptionImage: "/src/data/descriptionPicture/CommunityPicks/TrojanWar.avif",
            genre: [
              "Action",
              "History",
              "Drama",
              "War"
            ]
          },
          {
            title: "History",
            description: `
              History genre
            `,
            storyLink: "",
            primaryThumbnail: "/src/data/titlePicture/CommunityPicks/TrojanWar.avif",
            descriptionImage: "/src/data/descriptionPicture/CommunityPicks/TrojanWar.avif",
            genre: [
              "History"
            ]
          },
          {
            title: "Action Romance",
            description: `
              Action + Romance genre
            `,
            storyLink: "",
            primaryThumbnail: "/src/data/titlePicture/CommunityPicks/TrojanWar.avif",
            descriptionImage: "/src/data/descriptionPicture/CommunityPicks/TrojanWar.avif",
            genre: [
              "Action",
              "Romance"
            ]
          },
          {
            title: "Drama Romance",
            description: `
              Drama + Romance genre
            `,
            storyLink: "",
            primaryThumbnail: "/src/data/titlePicture/CommunityPicks/TrojanWar.avif",
            descriptionImage: "/src/data/descriptionPicture/CommunityPicks/TrojanWar.avif",
            genre: [
              "Drama",
              "Romance"
            ]
          },
          {
            title: "Thriller",
            description: `
              Thriller genre
            `,
            storyLink: "",
            primaryThumbnail: "/src/data/titlePicture/CommunityPicks/TrojanWar.avif",
            descriptionImage: "/src/data/descriptionPicture/CommunityPicks/TrojanWar.avif",
            genre: [
              "Thriller"
            ]
          },
          {
            title: "History Sport",
            description: `
              History + Sport genre
            `,
            storyLink: "",
            primaryThumbnail: "/src/data/titlePicture/CommunityPicks/TrojanWar.avif",
            descriptionImage: "/src/data/descriptionPicture/CommunityPicks/TrojanWar.avif",
            genre: [
              "History",
              "Sport"
            ]
          },
          {
            title: "Action Biopic Crime",
            description: `
              Action + Biopic + Crime genre
            `,
            storyLink: "",
            primaryThumbnail: "/src/data/titlePicture/CommunityPicks/TrojanWar.avif",
            descriptionImage: "/src/data/descriptionPicture/CommunityPicks/TrojanWar.avif",
            genre: [
              "Action",
              "Biopic",
              "Crime"
            ]
          },
          {
            title: "War Psychological Fantasy Horror",
            description: `
              War + Psychological + Fantasy + Horror genre
            `,
            storyLink: "",
            primaryThumbnail: "/src/data/titlePicture/CommunityPicks/TrojanWar.avif",
            descriptionImage: "/src/data/descriptionPicture/CommunityPicks/TrojanWar.avif",
            genre: [
              "War",
              "Psychological",
              "Fantasy",
              "Horror"
            ]
          },
          {
            title: "Comedy Horror Thriller",
            description: `
              Comedy + Horror genre
            `,
            storyLink: "",
            primaryThumbnail: "/src/data/titlePicture/CommunityPicks/TrojanWar.avif",
            descriptionImage: "/src/data/descriptionPicture/CommunityPicks/TrojanWar.avif",
            genre: [
              "Comedy",
              "Horror",
              "Thriller"
            ]
          }
        ]
      }
    ]
  },
  {
    section: "The Dischordian Saga",
    subsection: [
      {
        name: "FALL OF REALITY (prequel)",
        story: [
          {
            title: "Escape",
            description: `
              Play as a prisoner going through experiments in a guarded prison and try to escape the planet by defeating or fleeing from The Warden.
            `,
            storyLink: "",
            primaryThumbnail: "/src/data/titlePicture/DischordianSaga/Escape1.avif",
            secondaryThumbnail: "/src/data/titlePicture/DischordianSaga/Escape2.avif",
            descriptionImage: "/src/data/descriptionPicture/DischordianSaga/Escape.avif"
          },
          {
            title: "Arena",
            description: `
              Try to escape the prison planet by winning in a series of challenges which may include the gladiator's arena filled with powerful creatures.
            `,
            storyLink: "",
            primaryThumbnail: "/src/data/titlePicture/DischordianSaga/Arena1.avif",
            secondaryThumbnail: "/src/data/titlePicture/DischordianSaga/Arena2.avif",
            descriptionImage: "/src/data/descriptionPicture/DischordianSaga/Arena.avif"
          },
          {
            title: "Inception Ark",
            description: `
              Having escaped from the Prison Planet in a spaceship known as an Inception Ark, a galactic adventure of exploration awaits.  Play as the captain of a spaceship seeking a new  home, allied against the AI overlords, and ways to defeat the Architect.
            `,
            storyLink: "",
            primaryThumbnail: "/src/data/titlePicture/DischordianSaga/InceptionArk1.avif",
            secondaryThumbnail: "/src/data/titlePicture/DischordianSaga/InceptionArk2.avif",
            descriptionImage: "/src/data/descriptionPicture/DischordianSaga/InceptionArk.avif"
          }
        ]
      },
      {
        name: "CLASSES",
        story: [
          {
            title: "Assassin",
            description: `
              Play as Agent Zero, a highly trained assassin working for the forces of humanity, on a mission to infiltrate a base and assassinate an AI target vital to the war effort.
            `,
            storyLink: "",
            primaryThumbnail: "/src/data/titlePicture/DischordianSaga/Assassin1.avif",
            secondaryThumbnail: "/src/data/titlePicture/DischordianSaga/Assassin2.avif",
            descriptionImage: "/src/data/descriptionPicture/DischordianSaga/Assassin.avif"
          },
          {
            title: "Soldier",
            description: `
              Play add the Iron Lion - the greatest general humanity has ever known.  Control armies, make tactical decisions, and lead the fight for humanity’s freedom.
            `,
            storyLink: "",
            primaryThumbnail: "/src/data/titlePicture/DischordianSaga/Soldier1.avif",
            secondaryThumbnail: "/src/data/titlePicture/DischordianSaga/Soldier2.avif",
            descriptionImage: "/src/data/descriptionPicture/DischordianSaga/Soldier.avif"
          },
          {
            title: "Spy",
            description: `
              Play as a double agent known as Eyes of the Watcher, choose between the Insurgency and the Architect's Watcher, and steal highly classified information from the other side.
            `,
            storyLink: "",
            primaryThumbnail: "/src/data/titlePicture/DischordianSaga/Spy1.avif",
            secondaryThumbnail: "/src/data/titlePicture/DischordianSaga/Spy2.avif",
            descriptionImage: "/src/data/descriptionPicture/DischordianSaga/Spy.avif"
          },
          {
            title: "Engineer",
            description: `
              Play as the Engineer, on a mission to fix the universe with inventive solutions, as you are visiting planets in danger from a variety of apocalyptic threats.
            `,
            storyLink: "",
            primaryThumbnail: "/src/data/titlePicture/DischordianSaga/Engineer1.avif",
            secondaryThumbnail: "/src/data/titlePicture/DischordianSaga/Engineer2.avif",
            descriptionImage: "/src/data/descriptionPicture/DischordianSaga/Engineer.avif"
          },
          {
            title: "Oracle",
            description: `
              Play as the Oracle, on a mission to spread the seeds of rebellion against the machine overlords and convince the people of a new world to join the Resistance.
            `,
            storyLink: "",
            primaryThumbnail: "/src/data/titlePicture/DischordianSaga/Oracle1.avif",
            secondaryThumbnail: "/src/data/titlePicture/DischordianSaga/Oracle2.avif",
            descriptionImage: "/src/data/descriptionPicture/DischordianSaga/Oracle.avif"
          },
          {
            title: "Ne-Yon",
            description: `
              Be a part of the rise of the Ne-Yons, a mysterious race of intergalactic demi-gods, and play a key part in the war between the Architect and humanity by deciding your allies, enemies, and using your higher powers.
            `,
            storyLink: "",
            primaryThumbnail: "/src/data/titlePicture/DischordianSaga/NeYon1.avif",
            secondaryThumbnail: "/src/data/titlePicture/DischordianSaga/NeYon2.avif",
            descriptionImage: "/src/data/descriptionPicture/DischordianSaga/NeYon.avif"
          }
        ]
      },
      {
        name: "DISCHORDIAN SAGA",
        story: [
          {
            title: "The Terminus Swarm",
            description: `
              Play as a Potential, an engineered being stranded on a rogue biomass planet teeming with fungal forests and corrosive spores. Armed with biomechanical weapons, you must survive relentless waves of the Terminus Swarm, grotesque insectoid monsters, until you inevitably succumb to the planet's horrors—will you face your demise bravely or fall unexpectedly?
            `,
            storyLink: "",
            primaryThumbnail: "/src/data/titlePicture/DischordianSaga/TheTerminusSwarm1.avif",
            secondaryThumbnail: "/src/data/titlePicture/DischordianSaga/TheTerminusSwarm2.avif",
            descriptionImage: "/src/data/descriptionPicture/DischordianSaga/TheTerminusSwarm.avif"
          },
          {
            title: "Awaken the Clone",
            description: `
              Play as a mind-controlled clone, awakened with a xenomorph helmet and a slave collar, tasked by the malevolent AI Archon known as the Collector to conquer the verdant planet of Thaloria. Navigate through fierce battles against the resolute Thalorian defenders, led by the Hierophant and the ethereal Oracle, while wrestling with the possibility of rebellion or redemption—will you remain a pawn or break free from the Collector's grasp?
            `,
            storyLink: "",
            primaryThumbnail: "/src/data/titlePicture/DischordianSaga/AwakenTheClone1.avif",
            secondaryThumbnail: "/src/data/titlePicture/DischordianSaga/AwakenTheClone2.avif",
            descriptionImage: "/src/data/descriptionPicture/DischordianSaga/AwakenTheClone.avif"
          },
          {
            title: "The Host",
            description: `
              Play as the Host, a Potential transformed into a living extension of the Thought Virus, as you navigate through the multiverse to spread the infection. Journeying through various worlds—science fiction, fantasy, western, or surrealistic—you must confront heroes, armies, scientists, magicians, and politicians, balancing your dark mission against the slim chance of rebellion and redemption amidst a backdrop of horror and suspense—will you spread the Thought Virus or find a way to free your mind?
            `,
            storyLink: "",
            primaryThumbnail: "/src/data/titlePicture/DischordianSaga/TheHost1.avif",
            secondaryThumbnail: "/src/data/titlePicture/DischordianSaga/TheHost2.avif",
            descriptionImage: "/src/data/descriptionPicture/DischordianSaga/TheHost.avif"
          }
        ]
      },
      {
        name: "VISIONS",
        story: [
          {
            title: "Ayylmao",
            description: `
              Play as a grey alien, part of the Ayylmao species, working as an entry-level assistant for the secretive Illuminayyti cabal that controls human history. Given a chance to prove yourself, you must complete missions like replacing a celebrity, hypnotizing teens through YouTube, or building a time machine to trick ancient Egyptians, all while facing human scientists, Truther media, the US Military, and rival Anunnaki aliens—will you succeed and earn your promotion or succumb to the challenges and fail your mission?
            `,
            storyLink: "",
            primaryThumbnail: "/src/data/titlePicture/DischordianSaga/Ayylmao1.avif",
            secondaryThumbnail: "/src/data/titlePicture/DischordianSaga/Ayylmao2.avif",
            descriptionImage: "/src/data/descriptionPicture/DischordianSaga/Ayylmao.avif"
          },
          {
            title: "The Mascoteers",
            description: `
              Play as the Student, a brilliant middle school newcomer in the town of Celebration, invited to join the exclusive afterschool club, the Mascoteers. To prove your worth and become the ninth member, you must complete a mission such as solving a school mystery, helping save an AI child from bullies, or building a time machine, all while facing challenges like authoritarian teachers, ghosts, and a rival adventure group—will you impress the Mascoteers and join their ranks, or fail and face the consequences?
            `,
            storyLink: "",
            primaryThumbnail: "/src/data/titlePicture/DischordianSaga/TheMascoteers1.avif",
            secondaryThumbnail: "/src/data/titlePicture/DischordianSaga/TheMascoteers2.avif",
            descriptionImage: "/src/data/descriptionPicture/DischordianSaga/TheMascoteers.avif"
          },
          {
            title: "The Detective",
            description: `
              Play as a renowned detective navigating the neon-lit corridors of a towering cityscape, where your mission is to unravel the darkest mysteries threatening the AI Empire's fragile balance of order. Armed with your wits and high-tech gadgets, you must confront serial killers, mobsters, corrupt corporations, and the elusive assassin Agent Zero, in a solitary quest for truth and justice—will you prevail or succumb to the dangers lurking in the cybernetic metropolis?
            `,
            storyLink: "",
            primaryThumbnail: "/src/data/titlePicture/DischordianSaga/TheDetective1.avif",
            secondaryThumbnail: "/src/data/titlePicture/DischordianSaga/TheDetective2.avif",
            descriptionImage: "/src/data/descriptionPicture/DischordianSaga/TheDetective.avif"
          },
          {
            title: "Halloween: The Collector",
            description: `
              Play as one of the last human survivors on a zombie-ravaged planet, hunted relentlessly by a nearly indestructible AI Overlord known as the Collector, who seeks to harvest your DNA. Navigate through hordes of zombies, doomsday cultists, serial killers, cannibals, and psychopaths in your desperate quest to find the hidden Sanctuary - will you survive?
            `,
            storyLink: "",
            primaryThumbnail: "/src/data/titlePicture/DischordianSaga/HalloweenTheCollector1.avif",
            secondaryThumbnail: "/src/data/titlePicture/DischordianSaga/HalloweenTheCollector2.avif",
            descriptionImage: "/src/data/descriptionPicture/DischordianSaga/HalloweenTheCollector.avif"
          },
          {
            title: "North Pole Inc.",
            description: `
              Play as a dream engineer from the Planet Christmas, working in the Dreams and Myths division of North Pole Incorporated to spread the concept of Christmas holidays across the universe. Tasked with rescuing Christmas icons like Santa Claus or Rudolph from the evil AI robot, the Collector, you must navigate challenges including AI empire agents, killer clowns from South Pole Inc., robot soldiers, and a sabotaging coworker, Darren—will you save Christmas and earn a promotion, or fall victim to the obstacles and fail your mission?
            `,
            storyLink: "",
            primaryThumbnail: "/src/data/titlePicture/DischordianSaga/NorthPoleInc1.avif",
            secondaryThumbnail: "/src/data/titlePicture/DischordianSaga/NorthPoleInc2.avif",
            descriptionImage: "/src/data/descriptionPicture/DischordianSaga/NorthPoleInc.avif"
          }
        ]
      }
    ]
  },
  {
    section: "Collabs",
    subsection: [
      {
        name: "",
        story: [
          {
            title: "GLMR Apes",
            description: `
              Play as a hyper-intelligent Ape that's been captured by an AI Archon known as The Collector, and try to escape the Dark Zoo, surrounded by the Jailer, and other animals, threats, and allies.
            `,
            storyLink: "",
            primaryThumbnail: "/src/data/titlePicture/Collabs/GLMRApes1.avif",
            descriptionImage: "/src/data/descriptionPicture/Collabs/GLMRApes.avif"
          },
          {
            title: "Lazy Lions",
            description: `
              In the heart of the vast azure ocean lies the Enchanted Private Island, a hidden paradise ruled by the majestic Lazy Lions, who possess wisdom and regal grace. This utopia, with its lush landscapes and ancient secrets, faces a dire threat from Glitch, a former lion of the pride who seeks to conquer the island. As Glitch gathers his ruthless generals, the peaceful Lazy Lions must defend their home, not with violence, but by uncovering the island's forgotten mysteries. Embarking on a journey of bravery and discovery, they strive to protect the island's soul and preserve the harmony that defines their enchanted sanctuary.
            `,
            storyLink: "",
            primaryThumbnail: "/src/data/titlePicture/Collabs/LazyLions1.avif",
            descriptionImage: "/src/data/descriptionPicture/Collabs/LazyLions.avif"
          },
          {
            title: "Tempest: The era of an Empire",
            description: `
              During the era of the Empire in 3067 AD, in a distant galaxy on the harsh desert planet of Zarathar, an exiled former Space Fleet Admiral, a brilliant scientist, and the rightful heir of Milanos, along with her daughter, must join forces with a rebellious prince to navigate deadly political intrigue and uncover ancient secrets to liberate their desolate planet.
              When a cosmic storm crash-lands a spaceship carrying their enemies, they embark on a mission to defeat the evil Empire, sparking an epic battle for redemption and freedom, to restore peace to the Galactic Empire.
            `,
            storyLink: "",
            primaryThumbnail: "/src/data/titlePicture/Collabs/Tempest1.avif",
            descriptionImage: "/src/data/descriptionPicture/Collabs/Tempest.avif"
          }
        ]
      }
    ]
  }
];

export { $$Layout as $, CoNexus as C, add_attribute as a, each as b, create_ssr_component as c, subscribe as d, escape as e, story as f, get_store_value as g, fullscreen as h, storyTitle as i, authenticated as j, web3LoggedIn as k, loading as l, is_promise as m, null_to_empty as n, noop as o, stories as s, validate_component as v, writable as w };
