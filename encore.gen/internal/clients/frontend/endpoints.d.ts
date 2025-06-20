import { CallOpts } from "encore.dev/api";

type Parameters<T> = T extends (...args: infer P) => unknown ? P : never;
type WithCallOpts<T extends (...args: any) => any> = (
  ...args: [...Parameters<T>, opts?: CallOpts]
) => ReturnType<T>;

import { nextjs as nextjs_handler } from "../../../../frontend\\frontend.js";
declare const nextjs: WithCallOpts<typeof nextjs_handler>;
export { nextjs };


