import { Context } from "koa";

export function parseHttpRequestBody<T>(ctx: Context): T {
  return (ctx.request as any).body;
}
