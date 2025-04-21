import express, { Request, Response, Router } from 'express';
import { reliabilityService } from '../services/reliabilityService';

const router: Router = express.Router();

/**
 * @route GET /api/reliability/status
 * @description Fetches the current reliability status for all monitored AI services.
 *              Results are cached on the backend.
 * @access Public
 */
router.get('/status', async (req: Request, res: Response) => {
  try {
    const statuses = await reliabilityService.fetchAllStatuses();
    res.json(statuses);
  } catch (error: any) {
    console.error('Error fetching reliability statuses:', error);
    // Avoid sending detailed internal errors to the client
    res.status(500).json({ message: 'Failed to fetch reliability statuses.' });
  }
});

export default router;