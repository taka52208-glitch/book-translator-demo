import { useState, useCallback } from 'react';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Alert,
  CircularProgress,
  Paper,
} from '@mui/material';
import TranslateIcon from '@mui/icons-material/Translate';
import { ImageUploader } from '../components/ImageUploader';
import { TranslationResult } from '../components/TranslationResult';
import { translateImage, fileToBase64 } from '../utils/translateApi';
import type { TranslateResponse } from '../types';

export const TranslateDemo = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [previousEnding, setPreviousEnding] = useState('');
  const [result, setResult] = useState<TranslateResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileSelect = useCallback((file: File) => {
    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
    setResult(null);
    setError(null);
  }, []);

  const handleTranslate = async () => {
    if (!selectedFile) {
      setError('画像を選択してください');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const base64Image = await fileToBase64(selectedFile);
      const response = await translateImage({
        image: base64Image,
        previousPageEnding: previousEnding || undefined,
      });
      setResult(response);
    } catch (err) {
      setError(err instanceof Error ? err.message : '翻訳に失敗しました');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setPreviousEnding('');
    setResult(null);
    setError(null);
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          翻訳デモ
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Kindleのスクリーンショットをアップロードして、AIが日本語に翻訳します。
        </Typography>
      </Box>

      <Paper variant="outlined" sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          1. 画像をアップロード
        </Typography>
        <ImageUploader
          onFileSelect={handleFileSelect}
          previewUrl={previewUrl}
          disabled={isLoading}
        />
      </Paper>

      <Paper variant="outlined" sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          2. 前ページ末尾（任意）
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          前のページから続く文がある場合、その英文を入力してください。
          ページを跨いだ文章を正確に翻訳できます。
        </Typography>
        <TextField
          fullWidth
          multiline
          rows={2}
          placeholder="例: The quick brown fox jumps over the..."
          value={previousEnding}
          onChange={(e) => setPreviousEnding(e.target.value)}
          disabled={isLoading}
          inputProps={{ maxLength: 500 }}
        />
      </Paper>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
        <Button
          variant="contained"
          size="large"
          startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : <TranslateIcon />}
          onClick={handleTranslate}
          disabled={!selectedFile || isLoading}
        >
          {isLoading ? '翻訳中...' : '翻訳する'}
        </Button>
        <Button
          variant="outlined"
          size="large"
          onClick={handleReset}
          disabled={isLoading}
        >
          リセット
        </Button>
      </Box>

      {result && <TranslationResult result={result} />}
    </Container>
  );
};
