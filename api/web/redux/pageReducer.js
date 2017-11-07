const pageDefaultState = {
    pagename: 'auth',
    pid: "",
    sid: ""
};

export default (state = pageDefaultState, action) => {
    let {pagename, pid, sid} = action.data || state;
    switch (action.type) {
        case "SETPAGENAME":
            return {
                pagename,
                pid: state.pid,
                sid: state.sid
            };
        case "SETPAGEALL":
            return {
                pagename,
                pid,
                sid
            };
        case "SETPID":
            return {
                pagename: state.pagename,
                pid,
                sid: state.pagename
            };
        case "SETSID":
            return {
                pagename: state.pagename,
                pid: state.pid,
                sid
            };
        case "SETIDS":
            return {
                pagename: state.pagename,
                pid,
                sid
            }
        default:
            return state;
    }
}
