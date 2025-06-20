import { apiCall, streamIn, streamOut, streamInOut } from "encore.dev/internal/codegen/api";
import { registerTestHandler } from "encore.dev/internal/codegen/appinit";

import * as monitor_service from "../../../../monitor\\encore.service";

export async function check(params, opts) {
    const handler = (await import("../../../../monitor\\check")).check;
    registerTestHandler({
        apiRoute: { service: "monitor", name: "check", raw: false, handler, streamingRequest: false, streamingResponse: false },
        middlewares: monitor_service.default.cfg.middlewares || [],
        endpointOptions: {"expose":true,"auth":false,"isRaw":false,"isStream":false,"tags":[]},
    });

    return apiCall("monitor", "check", params, opts);
}

export async function checkAll(params, opts) {
    const handler = (await import("../../../../monitor\\check")).checkAll;
    registerTestHandler({
        apiRoute: { service: "monitor", name: "checkAll", raw: false, handler, streamingRequest: false, streamingResponse: false },
        middlewares: monitor_service.default.cfg.middlewares || [],
        endpointOptions: {"expose":true,"auth":false,"isRaw":false,"isStream":false,"tags":[]},
    });

    return apiCall("monitor", "checkAll", params, opts);
}

export async function ping(params, opts) {
    const handler = (await import("../../../../monitor\\ping")).ping;
    registerTestHandler({
        apiRoute: { service: "monitor", name: "ping", raw: false, handler, streamingRequest: false, streamingResponse: false },
        middlewares: monitor_service.default.cfg.middlewares || [],
        endpointOptions: {"expose":true,"auth":false,"isRaw":false,"isStream":false,"tags":[]},
    });

    return apiCall("monitor", "ping", params, opts);
}

export async function status(params, opts) {
    const handler = (await import("../../../../monitor\\status")).status;
    registerTestHandler({
        apiRoute: { service: "monitor", name: "status", raw: false, handler, streamingRequest: false, streamingResponse: false },
        middlewares: monitor_service.default.cfg.middlewares || [],
        endpointOptions: {"expose":true,"auth":false,"isRaw":false,"isStream":false,"tags":[]},
    });

    return apiCall("monitor", "status", params, opts);
}

