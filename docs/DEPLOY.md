# デプロイ手順書

## 構成

| サービス | デプロイ先 | URL形式 |
|---------|-----------|---------|
| フロントエンド | Vercel | `https://your-project.vercel.app` |
| バックエンド | Render | `https://your-api.onrender.com` |

---

## 1. バックエンド (Render) デプロイ

### 1.1 Render アカウント準備
1. https://render.com でアカウント作成
2. GitHub連携を有効化

### 1.2 新規 Web Service 作成
1. Dashboard → "New" → "Web Service"
2. GitHubリポジトリを接続
3. 以下を設定:
   - **Name**: `book-translator-api`（任意）
   - **Region**: Singapore (近い場所を選択)
   - **Branch**: `main`
   - **Root Directory**: `backend`
   - **Runtime**: Docker
   - **Instance Type**: Free

### 1.3 環境変数設定
"Environment" タブで以下を設定:

| Key | Value | 説明 |
|-----|-------|------|
| `OPENAI_API_KEY` | `sk-...` | OpenAI APIキー（必須） |
| `OPENAI_MODEL` | `gpt-4o-mini` | 使用モデル（オプション） |
| `CORS_ORIGINS` | `["https://your-project.vercel.app"]` | フロントエンドURL |

### 1.4 デプロイ実行
"Create Web Service" をクリック → 自動ビルド・デプロイ開始

### 1.5 デプロイ確認
デプロイ完了後、以下を確認:
```
https://your-api.onrender.com/api/health
→ {"status":"ok","version":"0.1.0"}
```

---

## 2. フロントエンド (Vercel) デプロイ

### 2.1 Vercel アカウント準備
1. https://vercel.com でアカウント作成
2. GitHub連携を有効化

### 2.2 新規プロジェクト作成
1. Dashboard → "Add New" → "Project"
2. GitHubリポジトリをインポート
3. 以下を設定:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`

### 2.3 環境変数設定
"Environment Variables" で以下を設定:

| Key | Value | 説明 |
|-----|-------|------|
| `VITE_API_URL` | `https://your-api.onrender.com` | バックエンドURL |

### 2.4 デプロイ実行
"Deploy" をクリック → 自動ビルド・デプロイ開始

### 2.5 カスタムURL設定（オプション）
1. Project Settings → Domains
2. 好みのサブドメインを設定（例: `book-translator.vercel.app`）

---

## 3. デプロイ後の確認

### 3.1 動作確認チェックリスト
- [ ] フロントエンドにアクセスできる
- [ ] ヘルスチェックAPI (`/api/health`) が応答する
- [ ] 画像アップロードが動作する
- [ ] 翻訳結果が表示される

### 3.2 トラブルシューティング

#### CORS エラー
- バックエンドの `CORS_ORIGINS` 環境変数にフロントエンドURLを追加

#### 翻訳エラー
- `OPENAI_API_KEY` が正しく設定されているか確認
- OpenAI APIの利用制限を確認

#### Render スリープ問題
- 無料プランは15分非アクティブでスリープ
- 初回アクセス時に数秒の遅延が発生

---

## 4. 更新・再デプロイ

### 自動デプロイ
- GitHubにpushすると自動的に再デプロイされる

### 手動デプロイ
- Vercel: Dashboard → Deployments → "Redeploy"
- Render: Dashboard → Manual Deploy → "Deploy latest commit"
