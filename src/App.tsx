import React, { useCallback, useEffect, useState } from "react";
import EntryForm from "./EntryForm";
import EntryList from "./EntryList";
import { type Entry, getEntries } from "./api";

export default function App() {
	const [entries, setEntries] = useState<Entry[]>([]);

	const load = useCallback(async () => {
		setEntries(await getEntries());
	}, []);

	useEffect(() => {
		load();
	}, [load]);

	return (
		<div>
			<h1>Journal App</h1>
			<EntryForm onSaved={(e) => setEntries((prev) => [...prev, e])} />
			<EntryList
				entries={entries}
				onDelete={(id) => setEntries((prev) => prev.filter((e) => e.id !== id))}
			/>
		</div>
	);
}
