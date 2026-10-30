# Ghost in the Log

[English](README.md) · **日本語**

ハロウィーン風の画面で3つの架空事件を調査します。番号付きログと原因候補・根拠・不明点を見比べます。初期表示は英語で、日本語に切り替えられます。

本作は [DEV Hacktoberfest Open-Source AI Challenge](https://dev.to/challenges/hacktoberfest-week4-2026-10-26) の Week 4「Ghost in the Machine」への提出作品です。提出記事はこちら：[I Built "Ghost in the Log": A Halloween Log Investigation With a Live AI Behind It](https://dev.to/moruku36/i-built-ghost-in-the-log-a-halloween-log-investigation-with-a-live-ai-behind-it-1o44)

## ライブデモ
[Ghost in the Log](https://ghost-in-the-log.vercel.app/)では、固定の架空ログを使った限定的なライブ分析を試せます。Baseten Model APIs経由でオープンウェイトモデル Muse Spark Open を利用します。実際のユーザーログは受け付けず、自動修復もしません。結果は原因候補、番号付きの根拠、不明点を示します。説明用であり、本番障害の診断や一般的な診断精度を保証するものではありません。英語が初期表示で、日本語UIもあります。
公開受付は累計100リクエストで終了し、期限は **2026-11-09 00:00 JST** です。常時利用可能なサービスではありません。利用不可・上限到達・結果不明時は処理を失敗として扱い、自動で推論を再試行しません。
## ローカル実行
[リポジトリ](https://github.com/moruku36/Ghost-in-the-Log)を参照してください。Node.js 20以降で `npm start` を実行し、`http://localhost:43123` を開きます。ライブ分析を有効化・設定しない場合は、固定の非AIサンプルを表示します。プロバイダーの認証情報はサーバー側に置き、コミットしないでください。

## ライセンスと依存関係

コードは [MIT](LICENSE) です。npm 依存: `@neondatabase/serverless` 1.2.0。画面は Google Fonts から DM Mono、Noto Sans JP、Shippori Mincho を読み込み、各書体は SIL Open Font License 1.1 です（[DM Mono](https://github.com/google/fonts/blob/main/ofl/dmmono/OFL.txt)、[Noto Sans JP](https://github.com/google/fonts/blob/main/ofl/notosansjp/OFL.txt)、[Shippori Mincho](https://github.com/google/fonts/blob/main/ofl/shipporimincho/OFL.txt)）。モデルとホスティングには別の条件が適用されます。
