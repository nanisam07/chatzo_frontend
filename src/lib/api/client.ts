import { config } from "@/lib/config";

class ApiClient {
  private baseUrl: string;
  private refreshPromise: Promise<string | null> | null = null;

  constructor() {
    this.baseUrl = config.apiUrl;
  }

  private async executeRefresh(refreshTokenVal: string): Promise<string | null> {
    try {
      const refreshRes = await fetch(`${this.baseUrl}/auth/refresh-token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refreshToken: refreshTokenVal }),
      });

      if (refreshRes.ok) {
        const refreshData = await refreshRes.json();
        const tokenData = refreshData.data || refreshData;
        if (tokenData.accessToken) {
          localStorage.setItem("accessToken", tokenData.accessToken);
          if (tokenData.refreshToken) {
            localStorage.setItem("refreshToken", tokenData.refreshToken);
          }
          return tokenData.accessToken;
        }
      }
    } catch (err) {
      console.error("Token refresh request failed:", err);
    }
    
    // Clear auth state and redirect if refresh fails
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    if (typeof window !== "undefined") {
      window.location.href = "/login";
    }
    return null;
  }

  public async request(endpoint: string, options: RequestInit = {}): Promise<Response> {
    const url = `${this.baseUrl}${endpoint}`;
    
    // Dynamically retrieve the latest accessToken
    const token = typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;
    
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };

    // Safely merge options.headers if they exist
    if (options.headers) {
      if (options.headers instanceof Headers) {
        options.headers.forEach((value, key) => {
          headers[key] = value;
        });
      } else if (Array.isArray(options.headers)) {
        options.headers.forEach(([key, value]) => {
          headers[key] = value;
        });
      } else {
        Object.assign(headers, options.headers);
      }
    }

    const response = await fetch(url, { ...options, headers });

    // Intercept 401 Unauthorized / Token Expiry
    if (
      response.status === 401 && 
      !endpoint.includes("/auth/refresh-token") && 
      !endpoint.includes("/auth/login")
    ) {
      const refreshTokenVal = typeof window !== "undefined" ? localStorage.getItem("refreshToken") : null;
      
      if (refreshTokenVal) {
        // Shared promise to deduplicate parallel refresh calls
        if (!this.refreshPromise) {
          this.refreshPromise = this.executeRefresh(refreshTokenVal).then((newToken) => {
            this.refreshPromise = null;
            return newToken;
          });
        }
        
        const newToken = await this.refreshPromise;
        if (newToken) {
          // Retry the request with the new access token
          headers["Authorization"] = `Bearer ${newToken}`;
          return fetch(url, { ...options, headers });
        }
      } else {
        // No refresh token available, clear storage and redirect
        localStorage.removeItem("accessToken");
        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }
      }
    }

    return response;
  }

  public get(endpoint: string, options?: RequestInit): Promise<Response> {
    return this.request(endpoint, { ...options, method: "GET" });
  }

  public post(endpoint: string, data?: unknown, options?: RequestInit): Promise<Response> {
    return this.request(endpoint, {
      ...options,
      method: "POST",
      body: data !== undefined ? JSON.stringify(data) : undefined,
    });
  }

  public put(endpoint: string, data?: unknown, options?: RequestInit): Promise<Response> {
    return this.request(endpoint, {
      ...options,
      method: "PUT",
      body: data !== undefined ? JSON.stringify(data) : undefined,
    });
  }

  public delete(endpoint: string, options?: RequestInit): Promise<Response> {
    return this.request(endpoint, { ...options, method: "DELETE" });
  }

  public patch(endpoint: string, data?: unknown, options?: RequestInit): Promise<Response> {
    return this.request(endpoint, {
      ...options,
      method: "PATCH",
      body: data !== undefined ? JSON.stringify(data) : undefined,
    });
  }
}

export const api = new ApiClient();
export default api;
