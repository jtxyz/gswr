import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { addTodo } from '../actions'

const AddTodo = ({ dispatch }) => {
  let input
  return (
    <Fragment>
      <input
        ref={node => {
          input = node
        }}
      />
      <button
        onClick={() => {
          dispatch(addTodo(input.value))
          input.value = ''
        }}
      >
        Add Todo
      </button>
    </Fragment>
  )
}

const wrapped = connect()(AddTodo)
export { wrapped as AddTodo }
