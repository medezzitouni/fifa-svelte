import { API_URL } from "$lib/utils/constants";
import { error, json } from '@sveltejs/kit';
import type { RequestHandler, RouteParams } from '../$types';
import { debug } from '$lib/utils/debug';

type DefaultRouteParams = { params: RouteParams & { id?: string } };

const headers: Headers = new Headers({
    'Content-type': 'application/json'
})

export const GET: RequestHandler = async ({ params }: DefaultRouteParams) => {
    try {
        const { id } = params;
        const res = await fetch(`${API_URL}${id ? '/' + id : ''}`, {
            headers
        });

        const count = Number(res.headers.get("x-total-count") || 0);
        const players = await res.json();

        return json({
            players,
            count
        });
    } catch (err) {
        debug(err)
        throw error(500, "something went wrong!")
    }
}

type PutType = { params: RouteParams & { id?: string }, request: Request }

export const PUT: RequestHandler = async ({ params, request }: PutType) => {
    try {
        const data = await request.json();
        const { id } = params;

        const res = await fetch(new Request(`${API_URL}${id ? '/' + id : ''}`, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers
        }));

        return new Response(null, {
            status: res.status
        });
    } catch (err) {
        debug(err)
        throw error(500, "something went wrong!")
    }

}


export const DELETE: RequestHandler = async ({ params }: DefaultRouteParams) => {
    try {
        const { id } = params;

        const res = await fetch(new Request(`${API_URL}${id ? '/' + id : ''}`, {
            method: 'DELETE',
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