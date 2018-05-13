import uuidv4 from 'uuid/v4'
import * as api from '../api'
import { getIsFetching } from '../reducers'

export const addTodo = text => ({
  type: 'ADD_TODO',
  id: uuidv4(),
  text
})

export const toggleTodo = id => ({
  type: 'TOGGLE_TODO',
  id
})

const receiveTodos = (filter, response) => ({
  type: 'RECEIVE_TODOS',
  filter,
  response
})

const requestTodos = (filter, response) => ({
  type: 'REQUEST_TODOS',
  filter
})

export const fetchTodos = filter => (dispatch, getState) => {
  if (getIsFetching(getState(), filter)) {
    return Promise.resolve()
  }

  dispatch(requestTodos(filter))

  return api
    .fetchTodos(filter)
    .then(response => dispatch(receiveTodos(filter, response)))
}
