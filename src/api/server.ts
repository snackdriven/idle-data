import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";

interface Entry {
	id: string;
	title: string;
	body: string;
	tags: string[];
	timestamp: string;
}

const app = new Hono();
app.use("*", cors());

let entries: Entry[] = [];

app.get("/entries", (c) => c.json(entries));

app.post("/entries", async (c) => {
	const data = await c.req.json<Entry>();
	data.id = Date.now().toString();
	data.timestamp = data.timestamp || new Date().toISOString();
	entries.push(data);
	return c.json(data, 201);
});

app.put("/entries/:id", async (c) => {
	const id = c.req.param("id");
	const data = await c.req.json<Entry>();
	const idx = entries.findIndex((e) => e.id === id);
	if (idx === -1) return c.notFound();
	entries[idx] = { ...entries[idx], ...data };
	return c.json(entries[idx]);
});

app.delete("/entries/:id", (c) => {
	const id = c.req.param("id");
	entries = entries.filter((e) => e.id !== id);
	return c.json({});
});

serve({ fetch: app.fetch, port: 4000 });
