import { createStore, applyMiddleware } from 'redux'
import todos from './reducers'
import promise from 'redux-promise'
import logger from 'redux-logger'

const configureStore = () => {
  const middlewares = [promise]

  if (process.env.NODE_ENV !== 'production') {
    middlewares.push(logger)
  }

  return createStore(todos, applyMiddleware(...middlewares))
}

export default configureStore
