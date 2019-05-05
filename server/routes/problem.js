import express from 'express'
import authenticationCheckMiddleware from '../middlewares/authenticationCheck'
import { maxAllowedAttachmentLength } from '../mongoose'
import { getProblemById, addProblem } from '../mongoose/api/problem'

const router = express.Router();

router.route('/problems/:problemId')
    .all(authenticationCheckMiddleware)
    .get((req, res) => {
        return getProblemById(req.params.problemId).then((problem, error) => {
            if (error) {
                return res.status(500).end()
            }
            res.json({problem})
        })
    })
    .post((req, res) => {
        if (!req.headers['content-length'] || Number(req.headers['content-length']) > maxAllowedAttachmentLength) {
            return res.status(400).end()
        }
        return addProblem(req.params.candidateId, req.params.commentId, req.files.attachment).then((result, error) => {
            if (error) {
                return res.status(500).end()
            }
            res.end()
        })
    });

export default router