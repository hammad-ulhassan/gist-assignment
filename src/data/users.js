import headers from '../credentials';

const myHeaders = new Headers(headers)


export async function getUserData(profile_url){
    const res = await fetch(profile_url, {headers: myHeaders});
    const resp = await res.json();
    return resp
}