import React from 'react';

interface LeaderboardItem {
    id: number;
    name: string;
    score: number;
}

const Leaderboard: React.FC = () => {
    // Placeholder data - replace with actual data fetching
    const topUsers: LeaderboardItem[] = [
        { id: 1, name: "UserA", score: 120 },
        { id: 2, name: "UserB", score: 110 },
        { id: 3, name: "UserC", score: 100 }
    ];

    const topPrompts: LeaderboardItem[] = [
        { id: 1, name: "PromptX", score: 150 },
        { id: 2, name: "PromptY", score: 140 },
        { id: 3, name: "PromptZ", score: 130 }
    ];

    return (
        <div>
            <h2>Top Users</h2>
            <ul>
                {topUsers.map(user => (
                    <li key={user.id}>{user.name} - {user.score}</li>
                ))}
            </ul>

            <h2>Top Prompts</h2>
            <ul>
                {topPrompts.map(prompt => (
                    <li key={prompt.id}>{prompt.name} - {prompt.score}</li>
                ))}
            </ul>
        </div>
    );
};

export default Leaderboard;
