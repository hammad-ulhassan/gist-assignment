import headers from '../credentials';


export async function getAllPublicGists(page){
  const resp = await fetch("https://api.github.com/gists/public?" + new URLSearchParams({per_page: 10,page: page,}),{headers});
  const res = await resp.json();
  return res
}

export const getGist = async ({url}) => {
  const response = await fetch(url, {headers: headers});
  if (!response.ok) {
    throw new Error("Gist Data coud not be fetched!");
  } else {
    const res = await response.json();
    return res;
  }
};

export const createGist = async (gistPostData)=>{
  const resp = await fetch("https://api.github.com/gists", {method:'post', headers, body: JSON.stringify(gistPostData)});
  const res = await resp.json();
  return res;
}

export const updateGist = async (gist_id, gistPostData)=>{
  const resp = await fetch(`https://api.github.com/gists/${gist_id}`, {method:'patch', headers, body: JSON.stringify(gistPostData)});
  const res = await resp.json();
  return res;
}

export async function getGistsForUser({login}){
  // "/users/:username/gists"
  // const {username} = JSON.parse(localStorage.getItem('credentials'));
  const resp = await fetch(`https://api.github.com/users/${login}/gists`, {headers});
  const res = await resp.json();
  return res;
}

export async function getGistsForUserTable(login, page=1){
  const resp = await fetch(`https://api.github.com/users/${login}/gists?`+ new URLSearchParams({per_page: 10,page: page,}), {headers});
  const res = await resp.json();
  return res;
}

export async function getAuthenticatedUserData(){
  // const creds = JSON.parse(localStorage.getItem('credentials'));
  const resp = await fetch(`https://api.github.com/user`, {headers});
  const res = await resp.json();
  return res;
}

export async function deleteGist(gist_id){
  const resp = await fetch(`https://api.github.com/gists/${gist_id}`, {method:'delete', headers});
  return resp;
}

export async function forkGist(gist_id){
  const resp = await fetch(`https://api.github.com/gists/${gist_id}/forks`, {method:'post', headers});
  return resp;
}

export async function starGist(gist_id){
  const resp =  await fetch(`https://api.github.com/gists/${gist_id}/star`, {method: 'put', headers});
  return resp;
}
