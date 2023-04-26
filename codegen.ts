import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  schema: 'public/schema.graphql',
  documents: ['src/**/*.tsx'],
  ignoreNoDocuments: true, // for better experience with the watcher
  generates: {
    './src/gql/': {
      preset: 'client',
      plugins: [],
    },
    './src/gql/resolvers-types.ts': {
      plugins: ['typescript', 'typescript-resolvers'],
      config: {
        useIndexSignature: true,
      },
    },
  },
}

export default config
