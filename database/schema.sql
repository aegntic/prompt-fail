CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE prompts (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    text TEXT NOT NULL,
    model VARCHAR(255),
    category VARCHAR(255),
    rating INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    viral_score INTEGER
);

CREATE TABLE prompt_outputs (
    id SERIAL PRIMARY KEY,
    prompt_id INTEGER REFERENCES prompts(id),
    type VARCHAR(255),
    content TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE blog_posts (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    image_url VARCHAR(255),
    author VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    viral_score INTEGER
);

CREATE TABLE comments (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    content_id INTEGER,
    content_type VARCHAR(255),
    text TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE tags (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE prompt_tags (
    prompt_id INTEGER REFERENCES prompts(id),
    tag_id INTEGER REFERENCES tags(id),
    PRIMARY KEY (prompt_id, tag_id)
);

CREATE TABLE blog_post_tags (
    blog_post_id INTEGER REFERENCES blog_posts(id),
    tag_id INTEGER REFERENCES tags(id),
    PRIMARY KEY (blog_post_id, tag_id)
);
