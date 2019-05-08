import {saveToken, clear, setAuthToken} from '../utilities/sessionStorage';

export const getUsername = () => {
    const headers = setAuthToken({ });

    return fetch('/signin', {
        method: 'GET',
        credentials: 'include',
        headers
    })
        .then(response => {
            if (response.status === 200) {
                return response.json()
                    .then(user =>{
                        return user.username;
                    })
            } else {
                throw response.status
            }
        })
};

export const signin = (username, password) => {
    return fetch('/signin', {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    })
        .then(response => {
            if (response.status === 200) {
                return response.json()
                    .then(user =>{
                        saveToken(user.token);
                        return user;
                    })
            } else {
                throw response.json()
            }
        })
};

export const signup = (username, password, email, name, lastname) => {
    return fetch('/signup', {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password, email, name, lastname})
    })
        .then(response => {
            if (response.status === 200) {
                return response.json()
                    .then(user =>{
                        saveToken(user.token);
                        return user;
                })
            } else {
                throw response.json()
            }
        })
};

export const signout = () => {
    clear();
};