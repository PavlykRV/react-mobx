import { observable, computed, autorun } from 'mobx'
import cuid from 'cuid'

const getClearComment = () => {
	return { id: cuid(), createdAt: '', content: '' }
}

class ObservableCommentsStore {
	@observable comments = []
	/**
	 *
	 */
	@observable comment = getClearComment()

	constructor() {
		autorun(() => console.log(this))
	}
}

const observableCommentsStore = new ObservableCommentsStore()

export default observableCommentsStore
