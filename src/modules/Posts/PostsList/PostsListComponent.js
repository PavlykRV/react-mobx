import React, { Component, Fragment } from 'react'
import CommentsListComponent from './../../Comments/CommentsList/CommentsListComponent'
import observableCommentsStore from './../../../stores/storeComments'
import observableCategoriesStore from './../../../stores/storeCategories'
import {
	Panel,
	FormControl,
	ButtonGroup,
	Button,
	Well,
	Alert
} from 'react-bootstrap'
import { observer } from 'mobx-react'

// import styles
import './PostListComponent.css'

@observer
class PostsListComponent extends Component {
	render() {
		const {
			editablePost,
			editablePostId,
			handlePostChange,
			handlePostEditSave,
			handlePostEdit,
			handlePostDelete
		} = this.props.store

		return this.props.store.posts.length ? (
			<Well>
				{this.props.store.posts.map(post => {
					console.log(
						'Active category:',
						observableCategoriesStore.activeCategory
					)
					console.log('Post categories:', ...post.categories)
					if (
						observableCategoriesStore.activeCategory &&
						(post.categories.find(
							category =>
								category !== observableCategoriesStore.activeCategory.name
						) ||
							!post.categories.length)
					) {
						return
					}
					return (
						<Panel key={post.id} className="post-item">
							<Panel.Heading className="post-item-head">
								{editablePost && editablePostId === post.id ? (
									<FormControl
										type="text"
										placeholder="Add new post"
										name="title"
										value={post.title}
										onChange={e => handlePostChange(e)}
									/>
								) : (
									<Panel.Title componentClass="h3">{post.title}</Panel.Title>
								)}
							</Panel.Heading>
							<Panel.Body className="post-item-body">
								{editablePost && editablePostId === post.id ? (
									<FormControl
										componentClass="textarea"
										placeholder=""
										name="content"
										value={post.content}
										onChange={e => this.props.store.handlePostChange(e)}
									/>
								) : (
									<Fragment>
										<p>{post.content}</p>
										<p className="post-date">{`Added at: ${new Date(
											post.createdAt
										).toLocaleString()}`}</p>
										<p className="post-date">{`Category: ${
											post.categories.length
												? post.categories[0]
												: 'uncategorized'
										}`}</p>
									</Fragment>
								)}
							</Panel.Body>
							<Panel.Footer className="post-actions">
								<ButtonGroup>
									<Button
										bsStyle="danger"
										onClick={() => handlePostDelete(post.id)}
									>
										Delete
									</Button>

									{editablePost && editablePostId === post.id ? (
										<Button
											bsStyle="success"
											onClick={() => handlePostEditSave()}
										>
											Save
										</Button>
									) : (
										<Button
											bsStyle="info"
											onClick={() => handlePostEdit(post.id)}
										>
											Edit
										</Button>
									)}
								</ButtonGroup>
								<ButtonGroup>
									<Button
										bsStyle={
											observableCommentsStore.newCommentFocus &&
											post.id === observableCommentsStore.newCommentPostId
												? 'warning'
												: 'primary'
										}
										onClick={() =>
											observableCommentsStore.toggleCommentFocus(post.id)
										}
									>
										{observableCommentsStore.newCommentFocus &&
										post.id === observableCommentsStore.newCommentPostId
											? 'Cancel'
											: 'Add comment'}
									</Button>
								</ButtonGroup>
							</Panel.Footer>
							<CommentsListComponent
								store={observableCommentsStore}
								post={post}
							/>
						</Panel>
					)
				})}
			</Well>
		) : (
			<Alert bsStyle="warning">
				<strong>Oh sorry!</strong> Can`t find any posts
			</Alert>
		)
	}
}

export default PostsListComponent
