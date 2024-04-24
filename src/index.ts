#!/usr/bin/env node

import { defineCommand, runMain } from 'citty'
import type { CommandDef } from 'citty'
import gretaPkg from '../package.json' assert { type: 'json' }

const _rDefault = (r: any) => (r.default || r) as Promise<CommandDef>

const main = defineCommand({
  meta: {
    name: 'greta',
    version: gretaPkg.version,
    description: gretaPkg.description,
  },
  subCommands: {
    init: () => import('./commands/init').then(_rDefault),
  },
})

runMain(main)
