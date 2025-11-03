import { useQuery as useTanstackQuery } from "@tanstack/react-query";
import type { UseQueryOptions } from "@tanstack/react-query";

const API_BASE_URL: string = import.meta.env.VITE_API_URL;

// Generic fetcher for any HTTP method and path
async function apiFetcher(method: string, path: string, body?: any) {
  const url = `${API_BASE_URL}/api${path}`;

  console.log(url);

  const options: RequestInit = {
    method,
    headers: { "Content-Type": "application/json" },
    ...(body ? { body: JSON.stringify(body) } : {}),
  };
  const res = await fetch(url, options);
  if (!res.ok) {
    const error: any = new Error(await res.text());
    error.status = res.status;
    error.statusText = res.statusText;
    throw error;
  }
  return res.json();
}

// Custom useQuery hook
export function useQuery<
  TQueryFnData = unknown,
  TError = Error,
  TData = TQueryFnData,
>(
  method: string,
  path: string,
  body?: any,
  options?: UseQueryOptions<TQueryFnData, TError, TData, readonly unknown[]>
) {
  return useTanstackQuery({
    queryKey: [method, path, body] as const,
    queryFn: () => apiFetcher(method, path, body),
    ...options,
    retry: false,
  });
}
