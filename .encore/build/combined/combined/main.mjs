// This file was bundled by Encore v1.48.5
//
// https://encore.dev
var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// encore.gen/internal/entrypoints/combined/main.ts
import { registerGateways, registerHandlers, run } from "encore.dev/internal/codegen/appinit";

// frontend/frontend.ts
import { api } from "encore.dev/api";
import next from "next";
var app = next({
  dev: true,
  dir: "./frontend"
});
var handle = app.getRequestHandler();
var prepared = app.prepare();
var nextjs = api.raw(
  { expose: true, path: "/!rest", method: "*" },
  async (req, resp) => {
    await prepared;
    return handle(req, resp);
  }
);

// journal/journal.ts
import { api as api2 } from "encore.dev/api";
import { SQLDatabase } from "encore.dev/storage/sqldb";
import knex from "knex";
var create = api2(
  { expose: true, method: "POST", path: "/journal" },
  async (params) => {
    const entry = (await Entries().insert({
      subject: params.subject,
      body: params.body,
      mood: params.mood,
      music: params.music,
      tags: params.tags,
      privacy: params.privacy || "public"
    }, "*"))[0];
    return {
      id: entry.id,
      subject: entry.subject,
      body: entry.body,
      mood: entry.mood,
      music: entry.music,
      tags: entry.tags,
      privacy: entry.privacy,
      createdAt: entry.created_at,
      updatedAt: entry.updated_at
    };
  }
);
var get = api2(
  { expose: true, method: "GET", path: "/journal/:id" },
  async ({ id }) => {
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
      updatedAt: entry.updated_at
    };
  }
);
var update = api2(
  { expose: true, method: "PUT", path: "/journal/:id" },
  async ({ id, ...params }) => {
    const updateData = {
      updated_at: /* @__PURE__ */ new Date()
    };
    if (params.subject !== void 0)
      updateData.subject = params.subject;
    if (params.body !== void 0)
      updateData.body = params.body;
    if (params.mood !== void 0)
      updateData.mood = params.mood;
    if (params.music !== void 0)
      updateData.music = params.music;
    if (params.tags !== void 0)
      updateData.tags = params.tags;
    if (params.privacy !== void 0)
      updateData.privacy = params.privacy;
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
      updatedAt: entry.updated_at
    };
  }
);
var del = api2(
  { expose: true, method: "DELETE", path: "/journal/:id" },
  async ({ id }) => {
    await Entries().where("id", id).delete();
  }
);
var list = api2(
  { expose: true, method: "GET", path: "/journal" },
  async () => {
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
        updatedAt: entry.updated_at
      }))
    };
  }
);
var JournalDB = new SQLDatabase("journal", {
  migrations: "./migrations"
});
var orm = knex({
  client: "pg",
  connection: JournalDB.connectionString
});
var Entries = () => orm("journal_entries");

// monitor/check.ts
import { api as api5 } from "encore.dev/api";
import { Subscription } from "encore.dev/pubsub";
import { SQLDatabase as SQLDatabase3 } from "encore.dev/storage/sqldb";

// site/site.ts
import { api as api3 } from "encore.dev/api";
import { SQLDatabase as SQLDatabase2 } from "encore.dev/storage/sqldb";
import knex2 from "knex";
import { Topic } from "encore.dev/pubsub";
var SiteAddedTopic = new Topic("site.added", {
  deliveryGuarantee: "at-least-once"
});
var add = api3(
  { expose: true, method: "POST", path: "/site" },
  async (params) => {
    const site = (await Sites().insert({ url: params.url }, "*"))[0];
    await SiteAddedTopic.publish(site);
    return site;
  }
);
var get2 = api3(
  { expose: true, method: "GET", path: "/site/:id", auth: false },
  async ({ id }) => {
    const site = await Sites().where("id", id).first();
    return site ?? Promise.reject(new Error("site not found"));
  }
);
var del2 = api3(
  { expose: true, method: "DELETE", path: "/site/:id" },
  async ({ id }) => {
    await Sites().where("id", id).delete();
  }
);
var list2 = api3(
  { expose: true, method: "GET", path: "/site" },
  async () => {
    const sites = await Sites().select();
    return { sites };
  }
);
var SiteDB = new SQLDatabase2("site", {
  migrations: "./migrations"
});
var orm2 = knex2({
  client: "pg",
  connection: SiteDB.connectionString
});
var Sites = () => orm2("site");

// monitor/ping.ts
import { api as api4 } from "encore.dev/api";
var ping = api4(
  { expose: true, path: "/ping/:url", method: "GET" },
  async ({ url }) => {
    if (!url.startsWith("http:") && !url.startsWith("https:")) {
      url = "https://" + url;
    }
    try {
      const resp = await fetch(url, { method: "GET" });
      const up = resp.status >= 200 && resp.status < 300;
      return { up };
    } catch (err) {
      return { up: false };
    }
  }
);

