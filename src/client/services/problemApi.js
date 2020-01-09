import {setAuthToken} from "../utilities/sessionStorage";

export const getProblems = () => {
    const headers = setAuthToken({});

    return fetch('/api/problems/', {
        method: 'GET',
        headers
    })
        .then(response => {
            if (response.status === 200) {
                return response.json();
            } else {
                throw response.status
            }
        })
};

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

export const getProblemFromContest = (contestId, problemId) => {
    const headers = setAuthToken({});

    return fetch('/api/contests/' + contestId + '/problems/' + problemId, {
        method: 'GET',
        headers
    })
        .then(response => {
            if (response.status === 200) {
                return response.json();
            } else {
                throw response.status
            }
        })
};

export const editProblem = (id, problem) => {
    const headers = setAuthToken({'Content-Type': 'application/json'});

    return fetch('/api/problems/' + id, {
        method: 'POST',
        headers,
        body: JSON.stringify({problem})
    })
        .then(response => {
            if (response.status === 200) {
                return response;
            } else {
                throw response.status
            }
        })
};

export const addProblem = ({problem, checker, generator, tests}) => {
    const headers = setAuthToken({});

    const formData = new FormData();
    const descriptions = [];
    for (let i = 0, l = tests.length; i < l; i++) {
        formData.append('input' + i, tests[i].input);
        formData.append('output' + i, tests[i].output);
        descriptions[i] = tests[i].description;
    }
    formData.append('checker', checker);
    formData.append('generator', generator);
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

export const deleteProblem = (id) => {
    const headers = setAuthToken({});

    return fetch('/api/problems/' + id, {
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