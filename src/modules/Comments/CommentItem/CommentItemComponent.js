import React, { Component } from 'react'
import { observer } from 'mobx-react'
import {
	Panel,
	FormControl,
	ButtonToolbar,
	Glyphicon,
	ButtonGroup,
	Button
} from 'react-bootstrap'

// import styles
import './CommentItemComponent.css'
@observer
class CommentItemComponent extends Component {
	render() {
		const { comment, store } = this.props

		return (
			<div className="comment-item">
				{store.editableComment && store.editableCommentId === comment.id ? (
					<FormControl
						type="text"
						placeholder="Add new comment"
						name="content"
						value={comment.content}
						onChange={event => store.handleCommentChange(event)}
					/>
				) : (
					<Panel.Body>{comment.content}</Panel.Body>
				)}

				<Panel.Footer>
					<ButtonToolbar className="comment-item-actions">
						<ButtonGroup>
							<Button
								bsStyle="danger"
								bsSize="xsmall"
								onClick={() => store.handleCommentDelete(comment.id)}
							>
								<Glyphicon glyph="glyphicon glyphicon-trash" />
							</Button>
							{store.editableComment ? (
								<Button
									bsStyle="success"
									bsSize="xsmall"
									onClick={() => store.handleCommentEditSave()}
								>
									<Glyphicon glyph="glyphicon glyphicon-share-alt" />
								</Button>
							) : (
								<Button
									bsStyle="info"
									bsSize="xsmall"
									onClick={() => store.handleCommentEdit(comment.id)}
								>
									<Glyphicon glyph="glyphicon glyphicon-pencil" />
								</Button>
							)}
						</ButtonGroup>
					</ButtonToolbar>
				</Panel.Footer>
			</div>
		)
	}
}

export default CommentItemComponent
