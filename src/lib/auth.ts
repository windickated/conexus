import { new_error } from "@lib/errors";
import { Web3Provider } from "@lib/ethers";
import { web3LoggedIn, referralCodes, authenticated } from "@stores/account";

const url = import.meta.env.PUBLIC_BACKEND;

const message = (nonce: string) => `
Sign this message to prove you're an Inception Ark NFT holder.

It will not cause a blockchain transaction, nor any gas fees.

Nonce:
${nonce}`;

class Account {
	#username: string;
	#admin: boolean;
	#user?: User;

	private constructor(username: string, admin: boolean) {
		this.#username = username;
		this.#admin = admin;
	}

	static async logged_in(): Promise<boolean> {
		if (web3LoggedIn) {
			try {
				const response = await fetch(`${url}/logged-in`, {
					method: "POST",
				});

				const logged_in = response.ok;

				if (logged_in) {
					return true;
				}
				web3LoggedIn.set(false);
			} catch (error) {
				web3LoggedIn.set(false);
			}
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

		web3LoggedIn.set(true);

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

		web3LoggedIn.set(false);
	}

	static async signin(data: SignIn): Promise<void> {
		try {
			const response = await fetch(`${url}/signin`, {
				method: "POST",
				body: JSON.stringify(data),
			});

			if (!response.ok) {
				new_error({ code: response.status, error: await response.text() });
			}

			const resp = await response.json();

			authenticated.set({ user: resp.user, loggedIn: true });
		} catch (error) {
			new_error({ code: 500, error: error });
		}
	}

	static async me() {
		try {
			const response = await fetch(`${url}/me`);

			if (!response.ok) {
				new_error({ code: response.status, error: await response.text() });
			}

			const resp = await response.json();

			authenticated.set({ user: resp.user, loggedIn: true });
		} catch (error) {
			new_error({ code: 500, error: `Error fetching user: ${error}` });
		}
	}

	static async signup(data: SignUp): Promise<void> {
		const response = await fetch(`${url}/signup`, {
			method: "POST",
			body: JSON.stringify(data),
		});

		if (!response.ok) {
			new_error({ code: response.status, error: await response.text() });
		}

		const resp = await response.json();

		authenticated.set({ user: resp.user, loggedIn: true });
	}

	static async signupReferral(data: ReferralSignUp): Promise<void> {
		const response = await fetch(`${url}/signup-referral`, {
			method: "POST",
			body: JSON.stringify(data),
		});

		if (!response.ok) {
			new_error({ code: response.status, error: await response.text() });
		}

		const resp = await response.json();

		authenticated.set({ user: resp.user, loggedIn: true });
	}

	static async signout(): Promise<void> {
		const response = await fetch(`${url}/logout`, {
			method: "POST",
		});

		if (!response.ok) {
			new_error({ code: response.status, error: await response.text() });
		}

		authenticated.set({ user: null, loggedIn: false });
	}

	static async referraLCodes(): Promise<void> {
		try {
			const response = await fetch(`${url}/referral/get`, {
				method: "GET",
			});

			if (!response.ok) {
				new_error({ code: response.status, error: await response.text() });
			}

			const referralC = await response.json();

			referralCodes.set(referralC.codes);
		} catch (error) {
			new_error({ code: 500, error: error });
		}
	}
}

export default Account;
