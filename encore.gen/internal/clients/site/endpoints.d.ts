import { CallOpts } from "encore.dev/api";

type Parameters<T> = T extends (...args: infer P) => unknown ? P : never;
type WithCallOpts<T extends (...args: any) => any> = (
  ...args: [...Parameters<T>, opts?: CallOpts]
) => ReturnType<T>;

import { add as add_handler } from "../../../../site\\site.js";
declare const add: WithCallOpts<typeof add_handler>;
export { add };

import { get as get_handler } from "../../../../site\\site.js";
declare const get: WithCallOpts<typeof get_handler>;
export { get };

import { del as del_handler } from "../../../../site\\site.js";
declare const del: WithCallOpts<typeof del_handler>;
export { del };

import { list as list_handler } from "../../../../site\\site.js";
declare const list: WithCallOpts<typeof list_handler>;
export { list };


