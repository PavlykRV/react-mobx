import React, { Component } from 'react'
import {
	ListGroup,
	ListGroupItem,
	Button,
	Glyphicon,
	ButtonToolbar,
	ButtonGroup,
	FormControl
} from 'react-bootstrap'
import { observer } from 'mobx-react'
import CategoryAddComponent from '../CategoryAdd/CategoryAddComponent'

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
						<ListGroupItem className="category-item" key={category.id}>
							{store.editableCategory &&
							store.editableCategoryId === category.id ? (
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
				})}
				<CategoryAddComponent store={store} />
				{/* <ListGroupItem className="category-add" onClick={() => console.log('clicked')}>
					<span>New category </span>
					<Glyphicon glyph="glyphicon glyphicon-plus" />
				</ListGroupItem> */}
			</ListGroup>
		)
	}
}

export default CategoryListComponent
