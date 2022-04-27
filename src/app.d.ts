/// <reference types="@sveltejs/kit" />

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare namespace App {
	interface Locals {
		userid: string;
	}
}

interface Problem {
	url: string;
	provider: string;
	solvedBy: string[];
	topics: string[];
	id: number;
	name: string;
	createdAt: string;
	week: number;
}
