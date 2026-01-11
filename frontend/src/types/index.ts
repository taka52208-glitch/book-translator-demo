export interface TranslateRequest {
  image: string;
  previousPageEnding?: string;
}

export interface TranslateResponse {
  translatedText: string;
  originalEnding?: string;
  pageInfo?: string;
  hasImageMarker: boolean;
}

export interface ApiError {
  detail: string;
}
