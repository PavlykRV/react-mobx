import { observable, autorun } from 'mobx'
import cuid from 'cuid'

const getClearCategory = () => {
	return { id: cuid(), createdAt: '', name: '' }
}

class ObservableCategoriesStore {
	@observable
	categories = [
		{
			id: cuid(),
			createdAt: Date.now(),
			name: 'Default'
		}
	]
	@observable category = getClearCategory()
	@observable editableCategory = false
	@observable editableCategoryId = ''
	@observable activeCategory = null

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
	handleCategoryEdit = categoryId => {
		this.editableCategory = true
		this.editableCategoryId = categoryId
		this.category = this.categories.find(category => category.id === categoryId)
	}

	/**
	 *
	 */
	handleCategoryEditSave = () => {
		this.editableCategory = false
		this.editableCategoryId = ''
		this.category = getClearCategory()
	}

	/**
	 *
	 */
	setActiveCategory = categoryId => {
		this.activeCategory = this.categories.find(
			category => category.id === categoryId
		)
	}

	/**
     * 
     */
	clearActiveCategory = () => {
        this.activeCategory = null
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
