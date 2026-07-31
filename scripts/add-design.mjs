#!/usr/bin/env node
/**
 * Add a password-protected client design folder.
 *
 * Usage:
 *   node scripts/add-design.mjs <client-slug> <password> [file.html ...] [logo.png]
 *
 * Example:
 *   node scripts/add-design.mjs oreya oreya-2026 ~/Downloads/"Oreya Formulier.html" ~/Downloads/oreya-logo.png
 *
 * Creates server/assets/designs/<client-slug>/ with a config.json and copies
 * the given HTML exports in with clean, URL-friendly names. An image file
 * (png/svg/webp/jpg) is saved as the client's logo, shown on the login and
 * overview pages instead of the typed client name. The result is available
 * at https://boooldstudio.com/designs/<client-slug> after a deploy.
 */
import { mkdirSync, copyFileSync, writeFileSync, existsSync, readFileSync } from 'node:fs'
import { basename, join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const [client, password, ...files] = process.argv.slice(2)

if (!client || !password) {
  console.error('Usage: node scripts/add-design.mjs <client-slug> <password> [file.html ...]')
  process.exit(1)
}

if (!/^[a-z0-9_-]+$/.test(client)) {
  console.error(`Client slug "${client}" must only contain lowercase letters, numbers and dashes.`)
  process.exit(1)
}

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const dir = join(root, 'server', 'assets', 'designs', client)
mkdirSync(dir, { recursive: true })

const configPath = join(dir, 'config.json')
const name = client.split('-').map((w) => w[0].toUpperCase() + w.slice(1)).join(' ')
const config = existsSync(configPath) ? JSON.parse(readFileSync(configPath, 'utf8')) : { name }
config.password = password
writeFileSync(configPath, JSON.stringify(config, null, 2) + '\n')

const slugify = (file) =>
  basename(file)
    .replace(/\.html$/i, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '') + '.html'

const LOGO_EXTS = ['png', 'svg', 'webp', 'jpg', 'jpeg']

for (const file of files) {
  if (!existsSync(file)) {
    console.error(`Skipped (not found): ${file}`)
    continue
  }
  const ext = file.split('.').pop().toLowerCase()
  const target = LOGO_EXTS.includes(ext) ? join(dir, `logo.${ext}`) : join(dir, slugify(file))
  copyFileSync(file, target)
  console.log(`Copied ${basename(file)} -> ${target.replace(root + '/', '')}`)
}

console.log(`\nDone. After deploy: https://boooldstudio.com/designs/${client} (password: ${password})`)
