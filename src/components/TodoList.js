import React from 'react'
import { connect } from 'react-redux'
import { toggleTodo } from '../actions'
import { withRouter } from 'react-router-dom'
import { getVisibleTodos } from '../reducers'

const Todo = ({ completed, text, onClick }) => (
  <li
    onClick={onClick}
    style={{
      textDecoration: completed ? 'line-through' : 'none'
    }}
  >
    {text}
  </li>
)

const TodoList = ({ todos, onTodoClick }) => (
  <ul>
    {todos.map(todo => (
      <Todo key={todo.id} onClick={() => onTodoClick(todo.id)} {...todo} />
    ))}
  </ul>
)
/**
 * @type {function(any, any): any}
 */
const mapStateToProps = (state, { match: { params } }) => ({
  todos: getVisibleTodos(state, params.filter)
})

const wrapped = withRouter(
  connect(mapStateToProps, { onTodoClick: toggleTodo })(TodoList)
)
export { wrapped as VisibleTodoList }
