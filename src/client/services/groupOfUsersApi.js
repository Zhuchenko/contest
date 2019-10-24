import {setAuthToken} from "../utilities/sessionStorage";

export const getGroups = () => {
    const headers = setAuthToken({});

    return fetch('/api/groups', {
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

export const getUsersForGroupCreating = () => {
    const headers = setAuthToken({});

    return fetch('/api/users/group-creating/participants', {
        method: 'GET',
        headers
    })
        .then(response => {
            if (response.status === 200) {
                return response.json()
                    .then(response => response.users)
            }
            throw response.status;
        })
};

export const addGroup = (group) => {
    const headers = setAuthToken({'Content-Type': 'application/json'});

    return fetch('/api/groups/', {
        method: 'POST',
        headers,
        body: JSON.stringify({group})
    })
        .then(response => {
            if (response.status === 200) {
                return response;
            }
            throw response.status;
        })
};

export const getGroup = (groupId) => {
    const headers = setAuthToken({});

    return fetch('/api/groups/' + groupId, {
        method: 'GET',
        headers
    })
        .then(response => {
            if (response.status === 200) {
                return response.json()
                    .then(response => response.group)
            }
            throw response.status
        })
};

export const editGroup = (groupId, group) => {
    const headers = setAuthToken({'Content-Type': 'application/json'});

    return fetch('/api/groups/' + groupId, {
        method: 'POST',
        headers,
        body: JSON.stringify({group})
    })
        .then(response => {
            if (response.status === 200) {
                return true;
            }
            throw response.status
        })
};

export const deleteGroup = (groupId) => {
    const headers = setAuthToken({});

    return fetch('/api/groups/' + groupId, {
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
