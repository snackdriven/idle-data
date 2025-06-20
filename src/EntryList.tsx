import React, { useState } from "react";
import { type Entry, deleteEntry, updateEntry } from "./api";

interface Props {
        entries: Entry[];
        onDelete: (id: string) => void;
        onUpdate: (entry: Entry) => void;
        onTagClick?: (tag: string) => void;
}

export default function EntryList({ entries, onDelete, onUpdate, onTagClick }: Props) {
        return (
                <ul>
                        {entries.map((entry) => (
                                <EntryItem
                                        key={entry.id}
                                        entry={entry}
                                        onDelete={onDelete}
                                        onUpdate={onUpdate}
                                        onTagClick={onTagClick}
                                />
                        ))}
                </ul>
        );
}

interface ItemProps {
        entry: Entry;
        onDelete: (id: string) => void;
        onUpdate: (entry: Entry) => void;
        onTagClick?: (tag: string) => void;
}

function EntryItem({ entry, onDelete, onUpdate, onTagClick }: ItemProps) {
        const [editing, setEditing] = useState(false);
        const [title, setTitle] = useState(entry.title);
        const [body, setBody] = useState(entry.body);
        const [tags, setTags] = useState(entry.tags.join(", "));

        if (editing) {
                return (
                        <li>
                                <form
                                        onSubmit={async (e) => {
                                                e.preventDefault();
                                                if (!entry.id) return;
                                                const updated = await updateEntry(entry.id, {
                                                        title,
                                                        body,
                                                        tags: tags.split(/,\s*/).filter(Boolean),
                                                });
                                                onUpdate(updated);
                                                setEditing(false);
                                        }}
                                >
                                        <input value={title} onChange={(e) => setTitle(e.target.value)} />
                                        <textarea value={body} onChange={(e) => setBody(e.target.value)} />
                                        <input value={tags} onChange={(e) => setTags(e.target.value)} />
                                        <button type="submit">Save</button>
                                        <button type="button" onClick={() => setEditing(false)}>
                                                Cancel
                                        </button>
                                </form>
                        </li>
                );
        }

        return (
                <li>
                        <h3>{entry.title}</h3>
                        <small>{new Date(entry.timestamp || "").toLocaleString()}</small>
                        <p>{entry.body}</p>
                        <p>
                                {entry.tags.map((t) => (
                                        <button
                                                key={t}
                                                type="button"
                                                onClick={() => onTagClick?.(t)}
                                                style={{ marginRight: 4 }}
                                        >
                                                {t}
                                        </button>
                                ))}
                        </p>
                        <button type="button" onClick={() => setEditing(true)}>
                                Edit
                        </button>
                        <button
                                type="button"
                                onClick={() => {
                                        if (!entry.id) return;
                                        deleteEntry(entry.id).then(() => onDelete(entry.id));
                                }}
                        >
                                Delete
                        </button>
                </li>
        );
}
