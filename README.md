# 缤琪灵 — Run locally

This is the source code for the short-video creation prototype, including real Seedance video generation.
No Codex, ChatGPT or Cloudflare account is needed to run it locally.

## First-time setup (macOS, Windows or Linux)

1. Install Node.js 24 LTS with npm from https://nodejs.org/ .
2. Extract the ZIP. Open Terminal / PowerShell inside the `binqiling` folder.
3. Run these commands one at a time:

```sh
npm run install:ci
node scripts/setup-local.mjs
npm run dev
```

4. Open http://127.0.0.1:5173/ in a browser on the same computer. If the terminal prints a different port, use that address instead.
5. Enter any username and any non-empty password. This is a dummy login; the password is never transmitted or stored.

Stop the server with Ctrl+C. Next time, only `npm run dev` is needed. Keep the terminal open while using the website.

## Enable real video generation

Setup creates `.env` from `.env.example` without overwriting an existing file. An empty `.env` is also included for convenience.
Open `.env` in a text editor and put an authorized Ark API key after `ARK_API_KEY=`. You can use your own key or a key deliberately shared by the sender. The key owner's API balance pays for generated videos.

```dotenv
ARK_API_KEY=PASTE_YOUR_KEY_HERE
SEEDANCE_MODEL=doubao-seedance-1-0-pro-fast-251015
```

Use a Seedance video model enabled for that API account. Change the supplied model ID if that model is unavailable.
Restart the server after editing `.env`. Select Seedance API in the generation mode menu. Without a key, demo mode plays a fixed flower video and does not generate video from the prompt.

The original cloud-hosted secret cannot be exported by the assistant. This package contains NO API key. The sender must paste a key into `.env` manually if they want to supply one. On macOS, press Cmd+Shift+. in Finder to show hidden dotfiles; Windows may need Show hidden items.
Keep a filled `.env` private. Anyone who receives it can use the key outside this app too. Do not post the filled project publicly.

## Local data and network

Database records and saved generated videos live under `.wrangler/state/` on this computer, separate from the original website. The package contains no saved users, videos, Git history or cloud deployment identity.

Installing packages requires internet. Real Seedance generation and the external demonstration video also require internet. The website and its database run locally; generation runs on Seedance's servers.

The loopback address works only on the computer running the server. This archive does not deploy anything online.

The setup command builds the application and applies database migrations. It can be rerun; applied migrations are tracked and skipped. Keep `.wrangler/state/` to preserve your data.
