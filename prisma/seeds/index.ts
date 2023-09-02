import { PrismaClient } from '@prisma/client';
import { debug } from 'util';
import data from './data.json' assert { type: 'json' };
const prisma = new PrismaClient();

async function runSeeds() {
    const users = data.players.map(player => {
        return prisma.player.create({
            data: player
        });
    })
    const res = await Promise.all(users)
    console.log(res);
}

runSeeds()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		debug(e);
		await prisma.$disconnect();
		process.exit(1);
	});
