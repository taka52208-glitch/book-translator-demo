import { createTheme } from '@mui/material';
import { palette } from './palette';
import { typography } from './typography';
import { components } from './components';

/**
 * Nordic Frost テーマ
 * 北欧デザイン、ミニマル、プロフェッショナル
 */
export const theme = createTheme({
  palette,
  typography,
  components,
  shape: {
    borderRadius: 8,
  },
  spacing: 8,
});

export { palette } from './palette';
export { typography } from './typography';
export { components } from './components';
