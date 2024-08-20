import { writable } from 'svelte/store';
import { get_cookie } from "@lib/cookies";
import { onMount } from 'svelte';

let wasLoggedIn: () => boolean = () => false;

onMount(() => {
wasLoggedIn = () => get_cookie("logged") === "true";

})

export const loggedIn = writable<boolean>(wasLoggedIn());
