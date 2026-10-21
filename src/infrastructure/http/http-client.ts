import axios, { type AxiosError } from "axios";

export const httpClient = axios.create({
  timeout: 15_000,
  headers: { Accept: "application/json" },
});

export function getRequestErrorMessage(
  error: AxiosError<{ error?: string }>,
  fallback: string,
) {
  return error.response?.data?.error ?? error.message ?? fallback;
}
