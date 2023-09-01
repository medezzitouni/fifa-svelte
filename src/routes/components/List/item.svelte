<script lang="ts">
    import type { Player } from "@types";
    import { truncate } from '$lib/utils';
    export let item: Player;
</script>

<div class='h-80 2xl:h-80 bg-cover bg-no-repeat bg-top bg-gray-600 pt-2 @container' style={`background-image: url(${item.pictureURl})`} >
    <div class="bg-black text-white rounded-e-xl pl-2 w-[56%] @[280px]:w-[48%] @[350px]:w-[36%]">
        {truncate(`${item.firstname} ${item.lastname}`)}
    </div>
    <div class="bg-black text-white rounded-t-md pt-2 text-center w-[3.8rem] h-[2.5rem] absolute bottom-0 right-8">
        {item.goal} <i class="fa fa-soccer-ball-o"></i>
    </div>
</div>