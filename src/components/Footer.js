import React from 'react'
import { connect } from 'react-redux'
import { setVisibilityFilter } from '../actions'

const Link = ({ active, children, onClick }) => {
  if (active) return <span>{children}</span>
  return (
    <a
      href="filter"
      onClick={e => {
        e.preventDefault()
        onClick()
      }}
    >
      {children}
    </a>
  )
}

const mapStateToLinkProps = ({ visibilityFilter }, { filter }) => ({
  active: visibilityFilter === filter
})
const mapDispatchToLinkProps = (dispatch, { filter }) => ({
  onClick() {
    dispatch(setVisibilityFilter(filter))
  }
})
const FilterLink = connect(mapStateToLinkProps, mapDispatchToLinkProps)(Link)

export const Footer = () => (
  <p>
    Show: <FilterLink filter="SHOW_ALL">All</FilterLink>
    , <FilterLink filter="SHOW_ACTIVE">Active</FilterLink>
    , <FilterLink filter="SHOW_COMPLETED">Completed</FilterLink>
  </p>
)
