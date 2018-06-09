import React, { Component, Fragment } from 'react'
import {
	Panel,
	FormControl,
	ButtonToolbar,
	ButtonGroup,
	Button,
	Well
} from 'react-bootstrap'
import { observer } from 'mobx-react'
@observer
class PostsListComponent extends Component {
	render() {
		const {
			editablePost,
			editablePostId,
			handlePostChange,
			handlePostEditSave,
			handlePostEdit
		} = this.props.store
		return (
			<Well>
				{this.props.store.posts.map(post => {
					return (
						<Panel key={post.id}>
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
                                            <p className='post-date'>{`Added at: ${new Date(post.createdAt).toLocaleString()}`}</p>
                                    </Fragment>
								)}
							</Panel.Body>
							<Panel.Footer>
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
							</Panel.Footer>
						</Panel>
					)
				})}
			</Well>
		)
	}
}

export default PostsListComponent
