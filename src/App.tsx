import React, { useCallback, useEffect, useState } from "react";
import EntryForm from "./EntryForm";
import EntryList from "./EntryList";
import ArchiveView from "./ArchiveView";
import { type Entry, getEntries } from "./api";

export default function App() {
	const [entries, setEntries] = useState<Entry[]>([]);
	const [filterTag, setFilterTag] = useState<string | null>(null);
	const [search, setSearch] = useState("");

	const load = useCallback(async () => {
		setEntries(await getEntries());
	}, []);

	useEffect(() => {
		load();
	}, [load]);

	const filtered = entries.filter((e) => {
		const matchesTag = filterTag ? e.tags.includes(filterTag) : true;
		const term = search.toLowerCase();
		const matchesSearch =
			term.length === 0 ||
			e.title.toLowerCase().includes(term) ||
			e.body.toLowerCase().includes(term);
		return matchesTag && matchesSearch;
	});

	return (
		<div>
			<h1>Journal App</h1>
			<EntryForm onSaved={(e) => setEntries((prev) => [...prev, e])} />
			<div>
				<input
					placeholder="Search"
					value={search}
					onChange={(e) => setSearch(e.target.value)}
				/>
				{filterTag && (
					<button type="button" onClick={() => setFilterTag(null)}>
						Clear tag: {filterTag}
					</button>
				)}
			</div>
			<EntryList
				entries={filtered}
				onDelete={(id) => setEntries((prev) => prev.filter((e) => e.id !== id))}
				onUpdate={(entry) =>
					setEntries((prev) => prev.map((e) => (e.id === entry.id ? entry : e)))
				}
				onTagClick={(t) => setFilterTag(t)}
			/>
			<h2>Archive</h2>
			<ArchiveView entries={entries} />
		</div>
	);
}
