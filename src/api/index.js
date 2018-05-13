import uuidv4 from 'uuid/v4'

const fakeDatabase = {
  todos: [
    {
      id: uuidv4(),
      text: 'hey',
      completed: true
    },
    {
      id: uuidv4(),
      text: 'ho',
      completed: true
    },
    {
      id: uuidv4(),
      text: 'let’s go',
      completed: false
    }
  ]
}

const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

export const fetchTodos = filter =>
  delay(500).then(() => {
    // if (Math.random() > 0.5) {
    //   throw new Error('Boom!')
    // }

    switch (filter) {
      case 'all':
        return fakeDatabase.todos
      case 'completed':
        return fakeDatabase.todos.filter(todo => todo.completed)
      case 'active':
        return fakeDatabase.todos.filter(todo => !todo.completed)
      default:
        throw new Error(`Unknown filter: ${filter}`)
    }
  })

export const addTodo = text =>
  delay(500).then(() => {
    const todo = {
      id: uuidv4(),
      text,
      completed: false
    }
    fakeDatabase.todos.push(todo)
    return todo
  })

export const toggleTodo = id =>
  delay(500).then(() => {
    const todo = fakeDatabase.todos.find(t => t.id === id)
    todo.completed = !todo.completed
    return todo
  })
