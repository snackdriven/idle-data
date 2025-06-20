import type React from "react";
import { useState } from "react";
import { type Entry, saveEntry } from "./api";

interface Props {
	onSaved: (entry: Entry) => void;
}

export default function EntryForm({ onSaved }: Props) {
        const [title, setTitle] = useState("");
        const [body, setBody] = useState("");
        const [tags, setTags] = useState("");
        const [timestamp, setTimestamp] = useState("");

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
                const entry = await saveEntry({
                        title,
                        body,
                        tags: tags.split(",").map((t) => t.trim()),
                        timestamp: timestamp || undefined,
                });
                setTitle("");
                setBody("");
                setTags("");
                setTimestamp("");
                onSaved(entry);
        };

	return (
		<form onSubmit={handleSubmit}>
			<input
				value={title}
				onChange={(e) => setTitle(e.target.value)}
				placeholder="Title"
			/>
			<textarea
				value={body}
				onChange={(e) => setBody(e.target.value)}
				placeholder="Body"
			/>
                        <input
                                value={tags}
                                onChange={(e) => setTags(e.target.value)}
                                placeholder="Tags (comma)"
                        />
                        <input
                                type="datetime-local"
                                value={timestamp}
                                onChange={(e) => setTimestamp(e.target.value)}
                                placeholder="Timestamp"
                        />
                        <button type="submit">Save</button>
                </form>
        );
}
