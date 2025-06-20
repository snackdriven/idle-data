import { apiCall, streamIn, streamOut, streamInOut } from "encore.dev/internal/codegen/api";
import { registerTestHandler } from "encore.dev/internal/codegen/appinit";

import * as slack_service from "../../../../slack\\encore.service";

export async function notify(params, opts) {
    const handler = (await import("../../../../slack\\slack")).notify;
    registerTestHandler({
        apiRoute: { service: "slack", name: "notify", raw: false, handler, streamingRequest: false, streamingResponse: false },
        middlewares: slack_service.default.cfg.middlewares || [],
        endpointOptions: {"expose":false,"auth":false,"isRaw":false,"isStream":false,"tags":[]},
    });

    return apiCall("slack", "notify", params, opts);
}

