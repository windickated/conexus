import { toastStore } from '../stores/toast';

export type ArcadeError = {
    code: number,
    error: string
}

export const new_error = (error: ArcadeError) => {
    console.log(error);
    toastStore.show(`Error ${error.code}: ${error.error}`, 'error');
}
