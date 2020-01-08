import express from 'express'
import fetch from 'node-fetch'
import * as db from '../mongoose/DatabaseHandler'
import {convertTests} from '../utils/convertTest'
import auth from '../config/auth'

const router = express.Router();

router.post('/', auth.required, async (req, res) => {
    let {body: {parcel}, files: {code}, payload: {id}} = req;
    parcel = JSON.parse(parcel);
    const {contestId, problemId, options: {language}} = parcel;

    try {
        const isParticipant = await db.isParticipantInTheContest(id, contestId);
        const {isActive} = await db.getContestById(contestId);

        if (!isParticipant || !isActive) return res.status(403).end();

        const parcelId = await db.addParcel({
            ...parcel,
            authorId: id,
            date: Date.now(),
            code: code.data
        });

        const {checker, tests, limitation: {time, memory}} = await db.getProblemByIdInContest(contestId, problemId);
        const results = await fetch('http://localhost:51786/api/check', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                solution: Array.from(code.data),
                checker: Array.from(checker.buffer),
                language, timeLimit: time, memoryLimit: memory,
                tests: convertTests(tests)
            })
        }).then(response => {
            if (response.status === 200) {
                return response.json();
            } else {
                throw response.status
            }
        });
        await db.addTestResult({parcelId, tests: results});

        const solution = await db.getSolutionByOptions({authorId: id, problemId, contestId});
        if (solution) {
            await db.updateSolution(solution.id, {
                attemptNumber: solution.attemptNumber + 1,
                code: code.data
            })
        } else {
            await db.addSolution({
                authorId: id,
                problemId,
                contestId,
                code: code.data,
                attemptNumber: 1
            })
        }

        return res.status(200).json({results})
    } catch (error) {
        return res.status(500).json({error})
    }
});

module.exports = router;