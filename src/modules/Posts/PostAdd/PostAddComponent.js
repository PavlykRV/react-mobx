import React, { Component, Fragment } from 'react'
import {
	FormGroup,
	FormControl,
	ControlLabel,
	Button,
	Well
} from 'react-bootstrap'
import { observer } from 'mobx-react'
import observableCategoriesStore from './../../../stores/storeCategories'

// import styles
import './PostAddComponent.css'
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
			addPost,
			handlePostCategorySelect
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
							<div className="post-add-actions">
								<FormGroup controlId="formControlsSelect">
									<FormControl
										componentClass="select"
										placeholder="Category"
										name="category"
                                        onChange={event => handlePostCategorySelect(event)}
									>
                                        <option hidden>select</option>
										{observableCategoriesStore.categories.map(category => {
											return (
												<option
													value={category.name}
													name={category.name}
													key={category.id}
												>
													{category.name}
												</option>
											)
										})}
									</FormControl>
								</FormGroup>
								<Button
									bsStyle="primary"
									onClick={addPost}
									disabled={editablePost || !(post.title && post.categories.length && post.content)}
								>
									Post
								</Button>
							</div>
						</Fragment>
					)}
				</form>
			</Well>
		)
	}
}

export default PostAddComponent
