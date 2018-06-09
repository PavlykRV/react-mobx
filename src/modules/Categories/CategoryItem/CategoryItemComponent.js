import React, { Component } from 'react'
import { observer } from 'mobx-react'
import {
	Button,
	Glyphicon,
	ButtonToolbar,
	ButtonGroup,
	FormControl,
	ListGroupItem
} from 'react-bootstrap'

// import styles
import './CategoryItemComponent.css'

@observer
class CategoryItemComponent extends Component {
	render() {
        const { store, category } = this.props

		return (
			<ListGroupItem className="category-item" >
				{store.editableCategory && store.editableCategoryId === category.id ? (
					<FormControl
						type="text"
						bsSize="sm"
						placeholder="Add new category"
						name="name"
						value={category.name}
						onChange={event => store.handleCategoryChange(event)}
					/>
				) : (
					<button onClick={() => store.setActiveCategory(category.id)}>
						{category.name}
					</button>
				)}
				<ButtonToolbar>
					<ButtonGroup>
						<Button
							bsSize="xsmall"
							bsStyle="danger"
							className="small-btn"
							onClick={() => store.handleCategoryDelete(category.id)}
						>
							<Glyphicon glyph="glyphicon glyphicon-trash" />
						</Button>
						{store.editableCategory ? (
							<Button
								bsSize="xsmall"
								bsStyle="success"
								className="small-btn"
								onClick={() => store.handleCategoryEditSave(category.id)}
							>
								<Glyphicon glyph="glyphicon glyphicon-share-alt" />
							</Button>
						) : (
							<Button
								bsSize="xsmall"
								bsStyle="info"
								className="small-btn"
								onClick={() => store.handleCategoryEdit(category.id)}
							>
								<Glyphicon glyph="glyphicon glyphicon-pencil" />
							</Button>
						)}
					</ButtonGroup>
				</ButtonToolbar>
			</ListGroupItem>
		)
	}
}

export default CategoryItemComponent
