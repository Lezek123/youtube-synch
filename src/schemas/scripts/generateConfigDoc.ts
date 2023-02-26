// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore-next-line
import { jsonschema2md } from '@adobe/jsonschema2md'
import path from 'path'
import configSchema from '../config'

console.log(configSchema)
jsonschema2md(configSchema, {
  outDir: path.resolve(__dirname, `../../../docs/schema`),
})
