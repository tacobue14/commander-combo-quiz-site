# Cloudflare Pages 移行とセキュリティ運用

このPRは **公開先の移動そのものは実行しません**。まず既存の GitHub Pages を維持し、Cloudflare 側に別URLの検証環境を作るための準備です。

## 現在の構成
- 公開サイト: `https://tacobue14.github.io/commander-combo-quiz-site/`
- GitHubリポジトリ: `tacobue14/commander-combo-quiz-site`（Public）
- 静的サイト: `index.html`、`quiz.js`、`images.js`、`style.css`
- Scryfall APIはブラウザから直接利用。個人情報やAPIキーをPagesへ渡す必要なし
- 60,000問超の問題データおよびカード画像のリンクは既存の静的ファイルに保持

## 1. GitHubアカウントを守る（本人操作）
1. GitHubの **Settings > Password and authentication** でパスキー/セキュリティキーを使えるようにする。2段階認証を必ず維持する。
2. GitHubの **Settings > Applications** で使っていないGitHub Apps、OAuth Appsの権限を確認する。使わないものだけ取り消す。
3. 不審なトークン/SSHキーがないか確認する。クイズサイトにScryfallのAPIキーは不要。

## 2. mainを保護する（本人操作）
GitHubリポジトリの **Settings > Rules > Rulesets > New branch ruleset** へ。
- Ruleset name: `protect-main`
- Enforcement: `Active`
- Target branches: `main` または default branch
- **Require a pull request before merging** をON
- **Block force pushes** と **Restrict deletions** をON
- `Site checks / Validate static site` が一度成功した後、**Require status checks to pass** の必須チェックに設定する
- 個人運営で別のレビュアーがいない場合は、最初から「1名の承認を必須」にしない（マージ不能になるため）

GitHubの接続APIからリポジトリの保護設定は更新できないので、管理画面で設定する必要があります。

## 3. Cloudflare Pagesで検証用サイトを作る（本人操作）
1. `https://dash.cloudflare.com/` にログイン
2. **Workers & Pages** から **Create application / Pages / Connect to Git** を選択（表示名は変更される場合あり）
3. GitHubに接続し、`tacobue14/commander-combo-quiz-site` のみアクセス許可
4. プロジェクト名は任意の未使用名（例：`commander-combo-quiz`）、Production branch: `main`
5. Framework preset: `None`
6. Build command: `node scripts/build-pages.mjs`
7. Build output directory: `dist`
8. Root directory: `/`（リポジトリのルート）
9. Nodeバージョンが古い場合のみ `NODE_VERSION=22` を環境変数に指定
10. Cloudflare Pagesが発行する `*.pages.dev` のURLを開き、画像・日本語表記・10問・復習機能を確認

**GitHub Pagesの停止やDNS変更はしない**。Cloudflare側の動作確認後に正式なURLを決める。

## 4. セキュリティ実装
- `_headers` はCloudflare Pages専用。CSPによりスクリプトを自サイト、画像を自サイト・Scryfallに限定する。
- `X-Content-Type-Options`、`X-Frame-Options`、`Referrer-Policy`、`Permissions-Policy` も適用。
- `scripts/build-pages.mjs` が配信対象を5ファイルだけに限定する（_headersを含む）。
- `.github/workflows/site-security.yml` がJS構文・静的検査・配信用ファイルを検証。
- `.github/workflows/codeql.yml` がJSの静的セキュリティ解析をPR・main更新・週次で実行。
- 公開GitHubのSecret Scanningアラートを **Security and quality**（または Security）から確認。利用可能ならPush Protectionを有効化する。
- `_headers` はGitHub Pagesには適用されない。Cloudflareの本番レスポンスヘッダーで確認する。

## 5. Cloudflare側の表示確認
- クイズ画面で日本語カード画像やテキストが表示される
- 問題の選択、採点、次の問題、復習まで完了する
- ブラウザの開発者ツールでCSP違反がない
- DevTools / NetworkでページのレスポンスにCSPとX-Content-Type-Optionsがある
- Scryfallへの通信がブロックされていない
- Cloudflare側のURLで警告が表示されないか確認する
- 実際の検索流入や外部リンク移行は後から行う（旧サイトは残す）

## 6. 運用・事故対応
- 公開サイトの異常やGoogle Safe Browsing警告を見つけたら、直前の変更とCloudflareのデプロイ履歴を確認。
- 見知らぬ変更がGitHubにあれば認証情報を確認し、侵害されたトークン等を**失効**してから復旧する。
- 安全が確認されたコミットへのロールバックは、GitHubのコミット履歴を使って実行できる。
- 新しい外部スクリプトや分析タグ、広告を入れる場合はCSPの更新とプライバシー方針の点検が必要。
- サイトが安全かは配信サービスだけでなく、コード・アクセス権・第三者スクリプトの管理で決まる。

### メモ
現段階でCloudflare連携の実作業に必要な権限は接続されていません。GitHub側の準備とPR作成のみAI側で実施しています。
