import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { FormGroup, FormControl, ButtonToolbar, Button } from 'react-bootstrap'

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
				<ButtonToolbar>
					<Button bsStyle="primary">
						Post comment
					</Button>
				</ButtonToolbar>
			</form>
		)
	}
}

export default CommentAddComponent
