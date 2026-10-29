# Ghost in the Log

[日本語](README.ja.md)

A Halloween-themed investigation of three fictional incidents. Select a case and compare the numbered logs with a possible cause, evidence and unknowns. English is the default; Japanese is available in the interface.

## Run locally

Requires Node.js 20 or newer. Run `npm start` and open http://127.0.0.1:43123. This public release always returns fixed non-AI demo results, even if inference settings are present. No real logs are accepted or repairs executed.

An earlier local test produced a single Gemma / Modal analysis; one case does not establish general model quality. Live inference requires a separately reviewed code change, server-side credentials and an explicitly approved endpoint. Do not commit secrets. The in-process throttle is not a distributed rate limit or budget cap. Do not enable public inference without shared abuse and spending controls.

## License and dependencies

Code: MIT, see [LICENSE](LICENSE). No npm dependencies. The interface loads DM Mono, Noto Sans JP and Shippori Mincho from Google Fonts; each is distributed under the SIL Open Font License 1.1 ([DM Mono](https://github.com/google/fonts/blob/main/ofl/dmmono/OFL.txt), [Noto Sans JP](https://github.com/google/fonts/blob/main/ofl/notosansjp/OFL.txt), [Shippori Mincho](https://github.com/google/fonts/blob/main/ofl/shipporimincho/OFL.txt)). Model and hosting terms apply separately.
