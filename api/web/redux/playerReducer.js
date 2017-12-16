const playerDefaultState = {
    playlist: [],
    nowplaying: ""
}

export default (state = playerDefaultState, action) => {

    switch(action.type){
        case "CHANGETRACK":
            return {
                playlist: state.playlist,
                nowplaying: action.data.link
            }
        case "CHANGEPLAYLIST":
            return {
                playlist: action.data.playlist,
                nowplaying: ""
            }
        case "STOPMUSIC":
            return {
                playlist: state.playlist,
                nowplaying: ""
            }
        default:
            return state
    }
}
