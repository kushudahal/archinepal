export type ApiEnvelope<T> = {
  success: boolean;
  data: T;
};

export type Paginated<T> = {
  items: T[];
  meta: {
    page: number;
    limit: number;
    total: number;
  };
};

export class ApiClientError extends Error {
  status: number;
  code?: string;

  constructor(message: string, status: number, code?: string) {
    super(message);
    this.name = "ApiClientError";
    this.status = status;
    this.code = code;
  }
}

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000/api";
const AUTH_DEBUG = process.env.NEXT_PUBLIC_AUTH_DEBUG === "true";

type QueryValue = string | number | boolean | null | undefined;

function buildUrl(path: string, query?: Record<string, QueryValue>) {
  const url = new URL(path.replace(/^\//, ""), `${API_URL.replace(/\/$/, "")}/`);

  Object.entries(query ?? {}).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      url.searchParams.set(key, String(value));
    }
  });

  return url.toString();
}

export async function apiFetch<T>(
  path: string,
  options: RequestInit & { query?: Record<string, QueryValue> } = {}
): Promise<T> {
  const { query, headers, body, ...init } = options;
  const url = buildUrl(path, query);

  if (AUTH_DEBUG) {
    console.debug("[apiFetch] sending request", {
      method: init.method ?? "GET",
      url,
      hasBody: Boolean(body),
      credentials: "include"
    });
  }

  const response = await fetch(url, {
    ...init,
    body,
    credentials: "include",
    headers: {
      ...(body instanceof FormData ? {} : { "Content-Type": "application/json" }),
      ...headers
    }
  });

  const payload = await response.json().catch(() => null);

  if (AUTH_DEBUG) {
    console.debug("[apiFetch] received response", {
      method: init.method ?? "GET",
      url,
      status: response.status,
      ok: response.ok,
      code: payload?.code
    });
  }

  if (!response.ok) {
    throw new ApiClientError(
      payload?.message ?? payload?.error ?? `Request failed with status ${response.status}`,
      response.status,
      payload?.code
    );
  }

  return (payload?.data ?? payload) as T;
}

export function toQuery(input?: Record<string, QueryValue>) {
  return input;
}
