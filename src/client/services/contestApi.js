import {setAuthToken} from "../utilities/sessionStorage";

export const getContests = () => {
    const headers = setAuthToken({});

    return fetch('/api/contests', {
        method: 'GET',
        headers
    })
        .then(response => {
            if (response.status === 200) {
                return response.json();
            }
            throw response.status;
        })
};

export const getContestTableView = (contestId) => {
    const headers = setAuthToken({});

    return fetch('/api/contests/table-view/' + contestId, {
        method: 'GET',
        headers
    })
        .then(response => {
            if (response.status === 200) {
                return response.json();
            }
            throw response.status;
        })
};

export const getContest = (contestId) => {
    const headers = setAuthToken({});

    return fetch('/api/contests/' + contestId, {
        method: 'GET',
        headers
    })
        .then(response => {
            if (response.status === 200) {
                return response.json();
            }
            throw response.status;
        })
};

export const getGroupsForContestCreating = () => {
    const headers = setAuthToken({});

    return fetch('/api/contests/creating/groups', {
        method: 'GET',
        headers
    })
        .then(response => {
            if (response.status === 200) {
                return response.json()
                    .then(response => response.groups)
            }
            throw response.status;
        })
};

export const getSetsForContestCreating = () => {
    const headers = setAuthToken({});

    return fetch('/api/contests/creating/sets', {
        method: 'GET',
        headers
    })
        .then(response => {
            if (response.status === 200) {
                return response.json()
                    .then(response => response.sets)
            }
            throw response.status;
        })
};

export const addContest = (contest) => {
    const headers = setAuthToken({'Content-Type': 'application/json'});

    return fetch('/api/contests/', {
        method: 'POST',
        headers,
        body: JSON.stringify({contest})
    })
        .then(response => {
            if (response.status === 200) {
                return response;
            }
            throw response.status;
        })
};

export const editContest = (contestId, contest) => {
    const headers = setAuthToken({'Content-Type': 'application/json'});

    return fetch('/api/contests/' + contestId, {
        method: 'POST',
        headers,
        body: JSON.stringify({contest})
    })
        .then(response => {
            if (response.status === 200) {
                return true;
            }
            throw response.status
        })
};

export const deleteContest = (contestId) => {
    const headers = setAuthToken({});

    return fetch('/api/contests/' + contestId, {
        method: 'DELETE',
        headers
    })
        .then(response => {
            if (response.status === 200) {
                return response;
            }
            throw response.status
        })
};
