import { observable, autorun, reaction } from 'mobx'
import cuid from 'cuid'
import observableAppActionsStore from './storeAppActions'

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
	@observable categoriesCount = this.categories.length
	@observable editableCategory = false
	@observable editableCategoryId = ''
	@observable activeCategory = null

	/**
	 *
	 */
	constructor() {
		autorun(() => console.log(this))
		reaction(
			() => this.categories.length,
			length => {
				if (length > this.categoriesCount) {
					observableAppActionsStore.addAction({
						id: cuid(),
						type: 'success',
						content: 'Category added'
					})
					this.categoriesCount = length
				}
				if (length < this.categoriesCount) {
					observableAppActionsStore.addAction({
						id: cuid(),
						type: 'danger',
						content: 'Category removes'
					})
					this.categoriesCount = length
				}
			}
		)
		reaction(
			() => this.editableCategoryId,
			id => {
				if (!id) {
					observableAppActionsStore.addAction({
						id: cuid(),
						createdAt: Date.now(),
						type: 'info',
						content: 'Category edited'
					})
				}
			}
		)
		reaction(
			() => this.activeCategory,
			activeCategory => {
				if (!activeCategory) {
					observableAppActionsStore.addAction({
						id: cuid(),
						createdAt: Date.now(),
						type: 'warning',
						content: 'Filter cleared'
					})
                }
                if (activeCategory && activeCategory.id) {
                    observableAppActionsStore.addAction({
                        id: cuid(),
                        createdAt: Date.now(),
                        type: 'info',
                        content: 'Filter changed'
                    })
                }
			}
		)
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
