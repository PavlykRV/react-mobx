import { observable, autorun, computed, reaction } from 'mobx'
import cuid from 'cuid'
import observableCategoriesStore from './storeCategories'
import observableAppActionsStore from './storeAppActions'

const getClearPost = () => {
	return {
		id: cuid(),
		createdAt: '',
		title: '',
		content: '',
		categories: [],
		commentaries: []
	}
}

class ObservablePostsStore {
	@observable
	posts = [
		{
			id: cuid(),
			createdAt: Date.now(),
			title: 'Creating a VS Code Theme',
			content:
				'Everyone has special and perhaps, particular, tastes when it comes to their code editor. There are literally thousands of themes out there, and for good reason: a thing of beauty and enhancement to productivity for one can be a hindrance to another.',
			categories: [],
			commentaries: []
		}
	]
	@observable post = getClearPost()
	@observable postsCount = this.posts.length
	@observable editablePost = false
	@observable editablePostId = ''
	@observable focusNewPost = false

	/**
	 *
	 */
	constructor() {
		autorun(() => console.log(this))
		reaction(
			() => this.posts.length,
			length => {
				if (length > this.postsCount) {
					observableAppActionsStore.addAction({
						id: cuid(),
						createdAt: Date.now(),
						type: 'success',
						content: 'Post added'
					})
					this.postsCount = length
				}
				if (length < this.postsCount) {
					observableAppActionsStore.addAction({
						id: cuid(),
						createdAt: Date.now(),
						type: 'danger',
						content: 'Post removes'
					})
					this.postsCount = length
				}
			}
		)
		reaction(
			() => this.editablePostId,
			id => {
				if (!id) {
                    observableAppActionsStore.addAction({
                        id: cuid(),
                        createdAt: Date.now(),
                        type: 'info',
                        content: 'Post edited'
                    })
				}
			}
		)
	}

	@computed
	get categorizedPosts() {
		const { activeCategory } = observableCategoriesStore

		if (activeCategory) {
			const filteredPosts = this.posts.filter(post => {
				return (
					post.categories.length !== 0 &&
					post.categories.includes(activeCategory.name)
				)
            })
            return filteredPosts.sort((a, b) => b.createdAt - a.createdAt)
		}
        return this.posts.slice().sort((a, b) => b.createdAt - a.createdAt)
	}

	/**
	 *
	 */
	handlePostChange = event => {
		event.stopPropagation()

		const { name, value } = event.target
		this.post[name] = value
	}

	/**
	 *
	 */
	handlePostDelete = postId => {
		const updatedPosts = this.posts.filter(post => post.id !== postId)
		this.posts = updatedPosts
	}

	/**
	 *
	 */
	handlePostEdit = postId => {
		this.editablePost = true
		this.editablePostId = postId
		this.post = this.posts.find(post => post.id === postId)
	}

	/**
	 *
	 */
	handlePostEditSave = () => {
		this.editablePost = false
		this.editablePostId = ''
		this.post = getClearPost()
	}

	/**
	 *
	 */
	setNewPostFocus = () => {
		this.focusNewPost = true
	}

	/**
	 *
	 */
	clearNewPostFocus = () => {
		this.focusNewPost = false
	}

	handlePostCategorySelect = event => {
		event.stopPropagation()
		this.post.categories.push(event.target.value)
	}

	/**
	 *
	 */
	addPost = () => {
		if (this.post.title && this.post.content && this.post.categories.length) {
			this.posts.push({ ...this.post, createdAt: Date.now() })
			this.post = getClearPost()
		}
	}
}

const observablePostsStore = new ObservablePostsStore()

export default observablePostsStore
