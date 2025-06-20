import { CallOpts } from "encore.dev/api";

type Parameters<T> = T extends (...args: infer P) => unknown ? P : never;
type WithCallOpts<T extends (...args: any) => any> = (
  ...args: [...Parameters<T>, opts?: CallOpts]
) => ReturnType<T>;

import { check as check_handler } from "../../../../monitor\\check.js";
declare const check: WithCallOpts<typeof check_handler>;
export { check };

import { checkAll as checkAll_handler } from "../../../../monitor\\check.js";
declare const checkAll: WithCallOpts<typeof checkAll_handler>;
export { checkAll };

import { ping as ping_handler } from "../../../../monitor\\ping.js";
declare const ping: WithCallOpts<typeof ping_handler>;
export { ping };

import { status as status_handler } from "../../../../monitor\\status.js";
declare const status: WithCallOpts<typeof status_handler>;
export { status };


