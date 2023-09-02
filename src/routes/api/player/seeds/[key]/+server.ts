import { env } from '$env/dynamic/private';
import { debug } from '$lib/utils/debug';
import { PrismaClient } from '@prisma/client';
import runSeeds from '@seeds';
import { json } from '@sveltejs/kit';
import type { RequestHandler, RouteParams } from '../../$types';

type DefaultRouteParams = { params: RouteParams & { key?: string } };

const prisma = new PrismaClient();

export const GET: RequestHandler = async ({ params }: DefaultRouteParams) => {
    try {
        const { key } = params;
        console.log('====================================');
        console.log(env.SEEDS_KEY);
        console.log('====================================');
        if(key == env.SEEDS_KEY) {
            runSeeds();
            
            return json(null, {
                status: 200
            })
        }else {
            return json({
                message: 'wrong seeds key'
            }, {
                status: 400
            })
        }
    } catch (err) {
        debug(err)
        return json({
            message: "something went wrong!"
        }, {
            status: 400
        })
    } finally {
        await prisma.$disconnect();
    }
}