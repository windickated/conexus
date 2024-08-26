import StoryTile from "@components/storyTile.svelte";
import { new_error } from "@lib/errors";
import {
	background_music,
	background_image,
	story,
	loading,
} from "@stores/conexus";

const url = import.meta.env.PUBLIC_BACKEND;

const tracks = [
	"/music/coNexus/track01.mp3",
	"/music/coNexus/track02.mp3",
	"/music/coNexus/track03.mp3",
];

const shuffle = <T>(array: T[]) => {
	let currentIndex = array.length,
		randomIndex;

	while (currentIndex !== 0) {
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex--;

		[array[currentIndex], array[randomIndex]] = [
			array[randomIndex],
			array[currentIndex],
		];
	}

	return array;
};

export let storyTitle: string;

class CoNexus {
	step_data: StepData;
	readonly #id: string;
	hasFetched = false;
	jobID = null;
	interval: NodeJS.Timer | null = null;

	private constructor(id: string) {
		this.#id = id;
		this.step_data = {} as StepData;
	}

	static async available(): Promise<Available> {
		const response = await fetch(`${url}/available`, {
			method: "POST",
		});

		if (!response.ok) {
			new_error({ code: response.status, error: await response.text() });
		}

		const available: Available = await response.json();

		available.continuable ??= [];

		return available;
	}

	static async start(category: string): Promise<CoNexus> {
		CoNexus.#play_music(category);
		CoNexus.#background_image(category);
		loading.set(true);

		const response = await fetch(`${url}/start`, {
			body: JSON.stringify({
				category: category,
			}),
			method: "POST",
		});

		if (!response.ok) {
			new_error({ code: response.status, error: await response.text() });
		}

		const game_data: GameData = await response.json();

		const story = new CoNexus(game_data.id);
		await story.#set(game_data);

		return story;
	}

	static async continue(continuable: ContinuableStory): Promise<CoNexus> {
		const story_id = continuable.story_id;
		const category = continuable.category;

		CoNexus.#play_music(category);
		CoNexus.#background_image(category);

		const response = await fetch(`${url}/continue`, {
			body: JSON.stringify({ story_id }),
			method: "POST",
		});

		if (!response.ok) {
			new_error({ code: response.status, error: await response.text() });
		}

		const game_data: GameData = await response.json();

		const story = new CoNexus(game_data.id);
		await story.#set(game_data);

		return story;
	}

	static async delete(story_id: string) {
		const response = await fetch(`${url}/story/${story_id}`, {
			method: "DELETE",
		});

		if (!response.ok) {
			new_error({ code: response.status, error: await response.text() });
		}
	}

	static #formatFileName(category: string): string {
		let fileName = category.toLowerCase();
		let formattedFileName = fileName.replace(/[\s.\-\/:]+/g, "");

		storyTitle = formattedFileName;
		console.log(formattedFileName);

		return formattedFileName;
	}

	static #categoryTrack = (category: string) => {
		const formattedFileName = CoNexus.#formatFileName(category);

		return `/music/categories/${formattedFileName}.mp3`;
	};

	static async #play_music(category?: string) {
		let queue: string[] = JSON.parse(localStorage.getItem("queue") ?? "[]");

		if (category) {
			const categoryTrack = CoNexus.#categoryTrack(category);
			const categoryFileExists = await fetch(categoryTrack).then(res => res.ok);

			if (categoryFileExists) {
				background_music.set(categoryTrack);
				return;
			}
		}

		if (queue.length === 0) {
			queue = shuffle([...tracks]);
		}

		background_music.set(queue.pop());

		localStorage.setItem("queue", JSON.stringify(queue));
	}

	static #isValidImageUrl(url: string): Promise<boolean> {
		return new Promise(resolve => {
			const img = new Image();
			img.src = url;
			img.onload = () => resolve(true);
			img.onerror = () => resolve(false);
		});
	}

	static #background_image(category: string) {
		let formattedFileName = CoNexus.#formatFileName(category);

		let url = `/images/categories/${formattedFileName}.avif`;

		CoNexus.#isValidImageUrl(url).then(valid => {
			if (valid) {
				background_image.set(url);
			}
		});
	}

	async next_step(choice: number) {
		loading.set(true);

		const response = await fetch(`${url}/respond`, {
			method: "POST",
			body: JSON.stringify({
				story_id: this.#id,
				choice,
			}),
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
			}, 500); // Adjust the delay as needed
		}
	}

	#start_interval() {
		this.interval = setInterval(async () => {
			await this.#check_image_status();
		}, 10000);
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
				body: JSON.stringify({ story_id: this.#id }),
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
			body: JSON.stringify({ story_id: this.#id }),
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
			body: JSON.stringify({ story_id: this.#id }),
		});

		if (!response.ok) {
			new_error({ code: response.status, error: await response.text() });
		}

		this.step_data.tts = await response.blob();

		story.set(this);
	}

	async #set(data: StepData) {
		this.step_data = data;

		story.set(this);
		loading.set(false);

		await Promise.all([this.#new_generate_image(), this.#tts()]);
	}
}

export default CoNexus;
