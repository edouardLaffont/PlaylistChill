import API from "./Api";

export async function getTracks() {
    try {
        const response = await API.get('/v1/tracks')
        return Promise.resolve(response.data)
    } catch (err) {
        return Promise.reject(err)
    }
}

export async function getTracksByKind(kind: string) {
    try {
        const response = await API.get(`/v1/tracks/kind/${kind}`)
        return Promise.resolve(response.data)
    } catch (err) {
        return Promise.reject(err)
    }
}

export async function getNewTrack() {
    try {
        const response = await API.get('/v1/next')
        console.log(response.data)
        return Promise.resolve(response.data)
    } catch (err) {
        return Promise.reject(err)
    }
}

export async function addLike(idUser: number, idTrack: number) {
    try {
        const response = await API.post(`/v1/like/person/${idUser}/add`, {
            "id_track": idTrack
        })
        return Promise.resolve(response.data)
    } catch (err) {
        return Promise.reject(err)
    }
}

export async function getSuggestions(idUser: number) {
    try {
        const response = await API.get(`/v1/suggestions/${idUser}`)
        return Promise.resolve(response.data)
    } catch (err) {
        return Promise.reject(err)
    }
}

export async function getUser(idUser: number) {
    try {
        const response = await API.get(`/v1/person/${idUser}`)
        return Promise.resolve(response.data)
    } catch (err) {
        return Promise.reject(err)
    }
}
