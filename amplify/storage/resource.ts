import { defineStorage } from '@aws-amplify/backend'

export const storage = defineStorage({
  name: 'Media',
  access: (allow) => ({
    'media/*': [allow.authenticated.to(['read', 'write', 'delete'])],
  }),
})
