'use server'

import { revalidatePath } from 'next/cache'
import { client } from '..'
import { uploadData } from 'aws-amplify/storage'

export async function createTodo(formData: FormData) {
  const content = formData.get('content') as string

  if (!content) {
    throw new Error('Content is required')
  }

  try {
    await client.models.Todo.create({ content })
    formData.set('content', '')
    revalidatePath('/')
  } catch (error) {
    console.error(error)
  }
}

export async function deleteTodo(id: string) {
  try {
    await client.models.Todo.delete({ id })
    revalidatePath('/')
  } catch (error) {
    console.error(error)
  }
}

export async function uploadMedia(formData: FormData) {
  const file = formData.get('file') as File

  if (!file) {
    throw new Error('File is required')
  }

  const fileReader = new FileReader()
  fileReader.readAsArrayBuffer(file)

  try {
    fileReader.onload = async (event) => {
      console.log('Complete File read successfully!', event.target?.result)

      try {
        uploadData({
          data: event.target?.result as ArrayBuffer,
          path: 'media/' + file.name,
        })
      } catch (error) {
        console.error(error)
      }
    }
    revalidatePath('/')
  } catch (error) {
    console.error(error)
  }
}
