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
						value={this.props.store.comment.content}
						onChange={(event => this.props.store.handleCommentChange(event))}
					/>
				</FormGroup>
				<ButtonToolbar className="comment-edit-actions">
					<Button
						bsStyle="primary"
						onClick={() => this.props.store.addComment(this.props.post.id)}
					>
						Post comment
					</Button>
				</ButtonToolbar>
			</form>
		)
	}
}

export default CommentAddComponent
