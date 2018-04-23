import React from 'react'
import { NavLink } from 'react-router-dom'

const FilterLink = ({ filter, children }) => (
  <NavLink
    to={filter === 'all' ? '' : filter}
    activeStyle={{ textDecoration: 'none', color: 'black' }}
  >
    {children}
  </NavLink>
)

export const Footer = () => (
  <p>
    Show: <FilterLink filter="/all">All</FilterLink>
    , <FilterLink filter="/active">Active</FilterLink>
    , <FilterLink filter="/completed">Completed</FilterLink>
  </p>
)
