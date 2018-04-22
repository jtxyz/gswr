import React, { Component } from 'react'
import { connect } from 'react-redux'
import { toggleTodo } from '../actions'

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
      <Todo key={todo.id} {...todo} onClick={() => onTodoClick(todo.id)} />
    ))}
  </ul>
)

const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case 'SHOW_ALL':
      return todos
    case 'SHOW_ACTIVE':
      return todos.filter(todo => !todo.completed)
    case 'SHOW_COMPLETED':
      return todos.filter(todo => todo.completed)
    default:
      return todos
  }
}

class VisibleTodoList extends Component {
  render() {
    const { todos, visibilityFilter, onTodoClick } = this.props

    return (
      <TodoList
        todos={getVisibleTodos(todos, visibilityFilter)}
        onTodoClick={onTodoClick}
      />
    )
  }
}

const mapStateToProps = ({ todos, visibilityFilter }) => ({
  todos,
  visibilityFilter
})
const mapDispatchToProps = dispatch => ({
  onTodoClick(id) {
    dispatch(toggleTodo(id))
  }
})

const wrapped = connect(mapStateToProps, mapDispatchToProps)(VisibleTodoList)
export { wrapped as VisibleTodoList }
