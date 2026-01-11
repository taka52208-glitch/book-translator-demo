# プロジェクト設定

## 基本設定
```yaml
プロジェクト名: 洋書自動翻訳システム デモ版
開始日: 2026-01-10
技術スタック:
  frontend: React 18 + TypeScript 5 + MUI v6 + Vite 5
  backend: Python 3.11 + FastAPI
  database: なし（ステートレス設計）
```

## 開発環境
```yaml
ポート設定:
  frontend: 3247
  backend: 8432

環境変数:
  設定ファイル: .env.local（ルートディレクトリ）
  必須項目:
    - OPENAI_API_KEY: OpenAI APIキー
    - VITE_API_URL: バックエンドAPIのURL
```

## テスト認証情報
```yaml
開発用アカウント: なし（認証不要のMVP版）

外部サービス:
  OpenAI API: テスト用APIキーを使用
```

## コーディング規約

### 命名規則
```yaml
ファイル名:
  - コンポーネント: PascalCase.tsx (例: TranslateDemo.tsx)
  - ユーティリティ: camelCase.ts (例: translateApi.ts)
  - 定数: UPPER_SNAKE_CASE.ts (例: API_ENDPOINTS.ts)

変数・関数:
  - 変数: camelCase
  - 関数: camelCase
  - 定数: UPPER_SNAKE_CASE
  - 型/インターフェース: PascalCase
```

### コード品質
```yaml
必須ルール:
  - TypeScript: strictモード有効
  - 未使用の変数/import禁止
  - console.log本番環境禁止
  - エラーハンドリング必須
  - 関数行数: 100行以下
  - ファイル行数: 700行以下
  - 複雑度: 10以下
  - 行長: 120文字

フォーマット:
  - インデント: スペース2つ
  - セミコロン: あり
  - クォート: シングル（TypeScript）/ ダブル（Python）
```

## プロジェクト固有ルール

### APIエンドポイント
```yaml
命名規則:
  - RESTful形式を厳守
  - プレフィックス: /api

エンドポイント一覧:
  - POST /api/translate: 画像翻訳処理
  - GET /api/health: ヘルスチェック
```

### 型定義
```yaml
配置:
  frontend: src/types/index.ts
  backend: app/schemas.py

同期ルール:
  - リクエスト/レスポンスの型は両方で定義
  - 変更時は両方を更新
```

### OpenAI API プロンプト
```yaml
配置: backend/app/prompts.py

翻訳プロンプトの要件:
  - ネイティブな日本語で自然な翻訳
  - 要約・省略は一切不要
  - ページ跨ぎ文章対応（前ページ末尾の接続）
  - イラスト検出（[IMAGE_HERE]マーカー）
  - 不完全な文は翻訳せず原文末尾として出力
```

## 最新技術情報（知識カットオフ対応）
```yaml
OpenAI API:
  - Assistants API: 2026年8月26日でDeprecated
  - 推奨: Responses API または Chat Completions API
  - Vision対応: GPT-4o / GPT-4o-mini

n8n（本番版用メモ）:
  - Google Drive Trigger: 複数ファイル順次処理は工夫必要
  - 推奨: Listノード + JavaScriptソート + ループ処理
```

## ディレクトリ構成
```
洋書自動翻訳システム/
├── CLAUDE.md              # このファイル
├── docs/
│   ├── requirements.md    # 要件定義書
│   └── SCOPE_PROGRESS.md  # 進捗管理表
├── frontend/              # React フロントエンド
│   ├── src/
│   │   ├── components/    # UIコンポーネント
│   │   ├── pages/         # ページコンポーネント
│   │   ├── types/         # 型定義
│   │   └── utils/         # ユーティリティ
│   └── vite.config.ts
├── backend/               # FastAPI バックエンド
│   ├── app/
│   │   ├── main.py        # エントリーポイント
│   │   ├── routers/       # APIルーター
│   │   ├── schemas.py     # Pydanticスキーマ
│   │   └── prompts.py     # OpenAIプロンプト
│   └── tests/
├── eslint.config.js       # ESLint設定
└── pyproject.toml         # Python設定
```
