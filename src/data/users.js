export const headers = {
    Accept: "application/vnd.github.v3+json",
    Authorization: "Bearer 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",
};

export async function getUserData(profile_url){
    const res = await fetch(profile_url, {headers: headers});
    const resp = await res.json();
    return resp
}