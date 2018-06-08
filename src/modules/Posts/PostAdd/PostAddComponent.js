import React, { Component, Fragment } from 'react'
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
        console.log(this.props.store.focusNewPost)
		return (
			<Well>
				<form>
					<FormGroup controlId="formBasicText">
						<FormControl
							type="text"
							placeholder="Add new post"
							name="title"
							onFocus={this.props.store.setNewPostFocus}
							onBlur={this.props.store.clearNewPostFocus}
							value={
								!this.props.store.editablePost
									? this.props.store.post.title
									: ''
							}
							onChange={event => this.props.store.handlePostChange(event)}
						/>
					</FormGroup>
                    {(this.props.store.focusNewPost || this.props.store.post.title) && (
						<Fragment>
							<FormGroup controlId="formControlsTextarea">
								<FormControl
									componentClass="textarea"
									placeholder=""
									name="content"
									value={
										!this.props.store.editablePost
											? this.props.store.post.content
											: ''
									}
									onChange={event => this.props.store.handlePostChange(event)}
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
						</Fragment>
					)}
				</form>
			</Well>
		)
	}
}

export default PostAddComponent
