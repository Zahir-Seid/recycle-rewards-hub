const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

interface RegisterData {
  email: string;
  password: string;
  full_name: string;
  fayda_number: string;
  phone_number: string;
}

interface LoginData {
  email: string;
  password: string;
}

interface StartSessionData {
  machine_id: string;
  code: string;
}

interface BindSessionData {
  code: string;
}

interface DepositData {
  machine_id: string;
  code: string;
  count: number;
}

class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = "ApiError";
  }
}

async function request<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = localStorage.getItem("token");
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: response.statusText }));
    throw new ApiError(response.status, error.error || "Request failed");
  }

  return response.json();
}

export const api = {
  async register(data: RegisterData) {
    return request<{ message: string }>("/api/register", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  async login(data: LoginData) {
    return request<{ access_token: string }>("/api/login", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  async startSession(data: StartSessionData) {
    return request<{ message: string }>("/api/start-session", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  async bindSession(data: BindSessionData) {
    return request<{ message: string }>("/api/bind-session", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  async getSessionStatus(code: string) {
    return request<{ status: string }>(`/api/session-status?code=${code}`, {
      method: "GET",
    });
  },

  async deposit(data: DepositData) {
    return request<{ message: string }>("/api/deposit", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },
};

export { ApiError };

