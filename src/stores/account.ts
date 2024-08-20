import { writable } from 'svelte/store';
import { get_cookie } from "../lib/cookies";

const wasLoggedIn = () => get_cookie("logged") === "true";

export const loggedIn = writable<boolean>(wasLoggedIn());
