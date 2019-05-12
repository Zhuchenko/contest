import { setAuthToken } from "../utilities/sessionStorage";

export const getProblem = (problemId) => {
    const headers = setAuthToken({ });

    return fetch('/api/problems/' + problemId, {
        method: 'GET',
        credentials: 'include',
        headers
    })
        .then(response => {
            if (response.status === 200) {
                return response.json()
                    .then(response =>{
                        return response.problem;
                    })
            } else {
                throw response.status
            }
        })
};

export const sendParcel = (parcel, code) => {
    const headers = setAuthToken({});
    const formData = new FormData();
    formData.append('parcel', JSON.stringify(parcel));
    formData.append('code', code);

    return fetch('/api/parcels', {
        method: 'POST',
        credentials: 'include',
        headers,
        body: formData
    })
        .then(response => {
            if (response.status === 200) {
                return response.json()
                    .then(response =>{
                        return response.results;
                    })
            } else {
                return response.json()
                    .then(error => {
                        throw error
                    })
            }
        }).catch(error => ({ error }))
};
