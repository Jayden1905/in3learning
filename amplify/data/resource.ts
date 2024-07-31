import { type ClientSchema, a, defineData } from '@aws-amplify/backend'

const schema = a.schema({
  Todo: a
    .model({
      content: a.string(),
    })
    .authorization((allow) => [allow.publicApiKey()]),
  Category: a
    .model({
      title: a.string().required(),
      description: a.string(),
      courseId: a.id(),
      course: a.belongsTo('Course', 'courseId'),
    })
    .authorization((allow) => [allow.publicApiKey()]),
  Course: a
    .model({
      title: a.string().required(),
      description: a.string(),
      featured: a.boolean().required(),
      mainImage: a.string().required(),
      createdAt: a.timestamp().required(),
      categories: a.hasMany('Category', 'courseId'),
    })
    .authorization((allow) => [allow.publicApiKey()]),
})

export type Schema = ClientSchema<typeof schema>

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'apiKey',
    apiKeyAuthorizationMode: {
      expiresInDays: 30,
    },
  },
})
