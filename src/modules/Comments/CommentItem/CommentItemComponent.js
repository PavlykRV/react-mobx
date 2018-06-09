import React, { Component } from 'react'
import { observer } from 'mobx-react'
import {
	Well,
	Panel,
	ButtonToolbar,
	Glyphicon,
	ButtonGroup,
	Button
} from 'react-bootstrap'
@observer
class CommentItemComponent extends Component {
	render() {
		return (
			<Well>
				<Panel.Body>{this.props.comment.content}</Panel.Body>
				<Panel.Footer className="post-actions">
					<ButtonToolbar>
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
			</Well>
		)
	}
}

export default CommentItemComponent
