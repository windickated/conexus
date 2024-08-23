import { toastStore } from "@stores/toast";

export const new_error = (error: ConexusError) => {
	toastStore.show(`Error ${error.code}: ${error.error}`, "error");
};
