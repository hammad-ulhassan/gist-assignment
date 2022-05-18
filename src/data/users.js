export const headers = {
    Accept: "application/vnd.github.v3+json",
    Authorization: "Bearer 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",
};

export async function getUserData(profile_url){
    const res = await fetch(profile_url, {headers: headers});
    const resp = await res.json();
    return resp
}