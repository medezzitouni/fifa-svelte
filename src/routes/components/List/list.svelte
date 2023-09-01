<script lang="ts">
	import Item from './item.svelte';
	import { createEventDispatcher } from 'svelte';
	import type { Player } from '@types';
	import { cn } from '$lib/utils';
	
	export let items: Player[];
	export let count: number = 0;
	export let page: number = 1;
	export let pageLimit: number;

	const handleNavigation = (value: number) => (e: Event) => page = value <= 0 ? page : value > pageLimit ? pageLimit : value;
	const dispatch = createEventDispatcher();

	$: {
		dispatch('navigate', page);
	}
</script>

<div class="w-full min-h-[650px] flex flex-col lg:flex-row-reverse container">
	<div class=" h-12 w-1/2 mb-3 lg:mb-0 lg:h-full lg:w-2/12 flex lg:flex-col self-center justify-center items-center lg:items-start lg:pl-8 gap-1">
		<button on:click={handleNavigation(page - 1)} class="w-10 h-10 flex justify-center items-center lg:rotate-90 border border-black cursor-pointer hover:shadow-xl shadow-black rounded-s-xl">
			<i class="fa fa-angle-left text-2xl"></i>
		</button>
		<button on:click={handleNavigation(1)} class="w-10 h-10 flex justify-center items-center border border-black cursor-pointer hover:shadow-xl shadow-black ">1</button>
		<button on:click={handleNavigation(2)} class="w-10 h-10 flex justify-center items-center border border-black cursor-pointer hover:shadow-xl shadow-black ">2</button>
		<button on:click={handleNavigation(3)} class="w-10 h-10 flex justify-center items-center border border-black cursor-pointer hover:shadow-xl shadow-black ">3</button>
		<button on:click={handleNavigation(page + 1)} class="w-10 h-10 flex justify-center items-center lg:rotate-90 border border-black cursor-pointer hover:shadow-xl shadow-black rounded-e-xl">
			<i class="fa fa-angle-right text-2xl "></i>
		</button>
		<span class={cn([
			`
			absolute
			portrait:right-4 landscape:right-12
			flex md:hidden justify-center items-center
			rounded-full border border-black
			h-11
			w-11
			`,
			count >= 10000 ? 'w-22 px-1' : ''
		])}>
			{count}
		</span>
	</div>
	{#if items.length !== 0}
	<section class={`
		px-12 lg:pl-24 xl:pl-44 2xl:pl-80 lg:pr-0 xl:pr-0 2xl:pr-0
		flex flex-col gap-2
		md:grid md:grid-cols-2 lg:landscape:grid-cols-3 md:gap-2
		landscape:grid landscape:grid-cols-2
		lg:w-10/12
	`}
	>
		{#each items as item, key}
			<Item {item} />
		{/each}
	</section>
	{:else}
		<div class="lg:w-10/12 min-h-[400px] flex gap-2 items-center justify-center md:pl-44">
			<i class="fa-regular fa-hourglass"></i> No player found!
		</div>
	{/if}
	
</div>