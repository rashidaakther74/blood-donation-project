import express, { Router } from 'express';
import { createBloodRequest, getActiveRequests, searchDonors } from './request.controller';

const router: Router = express.Router();

router.post('/create', createBloodRequest);
router.get('/active', getActiveRequests);
router.get('/search-donors', searchDonors);

export const RequestRoutes = router;