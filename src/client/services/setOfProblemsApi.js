import {setAuthToken} from "../utilities/sessionStorage";

export const getSets = () => {
    const headers = setAuthToken({});

    return fetch('/api/sets', {
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

export const getProblemsForSetCreating = () => {
    const headers = setAuthToken({});

    return fetch('/api/problems/set-creating', {
        method: 'GET',
        headers
    })
        .then(response => {
            if (response.status === 200) {
                return response.json()
                    .then(response => response.problems)
            }
            throw response.status;
        })
};

export const addSet = (set) => {
    const headers = setAuthToken({'Content-Type': 'application/json'});

    return fetch('/api/sets/', {
        method: 'POST',
        headers,
        body: JSON.stringify({set})
    })
        .then(response => {
            if (response.status === 200) {
                return response;
            }
            throw response.status;
        })
};

export const getSet = (setId) => {
    const headers = setAuthToken({});

    return fetch('/api/sets/' + setId, {
        method: 'GET',
        headers
    })
        .then(response => {
            if (response.status === 200) {
                return response.json()
                    .then(response => response.set)
            }
            throw response.status
        })
};

export const editSet = (setId, set) => {
    const headers = setAuthToken({'Content-Type': 'application/json'});

    return fetch('/api/sets/' + setId, {
        method: 'POST',
        headers,
        body: JSON.stringify({set})
    })
        .then(response => {
            if (response.status === 200) {
                return true;
            }
            throw response.status
        })
};

export const deleteSet = (setId) => {
    const headers = setAuthToken({});

    return fetch('/api/sets/' + setId, {
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
