import { combineReducers } from 'redux'
import todos, * as fromTodos from './todos'

const todoApp = combineReducers({
  todos
})

export { todoApp }

export const getVisibleTodos = (state, filter) =>
  fromTodos.getVisibleTodos(state.todos, filter)
