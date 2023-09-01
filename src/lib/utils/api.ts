
import { PLAYER_API_URL } from "$lib/utils/constants";

type Filters = { input?: string, page?: number, limit?: number };

export const get = async ({ input = '', page = 1, limit = 6 }: Filters = {}) => {
    const res = await fetch(`${PLAYER_API_URL}?search=${input}&page=${page}&limit=${limit}`);
    return await res.json();
}