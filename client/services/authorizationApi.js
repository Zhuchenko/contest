import {saveToken, clear, setAuthToken} from '../utilities/sessionStorage';

export const getUsername = () => {
    const headers = setAuthToken({ });

    return fetch('/api/signin', {
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

export const signIn = (username, password) => {
    return fetch('/api/signin', {
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
                        return { user };
                    })
            } else {
                return response.json()
                    .then(error => {
                        throw error
                    })
            }
        }).catch(error => ({ error }))
};

export const signUp = (username, password, email, name, lastName) => {
    return fetch('/api/signup', {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password, email, name, lastName})
    })
        .then(response => {
            if (response.status === 200) {
                return response.json()
                    .then(user =>{
                        saveToken(user.token);
                        return { user };
                    })
            } else {
                return response.json()
                    .then(error => {
                        throw error
                    })
            }
        }).catch(error => ({ error }))
};

export const signOut = () => {
    clear();
};