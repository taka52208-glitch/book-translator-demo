import axios, { AxiosError } from 'axios';
import type { TranslateRequest, TranslateResponse, ApiError } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8432';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const translateImage = async (
  request: TranslateRequest
): Promise<TranslateResponse> => {
  try {
    const response = await apiClient.post<TranslateResponse>(
      '/api/translate',
      request
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response?.data) {
      const apiError = error.response.data as ApiError;
      throw new Error(apiError.detail || '翻訳処理に失敗しました');
    }
    throw new Error('サーバーに接続できませんでした');
  }
};

export const checkHealth = async (): Promise<boolean> => {
  try {
    await apiClient.get('/api/health');
    return true;
  } catch {
    return false;
  }
};

export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      const base64 = result.split(',')[1];
      resolve(base64);
    };
    reader.onerror = () => reject(new Error('ファイルの読み込みに失敗しました'));
    reader.readAsDataURL(file);
  });
};
