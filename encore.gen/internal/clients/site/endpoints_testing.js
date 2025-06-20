import { apiCall, streamIn, streamOut, streamInOut } from "encore.dev/internal/codegen/api";
import { registerTestHandler } from "encore.dev/internal/codegen/appinit";

import * as site_service from "../../../../site\\encore.service";

export async function add(params, opts) {
    const handler = (await import("../../../../site\\site")).add;
    registerTestHandler({
        apiRoute: { service: "site", name: "add", raw: false, handler, streamingRequest: false, streamingResponse: false },
        middlewares: site_service.default.cfg.middlewares || [],
        endpointOptions: {"expose":true,"auth":false,"isRaw":false,"isStream":false,"tags":[]},
    });

    return apiCall("site", "add", params, opts);
}

export async function get(params, opts) {
    const handler = (await import("../../../../site\\site")).get;
    registerTestHandler({
        apiRoute: { service: "site", name: "get", raw: false, handler, streamingRequest: false, streamingResponse: false },
        middlewares: site_service.default.cfg.middlewares || [],
        endpointOptions: {"expose":true,"auth":false,"isRaw":false,"isStream":false,"tags":[]},
    });

    return apiCall("site", "get", params, opts);
}

export async function del(params, opts) {
    const handler = (await import("../../../../site\\site")).del;
    registerTestHandler({
        apiRoute: { service: "site", name: "del", raw: false, handler, streamingRequest: false, streamingResponse: false },
        middlewares: site_service.default.cfg.middlewares || [],
        endpointOptions: {"expose":true,"auth":false,"isRaw":false,"isStream":false,"tags":[]},
    });

    return apiCall("site", "del", params, opts);
}

export async function list(params, opts) {
    const handler = (await import("../../../../site\\site")).list;
    registerTestHandler({
        apiRoute: { service: "site", name: "list", raw: false, handler, streamingRequest: false, streamingResponse: false },
        middlewares: site_service.default.cfg.middlewares || [],
        endpointOptions: {"expose":true,"auth":false,"isRaw":false,"isStream":false,"tags":[]},
    });

    return apiCall("site", "list", params, opts);
}

