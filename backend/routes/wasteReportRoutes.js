import express from 'express';
import { body } from 'express-validator';
import { validate } from '../middleware/validation.js';
import { authenticate, isAdmin, isDriver } from '../middleware/auth.js';
import {
  createReport,
  getReports,
  getReportById,
  updateReportStatus,
  deleteReport,
  getUserReports,
  getNearbyReports
} from '../controllers/wasteReportController.js';

const router = express.Router();

// Validation rules
const createReportValidation = [
  body('location').trim().notEmpty().withMessage('Location is required'),
  body('latitude').isFloat().withMessage('Valid latitude is required'),
  body('longitude').isFloat().withMessage('Valid longitude is required'),
  body('description').trim().notEmpty().withMessage('Description is required'),
  body('wasteType').trim().notEmpty().withMessage('Waste type is required')
];

const updateStatusValidation = [
  body('status').trim().notEmpty().withMessage('Status is required')
];

// Routes
router.post('/', authenticate, createReportValidation, validate, createReport);
router.get('/', authenticate, getReports);
router.get('/my-reports', authenticate, getUserReports);
router.get('/nearby', authenticate, isDriver, getNearbyReports);
router.get('/:id', authenticate, getReportById);
router.put('/:id/status', authenticate, isDriver, updateStatusValidation, validate, updateReportStatus);
router.delete('/:id', authenticate, isAdmin, deleteReport);

export default router;
