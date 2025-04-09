import React from 'react';

interface SocialShareProps {
    url: string;
    title: string;
}

const SocialShare: React.FC<SocialShareProps> = ({ url, title }) => {
    const shareOnTwitter = () => {
        window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`, '_blank');
    };

    const shareOnFacebook = () => {
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
    };

    return (
        <div>
            <button onClick={shareOnTwitter}>Share on Twitter</button>
            <button onClick={shareOnFacebook}>Share on Facebook</button>
            {/* Add more social media sharing options here */}
        </div>
    );
};

export default SocialShare;
