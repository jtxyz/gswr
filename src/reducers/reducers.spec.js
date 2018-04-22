import deepFreeze from 'deep-freeze'
import expect from 'expect'

import { todos, todoApp, visibilityFilter } from './reducers'

const testAddTodo = () => {
  const stateBefore = []
  const action = { type: 'ADD_TODO', id: 0, text: 'Learn Redux' }

  const stateAfter = [
    {
      id: 0,
      text: 'Learn Redux',
      completed: false
    }
  ]

  deepFreeze(stateBefore)
  deepFreeze(action)

  expect(todos(stateBefore, action)).toEqual(stateAfter)
}

const testToggleTodo = () => {
  const stateBefore = [
    { id: 0, text: 'Learn Redux', completed: false },
    { id: 1, text: 'Go shopping', completed: false }
  ]
  const action = { type: 'TOGGLE_TODO', id: 1 }
  const stateAfter = [
    { id: 0, text: 'Learn Redux', completed: false },
    { id: 1, text: 'Go shopping', completed: true }
  ]

  deepFreeze(stateBefore)
  deepFreeze(action)

  expect(todos(stateBefore, action)).toEqual(stateAfter)
}

const combineReducersFromScratch = reducers => {
  return (state = {}, action) => {
    return Object.keys(reducers).reduce((nextState, key) => {
      nextState[key] = reducers[key](state[key], action)
      return nextState
    }, {})
  }
}

const testApp = () => {
  const stateBefore = undefined
  const action = { type: 'NOT_HANDLED' }
  const stateAfter = {
    todos: [],
    visibilityFilter: 'SHOW_ALL'
  }

  deepFreeze(action)

  expect(todoApp(stateBefore, action)).toEqual(stateAfter)

  const fromScratch = combineReducersFromScratch({
    todos,
    visibilityFilter
  })

  expect(fromScratch(stateBefore, action)).toEqual(stateAfter)
}

testAddTodo()
testToggleTodo()
testApp()

console.log('All tests passed!')
