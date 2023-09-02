import { debug } from '$lib/utils/debug';
import { PrismaClient } from '@prisma/client';
import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

const prisma = new PrismaClient();

export const GET: RequestHandler = async ({ url }) => {
	try {
		const search = url.searchParams.get('search') ?? '';
		const page = parseInt(url.searchParams.get('page') ?? '1') || 1;
		const limit = parseInt(url.searchParams.get('limit') ?? '6') || 6;

		const where: object = {
			OR: [
				{
					 firstname: {
						startsWith: search,
						mode: 'insensitive'
					},
				},
				{
					lastname: {
						startsWith: search,
						mode: 'insensitive'
					}
				}
			]
		}
		const players = await prisma.player.findMany({
            where,
			skip: (page - 1) * limit,
			take: limit
		});

		const agg = await prisma.player.aggregate({
			_count: { _all: true },
            where
		});
        
		return json({
			players: players || [],
			count: agg._count._all || 0,
			limit,
            page
		});
	} catch (err) {
		debug(err);
		throw error(500, 'something went wrong!');
	}
};

export const POST: RequestHandler = async ({ request }) => {
	try {
		const data = await request.json();
		const createdPlayer = await prisma.player.create({
            data
        });

		return json(createdPlayer, {
            status: 201
        })
	} catch (err) {
		debug(err);
		throw error(500, 'something went wrong!');
	}
};
