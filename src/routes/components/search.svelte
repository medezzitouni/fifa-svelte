<script lang="ts">
	import { cn } from "$lib/utils";

	export let count: number = 0;

</script>

<div class={`
    w-full
    pl-11 md:pl-0
    flex items-center md:justify-center landscape:justify-center
`}>
	<input
		type="text"
		placeholder="Search"
		class={`
        px-4 py-2
        border-2 rounded-lg outline-none
        font-mono font-thin
        portrait:w-5/6 landscape:w-1/2 md:portrait:w-1/2 md:landscape:w-1/3
        `}

        on:input
	/>
	<span class={cn([
        `
        absolute
        portrait:right-2 landscape:right-12 md:portrait:right-20  md:landscape:right-32 lg:landscape:right-56 2xl:landscape:right-64
        rounded-full border border-black
        hidden md:flex justify-center items-center
        md:text-lg
        h-11
        w-11
        `,
        count >= 10000 ? 'w-22 px-1' : ''
    ])}>
		{count}
	</span>
</div>