// encore.gen/internal/clients/frontend/endpoints.js
import { apiCall, streamIn, streamOut, streamInOut } from "encore.dev/internal/codegen/api";
var TEST_ENDPOINTS = false ? await null : null;

// encore.gen/internal/clients/journal/endpoints.js
import { apiCall as apiCall2, streamIn as streamIn2, streamOut as streamOut2, streamInOut as streamInOut2 } from "encore.dev/internal/codegen/api";
var TEST_ENDPOINTS2 = false ? await null : null;

// encore.gen/internal/clients/monitor/endpoints.js
import { apiCall as apiCall3, streamIn as streamIn3, streamOut as streamOut3, streamInOut as streamInOut3 } from "encore.dev/internal/codegen/api";
var TEST_ENDPOINTS3 = false ? await null : null;

// encore.gen/internal/clients/site/endpoints.js
var endpoints_exports = {};
__export(endpoints_exports, {
  add: () => add2,
  del: () => del3,
  get: () => get3,
  list: () => list3
});
import { apiCall as apiCall4, streamIn as streamIn4, streamOut as streamOut4, streamInOut as streamInOut4 } from "encore.dev/internal/codegen/api";
var TEST_ENDPOINTS4 = false ? await null : null;
async function add2(params, opts) {
  if (false) {
    return TEST_ENDPOINTS4.add(params, opts);
  }
  return apiCall4("site", "add", params, opts);
}
async function get3(params, opts) {
  if (false) {
    return TEST_ENDPOINTS4.get(params, opts);
  }
  return apiCall4("site", "get", params, opts);
}
async function del3(params, opts) {
  if (false) {
    return TEST_ENDPOINTS4.del(params, opts);
  }
  return apiCall4("site", "del", params, opts);
}
async function list3(opts) {
  const params = void 0;
  if (false) {
    return TEST_ENDPOINTS4.list(params, opts);
  }
  return apiCall4("site", "list", params, opts);
}

// monitor/check.ts
import { CronJob } from "encore.dev/cron";
var check = api5(
  { expose: true, method: "POST", path: "/check/:siteID" },
  async (p) => {
    const s = await endpoints_exports.get({ id: p.siteID });
    return doCheck(s);
  }
);
var checkAll = api5(
  { expose: true, method: "POST", path: "/check-all" },
  async () => {
    const sites = await endpoints_exports.list();
    await Promise.all(sites.sites.map(doCheck));
  }
);
var cronJob = new CronJob("check-all", {
  title: "Check all sites",
  every: "1h",
  endpoint: checkAll
});
async function doCheck(site) {
  const { up } = await ping({ url: site.url });
  await MonitorDB.exec`
      INSERT INTO checks (site_id, up, checked_at)
      VALUES (${site.id}, ${up}, NOW())
  `;
  return { up };
}
var MonitorDB = new SQLDatabase3("monitor", {
  migrations: "./migrations"
});
var _ = new Subscription(SiteAddedTopic, "check-site", {
  handler: doCheck
});

// monitor/status.ts
import { api as api6 } from "encore.dev/api";
var status = api6(
  { expose: true, path: "/status", method: "GET" },
  async () => {
    const rows = await MonitorDB.query`
      SELECT DISTINCT ON (site_id) site_id, up, checked_at
      FROM checks
      ORDER BY site_id, checked_at DESC
    `;
    const results = [];
    for await (const row of rows) {
      results.push({
        id: row.site_id,
        up: row.up,
        checkedAt: row.checked_at
      });
    }
    return { sites: results };
  }
);

// site/encore.service.ts
import { Service } from "encore.dev/service";
var encore_service_default = new Service("site");

// frontend/encore.service.ts
import { Service as Service2 } from "encore.dev/service";
var encore_service_default2 = new Service2("frontend");

// journal/encore.service.ts
import { Service as Service3 } from "encore.dev/service";
var encore_service_default3 = new Service3("journal");

// monitor/encore.service.ts
import { Service as Service4 } from "encore.dev/service";
var encore_service_default4 = new Service4("monitor");

