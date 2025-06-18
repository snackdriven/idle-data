CREATE TABLE journal_entries (
    id SERIAL PRIMARY KEY,
    subject TEXT,
    body TEXT NOT NULL,
    mood TEXT,
    music TEXT,
    tags TEXT[],
    privacy TEXT DEFAULT 'public',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
