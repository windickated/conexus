import { new_error } from "./errors";
import { background_music, background_image, story, loading } from "../stores/conexus";

const url = import.meta.env.PUBLIC_BACKEND;

type Topic = {
    name: string,
    available: boolean
}

type Category = {
    name: string
    topics: Topic[]
}


export type ContinuableStory = {
    story_id: string
    category: string
    created: string
}

type Available = {
    available: number,
    used: number,
    bonus: number,
    continuable: ContinuableStory[]
    categories: Category[]
}

export type StepData = {
    step: number,
    story: string,
    end: boolean,
    summary: string,
    trait: string,
    options: string[],
    image?: string,
    tts?: Blob
}

export type GameData = {
    id: string,
} & StepData

const tracks = [
    "/music/coNexus/track01.mp3",
    "/music/coNexus/track02.mp3",
    "/music/coNexus/track03.mp3"
];

const shuffle = <T, >(array: T[]) => {
    let currentIndex = array.length, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [array[currentIndex], array[randomIndex]] =
            [array[randomIndex], array[currentIndex]];
    }

    return array;
}

export class CoNexus {
    step_data: StepData;
    readonly #id: string;

    private constructor(id: string) {
        this.#id       = id;
        this.step_data = {} as StepData;
    }

    static async available(): Promise<Available> {
        const response = await fetch(`${url}/available`, {
            method: "POST",
        });

        if (!response.ok) {
            new_error({code: response.status, error: await response.text()});
        }

        const available: Available = await response.json()

        available.continuable ??= [];

        return available;
    }

    static async start(category: string): Promise<CoNexus> {
        CoNexus.#play_music(category);
        CoNexus.#background_image(category);
        loading.set(true)

        const response = await fetch(`${url}/start`, {
            body:   JSON.stringify({
                category: category
            }),
            method: "POST",
        });

        if (!response.ok) {
            new_error({code: response.status, error: await response.text()});
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
            body:   JSON.stringify({story_id}),
            method: "POST",
        });

        if (!response.ok) {
            new_error({code: response.status, error: await response.text()});
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
            new_error({code: response.status, error: await response.text()});
        }
    }
    
    static #formatFileName(category: string): string {
        let fileName = category.toLowerCase();
        let formattedFileName = fileName.replace(/[\s.\-\/]+/g, '');

        return formattedFileName;
    }

    static  #categoryTrack = (category: string) => {
        const formattedFileName = CoNexus.#formatFileName(category);

        // return `https://playground.degenerousdao.com/conexus-categories/music/${formattedFileName}.mp3`;
        return `/conexus-categories/music/${formattedFileName}.mp3`;
    }

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

        background_music.set(queue.pop())

        localStorage.setItem("queue", JSON.stringify(queue));
    }

    static #isValidImageUrl(url: string): Promise<boolean> {
        return new Promise((resolve) => {
          const img = new Image();
          img.src = url;
          img.onload = () => resolve(true);
          img.onerror = () => resolve(false);
        });
    }

    static #background_image(category: string) {
        let formattedFileName = CoNexus.#formatFileName(category);

        // let url =  `https://playground.degenerousdao.com/conexus-categories/images/${formattedFileName}.avif`;
        let url =  `/conexus-categories/images/${formattedFileName}.avif`;

        CoNexus.#isValidImageUrl(url).then((valid) => {
            if (valid) {
                background_image.set(url);
            }
        });
    }

    async next_step(choice: number) {
        loading.set(true)

        const response = await fetch(`${url}/respond`, {
            method: "POST",
            body:   JSON.stringify({
                story_id: this.#id,
                choice
            })
        });

        if (!response.ok) {
            new_error({code: response.status, error: await response.text()});
        }

        await this.#set(await response.json());
    }

    async #generate_image() {
        const response = await fetch(`${url}/image`, {
            method: "POST",
            body:   JSON.stringify({story_id: this.#id})
        });

        if (!response.ok) {
            new_error({code: response.status, error: await response.text()});
        }

        this.step_data.image = await response.text();

        story.set(this)
        loading.set(false)
    }

    async #tts() {
        const response = await fetch(`${url}/tts`, {
            method: "POST",
            body:   JSON.stringify({story_id: this.#id})
        });


        if (!response.ok) {
            new_error({code: response.status, error: await response.text()});
        }

        this.step_data.tts = await response.blob();

        story.set(this)
    }

    async #set(data: StepData) {
        this.step_data = data;

        story.set(this);
        loading.set(false);

        await Promise.all([this.#generate_image(), this.#tts()])
    }
}
