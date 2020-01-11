import {clear, saveToken, setAuthToken} from '../utilities/sessionStorage';

export const init = () => {
    const headers = setAuthToken({});

    return fetch('/api/signin', {
        method: 'GET',
        credentials: 'include',
        headers
    })
        .then(response => {
            if (response.status === 200) {
                return response.json();
            }
        })
};

export const signIn = (email, password) => {
    return fetch('/api/signin', {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email, password})
    })
        .then(response => {
            if (response.status === 200) {
                return response.json()
                    .then(user => {
                        saveToken(user.token);
                        return {user};
                    })
            }
            return response.json();
        })
};

export const signUp = (personalData) => {
    return fetch('/api/signup', {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(personalData)
    })
        .then(response => {
            return response.json();
        })
};

export const signOut = () => {
    clear();
};