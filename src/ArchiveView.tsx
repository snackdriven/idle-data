import React from "react";
import { type Entry } from "./api";

interface Props {
	entries: Entry[];
}

export default function ArchiveView({ entries }: Props) {
	const months = new Map<string, Map<number, number>>();

	for (const entry of entries) {
		if (!entry.timestamp) continue;
		const date = new Date(entry.timestamp);
		const monthKey = `${date.getFullYear()}-${date.getMonth()}`;
		const day = date.getDate();
		if (!months.has(monthKey)) months.set(monthKey, new Map());
		const days = months.get(monthKey)!;
		days.set(day, (days.get(day) ?? 0) + 1);
	}

	const formatMonth = (key: string) => {
		const [y, m] = key.split("-").map(Number);
		return new Date(y, m).toLocaleString(undefined, {
			month: "long",
			year: "numeric",
		});
	};

	return (
		<div>
			{[...months.entries()].map(([monthKey, days]) => (
				<div key={monthKey} style={{ marginBottom: 16 }}>
					<h3>{formatMonth(monthKey)}</h3>
					<ul>
						{[...days.entries()].map(([day, count]) => (
							<li key={day}>
								{day}: {count} entr{count > 1 ? "ies" : "y"}
							</li>
						))}
					</ul>
				</div>
			))}
		</div>
	);
}
