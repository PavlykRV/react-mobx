import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { FormGroup, FormControl, ButtonToolbar, Button } from 'react-bootstrap'

// import styles
import './CommentAddComponent.css'

@observer
class CommentAddComponent extends Component {
	render() {
		return (
			<form>
				<FormGroup controlId="formControlsTextarea">
					<FormControl
						componentClass="textarea"
						placeholder=""
						name="content"
					/>
				</FormGroup>
				<ButtonToolbar className="comment-edit-actions">
					<Button bsStyle="primary">Post comment</Button>
				</ButtonToolbar>
			</form>
		)
	}
}

export default CommentAddComponent
