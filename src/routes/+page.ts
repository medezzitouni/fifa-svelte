// import { API_URL } from "$lib/utils/constants";
// import type { PageLoad } from "./$types";
// import { browser } from "$app/environment";

// export const load: PageLoad = async () => {
//     if(browser) {
//         const res = await fetch(`${API_URL}?_page=${1}&_limit=${6}`, {
//             headers: {
//                 'Content-type': 'application/json'
//             }
//         });
    
//         const count = Number(res.headers.get("x-total-count") || 0);
//         const players = await res.json();
    
//         return {
//             players,
//             count
//         }
//     }else {
//         return {
//             players: [],
//             count: 0
//         }
//     }
// }


// const req = new Request(API_URL, {
//     method: 'POST',
//     body: JSON.stringify({
//         input,
//     }),
//     headers: {
//         'Content-type': 'application/json'
//     }
// });