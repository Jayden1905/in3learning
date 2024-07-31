import { type ClientSchema, a, defineData } from '@aws-amplify/backend'
import { addUserToGroup } from './addUserToGroup/resource'

const schema = a.schema({
  Todo: a
    .model({
      content: a.string(),
    })
    .authorization((allow) => [allow.guest()]),
  Category: a
    .model({
      title: a.string().required(),
      description: a.string(),
      courseId: a.id(),
      course: a.belongsTo('Course', 'courseId'),
    })
    .authorization((allow) => [allow.group('ADMINS')]),
  Course: a
    .model({
      title: a.string().required(),
      description: a.string(),
      featured: a.boolean().required(),
      mainImage: a.string().required(),
      createdAt: a.timestamp().required(),
      categories: a.hasMany('Category', 'courseId'),
    })
    .authorization((allow) => [allow.group('ADMINS')]),
  addUserToGroup: a
    .mutation()
    .arguments({
      userId: a.string().required(),
      groupName: a.string().required(),
    })
    .authorization((allow) => [allow.group('ADMINS')])
    .handler(a.handler.function(addUserToGroup))
    .returns(a.json()),
})

export type Schema = ClientSchema<typeof schema>

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'iam',
  },
})
