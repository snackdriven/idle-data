import { registerHandlers, run, type Handler } from "encore.dev/internal/codegen/appinit";
import { Worker, isMainThread } from "node:worker_threads";
import { fileURLToPath } from "node:url";
import { availableParallelism } from "node:os";

import { create as createImpl0 } from "../../../../../journal\\journal";
import { get as getImpl1 } from "../../../../../journal\\journal";
import { update as updateImpl2 } from "../../../../../journal\\journal";
import { del as delImpl3 } from "../../../../../journal\\journal";
import { list as listImpl4 } from "../../../../../journal\\journal";
import * as journal_service from "../../../../../journal\\encore.service";

const handlers: Handler[] = [
    {
        apiRoute: {
            service:           "journal",
            name:              "create",
            handler:           createImpl0,
            raw:               false,
            streamingRequest:  false,
            streamingResponse: false,
        },
        endpointOptions: {"expose":true,"auth":false,"isRaw":false,"isStream":false,"tags":[]},
        middlewares: journal_service.default.cfg.middlewares || [],
    },
    {
        apiRoute: {
            service:           "journal",
            name:              "get",
            handler:           getImpl1,
            raw:               false,
            streamingRequest:  false,
            streamingResponse: false,
        },
        endpointOptions: {"expose":true,"auth":false,"isRaw":false,"isStream":false,"tags":[]},
        middlewares: journal_service.default.cfg.middlewares || [],
    },
    {
        apiRoute: {
            service:           "journal",
            name:              "update",
            handler:           updateImpl2,
            raw:               false,
            streamingRequest:  false,
            streamingResponse: false,
        },
        endpointOptions: {"expose":true,"auth":false,"isRaw":false,"isStream":false,"tags":[]},
        middlewares: journal_service.default.cfg.middlewares || [],
    },
    {
        apiRoute: {
            service:           "journal",
            name:              "del",
            handler:           delImpl3,
            raw:               false,
            streamingRequest:  false,
            streamingResponse: false,
        },
        endpointOptions: {"expose":true,"auth":false,"isRaw":false,"isStream":false,"tags":[]},
        middlewares: journal_service.default.cfg.middlewares || [],
    },
    {
        apiRoute: {
            service:           "journal",
            name:              "list",
            handler:           listImpl4,
            raw:               false,
            streamingRequest:  false,
            streamingResponse: false,
        },
        endpointOptions: {"expose":true,"auth":false,"isRaw":false,"isStream":false,"tags":[]},
        middlewares: journal_service.default.cfg.middlewares || [],
    },
];

registerHandlers(handlers);

await run(import.meta.url);
