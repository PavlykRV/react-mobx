import React, { Component } from 'react'
import { observer } from 'mobx-react'
import CommentAddComponent from '../CommentAdd/CommentAddComponent'
import CommentItemComponent from '../CommentItem/CommentItemComponent'
import { Panel, Well } from 'react-bootstrap'

// import styles
import './CommentsListComponent.css'

@observer
class CommentsListComponent extends Component {
	render() {
		return (
			<div className="comments-list">
                {(this.props.store.newCommentFocus && this.props.store.newCommentPostId === this.props.post.id) && (
					<CommentAddComponent
						post={this.props.post}
						store={this.props.store}
					/>
				)}
                {this.props.store.sortedComments.map(comment => {
                    if (comment.postId === this.props.post.id) {
                        return <CommentItemComponent key={comment.id} comment={comment} store={this.props.store} />
                    }
				})}
			</div>
		)
	}
}

export default CommentsListComponent
