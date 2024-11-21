import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { symlink, unlink } from 'node:fs/promises'
import { consola } from 'consola'

const __dirname = dirname(fileURLToPath(import.meta.url))

const source = resolve(__dirname, '../.env')
const destinations = [resolve(__dirname, '../studio/.env')]

try {
  for (const destination of destinations) {
    await unlink(destination)
  }
} catch (error) {
  if (error.code !== 'ENOENT') {
    consola.error(`Error removing the .env file:`, error)
    process.exit(1)
  }
}

for (const destination of destinations) {
  await symlink(source, destination)
}

consola.success(`.env file symlink created successfully`)
