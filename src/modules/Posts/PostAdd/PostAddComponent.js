import React from 'react'
import {
	FormGroup,
	FormControl,
	ButtonToolbar,
	Button,
	Well
} from 'react-bootstrap'

export function PostAddComponent(props) {
	return (
		<Well>
			<form>
				<FormGroup controlId="formBasicText">
					<FormControl type="text" placeholder="Add new post" />
				</FormGroup>
				<FormGroup controlId="formControlsTextarea">
					<FormControl componentClass="textarea" placeholder="" />
				</FormGroup>
				<ButtonToolbar>
					<Button bsStyle="success">Post</Button>
				</ButtonToolbar>
			</form>
		</Well>
	)
}
