import { apiCall, streamIn, streamOut, streamInOut } from "encore.dev/internal/codegen/api";
import { registerTestHandler } from "encore.dev/internal/codegen/appinit";

import * as frontend_service from "../../../../frontend\\encore.service";

export async function nextjs(params, opts) {
    const handler = (await import("../../../../frontend\\frontend")).nextjs;
    registerTestHandler({
        apiRoute: { service: "frontend", name: "nextjs", raw: true, handler, streamingRequest: false, streamingResponse: false },
        middlewares: frontend_service.default.cfg.middlewares || [],
        endpointOptions: {"expose":true,"auth":false,"isRaw":true,"isStream":false,"tags":[]},
    });

    return apiCall("frontend", "nextjs", params, opts);
}

