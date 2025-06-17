import React from "react";
import { type Entry, deleteEntry } from "./api";

interface Props {
	entries: Entry[];
	onDelete: (id: string) => void;
}

export default function EntryList({ entries, onDelete }: Props) {
	return (
		<ul>
			{entries.map((entry) => (
				<li key={entry.id}>
					<h3>{entry.title}</h3>
					<small>{new Date(entry.timestamp || "").toLocaleString()}</small>
					<p>{entry.body}</p>
					<p>{entry.tags.join(", ")}</p>
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
			))}
		</ul>
	);
}
