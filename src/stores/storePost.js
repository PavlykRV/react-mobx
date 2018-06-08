import { observable, computed, autorun } from 'mobx'
import cuid from 'cuid'

const getClearPost = () => {
    return { id: cuid(), createdAt: '', title: '', content: '', categories: [] }
}

class ObservablePostsStore {
	@observable
	posts = [
		{
            id: cuid(),
            createdAt: Date.now(),
            title: 'Creating a VS Code Theme',
            content: 'Everyone has special and perhaps, particular, tastes when it comes to their code editor. There are literally thousands of themes out there, and for good reason: a thing of beauty and enhancement to productivity for one can be a hindrance to another.',
            categories: [],
		}
	]
	@observable post = getClearPost()
	@observable editablePost = false
	@observable editablePostId = ''

	constructor() {
		autorun(() => console.log(this))
	}

	// @computed get allPosts() {
	//     return this.posts
	// }

	handlePostChange = event => {
		const { name, value } = event.target
		this.post[name] = value
	}

	handlePostDelete = id => {
		const updatedPosts = this.posts.filter(post => post.id !== id)
		this.posts = updatedPosts
	}

	handlePostEdit = id => {
		this.editablePost = true
		this.editablePostId = id
		this.post = this.posts.find(post => post.id === id)
	}
	handlePostEditSave = () => {
		this.editablePost = false
		this.editablePostId = ''
        this.post = getClearPost()
	}

	addPost = () => {
		if (this.post.title && this.post.content) {
            this.posts.push({ ...this.post, createdAt: Date.now()})
            this.post = getClearPost()
		}
	}
}

const observablePostsStore = new ObservablePostsStore()

export default observablePostsStore