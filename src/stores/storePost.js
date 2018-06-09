import { observable, autorun } from 'mobx'
import cuid from 'cuid'

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
	@observable editablePost = false
	@observable editablePostId = ''
  @observable focusNewPost = false
    
	/**
	 *
	 */
	constructor() {
		autorun(() => console.log(this))
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
    
	/**
	 *
	 */
	addPost = () => {
		if (this.post.title && this.post.content) {
			this.posts.push({ ...this.post, createdAt: Date.now() })
			this.post = getClearPost()
		}
	}
}

const observablePostsStore = new ObservablePostsStore()

export default observablePostsStore
