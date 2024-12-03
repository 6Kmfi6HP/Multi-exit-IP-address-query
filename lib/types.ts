export interface SpeedTestServer {
  url: string;
  lat: string;
  lon: string;
  distance: number;
  name: string;
  country: string;
  cc: string;
  sponsor: string;
  id: string;
  preferred: number;
  https_functional: number;
  host: string;
}

export interface SpeedTestResponse {
  total: number;
  servers: SpeedTestServer[];
}

export interface IPResult {
  host: string;
  ip: string | null;
  location: string;
  error?: string;
}