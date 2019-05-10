import express from 'express'
import fetch from 'node-fetch'
import { addParcel } from '../mongoose/api/parcel'
import { getProblemById } from '../mongoose/api/problem'
import { addTestResult } from '../mongoose/api/testResult'
import { addSolution, getSolutionByOptions, updateSolution } from '../mongoose/api/solution'
import { convertTests } from '../utils/convertTest'
import auth from './auth'

const router = express.Router();

router.post('/', auth.required, (req, res) => {
    let {body: {parcel}, payload: {id}} = req;
    parcel.user = id;
    parcel.date = Date.now();

    return (async () => {
        const problem = await getProblemById(parcel.problem);
        const results = await fetch('http://localhost:51786/api/check', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                solution: parcel.code,
                checker: Array.from(problem.checker),
                language: parcel.options.language,
                timeLimit: problem.limitation.time,
                memoryLimit: problem.limitation.memory,
                tests: convertTests(problem.tests)
            })
        })
            .then(response => {
                if (response.status === 200) {
                    console.log('i have got results')
                    return response.json();
                } else {
                    throw response.status
                }
            });
        const parcelId = await addParcel(parcel);
        addTestResult({ parcel: parcelId, tests: results });
        const options = {user: id, problem: parcel.problem, contest: parcel.contest};
        const solution = await getSolutionByOptions(options);

        if (solution) {
            updateSolution(solution._id, {
                attemptNumber: solution.attemptNumber + 1,
                code: parcel.code
            })
        } else {
            addSolution({
                user: id,
                problem: parcel.problem,
                contest: parcel.contest,
                code: parcel.code,
                attemptNumber: 1
            })
        }

        return res.json({results})
    })();
});

module.exports = router;