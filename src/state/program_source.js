import { writable } from "svelte/store";
import source from "../temp_script.js";
// STORES THE PROGRAM's SOURCE

export const program_source = writable(source);
