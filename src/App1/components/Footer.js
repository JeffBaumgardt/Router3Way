import React, { PropTypes, Component } from 'react'
import classnames from 'classnames'
import { SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE } from '../constants/TodoFilters'
import { Link } from 'react-router-dom'

const FILTER_TITLES = {
	[SHOW_ALL]: "All",
	[SHOW_ACTIVE]: 'Active',
	[SHOW_COMPLETED]: 'Completed'
}

export default class Footer extends Component {
	static propTypes = {
		completedCount: PropTypes.number.isRequired,
		activeCount: PropTypes.number.isRequired,
		filter: PropTypes.string.isRequired,
		onClearCompleted: PropTypes.func.isRequired
	}

    static contextTypes = {
        router: PropTypes.object
    }

    getPathName () {
        return this.context.router.location.pathname
    }

	renderTodoCount () {
		const { activeCount } = this.props
		const itemWord = activeCount === 1 ? 'item' : 'items'

		return (
			<span className='todo-count'>
				<strong>{activeCount || 'No'}</strong> {itemWord} left
			</span>
		)
	}

	renderFilterLink (filter) {
		const title = FILTER_TITLES[filter]
		const { filter: selectedFilter } = this.props
        const appName = this.getPathName().slice(0, this.getPathName().lastIndexOf('/'))
		return (
			<Link className={classnames({ selected: filter === selectedFilter })}
				style={{ cursor: 'pointer' }}
				to={`${appName}/${filter}`}>
				{title}
			</Link>
		)
	}

	renderClearButton() {
		const { completedCount, onClearCompleted } = this.propTypes
		if (completedCount > 0) {
			return (
				<button className="clear-completed" onClick={onClearCompleted}>Clear complete</button>
			)
		}
		return null
	}

	render() {
		return (
			<footer className="footer">
				{this.renderTodoCount()}
				<ul className="filters">
					{[ SHOW_ALL, SHOW_ACTIVE, SHOW_COMPLETED ].map(filter =>
						<li key={filter}>
							{this.renderFilterLink(filter)}
						</li>
					)}
				</ul>
			</footer>
		)
	}
}
