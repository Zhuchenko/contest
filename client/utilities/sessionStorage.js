export const saveToken = (token) => {
    sessionStorage.setItem("token", token);
};

export const clear = () => {
    sessionStorage.clear();
};

export const setAuthToken = (headers) => {
    const token = sessionStorage.getItem("token");

    if (token) {
        headers['Authorization'] = 'Bearer ' + token;
    }

    return headers;
};