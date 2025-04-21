import { Router } from 'express';
const router = Router();
import { sendPrompt } from '../controllers/promptController';

router.post('/send', sendPrompt);
// Add prompt routes here
export default router;