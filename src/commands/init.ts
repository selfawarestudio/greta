import { downloadTemplate } from 'giget'
import type { DownloadTemplateResult } from 'giget'
import { resolve } from 'pathe'
import { consola } from 'consola'
import { installDependencies } from 'nypm'
import { defineCommand } from 'citty'
import { execa } from 'execa'
import { titleCase } from 'scule'
import { writeFile, symlink } from 'node:fs/promises'
import {
  extractSanityCliToken,
  extractSanityProjectId,
  createEnvContent,
  createSanityCli,
} from '../utils'

const TEMPLATE_NAME = 'github:selfawarestudio/greta#template/nuxt-sanity'
const PACKAGE_MANAGER = 'pnpm'
const SELF_AWARE_SANITY_ORGANIZATION_ID = 'or0jCLc9J'

export default defineCommand({
  meta: {
    name: 'init',
    description: 'Initialize a new project',
  },
  args: {
    dir: {
      type: 'positional',
      description: 'Project directory',
      required: false,
    },
  },
  async run(ctx) {
    const cwd = resolve('.')

    let dir
    let sanityCliToken
    let sanityProjectId
    let sanityProjectToken
    let template: DownloadTemplateResult

    consola.start('Checking Sanity CLI login status...')

    try {
      const { stdout } = await execa(
        'pnpm',
        ['dlx', '@sanity/cli', 'debug', '--secrets'],
        { stdout: 'pipe' },
      )

      sanityCliToken = extractSanityCliToken(stdout)

      if (!sanityCliToken) {
        throw new Error(
          'You must be logged into Sanity CLI. Please run `pnpm dlx @sanity/cli login` and then try again.',
        )
      }
    } catch (err) {
      consola.error((err as Error).toString())
      process.exit(1)
    }

    // Now prepare to download our project template

    if (ctx.args.dir) {
      dir = ctx.args.dir
    } else {
      dir = await consola.prompt('Enter a name for the project folder', {
        type: 'text',
      })
    }

    consola.start('Cloning project template from Github...')

    try {
      template = await downloadTemplate(TEMPLATE_NAME, {
        dir,
        cwd,
      })
    } catch (err) {
      consola.error((err as Error).toString())
      process.exit(1)
    }

    // Next create a new Sanity project and set the project ID and other env vars
    const sanityProjectTitle = await consola.prompt(
      'Enter a title for the Sanity project',
      {
        type: 'text',
        placeholder: titleCase(dir),
        default: titleCase(dir),
      },
    )

    consola.start('Initializing a new Sanity project...')
    try {
      const { stdout } = await execa(
        'pnpm',
        [
          'dlx',
          '@sanity/cli',
          'init',
          '--organization',
          SELF_AWARE_SANITY_ORGANIZATION_ID,
          '--dataset-default',
          '--bare',
          '--create-project',
          sanityProjectTitle,
        ],
        { stdout: 'pipe' },
      )

      sanityProjectId = extractSanityProjectId(stdout)

      if (!sanityProjectId) {
        throw new Error('Failed to extract project ID from Sanity CLI output')
      }

      consola.success(
        'Successfully created a new Sanity project. The Project ID is',
        sanityProjectId,
      )
    } catch (err) {
      consola.error((err as Error).toString())
      process.exit(1)
    }

    // Now we can use the Sanity API to create a token for the project that will be used for website previews
    consola.start('Setting up Sanity CORS and creating a preview token...')

    const sanityCli = createSanityCli({
      projectId: sanityProjectId,
      token: sanityCliToken,
    })

    try {
      await sanityCli('/cors', {
        origin: 'http://localhost:3000',
        allowCredentials: false,
      })

      const { key } = await sanityCli('/tokens', {
        label: 'Website preview',
        roleName: 'editor',
      })

      sanityProjectToken = key
    } catch (err) {
      consola.error((err as Error).toString())
      process.exit(1)
    }

    // Now we need to set some environment variables
    // Create a file called .env and write the project ID to it as SANITY_STUDIO_PROJECT_ID then write the file to template.dir
    const envFile = resolve(template.dir, '.env')
    const studioEnvFile = resolve(template.dir, 'studio', '.env')
    const envContent = createEnvContent(
      sanityProjectTitle,
      sanityProjectId,
      sanityProjectToken,
    )

    try {
      await writeFile(envFile, envContent)
      await symlink(envFile, studioEnvFile)
      consola.success('.env file created and symlinked to studio folder.')
    } catch (err) {
      consola.error((err as Error).toString())
      process.exit(1)
    }

    // Now check if we want to initialize a git repository
    const gitInit = await consola.prompt('Initialize git repository?', {
      type: 'confirm',
    })

    if (gitInit) {
      consola.info('Initializing git repository...\n')
      await execa('git', ['init', template.dir], {
        stdio: 'inherit',
      }).catch(err => {
        consola.warn(`Failed to initialize git repository: ${err}`)
      })
    }

    // Install the dependencies
    consola.start('Installing dependencies...')

    try {
      await installDependencies({
        cwd: template.dir,
        packageManager: {
          name: PACKAGE_MANAGER,
          command: PACKAGE_MANAGER,
        },
      })
    } catch (err) {
      consola.error((err as Error).toString())
      process.exit(1)
    }

    consola.success('Installation completed.')
  },
})
