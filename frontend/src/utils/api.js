// frontend/src/utils/api.js

// 1) Bas-URL: env variabel om den finns, annars vettig default per miljö
const RAW_BASE_URL = import.meta.env.VITE_API_BASE_URL?.trim();
const DEFAULT_BASE_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:5000/api"
    : "https://ai-lab-zp1r.onrender.com/api";

const API_BASE_URL = RAW_BASE_URL || DEFAULT_BASE_URL;

// Snabb validering (fångar t.ex. tom sträng eller saknad protokoll)
if (!API_BASE_URL || !/^https?:\/\//.test(API_BASE_URL)) {
  // eslint-disable-next-line no-console
  console.error("[API] Invalid API_BASE_URL:", API_BASE_URL);
  throw new Error(
    "Misconfigured API base URL. Check VITE_API_BASE_URL or api.js defaults."
  );
}

// Robust join som tar bort dubbla / mellan delar
const join = (...parts) =>
  parts
    .filter(Boolean)
    .map((p, i) =>
      i === 0 ? p.replace(/\/+$/, "") : p.replace(/^\/+/, "").replace(/\/+$/, "")
    )
    .join("/");

// 2) Samlade endpoints (relativa paths används nu, apiFetch bygger full URL)
export const API_ENDPOINTS = {
  login: "auth/login",
  register: "auth/register",
  results: "results",
};

// 3) En gemensam fetch-wrapper med timeout & felhantering
export async function apiFetch(
  pathOrUrl,
  {
    method = "GET",
    headers = {},
    body,
    token, // valfritt, hämtas från localStorage om inte angivet
    timeoutMs = 15000,
    parse = "json", // "json" eller "text"
  } = {}
) {
  // Om token inte explicit skickas med, försök hämta från localStorage automatiskt
  const authToken = token || localStorage.getItem("token");

  // Bygg URL: om pathOrUrl är full URL, använd den direkt, annars bygg med bas-URL + relativ path
  const url =
    typeof pathOrUrl === "string" && /^https?:\/\//.test(pathOrUrl)
      ? pathOrUrl
      : join(API_BASE_URL, String(pathOrUrl || ""));

  const ctrl = new AbortController();
  const timer = setTimeout(
    () => ctrl.abort(new DOMException("Timeout", "AbortError")),
    timeoutMs
  );

  // Lägg till Accept-header som standard, och kopiera ev. andra headers
  const finalHeaders = { Accept: "application/json", ...headers };
  const isFormData = typeof FormData !== "undefined" && body instanceof FormData;

  // Om body finns och inte är FormData, sätt Content-Type till application/json om inte redan satt
  if (body && !isFormData && !finalHeaders["Content-Type"]) {
    finalHeaders["Content-Type"] = "application/json";
  }
  // Om token finns (antingen från argument eller localStorage), lägg till Authorization-header automatiskt
  if (authToken) finalHeaders.Authorization = `Bearer ${authToken}`;

  let res;
  try {
    res = await fetch(url, {
      method,
      headers: finalHeaders,
      body: body && !isFormData ? JSON.stringify(body) : body,
      signal: ctrl.signal,
    });
  } finally {
    clearTimeout(timer);
  }

  let data = null;
  try {
    data = parse === "text" ? await res.text() : await res.json();
  } catch {
    // tom kropp / 204 etc—det är ok
  }

  if (!res.ok) {
    const message =
      (data && (data.message || data.error)) ||
      `${res.status} ${res.statusText}`;
    const error = new Error(message);
    error.status = res.status;
    error.data = data;
    throw error;
  }

  return data;
}

export { API_BASE_URL };