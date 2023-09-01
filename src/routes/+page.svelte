<script lang="ts">
	import * as API from '$lib/utils/api';
	import List from "./components/List/list.svelte";
	import Search from "./components/search.svelte";
	import type { Player } from "@types";
	import { onMount } from "svelte";

	let players: Player[] = [];
	let count: number = 0;
	let inputState: string = '';
	let pageState: number = 1;
	let limit: number = 6;
	
	$: pageLimit = Math.ceil(count / limit || 1)

	onMount(async () => {
 		const data = await API.get();
		players = data.players;
		count = data.count;
		
	})
	
	const handlePage = async (page: number = pageState) => {
		
        if(pageState !== page){
			pageState = page;

			const data = await API.get({ input: inputState, page: pageState, limit })
			players = data.players;
			count = data.count;
		}
	}

	const handleSearch = async (e: Event) => {

		const input = (e.target as HTMLInputElement)?.value;

		if(inputState !== input){
			inputState = input;
			const data = await API.get({ input: inputState, limit })

			players = data.players;
			count = data.count;
			pageState = 1
		}
    }

</script>


<main class="min-h-[839px] py-6 md:pb-12 flex flex-col items-center gap-6 md:gap-8 ">
	<Search count={count} on:input={handleSearch} />
	<List items={players} count={count} {pageLimit} on:navigate={(data) => handlePage(data.detail)} page={pageState} />
</main>

