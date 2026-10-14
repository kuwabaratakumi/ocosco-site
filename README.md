# ocosco.com（OCOSCO LLC. コーポレートサイト）

旧WordPress（Cocoon子テーマ）のデザインを、ビルド不要の静的HTMLに移植したものです。
Cloudflare Pages でホスティングします。

## 構成

```
index.html        TOP
about.html        会社概要（URLは /about）
404.html          ページが見つからないとき
_redirects        旧WordPressのURLの転送（/service → / など）
_headers          セキュリティヘッダー・キャッシュ
robots.txt / sitemap.xml
assets/css/style.css
assets/js/main.js サービス画像のポップアップ
assets/img/       画像一式（ogp.jpg 含む）
```

- Google アナリティクス：GA4 `G-C9V4CCE1EE`（旧サイトと同じ）
- お問い合わせフォームなし（旧サイトと同じ）。必要になったら Pages Functions で追加

## 更新のしかた

1. HTML / CSS を編集
2. `git commit` → `git push`
3. Cloudflare Pages が自動でデプロイ（1分ほど）

## Cloudflare Pages 初回設定

1. GitHub にリポジトリを作成して push
2. Cloudflare ダッシュボード → Workers & Pages → 作成 → Pages → **Git に接続** → このリポジトリを選択
3. ビルド設定
   - フレームワーク：なし
   - ビルドコマンド：（空欄）
   - ビルド出力ディレクトリ：`/`
4. デプロイ後、`xxxx.pages.dev` で表示を確認

## 本番切り替え（ocosco.com をこのサイトに向ける）

1. Pages プロジェクト → カスタムドメイン → `ocosco.com` を追加
   - DNS の A レコード（ヘテムル `157.7.189.72`）が Pages 向けに置き換わる
2. 同様に `www.ocosco.com` も追加
3. www → 非www への統一：Cloudflare → ルール → リダイレクトルール
   - 条件：ホスト名 = `www.ocosco.com`
   - 転送先：`https://ocosco.com${http.request.uri.path}`（動的、301、クエリ文字列を保持）
4. 確認：TOP・/about・旧URL（/service/）・メール送受信
5. 2〜4週間問題なければ、ヘテムル（tehagaki アカウント）から ocosco.com のドメイン設定を削除

**注意**：MX・SPF・DKIM・DMARC のレコードは触らないこと（メールは Google Workspace）。

## ローカル確認

```
npx wrangler pages dev .
```
