import { NextRequest } from "next/server";

const IDENTITY_SERVICE_ORIGIN =
  process.env.IDENTITY_SERVICE_ORIGIN ||
  "https://powerdeed-identity-service-1015955564385.africa-south1.run.app";

const ALLOWED_ORIGINS = new Set([
  "https://auth.powerdeed.co.ke",
  "https://cms.powerdeed.co.ke",
  "https://command.powerdeed.co.ke",
  "http://localhost:3001",
  "http://localhost:3002",
  "http://localhost:3003",
]);

const getCorsHeaders = (request: NextRequest) => {
  const origin = request.headers.get("origin") || "";
  const headers = new Headers();

  if (ALLOWED_ORIGINS.has(origin)) {
    headers.set("Access-Control-Allow-Origin", origin);
    headers.set("Access-Control-Allow-Credentials", "true");
    headers.set("Vary", "Origin");
  }

  return headers;
};

const copyRequestHeaders = (request: NextRequest) => {
  const headers = new Headers(request.headers);

  headers.delete("host");
  headers.delete("content-length");
  headers.delete("accept-encoding");

  return headers;
};

const copyResponseHeaders = (source: Headers, destination: Headers) => {
  source.forEach((value, key) => {
    const normalizedKey = key.toLowerCase();

    if (
      [
        "connection",
        "content-encoding",
        "content-length",
        "set-cookie",
        "transfer-encoding",
      ].includes(normalizedKey)
    ) {
      return;
    }

    destination.set(key, value);
  });
};

const getSetCookieHeaders = (headers: Headers) => {
  const headerWithGetter = headers as Headers & {
    getSetCookie?: () => string[];
  };

  return headerWithGetter.getSetCookie?.() || [];
};

const proxyIdentityRequest = async (
  request: NextRequest,
  context: { params: Promise<{ path?: string[] }> },
) => {
  const { path = [] } = await context.params;
  const sourceUrl = new URL(request.url);
  const targetUrl = new URL(
    `/${path.join("/")}${sourceUrl.search}`,
    IDENTITY_SERVICE_ORIGIN,
  );

  const upstream = await fetch(targetUrl, {
    method: request.method,
    headers: copyRequestHeaders(request),
    body: ["GET", "HEAD"].includes(request.method) ? undefined : request.body,
    redirect: "manual",
    // Required by Node fetch when forwarding a streamed request body.
    duplex: "half",
  } as RequestInit);

  const responseHeaders = getCorsHeaders(request);
  copyResponseHeaders(upstream.headers, responseHeaders);

  const setCookieHeaders = getSetCookieHeaders(upstream.headers);
  for (const setCookie of setCookieHeaders) {
    responseHeaders.append("Set-Cookie", setCookie);
  }

  return new Response(upstream.body, {
    status: upstream.status,
    statusText: upstream.statusText,
    headers: responseHeaders,
  });
};

export const OPTIONS = (request: NextRequest) => {
  const headers = getCorsHeaders(request);

  headers.set("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE,OPTIONS");
  headers.set(
    "Access-Control-Allow-Headers",
    request.headers.get("access-control-request-headers") ||
      "Content-Type,Authorization",
  );
  headers.set("Access-Control-Max-Age", "86400");

  return new Response(null, { status: 204, headers });
};

export const GET = proxyIdentityRequest;
export const POST = proxyIdentityRequest;
export const PUT = proxyIdentityRequest;
export const PATCH = proxyIdentityRequest;
export const DELETE = proxyIdentityRequest;
