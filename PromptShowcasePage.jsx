import React, { useState, useEffect } from 'react';
import PromptCard from './PromptCard';
import { fetchPrompts } from './api';

const PromptShowcasePage = () => {
    const [prompts, setPrompts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadPrompts = async () => {
            setLoading(true);
            try {
                const data = await fetchPrompts();
                setPrompts(data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        loadPrompts();
    }, []);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
    };

    const filteredPrompts = prompts.filter(prompt => {
        const searchMatch = prompt.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            prompt.description.toLowerCase().includes(searchTerm.toLowerCase());
        const categoryMatch = selectedCategory === '' || prompt.category === selectedCategory;
        return searchMatch && categoryMatch;
    });

    if (loading) {
        return <div>Loading prompts...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div>
            <h1>Prompt Showcase</h1>
            <div>
                <input
                    type="text"
                    placeholder="Search prompts..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
                <select value={selectedCategory} onChange={handleCategoryChange}>
                    <option value="">All Categories</option>
                    <option value="Surreal">Surreal</option>
                    <option value="Funny">Funny</option>
                    <option value="Technical">Technical</option>
                </select>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {filteredPrompts.map(prompt => (
                    <PromptCard key={prompt.id} prompt={prompt} />
                ))}
            </div>
        </div>
    );
};

export default PromptShowcasePage;
