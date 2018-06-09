import { observable, computed, autorun } from 'mobx'
import observablePostsStore from './storePost'
import cuid from 'cuid'

const getClearComment = () => {
	return { id: cuid(), createdAt: '', content: '' }
}

class ObservableCommentsStore {
	@observable commentaries = [
		{
			id: cuid(),
			postId: observablePostsStore.posts[0].id,
			createdAt: Date.now(),
			content: 'some comment'
		}
	]
	/**
	 *
	 */
	@observable comment = getClearComment()

	constructor() {
		autorun(() => console.log(this))
	}

	handleCommentChange = event => {
		const { name, value } = event.target
		this.comment[name] = value
	}

	handleCommentDelete = commentId => {
		this.commentaries = this.commentaries.filter(
			comment => comment.id !== commentId
		)
	}

	addComment = postId => {
		if (this.comment.content) {
			this.commentaries.push({
				...this.comment,
				postId,
				createdAt: Date.now()
            })
            this.comment = getClearComment()
		}
	}
}

const observableCommentsStore = new ObservableCommentsStore()

export default observableCommentsStore
