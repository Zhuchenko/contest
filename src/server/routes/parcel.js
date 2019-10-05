import express from 'express'
import fetch from 'node-fetch'
import { addParcel } from '../mongoose/api/parcel'
import { getProblemById } from '../mongoose/api/problem'
import { addTestResult } from '../mongoose/api/testResult'
import { addSolution, getSolutionByOptions, updateSolution } from '../mongoose/api/solution'
import { convertTests } from '../utils/convertTest'
import auth from '../config/auth'

const router = express.Router();

router.post('/', auth.required, (req, res) => {
    let {body: {parcel}, files: {code}, payload: {id}} = req;
    parcel = JSON.parse(parcel);
    parcel.user = id;
    parcel.date = Date.now();
    parcel.code = code.data;
    return (async () => {
        const problem = await getProblemById(parcel.problem);
        const results = await fetch('http://localhost:51786/api/check', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                solution: Array.from(code.data),
                checker: Array.from(problem.checker),
                language: parcel.options.language,
                timeLimit: problem.limitation.time,
                memoryLimit: problem.limitation.memory,
                tests: convertTests(problem.tests)
            })
        })
            .then(response => {
                if (response.status === 200) {
                    return response.json();
                } else {
                    throw response.status
                }
            });
        const parcelId = await addParcel(parcel);
        await addTestResult({ parcel: parcelId, tests: results });
        const options = {user: id, problem: parcel.problem, contest: parcel.contest};
        const solution = await getSolutionByOptions(options);

        if (solution) {
            await updateSolution(solution._id, {
                attemptNumber: solution.attemptNumber + 1,
                code: parcel.code
            })
        } else {
            await addSolution({
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