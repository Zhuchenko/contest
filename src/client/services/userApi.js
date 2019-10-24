import {setAuthToken} from "../utilities/sessionStorage";

export const getUsers = () => {
    const headers = setAuthToken({});

    return fetch('/api/users', {
        method: 'GET',
        headers
    })
        .then(response => {
            if (response.status === 200) {
                return response.json();
            } else {
                throw response.status;
            }
        })
};

export const addUser = (user) => {
    const headers = setAuthToken({'Content-Type': 'application/json'});

    return fetch('/api/users/', {
        method: 'POST',
        headers,
        body: JSON.stringify({user})
    })
        .then(response => {
            if (response.status === 200) {
                return response;
            } else {
                throw response.status;
            }
        })
};

export const getUser = (userId) => {
    const headers = setAuthToken({});

    return fetch('/api/users/' + userId, {
        method: 'GET',
        headers
    })
        .then(response => {
            if (response.status === 200) {
                return response.json()
                    .then(response => {
                        return response.user;
                    })
            } else {
                throw response.status
            }
        })
};

export const editUser = (userId, user) => {
    const headers = setAuthToken({'Content-Type': 'application/json'});

    return fetch('/api/users/' + userId, {
        method: 'POST',
        headers,
        body: JSON.stringify({user})
    })
        .then(response => {
            if (response.status === 200) {
                return true;
            } else {
                throw response.status
            }
        })
};

export const deleteUser = (userId) => {
    const headers = setAuthToken({});

    return fetch('/api/users/' + userId, {
        method: 'DELETE',
        headers
    })
        .then(response => {
            if (response.status === 200) {
                return response;
            } else {
                throw response.status
            }
        })
};

export const getUnverifiedUser = (userId) => {
    const headers = setAuthToken({});

    return fetch('/api/users/unverified/' + userId, {
        method: 'GET',
        headers
    })
        .then(response => {
            if (response.status === 200) {
                return response.json()
                    .then(response => {
                        return response.user;
                    })
            }
            throw response.status;
        })
};

export const editUnverifiedUser = (userId, user) => {
    const headers = setAuthToken({'Content-Type': 'application/json'});

    return fetch('/api/users/unverified/' + userId, {
        method: 'POST',
        headers,
        body: JSON.stringify({user})
    })
        .then(response => {
            if (response.status === 200) {
                return true;
            }
            throw response.status;
        })
};

export const deleteUnverifiedUser = (userId) => {
    const headers = setAuthToken({});

    return fetch('/api/users/unverified/' + userId, {
        method: 'DELETE',
        headers
    })
        .then(response => {
            if (response.status === 200) {
                return response;
            }
            throw response.status;
        })
};
