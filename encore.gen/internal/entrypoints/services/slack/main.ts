import {
	registerHandlers,
	run,
	type Handler,
} from "encore.dev/internal/codegen/appinit";
import { Worker, isMainThread } from "node:worker_threads";
import { fileURLToPath } from "node:url";
import { availableParallelism } from "node:os";

import { notify as notifyImpl0 } from "../../../../../slack\\slack";
import "../../../../../slack\\slack";
import * as slack_service from "../../../../../slack\\encore.service";

const handlers: Handler[] = [
	{
		apiRoute: {
			service: "slack",
			name: "notify",
			handler: notifyImpl0,
			raw: false,
			streamingRequest: false,
			streamingResponse: false,
		},
		endpointOptions: {
			expose: false,
			auth: false,
			isRaw: false,
			isStream: false,
			tags: [],
		},
		middlewares: slack_service.default.cfg.middlewares || [],
	},
];

registerHandlers(handlers);

await run(import.meta.url);
