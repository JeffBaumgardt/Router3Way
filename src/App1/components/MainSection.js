import React, { PropTypes, Component } from 'react'
import TodoItem from './TodoItem'
import Footer from './Footer'
import { SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE } from '../constants/TodoFilters'

const TODO_FILTERS = {
	[SHOW_ALL]: () => true,
	[SHOW_ACTIVE]: todo => !todo.completed,
	[SHOW_COMPLETED]: todo => todo.completed
}

export default class MainSection extends Component {
	static propTypes = {
		todos: PropTypes.array.isRequired,
		actions: PropTypes.object.isRequired,
        filter: PropTypes.string.isRequired
	}

	handleClearCompleted = () => {
		this.props.actions.clearCompleted()
	}

	renderToggleAll(completedCount) {
		const { todos, actions } = this.props
		if (todos.length) {
			return (
				<input className="toggle-all" type="checkbox" checked={completedCount === todos.length } onChange={actions.completeAll} />
			)
		}
		return null
	}

	renderFooter(completedCount) {
		const { todos, filter } = this.props
		const activeCount = todos.length - completedCount

		if (todos.length) {
			return (
				<Footer completedCount={completedCount} activeCount={activeCount} filter={filter} onClearCompleted={this.handleClearCompleted.bind(this)}
					onShow={() => console.log('show?')} />
			)
		}
		return null
	}

	render() {
		const { todos, actions, filter } = this.props
		const filteredTodos = todos.filter(TODO_FILTERS[filter])
		const completedCount = todos.reduce((count, todo) => todo.complete ? count + 1 : count, 0)

		return (
			<section className="main">
				{this.renderToggleAll(completedCount)}
				<ul className="todo-list">
					{filteredTodos.map(todo =>
						<TodoItem key={todo.id} todo={todo} {...actions} />
					)}
				</ul>
				{this.renderFooter(completedCount)}
			</section>
		)
	}
}
