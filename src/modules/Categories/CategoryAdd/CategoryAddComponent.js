import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { FormGroup, FormControl, ButtonToolbar, Button } from 'react-bootstrap'

// import styles
import './CategoryAddComponent.css'

@observer
class CategoryAddComponent extends Component {
	render() {
        const {
            category,
            handleCategoryChange,
            addCategory,
        } = this.props.store

		return (
			<form>
				<FormGroup controlId="formControlsTextarea">
					<FormControl
						type="text"
						placeholder="Add new category"
						name="name"
						value={category.name}
                        onChange={event => handleCategoryChange(event)}
					/>
				</FormGroup>
				<ButtonToolbar className="comment-edit-actions">
					<Button bsStyle="primary" onClick={() => addCategory()}>
						Add category
					</Button>
				</ButtonToolbar>
			</form>
		)
	}
}

export default CategoryAddComponent
