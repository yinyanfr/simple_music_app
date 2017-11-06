const testDefaultState = [];

export default (state = testDefaultState, action) => {
    switch (action.type) {
        case "SETUSER":
            return [action.data];
        default:
            return state;
    }
}
