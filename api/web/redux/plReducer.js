const plDefaultState = [];

const findPlAndDelete = (pid, pls) => {
    console.log("pid", pid, pls)
    var res = [];
    for(let i = 0; i < pls.length; i++){
        if(pls[i].pid !== pid){
            res.push(pls[i])
        }
    }
    return res;
}

export default (state = plDefaultState, action) => {
    switch (action.type) {
        case "ADDPLONE":
            return [...state, action.data];
        case "DELETEPLONE":
            return findPlAndDelete(action.pid, state);
        case "ADDPLALL":
            return [...state, ...action.data];
        case "REFRESHPL":
            return action.data
        case "UNSHIFTPLONE":
            return [action.data, ...state];
        default:
            return state;
    }
}