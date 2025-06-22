import { api } from "encore.dev/api";
import { SQLDatabase } from "encore.dev/storage/sqldb";
import knex from "knex";

// JournalEntry describes a personal journal entry
export interface JournalEntry {
	id: number;
	subject?: string;
	body: string;
	mood?: string;
	music?: string;
	tags?: string[];
	privacy: "public" | "friends" | "private";
	createdAt: string;
	updatedAt: string;
}

// CreateEntryParams are the parameters for creating a new journal entry
export interface CreateEntryParams {
	subject?: string;
	body: string;
	mood?: string;
	music?: string;
	tags?: string[];
	privacy?: "public" | "friends" | "private";
}

// UpdateEntryParams are the parameters for updating a journal entry
export interface UpdateEntryParams {
	subject?: string;
	body?: string;
	mood?: string;
	music?: string;
	tags?: string[];
	privacy?: "public" | "friends" | "private";
}

// ListResponse contains a list of journal entries
export interface ListResponse {
	entries: JournalEntry[];
}

// Create a new journal entry
export const create = api(
	{ expose: true, method: "POST", path: "/journal" },
	async (params: CreateEntryParams): Promise<JournalEntry> => {
		const entry = (
			await Entries().insert(
				{
					subject: params.subject,
					body: params.body,
					mood: params.mood,
					music: params.music,
					tags: params.tags,
					privacy: params.privacy || "public",
				},
				"*",
			)
		)[0];

		return {
			id: entry.id,
			subject: entry.subject,
			body: entry.body,
			mood: entry.mood,
			music: entry.music,
			tags: entry.tags,
			privacy: entry.privacy,
			createdAt: entry.created_at,
			updatedAt: entry.updated_at,
		};
	},
);

// Get a journal entry by id
export const get = api(
	{ expose: true, method: "GET", path: "/journal/:id" },
	async ({ id }: { id: number }): Promise<JournalEntry> => {
		const entry = await Entries().where("id", id).first();
		if (!entry) {
			throw new Error("Entry not found");
		}

		return {
			id: entry.id,
			subject: entry.subject,
			body: entry.body,
			mood: entry.mood,
			music: entry.music,
			tags: entry.tags,
			privacy: entry.privacy,
			createdAt: entry.created_at,
			updatedAt: entry.updated_at,
		};
	},
);

// Update a journal entry
export const update = api(
	{ expose: true, method: "PUT", path: "/journal/:id" },
	async ({
		id,
		...params
	}: { id: number } & UpdateEntryParams): Promise<JournalEntry> => {
		const updateData: Record<string, unknown> = {
			updated_at: new Date(),
		};

		if (params.subject !== undefined) updateData.subject = params.subject;
		if (params.body !== undefined) updateData.body = params.body;
		if (params.mood !== undefined) updateData.mood = params.mood;
		if (params.music !== undefined) updateData.music = params.music;
		if (params.tags !== undefined) updateData.tags = params.tags;
		if (params.privacy !== undefined) updateData.privacy = params.privacy;

		const entry = (await Entries().where("id", id).update(updateData, "*"))[0];
		if (!entry) {
			throw new Error("Entry not found");
		}

		return {
			id: entry.id,
			subject: entry.subject,
			body: entry.body,
			mood: entry.mood,
			music: entry.music,
			tags: entry.tags,
			privacy: entry.privacy,
			createdAt: entry.created_at,
			updatedAt: entry.updated_at,
		};
	},
);

// Delete a journal entry
export const del = api(
	{ expose: true, method: "DELETE", path: "/journal/:id" },
	async ({ id }: { id: number }): Promise<void> => {
		await Entries().where("id", id).delete();
	},
);

// List journal entries
export const list = api(
	{ expose: true, method: "GET", path: "/journal" },
	async (): Promise<ListResponse> => {
		const entries = await Entries().select().orderBy("created_at", "desc");

		return {
			entries: entries.map((entry) => ({
				id: entry.id,
				subject: entry.subject,
				body: entry.body,
				mood: entry.mood,
				music: entry.music,
				tags: entry.tags,
				privacy: entry.privacy,
				createdAt: entry.created_at,
				updatedAt: entry.updated_at,
			})),
		};
	},
);

// Define the journal database
const JournalDB = new SQLDatabase("journal", {
	migrations: "./migrations",
});

const orm = knex({
	client: "pg",
	connection: JournalDB.connectionString,
});

const Entries = () => orm("journal_entries");
