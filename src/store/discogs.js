import axios from 'axios'

const GET_DISCOGS_RELEASES = 'GET_DISCOGS_RELEASES'

const getDiscogsReleases = releases => ({
  type: GET_DISCOGS_RELEASES,
  releases
})

export const getDiscogsReleasesThunk = (artist) => {
  return async dispatch => {
    try {
      const releases = await axios.get(`/api/discogs/${artist}`)
      dispatch(getDiscogsReleases(releases.releases))
    } catch(e) {
      console.log(e)
    }
  }
}

const initialState = [];

const getDiscogsReleasesReducer = (state = initialState, action) => {
  switch(action.type){
    case GET_DISCOGS_RELEASES:
      return action
    default:
    return state
  }
}

export default getDiscogsReleasesReducer
