import { v4 } from 'uuid';
import { API_URL } from "$lib/utils/constants";
import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { debug } from '$lib/utils/debug';

const headers: Headers = new Headers({
    'Content-type': 'application/json'
})

export const GET: RequestHandler = async ({ url }) => {
   try {
    const search = url.searchParams.get('search') ?? '';
    const page = parseInt(url.searchParams.get('page') ?? '1') || 1;
    const limit = parseInt(url.searchParams.get('limit') ?? '6') || 6;
    
    const res = await fetch(`${API_URL}?fullName_like=${search}&_page=${page}&_limit=${limit}`, {
        headers
    });

    const count = Number(res.headers.get("x-total-count") || 0);
    const players = await res.json();

    return json({
        players,
        count,
        limit
    });
   } catch (err) {
        debug(err)
        throw error(500, "something went wrong!")
   }
}


export const POST: RequestHandler = async ({ request }) => {
    try {
        const data = await request.json();
        data.id = v4();
        const res = await fetch(new Request(API_URL, {
            method: 'POST',
            body: JSON.stringify(data),
            headers
        }));

        return new Response((await res.json()), {
            status: res.status
        });
    } catch (err) {
        debug(err)
        throw error(500, "something went wrong!")
    }
    
}
