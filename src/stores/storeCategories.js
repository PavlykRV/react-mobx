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

	constructor() {
        autorun(() => console.log(this))
        /**
         * Store reaction on categories collection changes
         */
		reaction(
			() => this.categories.length,
			length => {
				if (length > this.categoriesCount) {
					observableAppActionsStore.addAction({
						id: cuid(),
						createdAt: Date.now(),
						type: 'success',
						content: 'Category added'
					})
					this.categoriesCount = length
				}
				if (length < this.categoriesCount) {
					observableAppActionsStore.addAction({
						id: cuid(),
						createdAt: Date.now(),
						type: 'danger',
						content: 'Category removes'
					})
					this.categoriesCount = length
				}
			}
        )
        /**
         * Store reaction on category editing
         */
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
        /**
         * Store reaction on changing category filter
         */
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
	 * Handle change text in category name
	 * @param {Object} event - onChange event
	 */
	handleCategoryChange = event => {
		event.stopPropagation()

		const { name, value } = event.target
		this.category[name] = value
	}

	/**
	 * Handle category deleting from category collection
	 * @param {String} categoryId - selected category id
	 */
	handleCategoryDelete = categoryId => {
		this.categories = this.categories.filter(
			category => category.id !== categoryId
		)
	}

	/**
	 * Handle category editing by enabling 'editableCategory' and search target category in collection
	 * @param {String} categoryId - selected category id
	 */
	handleCategoryEdit = categoryId => {
		this.editableCategory = true
		this.editableCategoryId = categoryId
		this.category = this.categories.find(category => category.id === categoryId)
	}

	/**
	 * Handle to save category edited changes
	 */
	handleCategoryEditSave = () => {
		this.editableCategory = false
		this.editableCategoryId = ''
		this.category = getClearCategory()
	}

	/**
	 * Setting up active filter by selected category
     * @param {String} categoryId - id of selected category
	 */
	setActiveCategory = categoryId => {
		event.stopPropagation()

		this.activeCategory = this.categories.find(
			category => category.id === categoryId
		)
	}

	/**
	 * Disabling category filtering
	 */
	clearActiveCategory = () => {
		this.activeCategory = null
	}

	/**
	 * Handle new category added to collection
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
