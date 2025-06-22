import type { FC } from "react";
import type { journal } from "@/app/lib/client";

interface PageSummaryProps {
	entries: journal.JournalEntry[];
}

const PageSummary: FC<PageSummaryProps> = ({ entries }) => {
	const recentEntries = entries.slice(0, 10);

	return (
		<div className="app-widget">
			<div className="app-widget-header">Page Summary</div>
			<div className="app-widget-content app-page-summary">
				<ul>
					{recentEntries.map((entry) => {
						const subject = entry.subject || "(no subject)";
						return (
							<li key={entry.id}>
								<a href={`#entry-${entry.id}`}>{subject} — 1 comment</a>
							</li>
						);
					})}
				</ul>
			</div>
		</div>
	);
};

export default PageSummary;