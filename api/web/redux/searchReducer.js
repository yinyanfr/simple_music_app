const searchDefaultState = [];

export default (state = searchDefaultState, action) => {
    switch(action.type){
        case "SETSEARCHLIST":
            return action.data.list
        default:
            return searchDefaultState
    }
}
