type DirectusQuery = {
  fields?: string[];
  sort?: string[];
  limit?: number;
  filter?: Record<string, unknown>;
};

type DirectusResponse<T> = {
  data: T;
};

let warnedMissingEnv = false;

export function getDirectusConfig() {
  const url = process.env.DIRECTUS_URL?.replace(/\/$/, "");
  const token = process.env.DIRECTUS_TOKEN;

  if (!url || !token) {
    if (!warnedMissingEnv && process.env.NODE_ENV === "development") {
      warnedMissingEnv = true;
      console.info("Directus env vars are not set. Using local content fallback.");
    }
    return null;
  }

  return { url, token };
}

export async function readDirectusItems<T>(collection: string, query: DirectusQuery = {}) {
  const config = getDirectusConfig();
  if (!config) return null;

  const endpoint = buildUrl(`${config.url}/items/${collection}`, query);

  try {
    const response = await fetch(endpoint, {
      headers: {
        Authorization: `Bearer ${config.token}`,
      },
      next: { revalidate: 300 },
    });

    if (!response.ok) {
      throw new Error(`Directus ${collection} request failed with ${response.status}`);
    }

    const payload = (await response.json()) as DirectusResponse<T[] | T>;
    return Array.isArray(payload.data) ? payload.data : [payload.data];
  } catch (error) {
    console.warn(`Directus ${collection} is unavailable. Using local fallback.`, error);
    return null;
  }
}

export async function readDirectusSingleton<T>(collection: string, query: DirectusQuery = {}) {
  const items = await readDirectusItems<T>(collection, { limit: 1, ...query });
  return items?.[0] ?? null;
}

export async function createDirectusItem<TPayload, TResult = unknown>(collection: string, payload: TPayload) {
  const config = getDirectusConfig();
  if (!config) return null;

  try {
    const response = await fetch(`${config.url}/items/${collection}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${config.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Directus ${collection} create failed with ${response.status}`);
    }

    return ((await response.json()) as DirectusResponse<TResult>).data;
  } catch (error) {
    console.warn(`Directus ${collection} save failed. Falling back where possible.`, error);
    return null;
  }
}

export function directusAssetUrl(value: unknown, fallback: string) {
  const config = getDirectusConfig();
  const assetId = normalizeAssetId(value);

  if (!assetId) return fallback;
  if (assetId.startsWith("/") || assetId.startsWith("http://") || assetId.startsWith("https://")) {
    return assetId;
  }

  return config ? `${config.url}/assets/${assetId}` : fallback;
}

function buildUrl(base: string, query: DirectusQuery) {
  const url = new URL(base);

  if (query.fields?.length) url.searchParams.set("fields", query.fields.join(","));
  if (query.sort?.length) url.searchParams.set("sort", query.sort.join(","));
  if (query.limit) url.searchParams.set("limit", String(query.limit));
  if (query.filter) url.searchParams.set("filter", JSON.stringify(query.filter));

  return url.toString();
}

function normalizeAssetId(value: unknown) {
  if (typeof value === "string") return value;
  if (value && typeof value === "object") {
    const record = value as Record<string, unknown>;
    if (typeof record.id === "string") return record.id;
    if (typeof record.filename_disk === "string") return record.filename_disk;
  }

  return null;
}
