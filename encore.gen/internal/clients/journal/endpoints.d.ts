import { CallOpts } from "encore.dev/api";

type Parameters<T> = T extends (...args: infer P) => unknown ? P : never;
type WithCallOpts<T extends (...args: any) => any> = (
  ...args: [...Parameters<T>, opts?: CallOpts]
) => ReturnType<T>;

import { create as create_handler } from "../../../../journal\\journal.js";
declare const create: WithCallOpts<typeof create_handler>;
export { create };

import { get as get_handler } from "../../../../journal\\journal.js";
declare const get: WithCallOpts<typeof get_handler>;
export { get };

import { update as update_handler } from "../../../../journal\\journal.js";
declare const update: WithCallOpts<typeof update_handler>;
export { update };

import { del as del_handler } from "../../../../journal\\journal.js";
declare const del: WithCallOpts<typeof del_handler>;
export { del };

import { list as list_handler } from "../../../../journal\\journal.js";
declare const list: WithCallOpts<typeof list_handler>;
export { list };


