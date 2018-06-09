import { observable, computed, autorun } from 'mobx'
import observablePostsStore from './storePost'
import cuid from 'cuid'

const getClearComment = () => {
	return { id: cuid(), createdAt: '', content: '' }
}

class ObservableCommentsStore {
	@observable
	commentaries = [
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
	@observable editableComment = false
    @observable newCommentFocus = false
    @observable newCommentPostId = ''

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

	/**
	 *
	 */
	toggleCommentFocus = (postId) => {
        this.newCommentFocus = !this.newCommentFocus
        this.newCommentPostId = postId
        this.comment = getClearComment()
	}

	addComment = postId => {
		if (this.comment.content) {
			this.commentaries.push({
				...this.comment,
				postId,
				createdAt: Date.now()
            })
            this.newCommentFocus = false
			this.comment = getClearComment()
		}
	}
}

const observableCommentsStore = new ObservableCommentsStore()

export default observableCommentsStore
