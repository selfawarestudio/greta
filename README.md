# Nuxt + Sanity

Built with Sanity and Nuxt 3

## Local development

Recommended setup:

- Install [pnpm](https://pnpm.io/installation) using a standalone script
- Install the LTS version of Node.js using `pnpm env use --global lts` (More info on managing Node.js versions with pnpm [here](https://pnpm.io/cli/env#use))
- Enable [Corepack](https://github.com/nodejs/corepack) using `corepack enable`
- Clone this repository
- Install dependencies using `pnpm install`
- Run `pnpm vercel-link` and link your local folder to this project on Vercel.
- Now we can use `pnpm env-pull` to pull the env file and add symlinks in workspace directories like our Sanity [studio](studio) folder. (See script [here](scripts/link-env.js))
- Start development servers for Nuxt and Sanity using `pnpm dev`
- Now the Nuxt app is running at <http://localhost:3000> and Sanity is running on <http://localhost:3333>

The project uses pnpm workspaces. Use `pnpm --filter <package_selector> <command>` to restrict a command to a specific package. For example, installing a new dependency in the [Sanity Studio](/packages/studio) package is as easy as `pnpm --filter studio add <package_name>`. Commands can be run from the root using the `-w` flag. Frequently used commands should be added to the root [package.json](package.json) `scripts` field.

## Deployment

Pushing to Github main branch will trigger a Vercel deployment of the Nuxt app.

# Sanity Studio

## Deployment

```
pnpm deploy-sanity
```
