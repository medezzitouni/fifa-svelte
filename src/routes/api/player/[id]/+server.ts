import { debug } from '$lib/utils/debug';
import { PrismaClient } from '@prisma/client';
import { error, json } from '@sveltejs/kit';
import type { RequestHandler, RouteParams } from '../$types';

type DefaultRouteParams = { params: RouteParams & { id?: string } };

const prisma = new PrismaClient();

export const GET: RequestHandler = async ({ params }: DefaultRouteParams) => {
    try {
        const { id } = params;
        console.log(id);
        
        const player = await prisma.player.findUnique({
            where: {
                id
            }
        })

        const agg = await prisma.player.aggregate({
			_count: { _all: true },
            where: {
				id
			}
		});
        
        
        return json({
            player,
            count: agg._count._all
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

        const updatedPlayer = await prisma.player.update({
            where: {
                id
            },
            data
        })

        return json(updatedPlayer, {
            status: 200
        });
    } catch (err) {
        debug(err)
        throw error(500, "something went wrong!")
    }

}

export const DELETE: RequestHandler = async ({ params }: DefaultRouteParams) => {
    try {
        const { id } = params;

        const deletedPlayer = await prisma.player.delete({
            where: {
                id
            }
        });

        return json(deletedPlayer, {
            status: 200
        });
    } catch (err) {
        debug(err)
        throw error(500, "something went wrong!")
    }

}