import { registerHandlers, run, type Handler } from "encore.dev/internal/codegen/appinit";
import { Worker, isMainThread } from "node:worker_threads";
import { fileURLToPath } from "node:url";
import { availableParallelism } from "node:os";

import { nextjs as nextjsImpl0 } from "../../../../../frontend\\frontend";
import * as frontend_service from "../../../../../frontend\\encore.service";

const handlers: Handler[] = [
    {
        apiRoute: {
            service:           "frontend",
            name:              "nextjs",
            handler:           nextjsImpl0,
            raw:               true,
            streamingRequest:  false,
            streamingResponse: false,
        },
        endpointOptions: {"expose":true,"auth":false,"isRaw":true,"isStream":false,"tags":[]},
        middlewares: frontend_service.default.cfg.middlewares || [],
    },
];

registerHandlers(handlers);

await run(import.meta.url);
