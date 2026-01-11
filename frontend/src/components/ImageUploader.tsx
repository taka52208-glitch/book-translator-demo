import { useCallback, useState } from 'react';
import { Box, Typography, Paper } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

interface ImageUploaderProps {
  onFileSelect: (file: File) => void;
  previewUrl: string | null;
  disabled?: boolean;
}

const ACCEPTED_TYPES = ['image/jpeg', 'image/png'];
const MAX_SIZE_MB = 10;

export const ImageUploader = ({
  onFileSelect,
  previewUrl,
  disabled = false,
}: ImageUploaderProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validateFile = (file: File): string | null => {
    if (!ACCEPTED_TYPES.includes(file.type)) {
      return 'JPGまたはPNG形式の画像を選択してください';
    }
    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      return `ファイルサイズは${MAX_SIZE_MB}MB以下にしてください`;
    }
    return null;
  };

  const handleFile = useCallback(
    (file: File) => {
      const validationError = validateFile(file);
      if (validationError) {
        setError(validationError);
        return;
      }
      setError(null);
      onFileSelect(file);
    },
    [onFileSelect]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragging(false);
      if (disabled) return;

      const file = e.dataTransfer.files[0];
      if (file) {
        handleFile(file);
      }
    },
    [disabled, handleFile]
  );

  const handleDragOver = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      if (!disabled) {
        setIsDragging(true);
      }
    },
    [disabled]
  );

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleClick = () => {
    if (disabled) return;
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = ACCEPTED_TYPES.join(',');
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        handleFile(file);
      }
    };
    input.click();
  };

  return (
    <Box>
      <Paper
        variant="outlined"
        onClick={handleClick}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        sx={{
          p: 3,
          textAlign: 'center',
          cursor: disabled ? 'not-allowed' : 'pointer',
          backgroundColor: isDragging ? 'action.hover' : 'background.paper',
          borderStyle: 'dashed',
          borderColor: isDragging ? 'primary.main' : 'divider',
          borderWidth: 2,
          opacity: disabled ? 0.6 : 1,
          transition: 'all 0.2s ease',
          '&:hover': {
            borderColor: disabled ? 'divider' : 'primary.main',
            backgroundColor: disabled ? 'background.paper' : 'action.hover',
          },
        }}
      >
        {previewUrl ? (
          <Box
            component="img"
            src={previewUrl}
            alt="プレビュー"
            sx={{
              maxWidth: '100%',
              maxHeight: 300,
              objectFit: 'contain',
            }}
          />
        ) : (
          <Box>
            <CloudUploadIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 1 }} />
            <Typography variant="body1" color="text.secondary">
              画像をドラッグ&ドロップ
            </Typography>
            <Typography variant="body2" color="text.secondary">
              またはクリックして選択
            </Typography>
            <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
              JPG / PNG形式、{MAX_SIZE_MB}MB以下
            </Typography>
          </Box>
        )}
      </Paper>
      {error && (
        <Typography variant="body2" color="error" sx={{ mt: 1 }}>
          {error}
        </Typography>
      )}
    </Box>
  );
};
