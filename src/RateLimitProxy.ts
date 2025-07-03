import { IMessageService } from "./IMessageService";

export function createRateLimitProxy(
  service: IMessageService,
  intervalMs: number
): IMessageService {
  let lastCallTime = 0;

  return new Proxy(service, {
    get(target, prop, receiver) {
      const orig = Reflect.get(target, prop, receiver);

      if (typeof orig === 'function' && prop === 'send') {
        return function (...args: any[]) {
          const now = Date.now();
          if (now - lastCallTime >= intervalMs) {
            lastCallTime = now;
            return orig.apply(target, args);
          } else {
            console.log("[RateLimit] skipped");
          }
        };
      }

      return orig;
    },
  });
}
