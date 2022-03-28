const spotifyController = (function () {
  const clientId = "b319a600fd7d4cdd968a4f1bf7b9b585";
  const clientSecret = "87c3c36d09c546cbb643b440c6a56c25";
  const redirect_uri = "http://localhost:5000/callback";
  const country = "FR";

  const getToken = async () => {
    const result = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: "Basic " + btoa(clientId + ":" + clientSecret),
      },
      body: "grant_type=client_credentials",
    });

    const data = await result.json();
    return data.access_token;
  };

  const getGenres = async (token) => {
    const result = await fetch(
      `https://api.spotify.com/v1/browse/categories?locale=sv_US`,
      {
        method: "GET",
        headers: { Authorization: "Bearer " + token },
      }
    );

    const data = await result.json();
    return data.categories.items;
  };

  /**
   * Get Several Browse Categories
   * @param {string} token
   * @param {int} limit
   * default 10
   * @param {int} offset
   * default 0
   * @returns items
   */
  const getBrowseCategories = async (token, limit = 10, offset = 0) => {
    const result = await fetch(
      `https://api.spotify.com/v1/browse/categories?country=${country}&limit=${limit}&offset=${offset}`,
      {
        method: "GET",
        headers: { Authorization: "Bearer " + token },
      }
    );
    const data = await result.json();
    return data.categories.items;
  };

  /**
   * Get Album
   * @param {string} token
   * @param {string} id
   * id Album
   * @returns data
   */
  const getAlbum = async (token, id) => {
    const result = await fetch(
      `https://api.spotify.com/v1/albums/${id}?market=${country}`,
      {
        method: "GET",
        headers: { Authorization: "Bearer " + token },
      }
    );
    const data = await result.json();
    return data;
  };
  /**
   * search
   * @param {string} token
   * @param {Array} type
   * default
   * ["album","artist","playlist","track","show","episode"]
   * @param {int} limit
   * default 10
   * @param {int} offset
   * default 0
   * @param {string} searchArtist
   * @returns data
   */
  const search = async (
    token,
    type = ["album", "artist", "playlist", "track", "show", "episode"],
    limit = 10,
    offset = 0,
    searchArtist
  ) => {
    let str = "";
    type.forEach((element) => {
      str = str.concat(",", element);
    });
    str = str.slice(1);

    const result = await fetch(
      `	https://api.spotify.com/v1/search?market=${country}&type=${encodeURIComponent(
        str
      )}&limit=${limit}&offset=${offset}&q=${encodeURIComponent(searchArtist)}`,
      {
        method: "GET",
        headers: { Authorization: "Bearer " + token },
      }
    );
    const data = await result.json();
    return data;
  };
  /**
   * Get Artist
   * info Artist
   * @param {string} token
   * @param {string} id
   * id Artist
   * @returns data
   */
  const getArtist = async (token, id) => {
    const result = await fetch(
      `https://api.spotify.com/v1/artists/${id}?market=${country}`,
      {
        method: "GET",
        headers: { Authorization: "Bearer " + token },
      }
    );
    const data = await result.json();
    return data;
  };
  /**
   * Get Artist's Albums
   * @param {string} token
   * @param {string} id
   * @param {int} limit
   * default 10
   * @param {int} offset
   * default 0
   * @returns items
   */
  const getArtistsAlbums = async (token, id, limit = 10, offset = 0) => {
    const result = await fetch(
      `https://api.spotify.com/v1/artists/${id}/albums?market=${country}&limit=${limit}&offset=${offset}`,
      {
        method: "GET",
        headers: { Authorization: "Bearer " + token },
      }
    );
    const data = await result.json();
    return data;
  };

  const getPlaylistByGenre = async (token, genreId) => {
    const limit = 10;

    const result = await fetch(
      `https://api.spotify.com/v1/browse/categories/${genreId}/playlists?limit=${limit}`,
      {
        method: "GET",
        headers: { Authorization: "Bearer " + token },
      }
    );

    const data = await result.json();
    return data.playlists.items;
  };

  const getTracks = async (token, tracksEndPoint) => {
    const limit = 10;

    const result = await fetch(`${tracksEndPoint}?limit=${limit}`, {
      method: "GET",
      headers: { Authorization: "Bearer " + token },
    });

    const data = await result.json();
    return data.items;
  };

  const getTrack = async (token, trackEndPoint) => {
    const result = await fetch(`${trackEndPoint}`, {
      method: "GET",
      headers: { Authorization: "Bearer " + token },
    });

    const data = await result.json();
    return data;
  };

  return {
    getToken() {
      return getToken();
    },
    getGenres(token) {
      return getGenres(token);
    },
    getPlaylistByGenre(token, genreId) {
      return getPlaylistByGenre(token, genreId);
    },
    getTracks(token, tracksEndPoint) {
      return getTracks(token, tracksEndPoint);
    },
    getTrack(token, trackEndPoint) {
      return getTrack(token, trackEndPoint);
    },
  };
})();
