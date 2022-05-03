import API from "./Api";

export async function login(username: string) {
    try {
        const response = await API.post('/v1/connect', {
            username: username.trim()
        })
        return Promise.resolve(response.data)
    } catch (err) {
        return Promise.reject(err)
    }
}