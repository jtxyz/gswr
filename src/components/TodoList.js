import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'
import { withRouter } from 'react-router-dom'
import { getVisibleTodos, getIsFetching, getErrorMessage } from '../reducers'
import FetchError from './FetchError'

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
 * @augments {Component<{ todos, toggleTodo, filter, errorMessage, fetchTodos, isFetching }, any>}
 */
class VisibleTodoList extends Component {
  fetchData() {
    const { filter, fetchTodos } = this.props
    fetchTodos(filter).then(() => console.log('fetched'))
  }
  componentDidMount() {
    this.fetchData()
  }

  componentDidUpdate(prevProps) {
    if (this.props.filter !== prevProps.filter) {
      this.fetchData()
    }
  }

  render() {
    const { toggleTodo, todos, errorMessage, isFetching } = this.props
    if (isFetching && !todos.length) {
      return <p>Loading...</p>
    }
    if (errorMessage && !todos.length) {
      return (
        <FetchError message={errorMessage} onRetry={() => this.fetchData()} />
      )
    }
    return <TodoList todos={todos} onTodoClick={toggleTodo} />
  }
}
/**
 * @type {function(any, any): any}
 */
const mapStateToProps = (state, { match: { params } }) => {
  const filter = params.filter || 'all'
  return {
    todos: getVisibleTodos(state, filter),
    errorMessage: getErrorMessage(state, filter),
    isFetching: getIsFetching(state, filter),
    filter
  }
}

const wrapped = withRouter(connect(mapStateToProps, actions)(VisibleTodoList))
export { wrapped as VisibleTodoList }
