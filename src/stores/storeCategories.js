import { observable, autorun } from 'mobx'
import cuid from 'cuid'

const getClearCategory = () => {
	return { id: cuid(), createdAt: '', name: '' }
}

class ObservableCategoriesStore {
	@observable
	categories = [{
        id: cuid(),
        createdAt: Date.now(),
        name: 'Default'
    }]
	@observable category = getClearCategory()

	/**
	 *
	 */
	constructor() {
		autorun(() => console.log(this))
	}

	/**
	 *
	 */
	handleCategoryChange = event => {
		event.stopPropagation()

		const { name, value } = event.target
		this.category[name] = value
	}

	/**
	 *
	 */
	handleCategoryDelete = categoryId => {
		this.categories = this.categories.filter(
			category => category.id !== categoryId
		)
	}

	/**
	 *
	 */
	addCategory = () => {
		if (
			this.category.name &&
			!this.categories.find(category => category.name === this.category.name)
		) {
			this.categories.push({
				...this.category,
				createdAt: Date.now()
			})
			this.category = getClearCategory()
		}
	}
}

const observableCategoriesStore = new ObservableCategoriesStore()

export default observableCategoriesStore
