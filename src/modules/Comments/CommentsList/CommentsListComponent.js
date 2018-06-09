import React, { Component } from 'react'
import { observer } from 'mobx-react'
import CommentAddComponent from '../CommentAdd/CommentAddComponent'
import CommentItemComponent from '../CommentItem/CommentItemComponent'
import { Panel, Well } from 'react-bootstrap'

@observer
class CommentsListComponent extends Component {
	render() {
		return (
			<Well>
                <CommentAddComponent />
                {this.props.store.commentaries.map(comment => {
                    return (
                        <CommentItemComponent 
                            key={comment.id}
                            comment={comment}
                        />
                    )
                })}
            </Well>
		)
	}
}

export default CommentsListComponent
