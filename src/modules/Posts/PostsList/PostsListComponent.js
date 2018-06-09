import React, { Component, Fragment } from 'react'
import CommentsListComponent from './../../Comments/CommentsList/CommentsListComponent'
import observableCommentsStore from './../../../stores/storeComments'
import {
	Panel,
	FormControl,
	ButtonToolbar,
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
					return <Panel key={post.id}>
							<Panel.Heading>
								{editablePost && editablePostId === post.id ? (
									<FormControl
										type="text"
										placeholder="Add new post"
										name="title"
										value={post.title}
										onChange={e => handlePostChange(e)}
									/>
								) : (
									<Panel.Title componentClass="h3">
										{post.title}
									</Panel.Title>
								)}
							</Panel.Heading>
							<Panel.Body>
								{editablePost && editablePostId === post.id ? <FormControl componentClass="textarea" placeholder="" name="content" value={post.content} onChange={e => this.props.store.handlePostChange(e)} /> : <Fragment>
										<p>{post.content}</p>
										<p className="post-date">{`Added at: ${new Date(post.createdAt).toLocaleString()}`}</p>
									</Fragment>}
							</Panel.Body>
							<Panel.Footer className="post-actions">
								<ButtonGroup>
									<Button bsStyle="danger" onClick={() => handlePostDelete(post.id)}>
										Delete
									</Button>

									{editablePost && editablePostId === post.id ? <Button bsStyle="success" onClick={() => handlePostEditSave()}>
											Save
										</Button> : <Button bsStyle="info" onClick={() => handlePostEdit(post.id)}>
											Edit
										</Button>}
								</ButtonGroup>
								<ButtonGroup>
									<Button bsStyle="primary" onClick={() => observableCommentsStore.addComment(post.id)}>
										Add comment
									</Button>
								</ButtonGroup>
							</Panel.Footer>
							<CommentsListComponent store={observableCommentsStore} post={post} />
						</Panel>
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
