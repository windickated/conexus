import { writable } from 'svelte/store';

export const loggedIn = writable<boolean>(false);
export const authUser = writable<Nullable<User>>(null);