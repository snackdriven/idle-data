import type { FC } from "react";
import { DateTime } from "luxon";
import type { journal } from "@/app/lib/client";

interface CalendarProps {
	entries: journal.JournalEntry[];
}

const Calendar: FC<CalendarProps> = ({ entries }) => {
	const now = DateTime.now();
	const month = now.month;
	const year = now.year;

	// Get all days in current month
	const daysInMonth = now.daysInMonth || 30;
	const firstDayOfMonth = DateTime.fromObject({ year, month, day: 1 });
	const startDayOfWeek = firstDayOfMonth.weekday % 7; // Convert to 0-6 where 0 is Sunday

	// Create array of all days to display
	const calendarDays: (number | null)[] = [];

	// Add empty cells for days before month starts
	for (let i = 0; i < startDayOfWeek; i++) {
		calendarDays.push(null);
	}

	// Add all days of the month
	for (let day = 1; day <= daysInMonth; day++) {
		calendarDays.push(day);
	}

	// Get entry dates for this month
	const entryDates = new Set(
		entries
			.map((entry) => DateTime.fromISO(entry.createdAt))
			.filter((date) => date.month === month && date.year === year)
			.map((date) => date.day),
	);

	const monthName = now.toFormat("MMMM yyyy");

	return (
		<div className="app-widget">
			<div className="app-widget-header">{monthName}</div>
			<div className="app-widget-content app-calendar">
				<table>
					<thead>
						<tr>
							<th>S</th>
							<th>M</th>
							<th>T</th>
							<th>W</th>
							<th>T</th>
							<th>F</th>
							<th>S</th>
						</tr>
					</thead>
					<tbody>
						{Array.from(
							{ length: Math.ceil(calendarDays.length / 7) },
							(_, weekIndex) => {
								const weekStart = weekIndex * 7;
								const weekEnd = Math.min(
									weekStart + 6,
									calendarDays.length - 1,
								);
								const weekKey = `week-${year}-${month}-${weekStart}-${weekEnd}`;

								return (
									<tr key={weekKey}>
										{Array.from({ length: 7 }, (_, dayIndex) => {
											const arrayIndex = weekIndex * 7 + dayIndex;
											const day = calendarDays[arrayIndex];
											const isToday = day === now.day;
											const hasEntry = day ? entryDates.has(day) : false;

											let className = "";
											if (isToday) className += " today";
											if (hasEntry) className += " has-entry";

											return (
												<td
													key={`day-${year}-${month}-${day || `empty-${arrayIndex}`}`}
													className={className}
												>
													{day || ""}
												</td>
											);
										})}
									</tr>
								);
							},
						)}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default Calendar;