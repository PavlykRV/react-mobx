import React, { Component } from 'react'
import {
	FormGroup,
	FormControl,
	ButtonToolbar,
	Button,
	Well
} from 'react-bootstrap'
import { observer } from 'mobx-react'
@observer
class PostAddComponent extends Component {
	render() {
		return (
			<Well>
				<form>
					<FormGroup controlId="formBasicText">
						<FormControl
							type="text"
							placeholder="Add new post"
							name="title"
                            value={!this.props.store.editablePost ? this.props.store.post.title : ''}
							onChange={e => this.props.store.handlePostChange(e)}
						/>
					</FormGroup>
					<FormGroup controlId="formControlsTextarea">
						<FormControl
                            componentClass="textarea"
                            placeholder=""
                            name="content"
                            value={!this.props.store.editablePost ? this.props.store.post.content : ''}
                            onChange={e => this.props.store.handlePostChange(e)}
                        />
					</FormGroup>
					<ButtonToolbar>
						<Button
                            bsStyle="success"
                            onClick={this.props.store.addPost}
                            disabled={this.props.store.editablePost}
                        >
                            Post
                        </Button>
					</ButtonToolbar>
				</form>
			</Well>
		)
	}
}

export default PostAddComponent
