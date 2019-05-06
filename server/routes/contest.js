import express from 'express'
import { getContestById, getAllContests, addContest, updateContest, deleteContest } from '../mongoose/api/contest'
import auth from './auth'

const router = express.Router();

router.get('/:contestId', auth.required, (req, res) => {
    return getContestById(req.params.contestId).then((contest, error) => {
        if (error) {
            return res.status(500).end()
        }
        return res.json({contest})
    })
});

router.get('/:', auth.required, (req, res) => {
    return getAllContests().then((contests, error) => {
        if (error) {
            return res.status(500).end()
        }
        return res.json({contests})
    })
});

router.post('/', auth.required, (req, res) => {
    let { body: {contest}, payload: { id }} = req;
    contest.authorId = id;
    contest.isActive = false;
    contest.isFinished = false;

    addContest(contest)
        .then(addedContest => {
            return res.json({ contest: addedContest })
        });
});

router.post('/:contestId', auth.required, (req, res) => {
    const { body: {contest}, params: { contestId }} = req;

    return updateContest(contestId)
        .then(foundContest => {
            if(foundContest) {
                updateProblem(contestId, contest)
                    .then(newContest => {
                        return res.json({ contest: newContest })
                    })
            }
            else{
                return res.status(500).end();
            }
        });
});

router.post('/:contestId/:method', auth.required, (req, res) => {
    const {params: {contestId, method}, payload: {id}} = req;
    let contest;

    getContestById(contestId).then((foundContest, error) => {
        if (error) {
            return res.status(500).end()
        }
        if (foundContest.authorId !== id) {
            return res.status(403).end()
        }
        if (method === "start" && !foundContest.isActive && !foundContest.isFinished) {
            contest.isActive = true;
        }

        if (method === "finish" && foundContest.isActive && !foundContest.isFinished) {
            contest.isActive = false;
            contest.isFinished = true;
        }

        if (contest) {
            updateProblem(contestId, contest)
                .then(newContest => {
                    return res.json({contest: newContest})
                })
        }
    });
});

router.delete('/:contestId', auth.required, (req, res) => {
    return deleteContest(req.params.contestId)
        .then(() => {
            return res.status(200).end();
        })
});

module.exports = router;