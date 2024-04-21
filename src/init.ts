import { downloadTemplate, startShell } from 'giget'
import type { DownloadTemplateResult } from 'giget'
import { relative, resolve } from 'pathe'
import { consola } from 'consola'
import { installDependencies } from 'nypm'
import type { PackageManagerName } from 'nypm'
import { defineCommand } from 'citty'

export default defineCommand({
  meta: {
    name: 'init',
    description: 'Initialize a new project',
  },
  args: {
    dir: {
      type: 'positional',
      description: 'Project directory',
      default: '',
    },
  },
  async run(ctx) {
    consola.start('Initializing project...')
  },
})
