import React, { Component } from 'react'
import { observer } from 'mobx-react'
import {
	Panel,
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
		return (
			<div className="comment-item">
				<Panel.Body>{this.props.comment.content}</Panel.Body>
				<Panel.Footer>
                    <ButtonToolbar className="comment-item-actions">
						<ButtonGroup>
							<Button
								bsStyle="danger"
								bsSize="xsmall"
							>
								<Glyphicon glyph="glyphicon glyphicon-trash" />
							</Button>
							<Button
								bsStyle="info"
								bsSize="xsmall"
							>
								<Glyphicon glyph="glyphicon glyphicon-pencil" />
							</Button>
							<Button
								bsStyle="success"
								bsSize="xsmall"
							>
								<Glyphicon glyph="glyphicon glyphicon-share-alt" />
							</Button>
						</ButtonGroup>
					</ButtonToolbar>
				</Panel.Footer>
			</div>
		)
	}
}

export default CommentItemComponent
