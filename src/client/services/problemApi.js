import {setAuthToken} from "../utilities/sessionStorage";

export const getProblem = (problemId) => {
    const headers = setAuthToken({});

    return fetch('/api/problems/' + problemId, {
        method: 'GET',
        headers
    })
        .then(response => {
            if (response.status === 200) {
                return response.json()
                    .then(response => {
                        return response.problem;
                    })
            } else {
                throw response.status
            }
        })
};

export const addProblem = ({problem, checker, tests}) => {
    const headers = setAuthToken({});

    const formData = new FormData();
    const descriptions = [];
    for (let i = 0, l = tests.length; i < l; i++) {
        formData.append('input' + i, tests[i].input);
        formData.append('output' + i, tests[i].output);
        descriptions[i] = tests[i].description;
    }
    formData.append('checker', checker);
    formData.append('descriptions', JSON.stringify(descriptions));
    formData.append('problem', JSON.stringify(problem));

    return fetch('/api/problems/', {
        method: 'POST',
        headers,
        body: formData
    })
        .then(response => {
            if (response.status === 200) {
                return response;
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
                    .then(response => {
                        return response.results;
                    })
            } else {
                return response.json()
                    .then(error => {
                        throw error
                    })
            }
        }).catch(error => ({error}))
};
