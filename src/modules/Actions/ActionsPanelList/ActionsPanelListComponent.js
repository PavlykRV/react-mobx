import React, { Component } from 'react'
import { ListGroup, ListGroupItem } from 'react-bootstrap'
import { observer } from 'mobx-react'
import ActionsPanelItemComponent from '../ActionsPanelItem/ActionsPanelItemComponent'

// import styles
import './ActionsPanelListComponent.css'
@observer
class ActionsPanelListComponent extends Component {
	render() {
		return (
			<ListGroup className="actions-container">
				<ListGroupItem bsStyle="success">Post added</ListGroupItem>
				{this.props.store.sortedActions.map(action => {
					return (
                        <ActionsPanelItemComponent
                            key={action.id}
                            action={action}
                        />
                    )
				})}
			</ListGroup>
		)
	}
}

export default ActionsPanelListComponent
