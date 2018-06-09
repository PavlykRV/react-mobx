import { observable, autorun, computed } from 'mobx'
import cuid from 'cuid'

class ObservableAppActionsStore {
	@observable
	appActions = [
		{
            id: cuid(),
            createdAt: Date.now(),
			type: 'info',
			content: 'App started'
		}
	]

	constructor() {
		autorun(() => console.log(this))
    }
    
    @computed
    get sortedActions() {
        return this.appActions.slice().sort((a, b) => b.createdAt - a.createdAt)
    }

	addAction = action => {
		this.appActions.push(action)
	}
}

const observableAppActionsStore = new ObservableAppActionsStore()

export default observableAppActionsStore
