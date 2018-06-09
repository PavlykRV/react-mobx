import { observable, autorun } from 'mobx'
import cuid from 'cuid'

class ObservableAppActionsStore {
	@observable
	appActions = [
		{
			id: cuid(),
			type: 'info',
			content: 'App started'
		}
	]

	constructor() {
		autorun(() => console.log(this))
	}

	addAction = action => {
		this.appActions.push(action)
	}
}

const observableAppActionsStore = new ObservableAppActionsStore()

export default observableAppActionsStore
