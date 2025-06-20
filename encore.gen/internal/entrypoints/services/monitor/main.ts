import { registerHandlers, run, type Handler } from "encore.dev/internal/codegen/appinit";
import { Worker, isMainThread } from "node:worker_threads";
import { fileURLToPath } from "node:url";
import { availableParallelism } from "node:os";

import { check as checkImpl0 } from "../../../../../monitor\\check";
import { checkAll as checkAllImpl1 } from "../../../../../monitor\\check";
import { ping as pingImpl2 } from "../../../../../monitor\\ping";
import { status as statusImpl3 } from "../../../../../monitor\\status";
import "../../../../../monitor\\check";
import * as monitor_service from "../../../../../monitor\\encore.service";

const handlers: Handler[] = [
    {
        apiRoute: {
            service:           "monitor",
            name:              "check",
            handler:           checkImpl0,
            raw:               false,
            streamingRequest:  false,
            streamingResponse: false,
        },
        endpointOptions: {"expose":true,"auth":false,"isRaw":false,"isStream":false,"tags":[]},
        middlewares: monitor_service.default.cfg.middlewares || [],
    },
    {
        apiRoute: {
            service:           "monitor",
            name:              "checkAll",
            handler:           checkAllImpl1,
            raw:               false,
            streamingRequest:  false,
            streamingResponse: false,
        },
        endpointOptions: {"expose":true,"auth":false,"isRaw":false,"isStream":false,"tags":[]},
        middlewares: monitor_service.default.cfg.middlewares || [],
    },
    {
        apiRoute: {
            service:           "monitor",
            name:              "ping",
            handler:           pingImpl2,
            raw:               false,
            streamingRequest:  false,
            streamingResponse: false,
        },
        endpointOptions: {"expose":true,"auth":false,"isRaw":false,"isStream":false,"tags":[]},
        middlewares: monitor_service.default.cfg.middlewares || [],
    },
    {
        apiRoute: {
            service:           "monitor",
            name:              "status",
            handler:           statusImpl3,
            raw:               false,
            streamingRequest:  false,
            streamingResponse: false,
        },
        endpointOptions: {"expose":true,"auth":false,"isRaw":false,"isStream":false,"tags":[]},
        middlewares: monitor_service.default.cfg.middlewares || [],
    },
];

registerHandlers(handlers);

await run(import.meta.url);
