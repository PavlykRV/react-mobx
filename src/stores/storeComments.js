import { observable, autorun, reaction, computed } from 'mobx'
import cuid from 'cuid'
import observablePostsStore from './storePost'
import observableAppActionsStore from './storeAppActions'

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
			content:
				'Initial mock comment with some "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veniam, aut voluptate! Totam corporis modi corrupti est perspiciatis dolorem maiores impedit."'
		}
	]
	@observable comment = getClearComment()
	@observable commentariesCount = this.commentaries.length
	@observable editableComment = false
	@observable editableCommentId = ''
	@observable newCommentFocus = false
	@observable newCommentPostId = ''

	constructor() {
        autorun(() => console.log(this))
        /**
         * Store reaction on commentaries collection changes
         */
		reaction(
			() => this.commentaries.length,
			length => {
				if (length > this.commentariesCount) {
					observableAppActionsStore.addAction({
						id: cuid(),
						createdAt: Date.now(),
						type: 'success',
						content: 'Comment added'
					})
					this.commentariesCount = length
				}
				if (length < this.commentariesCount) {
					observableAppActionsStore.addAction({
						id: cuid(),
						createdAt: Date.now(),
						type: 'danger',
						content: 'Comment removes'
					})
					this.commentariesCount = length
				}
			}
        )
        /**
         * Store reaction on comment editing
         */
		reaction(
			() => this.editableCommentId,
			id => {
				if (!id) {
					observableAppActionsStore.addAction({
						id: cuid(),
						createdAt: Date.now(),
						type: 'info',
						content: 'Comment edited'
					})
				}
			}
		)
	}

	@computed
	get sortedComments() {
		return this.commentaries.slice().sort((a, b) => b.createdAt - a.createdAt)
	}

	/**
	 * Handle change text in comment content
	 * @param {Object} event - onChange event
	 */
	handleCommentChange = event => {
		event.stopPropagation()
		const { name, value } = event.target
		this.comment[name] = value
	}

	/**
	 * Handle comment deleting from commentaries collection
	 * @param {String} commentId - selected comment id
	 */
	handleCommentDelete = commentId => {
		this.commentaries = this.commentaries.filter(
			comment => comment.id !== commentId
		)
	}

	/**
	 * Handle comment editing by enabling 'editableComment' and search target comment in collection
	 * @param {String} commentId - selected comment id
	 */
	handleCommentEdit = commentId => {
		this.editableComment = true
		this.editableCommentId = commentId
		this.comment = this.commentaries.find(comment => comment.id === commentId)
	}

	/**
	 * Handle to save comment edited changes
	 */
	handleCommentEditSave = () => {
		this.editableComment = false
		this.editableCommentId = ''
		this.post = getClearComment()
	}
	/**
	 * Changing component focus for adding new comment
	 * @param {String} postId - target post id
	 */
	toggleCommentFocus = postId => {
		this.newCommentFocus = !this.newCommentFocus
		this.newCommentPostId = postId
		this.comment = getClearComment()
	}

	/**
	 * Handle new comment added to collection
	 * @param {String} postId - target post id
	 */
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
