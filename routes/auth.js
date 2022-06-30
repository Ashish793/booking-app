import express from 'express';
import { register, login } from '../controller/auth.js';
import {createError} from '../utils/error.js';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post('/register', register)
router.post('/login', login)

export default router