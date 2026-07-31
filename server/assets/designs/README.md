# Client design previews

Every subfolder here becomes a password-protected page at
`boooldstudio.com/designs/<folder-name>`. Pages send `X-Robots-Tag: noindex, nofollow`,
are excluded via robots.txt, and never appear in the sitemap.

## Add a client

```bash
node scripts/add-design.mjs <client-slug> <password> [exported .html files...]
```

Example:

```bash
node scripts/add-design.mjs acme welcome-123 ~/Downloads/"Acme Homepage.html"
```

Or by hand: create a folder, drop the Claude Design HTML exports in it
(lowercase filenames, dashes instead of spaces), and add a `config.json`:

```json
{
  "name": "Acme",
  "password": "welcome-123"
}
```

## Client logo

Drop a `logo.png` (or `logo.svg` / `logo.webp` / `logo.jpg`) in the client's
folder and it is shown on the login and overview pages instead of the typed
client name. The image file passed to `add-design.mjs` is saved this way
automatically.

## Change a password

Edit `password` in the client's `config.json` and redeploy. Existing login
cookies become invalid automatically.

## Remove a client

Delete the folder and redeploy.
