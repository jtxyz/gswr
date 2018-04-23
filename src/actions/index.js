import uuidv4 from 'uuid/v4'

export const addTodo = text => ({
  type: 'ADD_TODO',
  id: uuidv4(),
  text
})

export const toggleTodo = id => ({
  type: 'TOGGLE_TODO',
  id
})
