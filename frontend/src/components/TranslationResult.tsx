import { Box, Paper, Typography, Divider, Chip } from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';
import type { TranslateResponse } from '../types';

interface TranslationResultProps {
  result: TranslateResponse;
}

export const TranslationResult = ({ result }: TranslationResultProps) => {
  const renderTextWithImageMarkers = (text: string) => {
    const parts = text.split('[IMAGE_HERE]');
    if (parts.length === 1) {
      return <Typography sx={{ whiteSpace: 'pre-wrap' }}>{text}</Typography>;
    }

    return (
      <Box>
        {parts.map((part, index) => (
          <Box key={index}>
            {part && (
              <Typography sx={{ whiteSpace: 'pre-wrap' }}>{part}</Typography>
            )}
            {index < parts.length - 1 && (
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  py: 2,
                  my: 2,
                  backgroundColor: 'grey.100',
                  borderRadius: 1,
                }}
              >
                <ImageIcon sx={{ mr: 1, color: 'text.secondary' }} />
                <Typography variant="body2" color="text.secondary">
                  イラスト / 図表
                </Typography>
              </Box>
            )}
          </Box>
        ))}
      </Box>
    );
  };

  return (
    <Paper variant="outlined" sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
        <Typography variant="h6">翻訳結果</Typography>
        {result.pageInfo && (
          <Chip label={result.pageInfo} size="small" variant="outlined" />
        )}
        {result.hasImageMarker && (
          <Chip
            icon={<ImageIcon />}
            label="図表あり"
            size="small"
            color="info"
            variant="outlined"
          />
        )}
      </Box>

      <Box sx={{ mb: 3 }}>
        {renderTextWithImageMarkers(result.translatedText)}
      </Box>

      {result.originalEnding && (
        <>
          <Divider sx={{ my: 2 }} />
          <Box>
            <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
              原文末尾（次ページ用）
            </Typography>
            <Paper
              variant="outlined"
              sx={{
                p: 2,
                backgroundColor: 'rgba(214, 137, 16, 0.08)',
                borderColor: 'warning.main',
              }}
            >
              <Typography
                sx={{
                  fontStyle: 'italic',
                  color: 'text.secondary',
                }}
              >
                {result.originalEnding}
              </Typography>
            </Paper>
            <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
              次のページを翻訳する際、この文を「前ページ末尾」に入力してください
            </Typography>
          </Box>
        </>
      )}
    </Paper>
  );
};
