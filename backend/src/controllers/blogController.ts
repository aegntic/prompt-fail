import { Request, Response } from 'express';
import {
    gatherNews,
    selectTopic,
    generateOutline,
    generateContent,
    generateImage,
    reviewContent,
    schedulePost,
    monitorPerformance
} from '../services/blogService';

export const generateBlogPost = async (req: Request, res: Response) => {
    try {
        // 1. Content Gathering
        const news = await gatherNews();

        // 2. Topic Selection
        const topic = await selectTopic(news);

        // 3. Outline Generation
        const outline = await generateOutline(topic);

        // 4. Content Generation
        const content = await generateContent(outline);

        // 5. Image Generation
        const image = await generateImage(content.title, content.text);

        // 6. Review and Editing (Human-in-the-loop)
        const reviewedContent = await reviewContent(content, image);

        // 7. Scheduling and Publication
        const scheduledPost = await schedulePost(reviewedContent);

        // 8. Performance Monitoring
        monitorPerformance(scheduledPost.id);

        res.status(200).json({ message: 'Blog post generated and scheduled!', post: scheduledPost });

    } catch (error: any) {
        console.error('Error generating blog post:', error);
        res.status(500).json({ error: error.message || 'Failed to generate blog post' });
    }
};
