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
                <CommentAddComponent
                    post={this.props.post}
                    store={this.props.store}
                />
                {this.props.store.commentaries.map(comment => {
                    return (
                        <CommentItemComponent 
                            key={comment.id}
                            comment={comment}
                        />
                    )
                })}
            </div>
		)
	}
}

export default CommentsListComponent
