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
                return response.json();
            } else {
                throw response.status
            }
        })
};

export const signup = (username, password) => {
    return fetch('/signup', {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password})
    })
        .then(response => {
            if (response.status === 200) {
                return response.json();
            } else {
                throw response.status
            }
        })
};
