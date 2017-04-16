/**
 * Created by kostya on 4/16/2017.
 */
export const sameOriginOption = { credentials: "same-origin" };

export function createPostFetchOptions(body) {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    return {
        ...sameOriginOption,
        method: "POST",
        body: body,
        headers: headers
    };
}

export function createDeleteFetchOptions()
{
    return {
        ...sameOriginOption,
        method: "DELETE"
    }
}

export function createPutFetchOptions(body)
{
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    return {
        ...sameOriginOption,
        method: "PUT",
        body: body,
        headers: headers
    };
}