import outputs from '@/amplify_outputs.json'
import Container from '@/components/layout/container'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { DefaultStorageManager } from '@/components/upload/storageManager'
import { client } from '@/utils'
import { createTodo, deleteTodo } from '@/utils/actions'
import { Amplify } from 'aws-amplify'

Amplify.configure(outputs)

export default async function App() {
  const todos = await client.models.Todo.list()

  return (
    <Container className='grid place-items-center h-screen'>
      <div className='flex flex-col gap-4'>
        <h1 className='text-3xl font-sfpro font-bold'>My todos</h1>
        <form action={createTodo}>
          <Input type='text' name='content' className='mb-2' />
          <Button variant={'primary'} size={'lg'} type='submit'>
            Add todo
          </Button>
        </form>
        <ul className='flex flex-col gap-4'>
          {todos.data.map((todo) => (
            <form
              className='flex gap-2 tems-center'
              action={deleteTodo.bind(null, todo.id)}
              key={todo.id}
            >
              <li className='text-xl'>{todo.content}</li>
              <Button variant={'primary'} size={'sm'} type='submit'>
                Delete
              </Button>
            </form>
          ))}
        </ul>
        <div>
          <DefaultStorageManager />
        </div>
        <div></div>
      </div>
    </Container>
  )
}
