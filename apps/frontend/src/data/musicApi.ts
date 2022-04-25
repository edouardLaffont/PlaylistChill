import API from "./Api";

export async function getTracks() {
    try {
        const response = await API.get('/v1/tracks')
        return Promise.resolve(response.data)
    } catch (err) {
        return Promise.reject(err)
    }
}