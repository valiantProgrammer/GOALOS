import { CompletionIntent, SyncResponse } from "@goalos/types";

export interface ApiClientConfig {
  baseUrl: string;
  getAuthToken?: () => Promise<string | null> | string | null;
  onUnauthorized?: () => void;
}

export class GoalOSApiClient {
  private baseUrl: string;
  private getAuthToken?: () => Promise<string | null> | string | null;
  private onUnauthorized?: () => void;

  constructor(config: ApiClientConfig) {
    this.baseUrl = config.baseUrl.replace(/\/$/, "");
    this.getAuthToken = config.getAuthToken;
    this.onUnauthorized = config.onUnauthorized;
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseUrl}${endpoint.startsWith("/") ? endpoint : `/${endpoint}`}`;
    const headers = new Headers(options.headers);

    if (!headers.has("Content-Type") && !(options.body instanceof FormData)) {
      headers.set("Content-Type", "application/json");
    }

    if (this.getAuthToken) {
      const token = await this.getAuthToken();
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
    }

    const response = await fetch(url, { ...options, headers });

    if (response.status === 401 && this.onUnauthorized) {
      this.onUnauthorized();
    }

    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(`API Error [${response.status}]: ${errorBody}`);
    }

    return response.json();
  }

  // --- Hunter Sync ---
  public async sync(sinceVersion: number = 0): Promise<SyncResponse> {
    return this.request<SyncResponse>(`/api/sync?since=${sinceVersion}`);
  }

  // --- Complete Quest / Habit (Idempotent) ---
  public async submitCompletion(intent: CompletionIntent): Promise<{ success: boolean; syncVersion: number }> {
    return this.request<{ success: boolean; syncVersion: number }>("/api/completions", {
      method: "POST",
      body: JSON.stringify(intent),
    });
  }
}
