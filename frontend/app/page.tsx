"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Client from "@/app/lib/client";
import type { journal } from "@/app/lib/client";
import type { FC } from "react";
import { useEffect, useState, useId, lazy, Suspense } from "react";
import { DateTime } from "luxon";
import { Header } from "./components/layout/Header";
import { UserHeader } from "./components/layout/UserHeader";
import { Navigation } from "./components/layout/Navigation";
import {
	Button,
	Input,
	TextArea,
	Select,
	Card,
	CardContent,
	LoadingSkeleton,
} from "./components/ui";

// Lazy load heavy components
const Calendar = lazy(() => import("./components/Calendar"));
const PageSummary = lazy(() => import("./components/PageSummary"));
const Tags = lazy(() => import("./components/Tags"));

function App() {
	const [baseURL, setBaseURL] = useState("");
	useEffect(() => setBaseURL(window.location.origin), []);

	if (!baseURL) return null;

	return (
		<div className="app-container">
			<Header />
			<UserHeader />
			<Navigation activePage="recent" />
			<div className="app-main">
				<div className="app-content">
					<JournalEntries client={new Client(baseURL)} />
				</div>
				<div className="app-sidebar">
					<Sidebar client={new Client(baseURL)} />
				</div>
			</div>
		</div>
	);
}

const JournalEntries: FC<{ client: Client }> = ({ client }) => {
	const { isLoading, error, data } = useQuery({
		queryKey: ["journal-entries"],
		queryFn: () => client.journal.list(),
		refetchInterval: 30000, // 30s
		retry: false,
	});

	if (isLoading) {
		return <div>Loading...</div>;
	} else if (error) {
		return <div style={{ color: "red" }}>{(error as Error).message}</div>;
	}

	return (
		<>
			<PostNewEntry client={client} />
			{data?.entries.map((entry) => (
				<JournalEntry key={entry.id} entry={entry} client={client} />
			))}
		</>
	);
};

const PostNewEntry: FC<{ client: Client }> = ({ client }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [subject, setSubject] = useState("");
	const [body, setBody] = useState("");
	const [mood, setMood] = useState("");
	const [music, setMusic] = useState("");
	const [privacy, setPrivacy] = useState<"public" | "friends" | "private">(
		"public",
	);
	const privacyId = useId();

	const queryClient = useQueryClient();

	const createEntry = useMutation({
		mutationFn: async (params: journal.CreateEntryParams) => {
			return client.journal.create(params);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["journal-entries"] });
			setSubject("");
			setBody("");
			setMood("");
			setMusic("");
			setIsOpen(false);
		},
	});

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (!body.trim()) return;

		createEntry.mutate({
			subject: subject.trim() || undefined,
			body: body.trim(),
			mood: mood.trim() || undefined,
			music: music.trim() || undefined,
			privacy,
		});
	};

	if (!isOpen) {
		return (
			<Card
				variant="outlined"
				padding="md"
				clickable
				onClick={() => setIsOpen(true)}
			>
				<CardContent>
					<h3>POST NEW ENTRY</h3>
				</CardContent>
			</Card>
		);
	}

	return (
		<Card variant="outlined" padding="md">
			<CardContent>
				<form
					onSubmit={handleSubmit}
					style={{
						display: "flex",
						flexDirection: "column",
						gap: "var(--space-3)",
					}}
				>
					<h3 style={{ margin: 0 }}>POST NEW ENTRY</h3>

					<Input
						type="text"
						placeholder="Subject (optional)"
						value={subject}
						onChange={(e) => setSubject(e.target.value)}
						fullWidth
					/>

					<TextArea
						placeholder="What's on your mind?"
						value={body}
						onChange={(e) => setBody(e.target.value)}
						required
						fullWidth
					/>

					<div style={{ display: "flex", gap: "var(--space-2)" }}>
						<Input
							type="text"
							placeholder="Current mood"
							value={mood}
							onChange={(e) => setMood(e.target.value)}
							style={{ flex: 1 }}
						/>
						<Input
							type="text"
							placeholder="Current music"
							value={music}
							onChange={(e) => setMusic(e.target.value)}
							style={{ flex: 1 }}
						/>
					</div>

					<Select
						id={privacyId}
						label="Privacy"
						value={privacy}
						onChange={(e) =>
							setPrivacy(e.target.value as "public" | "friends" | "private")
						}
						options={[
							{ value: "public", label: "Public" },
							{ value: "friends", label: "Friends" },
							{ value: "private", label: "Private" },
						]}
					/>

					<div style={{ display: "flex", gap: "var(--space-2)" }}>
						<Button
							type="submit"
							variant="primary"
							disabled={createEntry.isPending || !body.trim()}
							isLoading={createEntry.isPending}
						>
							Post Entry
						</Button>
						<Button
							type="button"
							variant="secondary"
							onClick={() => setIsOpen(false)}
						>
							Cancel
						</Button>
					</div>
				</form>
			</CardContent>
		</Card>
	);
};

