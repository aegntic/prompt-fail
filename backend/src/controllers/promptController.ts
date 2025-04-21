import { Request, Response } from 'express';

export const sendPrompt = (req: Request, res: Response) => {
  // This is a placeholder. Implement actual AI interaction here.
  const userMessage = req.body.message;
  console.log('Received message:', userMessage);

  // Simulate a basic AI response for now
  const aiResponse = `You said: "${userMessage}". This is a simulated response from the backend.`;

  res.json({ response: aiResponse });
};