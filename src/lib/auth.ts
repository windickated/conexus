import { Web3Provider } from "./ethers";
import { new_error } from "./errors";
import { loggedIn } from "../stores/account";

const url = import.meta.env.PUBLIC_BACKEND;

const message = (nonce: string) => `
Sign this message to prove you're an Inception Ark NFT holder.

It will not cause a blockchain transaction, nor any gas fees.

Nonce:
${nonce}`;

export class Account {
	#username: string;
	#admin: boolean;
	#user?: User;

	private constructor(username: string, admin: boolean) {
		this.#username = username;
		this.#admin = admin;
	}

	static async logged_in(): Promise<boolean> {
		if (loggedIn) {
			const response = await fetch(`${url}/logged-in`, {
				method: "POST",
			});

			const logged_in = response.ok;

			if (logged_in) {
				return true;
			}
			loggedIn.set(false);
		}

		return false;
	}

	static async log_in(): Promise<Account> {
		const provider = await Web3Provider.init();

		const nonce = await Account.get_nonce();

		const signature = await provider.sign(message(nonce));

		const response = await fetch(`${url}/login`, {
			method: "POST",
			body: JSON.stringify({
				wallet: await provider.userAddress(),
				signature: signature,
			}),
		});

		if (!response.ok) {
			new_error({ code: response.status, error: await response.text() });
		}

		loggedIn.set(true);

		type Account = {
			username: string;
			admin: boolean;
		};

		// const {username, admin}: Account = await response.json();

		return new Account("username", false);
	}

	private static async get_nonce(): Promise<string> {
		const provider = await Web3Provider.init();

		const response = await fetch(`${url}/nonce`, {
			method: "POST",
			body: JSON.stringify({
				wallet: await provider.userAddress(),
			}),
		});

		if (!response.ok) {
			new_error({ code: response.status, error: await response.text() });
		}

		return await response.text();
	}

	static async log_out(): Promise<void> {
		await fetch(`${url}/logout`, {
			method: "POST",
		});

		loggedIn.set(false);
	}

	static async signin(data: SignIn) {
		console.log(data);
		const response = await fetch(`${url}/signin`, {
			method: "POST",
			body: JSON.stringify(data),
		});

		if (!response.ok) {
			new_error({ code: response.status, error: await response.text() });
		}

		const { data: user } = await response.json();

		loggedIn.set(true);
	}

	static async signup(data: SignUp) {
		const response = await fetch(`${url}/signup`, {
			method: "POST",
			body: JSON.stringify(data),
		});

		if (!response.ok) {
			new_error({ code: response.status, error: await response.text() });
		}

		const { data: user } = await response.json();
		
		loggedIn.set(true);
	}
	
	static async signupReferral(data: ReferralSignUp) {
		const response = await fetch(`${url}/signup-referral`, {
			method: "POST",
			body: JSON.stringify(data),
		});
		
		if (!response.ok) {
			new_error({ code: response.status, error: await response.text() });
		}

		const { data: user } = await response.json();

		loggedIn.set(true);
	}

	static async signout() {
		const response = await fetch(`${url}/logout`, {
			method: "POST",
		});

		if (!response.ok) {
			new_error({ code: response.status, error: await response.text() });
		}

		loggedIn.set(false);
	}
}
