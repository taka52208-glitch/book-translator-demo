import {
  Container,
  Box,
  Typography,
  Paper,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import CloudSyncIcon from '@mui/icons-material/CloudSync';
import TranslateIcon from '@mui/icons-material/Translate';
import StorageIcon from '@mui/icons-material/Storage';
import FolderIcon from '@mui/icons-material/Folder';

const phase1Steps = [
  {
    label: 'Keyboard Maestro',
    description: 'Macのキーボード自動化ツールでKindleアプリを操作し、ページを自動でスクリーンショット撮影します。',
  },
];

const phase2Steps = [
  {
    label: 'Google Drive Trigger',
    description: '新しい画像がGoogle Driveにアップロードされたことを検出します。',
    icon: <CloudSyncIcon />,
  },
  {
    label: 'OpenAI API',
    description: 'GPT-4oまたはGPT-4o-miniで画像内のテキストを認識し、日本語に翻訳します。',
    icon: <TranslateIcon />,
  },
  {
    label: 'Notion API',
    description: '翻訳結果をNotionデータベースに保存し、整理された形式で閲覧できるようにします。',
    icon: <StorageIcon />,
  },
  {
    label: 'ファイル移動',
    description: '処理済みの画像を完了フォルダに移動し、重複処理を防ぎます。',
    icon: <FolderIcon />,
  },
];

const costData = [
  { item: 'n8n Cloud (Starter)', cost: '€20/月', note: '約¥3,200' },
  { item: 'OpenAI API (GPT-4o-mini)', cost: '約¥200/月', note: '250枚×3回' },
  { item: 'OpenAI API (GPT-4o)', cost: '約¥3,600/月', note: '高精度版' },
];

const faqData = [
  {
    question: 'Q1: n8nで本当に実装できますか？',
    answer: 'はい、可能です。Google Drive、OpenAI、Notion各APIとの連携ノードが標準で用意されており、ノーコードで構築できます。',
  },
  {
    question: 'Q2: スクリーンショットの自動化は？',
    answer: 'Macの場合、Keyboard Maestroが最適です。ページめくりとスクリーンショットを自動化し、指定フォルダに保存できます。Windowsの場合はAutoHotKeyなどで代替可能です。',
  },
  {
    question: 'Q3: 統合開発した方がいいのでは？',
    answer: 'フェーズ分離（スクショ自動化 + クラウドワークフロー）が最適です。Kindleアプリを直接操作するため、ローカルとクラウドで役割を分けることで安定性が向上します。',
  },
  {
    question: 'Q4: コストを抑える方法はありますか？',
    answer: 'GPT-4o-miniを使用すると、GPT-4oと比べて約95%のコスト削減が可能です。精度は若干下がりますが、一般的な書籍では十分な品質です。',
  },
  {
    question: 'Q5: 月額費用の目安は？',
    answer: '約¥3,200〜¥6,600/月です。n8n Cloud（¥3,200相当）+ OpenAI API（¥200〜¥3,600）の構成になります。',
  },
];

export const WorkflowExplanation = () => {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          ワークフロー説明
        </Typography>
        <Typography variant="body1" color="text.secondary">
          洋書翻訳を自動化する全体の仕組みとコストについてご説明します。
        </Typography>
      </Box>

      <Paper variant="outlined" sx={{ p: 3, mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
          <CameraAltIcon color="primary" />
          <Typography variant="h6">フェーズ1: スクリーンショット自動撮影</Typography>
          <Chip label="ローカル" size="small" variant="outlined" />
        </Box>
        <Stepper orientation="vertical">
          {phase1Steps.map((step, index) => (
            <Step key={index} active>
              <StepLabel>{step.label}</StepLabel>
              <StepContent>
                <Typography variant="body2" color="text.secondary">
                  {step.description}
                </Typography>
              </StepContent>
            </Step>
          ))}
        </Stepper>
      </Paper>

      <Paper variant="outlined" sx={{ p: 3, mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
          <CloudSyncIcon color="primary" />
          <Typography variant="h6">フェーズ2: n8n自動翻訳ワークフロー</Typography>
          <Chip label="クラウド" size="small" color="primary" variant="outlined" />
        </Box>
        <Stepper orientation="vertical">
          {phase2Steps.map((step, index) => (
            <Step key={index} active>
              <StepLabel icon={step.icon}>{step.label}</StepLabel>
              <StepContent>
                <Typography variant="body2" color="text.secondary">
                  {step.description}
                </Typography>
              </StepContent>
            </Step>
          ))}
        </Stepper>
      </Paper>

      <Paper variant="outlined" sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          コスト試算
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          月250ページ × 3冊を想定した場合の費用目安
        </Typography>
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>項目</TableCell>
                <TableCell align="right">費用</TableCell>
                <TableCell>備考</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {costData.map((row) => (
                <TableRow key={row.item}>
                  <TableCell>{row.item}</TableCell>
                  <TableCell align="right">{row.cost}</TableCell>
                  <TableCell>{row.note}</TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold' }}>合計（目安）</TableCell>
                <TableCell align="right" sx={{ fontWeight: 'bold' }}>
                  ¥3,200〜¥6,600/月
                </TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <Paper variant="outlined" sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          よくあるご質問
        </Typography>
        {faqData.map((faq, index) => (
          <Accordion key={index} variant="outlined" sx={{ mb: 1 }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography fontWeight={500}>{faq.question}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2" color="text.secondary">
                {faq.answer}
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Paper>
    </Container>
  );
};
