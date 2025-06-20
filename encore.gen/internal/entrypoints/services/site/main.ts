import { registerHandlers, run, type Handler } from "encore.dev/internal/codegen/appinit";
import { Worker, isMainThread } from "node:worker_threads";
import { fileURLToPath } from "node:url";
import { availableParallelism } from "node:os";

import { add as addImpl0 } from "../../../../../site\\site";
import { get as getImpl1 } from "../../../../../site\\site";
import { del as delImpl2 } from "../../../../../site\\site";
import { list as listImpl3 } from "../../../../../site\\site";
import * as site_service from "../../../../../site\\encore.service";

const handlers: Handler[] = [
    {
        apiRoute: {
            service:           "site",
            name:              "add",
            handler:           addImpl0,
            raw:               false,
            streamingRequest:  false,
            streamingResponse: false,
        },
        endpointOptions: {"expose":true,"auth":false,"isRaw":false,"isStream":false,"tags":[]},
        middlewares: site_service.default.cfg.middlewares || [],
    },
    {
        apiRoute: {
            service:           "site",
            name:              "get",
            handler:           getImpl1,
            raw:               false,
            streamingRequest:  false,
            streamingResponse: false,
        },
        endpointOptions: {"expose":true,"auth":false,"isRaw":false,"isStream":false,"tags":[]},
        middlewares: site_service.default.cfg.middlewares || [],
    },
    {
        apiRoute: {
            service:           "site",
            name:              "del",
            handler:           delImpl2,
            raw:               false,
            streamingRequest:  false,
            streamingResponse: false,
        },
        endpointOptions: {"expose":true,"auth":false,"isRaw":false,"isStream":false,"tags":[]},
        middlewares: site_service.default.cfg.middlewares || [],
    },
    {
        apiRoute: {
            service:           "site",
            name:              "list",
            handler:           listImpl3,
            raw:               false,
            streamingRequest:  false,
            streamingResponse: false,
        },
        endpointOptions: {"expose":true,"auth":false,"isRaw":false,"isStream":false,"tags":[]},
        middlewares: site_service.default.cfg.middlewares || [],
    },
];

registerHandlers(handlers);

await run(import.meta.url);
