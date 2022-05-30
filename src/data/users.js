import headers from '../credentials';


export async function getUserData(profile_url){
    const res = await fetch(profile_url, {headers: headers});
    const resp = await res.json();
    return resp
}