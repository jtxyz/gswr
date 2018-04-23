import React, { Fragment } from 'react'

import { AddTodo } from './AddTodo'
import { VisibleTodoList } from './TodoList'
import { Footer } from './Footer'

const App = () => (
  <Fragment>
    <AddTodo />
    <VisibleTodoList />
    <Footer />
  </Fragment>
)

export default App
