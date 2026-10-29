// Classifies the result of fetching one external source link (used by check-external-sources.mjs).
//   ok          2xx/3xx
//   warn        401/403/429: bot protection, not a dead link
//   unreachable no HTTP response (timeout, connection reset, TLS error): the host may be blocking or throttling CI runners
//   fail        404/410, other 4xx, 5xx, or a DNS name that does not exist: a genuinely dead link
const DNS_ERRORS = new Set(["ENOTFOUND", "EAI_AGAIN_PERMANENT"]);

export function classify(status, errorCode = "") {
  if (status >= 200 && status < 400) return "ok";
  if ([401, 403, 429].includes(status)) return "warn";
  if (status === 0) return DNS_ERRORS.has(errorCode) ? "fail" : "unreachable";
  return "fail";
}

const errorCodeOf = (error) => error?.cause?.code ?? (typeof error?.code === "string" ? error.code : undefined) ?? error?.name ?? "error";
const pause = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/** HEAD then GET, retrying once when no HTTP response came back at all. Returns { status, errorCode }. */
export async function checkUrl(url, fetchFn = fetch, { attempts = 2, delayMs = 2000, timeoutMs = 20000 } = {}) {
  let status = 0;
  let errorCode = "";
  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    status = 0;
    errorCode = "";
    for (const method of ["HEAD", "GET"]) {
      try {
        const response = await fetchFn(url, { method, redirect: "follow", headers: { "User-Agent": "Mozilla/5.0 (compatible; source-check/1.0)" }, signal: AbortSignal.timeout(timeoutMs) });
        status = response.status;
        errorCode = "";
        if (response.ok) return { status, errorCode };
      } catch (error) {
        status = 0;
        errorCode = errorCodeOf(error);
      }
    }
    if (status !== 0 || attempt === attempts) break;
    await pause(delayMs);
  }
  return { status, errorCode };
}
