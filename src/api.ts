export interface Entry {
	id?: string;
	title: string;
	body: string;
	tags: string[];
	timestamp?: string;
}

const base = "http://localhost:4000";

export async function getEntries(): Promise<Entry[]> {
	const res = await fetch(`${base}/entries`);
	return res.json();
}

export async function saveEntry(entry: Entry): Promise<Entry> {
	const res = await fetch(`${base}/entries`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(entry),
	});
	return res.json();
}

export async function updateEntry(
	id: string,
	entry: Partial<Entry>,
): Promise<Entry> {
	const res = await fetch(`${base}/entries/${id}`, {
		method: "PUT",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(entry),
	});
	return res.json();
}

export async function deleteEntry(id: string): Promise<void> {
	await fetch(`${base}/entries/${id}`, { method: "DELETE" });
}
