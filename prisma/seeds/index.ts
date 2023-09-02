import { PrismaClient } from '@prisma/client';
import data from './data.json' assert { type: 'json' };
const prisma = new PrismaClient();

export default async function runSeeds() {
    // clear database
    await prisma.player.deleteMany()

    const users = data.players.map(player => {
        return prisma.player.create({
            data: player
        });
    })
    const res = await Promise.all(users)
    console.log('====================================');
    console.log("seeds succeeded !".toUpperCase());
    console.log(res);
    console.log('====================================');

    
}

