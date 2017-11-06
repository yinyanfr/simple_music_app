const userDefaultState = 0;

export default (state = userDefaultState, action) => {
    switch (action.type) {
        case "SETUSER":
            return action.data;
        case "DELETEUSER":
            return false;
        default:
            return state;
    }
}
