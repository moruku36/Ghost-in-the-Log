# Ghost in the Log

[日本語](README.ja.md)

A Halloween-themed investigation of three fictional incidents. Select a case and compare the numbered logs with a possible cause, evidence and unknowns. English is the default; Japanese is available in the interface.

## Live demo
Try [Ghost in the Log](https://ghost-in-the-log.vercel.app/) for limited live analysis of fixed fictional log cases. It uses Baseten Model APIs with the open-weight Muse Spark Open model; it does not accept real user logs or perform automated remediation. Results suggest a possible cause, numbered evidence, and unknowns. They are illustrative, not production incident diagnoses, and general diagnostic accuracy is not guaranteed. English is the default; a Japanese UI is available.
The public intake shares a cumulative limit of 100 requests and ends **2026-11-09 00:00 JST**. This is not an always-available service: unavailable, exhausted, or unknown outcomes fail closed, with no automatic inference retry.
## Run locally
See the [code repository](https://github.com/moruku36/Ghost-in-the-Log). With Node.js 20 or later, run `npm start` and open `http://localhost:43123`. Without live analysis enabled and configured, the local app uses fixed, non-AI examples. Provider credentials must remain server-side; never commit them.

## License and dependencies

Code: MIT, see [LICENSE](LICENSE). npm dependency: `@neondatabase/serverless` 1.2.0. The interface loads DM Mono, Noto Sans JP and Shippori Mincho from Google Fonts; each is distributed under the SIL Open Font License 1.1 ([DM Mono](https://github.com/google/fonts/blob/main/ofl/dmmono/OFL.txt), [Noto Sans JP](https://github.com/google/fonts/blob/main/ofl/notosansjp/OFL.txt), [Shippori Mincho](https://github.com/google/fonts/blob/main/ofl/shipporimincho/OFL.txt)). Model and hosting terms apply separately.
