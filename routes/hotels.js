import express from 'express';
import Hotel from '../modals/Hotel.js';
import { createHotel,
    deleteHotel,
    getHotel,
    getHotels,
    updateHotel,
} from '../controller/hotel.js';
import {createError} from '../utils/error.js';
import { verifyAdmin } from '../utils/verifyToken.js';

const router = express.Router();

// CREATE
router.post('/', verifyAdmin, createHotel);

// UPDATE
router.put('/:id', verifyAdmin,  updateHotel);

// DELETE
router.delete('/:id', verifyAdmin, deleteHotel);

// GET
router.get('/:id', getHotel);

// GET ALL
router.get('/', getHotels);
router.get('/countByCity', getHotels);
router.get('/countByType', getHotels);

export default router