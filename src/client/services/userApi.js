import { setAuthToken } from "../utilities/sessionStorage";

export const getUsers = () => {
    return fetch('/api/users', {
        method: 'GET',
        //credentials: 'include'
    })
        .then(response => {
            if (response.status === 200) {
                return response.json();
            } else {
                throw response.status;
            }
        })
};

export const getUser = (userId) => {
    const headers = setAuthToken({ });

    return fetch('/api/users/' + userId, {
        method: 'GET',
        credentials: 'include',
        headers
    })
        .then(response => {
            if (response.status === 200) {
                return response.json()
                    .then(response =>{
                        return response.user;
                    })
            } else {
                throw response.status
            }
        })
};

export const editUser = (userId, user) => {
    return fetch('/api/users/' + userId, {
        method: 'POST',
        //credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
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
    return fetch('/api/users/' + userId, {
        method: 'DELETE',
        //credentials: 'include'
    })
        .then(response => {
            if (response.status === 200) {
                return response;
            } else {
                throw response.status
            }
        })
};