const JournalEntry: FC<{ entry: journal.JournalEntry; client: Client }> = ({
	entry,
	client,
}) => {
	const [isEditing, setIsEditing] = useState(false);
	const [editSubject, setEditSubject] = useState(entry.subject || "");
	const [editBody, setEditBody] = useState(entry.body);
	const [editMood, setEditMood] = useState(entry.mood || "");
	const [editMusic, setEditMusic] = useState(entry.music || "");

	const queryClient = useQueryClient();

	const updateEntry = useMutation({
		mutationFn: async (params: {
			subject?: string;
			body?: string;
			mood?: string;
			music?: string;
			tags?: string[];
			privacy?: "public" | "friends" | "private";
		}) => {
			return client.journal.update(entry.id, params);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["journal-entries"] });
			setIsEditing(false);
		},
	});

	const deleteEntry = useMutation({
		mutationFn: async () => {
			return client.journal.del(entry.id);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["journal-entries"] });
		},
	});

	const handleUpdate = (e: React.FormEvent) => {
		e.preventDefault();
		updateEntry.mutate({
			subject: editSubject.trim() || undefined,
			body: editBody.trim(),
			mood: editMood.trim() || undefined,
			music: editMusic.trim() || undefined,
		});
	};

	const createdAt = DateTime.fromISO(entry.createdAt);

	if (isEditing) {
		return (
			<div className="app-entry">
				<form onSubmit={handleUpdate}>
					<input
						type="text"
						value={editSubject}
						onChange={(e) => setEditSubject(e.target.value)}
						placeholder="Subject"
						style={{ width: "100%", marginBottom: "8px" }}
					/>
					<textarea
						value={editBody}
						onChange={(e) => setEditBody(e.target.value)}
						style={{ width: "100%", height: "120px", marginBottom: "8px" }}
						required
					/>
					<div style={{ display: "flex", gap: "8px", marginBottom: "8px" }}>
						<input
							type="text"
							placeholder="Mood"
							value={editMood}
							onChange={(e) => setEditMood(e.target.value)}
							style={{ flex: 1 }}
						/>
						<input
							type="text"
							placeholder="Music"
							value={editMusic}
							onChange={(e) => setEditMusic(e.target.value)}
							style={{ flex: 1 }}
						/>
					</div>
					<div style={{ display: "flex", gap: "8px" }}>
						<button type="submit" disabled={updateEntry.isPending}>
							{updateEntry.isPending ? "Saving..." : "Save"}
						</button>
						<button type="button" onClick={() => setIsEditing(false)}>
							Cancel
						</button>
					</div>
				</form>
			</div>
		);
	}

	return (
		<div className="app-entry">
			<div className="app-entry-header">
				<div className="app-entry-date">
					{createdAt.toFormat("EEEE, MMMM d, yyyy")}
				</div>
				{entry.subject && (
					<div className="app-entry-subject">🔒 {entry.subject}</div>
				)}
				<div className="app-entry-meta">
					{entry.mood && (
						<span className="app-mood">Current mood: {entry.mood}</span>
					)}
					{entry.mood && entry.music && <span> | </span>}
					{entry.music && (
						<span className="app-music">Current music: {entry.music}</span>
					)}
				</div>
			</div>

			<div className="app-entry-body">
				{entry.body.split("\n").map((paragraph, paragraphIndex) => (
					<p
						key={`paragraph-${entry.id}-${paragraphIndex}`}
						style={{ margin: "8px 0" }}
					>
						{paragraph}
					</p>
				))}
			</div>

			<div
				className="app-entry-actions"
				style={{ display: "flex", gap: "var(--space-2)", flexWrap: "wrap" }}
			>
				<Button
					type="button"
					variant="secondary"
					size="sm"
					onClick={() => setIsEditing(true)}
				>
					Edit Entry
				</Button>
				<Button
					type="button"
					variant="secondary"
					size="sm"
					onClick={() => {
						/* TODO: implement */
					}}
				>
					Add to Memories
				</Button>
				<Button
					type="button"
					variant="secondary"
					size="sm"
					onClick={() => {
						/* TODO: implement */
					}}
				>
					Track This
				</Button>
				<Button
					type="button"
					variant="danger"
					size="sm"
					onClick={() => {
						if (confirm("Are you sure you want to delete this entry?")) {
							deleteEntry.mutate();
						}
					}}
				>
					Delete Entry
				</Button>
			</div>
		</div>
	);
};

const Sidebar: FC<{ client: Client }> = ({ client }) => {
	const { data: entries } = useQuery({
		queryKey: ["journal-entries"],
		queryFn: () => client.journal.list(),
		refetchInterval: 30000,
		retry: false,
	});

	return (
		<div>
			<Suspense fallback={<LoadingSkeleton height="200px" />}>
				<Calendar entries={entries?.entries || []} />
			</Suspense>
			<Suspense fallback={<LoadingSkeleton height="150px" />}>
				<PageSummary entries={entries?.entries || []} />
			</Suspense>
			<Suspense fallback={<LoadingSkeleton height="100px" />}>
				<Tags />
			</Suspense>
		</div>
	);
};


export default App;
