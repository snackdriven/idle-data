import { registerGateways, registerHandlers, run, type Handler } from "encore.dev/internal/codegen/appinit";

import { nextjs as frontend_nextjsImpl0 } from "../../../../frontend\\frontend";
import { create as journal_createImpl1 } from "../../../../journal\\journal";
import { get as journal_getImpl2 } from "../../../../journal\\journal";
import { update as journal_updateImpl3 } from "../../../../journal\\journal";
import { del as journal_delImpl4 } from "../../../../journal\\journal";
import { list as journal_listImpl5 } from "../../../../journal\\journal";
import { check as monitor_checkImpl6 } from "../../../../monitor\\check";
import { checkAll as monitor_checkAllImpl7 } from "../../../../monitor\\check";
import { ping as monitor_pingImpl8 } from "../../../../monitor\\ping";
import { status as monitor_statusImpl9 } from "../../../../monitor\\status";
import { add as site_addImpl10 } from "../../../../site\\site";
import { get as site_getImpl11 } from "../../../../site\\site";
import { del as site_delImpl12 } from "../../../../site\\site";
import { list as site_listImpl13 } from "../../../../site\\site";
import "../../../../monitor\\check";
import * as frontend_service from "../../../../frontend\\encore.service";
import * as journal_service from "../../../../journal\\encore.service";
import * as monitor_service from "../../../../monitor\\encore.service";
import * as site_service from "../../../../site\\encore.service";

const gateways: any[] = [
];

const handlers: Handler[] = [
    {
        apiRoute: {
            service:           "frontend",
            name:              "nextjs",
            handler:           frontend_nextjsImpl0,
            raw:               true,
            streamingRequest:  false,
            streamingResponse: false,
        },
        endpointOptions: {"expose":true,"auth":false,"isRaw":true,"isStream":false,"tags":[]},
        middlewares: frontend_service.default.cfg.middlewares || [],
    },
    {
        apiRoute: {
            service:           "journal",
            name:              "create",
            handler:           journal_createImpl1,
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
            handler:           journal_getImpl2,
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
            handler:           journal_updateImpl3,
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
            handler:           journal_delImpl4,
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
            handler:           journal_listImpl5,
            raw:               false,
            streamingRequest:  false,
            streamingResponse: false,
        },
        endpointOptions: {"expose":true,"auth":false,"isRaw":false,"isStream":false,"tags":[]},
        middlewares: journal_service.default.cfg.middlewares || [],
    },
    {
        apiRoute: {
            service:           "monitor",
            name:              "check",
            handler:           monitor_checkImpl6,
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
            handler:           monitor_checkAllImpl7,
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
            handler:           monitor_pingImpl8,
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
            handler:           monitor_statusImpl9,
            raw:               false,
            streamingRequest:  false,
            streamingResponse: false,
        },
        endpointOptions: {"expose":true,"auth":false,"isRaw":false,"isStream":false,"tags":[]},
        middlewares: monitor_service.default.cfg.middlewares || [],
    },
    {
        apiRoute: {
            service:           "site",
            name:              "add",
            handler:           site_addImpl10,
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
            handler:           site_getImpl11,
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
            handler:           site_delImpl12,
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
            handler:           site_listImpl13,
            raw:               false,
            streamingRequest:  false,
            streamingResponse: false,
        },
        endpointOptions: {"expose":true,"auth":false,"isRaw":false,"isStream":false,"tags":[]},
        middlewares: site_service.default.cfg.middlewares || [],
    },
];

registerGateways(gateways);
registerHandlers(handlers);

await run(import.meta.url);
