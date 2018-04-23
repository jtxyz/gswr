import React, { Component } from 'react'
import { connect } from 'react-redux'
import { toggleTodo } from '../actions'
import { withRouter } from 'react-router-dom'

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

const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case 'all':
      return todos
    case 'completed':
      return todos.filter(todo => !todo.completed)
    case 'active':
      return todos.filter(todo => todo.completed)
    default:
      return todos
  }
}

class VisibleTodoList extends Component {
  render() {
    const { todos, filter, onTodoClick } = this.props
    return (
      <TodoList
        todos={getVisibleTodos(todos, filter)}
        onTodoClick={onTodoClick}
      />
    )
  }
}

/**
 * @type {function({todos: object[]}, any): void}
 */
const mapStateToProps = ({ todos }, { match: { params } }) => ({
  filter: params.filter,
  todos
})

const wrapped = withRouter(
  connect(mapStateToProps, { onTodoClick: toggleTodo })(VisibleTodoList)
)
export { wrapped as VisibleTodoList }
