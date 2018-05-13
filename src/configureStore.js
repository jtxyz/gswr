import { createStore, applyMiddleware } from 'redux'
import todos from './reducers'
import logger from 'redux-logger'

const thunk = store => next => action => {
  typeof action === 'function'
    ? action(store.dispatch, store.getState)
    : next(action)
}

const configureStore = () => {
  const middlewares = [thunk]

  if (process.env.NODE_ENV !== 'production') {
    middlewares.push(logger)
  }

  return createStore(todos, applyMiddleware(...middlewares))
}

export default configureStore
