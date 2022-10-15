import { Router } from 'express'
import { getUsers, getUser, updatedUser, deleteUser } from '../controllers/user.controller.js'
import { verifyToken } from '../middlewares/authJwt.js'

const router = Router()

router.get('/', getUsers)
router.get('/:userId', getUser)
router.put('/:userId', verifyToken, updatedUser)
router.delete('/:userId', verifyToken, deleteUser)


export default router