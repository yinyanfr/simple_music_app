const pageDefaultState = {
    pagename: 'logo',
    pid: "",
    sid: ""
};

export default (state = pageDefaultState, action) => {
    let {pagename, pid, sid, prev} = action.data || state;
    console.log(action.type)
    switch (action.type) {
        case "SETPAGENAME":
            return {
                pagename,
                pid: state.pid,
                sid: state.sid,
                prev
            };
        case "SETPAGEALL":
            return {
                pagename,
                pid,
                sid,
                prev
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
