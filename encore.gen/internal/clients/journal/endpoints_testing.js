import { apiCall, streamIn, streamOut, streamInOut } from "encore.dev/internal/codegen/api";
import { registerTestHandler } from "encore.dev/internal/codegen/appinit";

import * as journal_service from "../../../../journal\\encore.service";

export async function create(params, opts) {
    const handler = (await import("../../../../journal\\journal")).create;
    registerTestHandler({
        apiRoute: { service: "journal", name: "create", raw: false, handler, streamingRequest: false, streamingResponse: false },
        middlewares: journal_service.default.cfg.middlewares || [],
        endpointOptions: {"expose":true,"auth":false,"isRaw":false,"isStream":false,"tags":[]},
    });

    return apiCall("journal", "create", params, opts);
}

export async function get(params, opts) {
    const handler = (await import("../../../../journal\\journal")).get;
    registerTestHandler({
        apiRoute: { service: "journal", name: "get", raw: false, handler, streamingRequest: false, streamingResponse: false },
        middlewares: journal_service.default.cfg.middlewares || [],
        endpointOptions: {"expose":true,"auth":false,"isRaw":false,"isStream":false,"tags":[]},
    });

    return apiCall("journal", "get", params, opts);
}

export async function update(params, opts) {
    const handler = (await import("../../../../journal\\journal")).update;
    registerTestHandler({
        apiRoute: { service: "journal", name: "update", raw: false, handler, streamingRequest: false, streamingResponse: false },
        middlewares: journal_service.default.cfg.middlewares || [],
        endpointOptions: {"expose":true,"auth":false,"isRaw":false,"isStream":false,"tags":[]},
    });

    return apiCall("journal", "update", params, opts);
}

export async function del(params, opts) {
    const handler = (await import("../../../../journal\\journal")).del;
    registerTestHandler({
        apiRoute: { service: "journal", name: "del", raw: false, handler, streamingRequest: false, streamingResponse: false },
        middlewares: journal_service.default.cfg.middlewares || [],
        endpointOptions: {"expose":true,"auth":false,"isRaw":false,"isStream":false,"tags":[]},
    });

    return apiCall("journal", "del", params, opts);
}

export async function list(params, opts) {
    const handler = (await import("../../../../journal\\journal")).list;
    registerTestHandler({
        apiRoute: { service: "journal", name: "list", raw: false, handler, streamingRequest: false, streamingResponse: false },
        middlewares: journal_service.default.cfg.middlewares || [],
        endpointOptions: {"expose":true,"auth":false,"isRaw":false,"isStream":false,"tags":[]},
    });

    return apiCall("journal", "list", params, opts);
}

