import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { symlink, unlink } from 'node:fs/promises'
import { consola } from 'consola'

const __dirname = dirname(fileURLToPath(import.meta.url))

const envFile = resolve(__dirname, '../.env')
const studioEnvFile = resolve(__dirname, '../studio/.env')

// Attempt to delete the file if it exists
try {
  await unlink(studioEnvFile)
} catch (error) {
  // If the file does not exist, handle the error gracefully
  if (error.code !== 'ENOENT') {
    consola.error('Error removing the .env file:', error)
    process.exit(1) // Exit if the error is other than "File Not Found"
  }
}

// Create the symlink
await symlink(envFile, studioEnvFile)
consola.success('.env file symlink created successfully')