// encore.gen/internal/entrypoints/combined/main.ts
var gateways = [];
var handlers = [
  {
    apiRoute: {
      service: "frontend",
      name: "nextjs",
      handler: nextjs,
      raw: true,
      streamingRequest: false,
      streamingResponse: false
    },
    endpointOptions: { "expose": true, "auth": false, "isRaw": true, "isStream": false, "tags": [] },
    middlewares: encore_service_default2.cfg.middlewares || []
  },
  {
    apiRoute: {
      service: "journal",
      name: "create",
      handler: create,
      raw: false,
      streamingRequest: false,
      streamingResponse: false
    },
    endpointOptions: { "expose": true, "auth": false, "isRaw": false, "isStream": false, "tags": [] },
    middlewares: encore_service_default3.cfg.middlewares || []
  },
  {
    apiRoute: {
      service: "journal",
      name: "get",
      handler: get,
      raw: false,
      streamingRequest: false,
      streamingResponse: false
    },
    endpointOptions: { "expose": true, "auth": false, "isRaw": false, "isStream": false, "tags": [] },
    middlewares: encore_service_default3.cfg.middlewares || []
  },
  {
    apiRoute: {
      service: "journal",
      name: "update",
      handler: update,
      raw: false,
      streamingRequest: false,
      streamingResponse: false
    },
    endpointOptions: { "expose": true, "auth": false, "isRaw": false, "isStream": false, "tags": [] },
    middlewares: encore_service_default3.cfg.middlewares || []
  },
  {
    apiRoute: {
      service: "journal",
      name: "del",
      handler: del,
      raw: false,
      streamingRequest: false,
      streamingResponse: false
    },
    endpointOptions: { "expose": true, "auth": false, "isRaw": false, "isStream": false, "tags": [] },
    middlewares: encore_service_default3.cfg.middlewares || []
  },
  {
    apiRoute: {
      service: "journal",
      name: "list",
      handler: list,
      raw: false,
      streamingRequest: false,
      streamingResponse: false
    },
    endpointOptions: { "expose": true, "auth": false, "isRaw": false, "isStream": false, "tags": [] },
    middlewares: encore_service_default3.cfg.middlewares || []
  },
  {
    apiRoute: {
      service: "monitor",
      name: "check",
      handler: check,
      raw: false,
      streamingRequest: false,
      streamingResponse: false
    },
    endpointOptions: { "expose": true, "auth": false, "isRaw": false, "isStream": false, "tags": [] },
    middlewares: encore_service_default4.cfg.middlewares || []
  },
  {
    apiRoute: {
      service: "monitor",
      name: "checkAll",
      handler: checkAll,
      raw: false,
      streamingRequest: false,
      streamingResponse: false
    },
    endpointOptions: { "expose": true, "auth": false, "isRaw": false, "isStream": false, "tags": [] },
    middlewares: encore_service_default4.cfg.middlewares || []
  },
  {
    apiRoute: {
      service: "monitor",
      name: "ping",
      handler: ping,
      raw: false,
      streamingRequest: false,
      streamingResponse: false
    },
    endpointOptions: { "expose": true, "auth": false, "isRaw": false, "isStream": false, "tags": [] },
    middlewares: encore_service_default4.cfg.middlewares || []
  },
  {
    apiRoute: {
      service: "monitor",
      name: "status",
      handler: status,
      raw: false,
      streamingRequest: false,
      streamingResponse: false
    },
    endpointOptions: { "expose": true, "auth": false, "isRaw": false, "isStream": false, "tags": [] },
    middlewares: encore_service_default4.cfg.middlewares || []
  },
  {
    apiRoute: {
      service: "site",
      name: "add",
      handler: add,
      raw: false,
      streamingRequest: false,
      streamingResponse: false
    },
    endpointOptions: { "expose": true, "auth": false, "isRaw": false, "isStream": false, "tags": [] },
    middlewares: encore_service_default.cfg.middlewares || []
  },
  {
    apiRoute: {
      service: "site",
      name: "get",
      handler: get2,
      raw: false,
      streamingRequest: false,
      streamingResponse: false
    },
    endpointOptions: { "expose": true, "auth": false, "isRaw": false, "isStream": false, "tags": [] },
    middlewares: encore_service_default.cfg.middlewares || []
  },
  {
    apiRoute: {
      service: "site",
      name: "del",
      handler: del2,
      raw: false,
      streamingRequest: false,
      streamingResponse: false
    },
    endpointOptions: { "expose": true, "auth": false, "isRaw": false, "isStream": false, "tags": [] },
    middlewares: encore_service_default.cfg.middlewares || []
  },
  {
    apiRoute: {
      service: "site",
      name: "list",
      handler: list2,
      raw: false,
      streamingRequest: false,
      streamingResponse: false
    },
    endpointOptions: { "expose": true, "auth": false, "isRaw": false, "isStream": false, "tags": [] },
    middlewares: encore_service_default.cfg.middlewares || []
  }
];
registerGateways(gateways);
registerHandlers(handlers);
await run(import.meta.url);
//# sourceMappingURL=main.mjs.map
