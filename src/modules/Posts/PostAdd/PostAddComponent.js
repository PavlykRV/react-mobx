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
		const {
			setNewPostFocus,
			clearNewPostFocus,
			editablePost,
			handlePostChange,
			post,
			focusNewPost,
			addPost
		} = this.props.store

		return (
			<Well>
				<form>
					<FormGroup controlId="formBasicText">
						<FormControl
							type="text"
							placeholder="Add new post"
							name="title"
							onFocus={setNewPostFocus}
							onBlur={clearNewPostFocus}
							value={!editablePost ? post.title : ''}
							onChange={event => handlePostChange(event)}
						/>
					</FormGroup>
					{(focusNewPost || post.title) && (
						<Fragment>
							<FormGroup controlId="formControlsTextarea">
								<FormControl
									componentClass="textarea"
									placeholder=""
									name="content"
									value={!editablePost ? post.content : ''}
									onChange={event => handlePostChange(event)}
								/>
							</FormGroup>
							<ButtonToolbar>
								<Button
									bsStyle="success"
									onClick={addPost}
									disabled={editablePost}
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
