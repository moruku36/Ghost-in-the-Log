# Ghost in the Log

[English](README.md)

ハロウィーン風の画面で3つの架空事件を調査します。番号付きログと原因候補・根拠・不明点を見比べます。初期表示は英語で、日本語に切り替えられます。

## ローカル起動

Node.js 20 以降で `npm start` を実行し、http://127.0.0.1:43123 を開きます。この公開版は推論設定があっても固定結果の非 AI デモとして動作します。実ログの入力や修復実行はありません。

以前のローカル試験では Gemma / Modal による1件の分析結果を確認しました。1件の結果は一般的な品質を保証しません。実推論には別途レビューしたコード変更、サーバー側の認証情報と明示的に許可した endpoint が必要です。秘密をコミットしないでください。プロセス内制御は分散環境での利用制限や予算上限ではありません。公開 AI には別途悪用・支出対策が必要です。

## ライセンスと依存関係

コードは [MIT](LICENSE) です。npm 外部依存はありません。画面は Google Fonts から DM Mono、Noto Sans JP、Shippori Mincho を読み込み、各書体は SIL Open Font License 1.1 です（[DM Mono](https://github.com/google/fonts/blob/main/ofl/dmmono/OFL.txt)、[Noto Sans JP](https://github.com/google/fonts/blob/main/ofl/notosansjp/OFL.txt)、[Shippori Mincho](https://github.com/google/fonts/blob/main/ofl/shipporimincho/OFL.txt)）。モデルとホスティングには別の条件が適用されます。
