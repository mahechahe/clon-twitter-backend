import { Router } from 'express'
import { verifyToken } from '../middlewares/authJwt.js'
import { createPost, getPosts, getPost, updatedPostById, deletePostById, addLike, disLike } from '../controllers/post.controller.js'

const router = Router()

router.post('/:userId', verifyToken, createPost)
router.get('/', getPosts)
router.get('/:id', getPost)
router.put('/:id', verifyToken, updatedPostById)
router.put('/', verifyToken, addLike)
router.patch('/dislike', verifyToken, disLike)
router.delete('/:id', verifyToken, deletePostById)


export default router