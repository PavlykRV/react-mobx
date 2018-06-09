import React, { Component } from 'react'
import { ListGroup, ListGroupItem } from 'react-bootstrap'
import { observer } from 'mobx-react'
import CategoryAddComponent from '../CategoryAdd/CategoryAddComponent'
import CategoryItemComponent from '../CategoryItem/CategoryItemComponent'

// import styles
import './CategoryListComponent.css'
@observer
class CategoryListComponent extends Component {
	render() {
		const { store } = this.props

		return (
			<ListGroup className="category-list">
				<ListGroupItem
					className="category-item"
					onClick={store.clearActiveCategory}
				>
					Show all
				</ListGroupItem>

				{store.categories.map(category => {
					return (
						<CategoryItemComponent
							key={category.id}
							store={store}
							category={category}
						/>
					)
				})}

				<CategoryAddComponent store={store} />
			</ListGroup>
		)
	}
}

export default CategoryListComponent
