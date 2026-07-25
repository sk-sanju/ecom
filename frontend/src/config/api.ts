export const API_URL = import.meta.env.VITE_API_URL || "https://backend-05oi.onrender.com";

interface ApiFetchOptions extends RequestInit {
  timeout?: number;
}

export class ApiError extends Error {
  public status?: number;
  public data?: any;

  constructor(message: string, status?: number, data?: any) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.data = data;
  }
}

export const apiFetch = async (endpoint: string, options: ApiFetchOptions = {}): Promise<any> => {
  const { timeout = 10000, ...fetchOptions } = options;

  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  // Normalize endpoint to always start with a slash
  const normalizedEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  
  // Create URL, assuming endpoint is relative to API_URL/api
  const url = `${API_URL}/api${normalizedEndpoint}`;

  try {
    const response = await fetch(url, {
      ...fetchOptions,
      signal: controller.signal,
    });
    
    clearTimeout(id);

    let data;
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.indexOf("application/json") !== -1) {
      try {
        data = await response.json();
      } catch (err) {
        throw new ApiError("Invalid JSON response from server", response.status);
      }
    } else {
      data = await response.text();
    }

    if (!response.ok) {
      throw new ApiError(data?.message || `Request failed with status ${response.status}`, response.status, data);
    }

    return data;
  } catch (error: any) {
    clearTimeout(id);
    
    if (error.name === 'AbortError') {
      throw new ApiError("Request timeout", 408);
    }
    
    if (error instanceof ApiError) {
      throw error;
    }
    
    // Network error (backend unavailable, DNS issue, etc.)
    throw new ApiError("Network error or backend unavailable", 0);
  }
};
