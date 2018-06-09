import React, { Component } from 'react'
import { ListGroup, ListGroupItem, Label } from 'react-bootstrap'
import { observer } from 'mobx-react'
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
						<ListGroupItem key={action.id} bsStyle={action.type}>
                            {`${action.content} ${new Date(action.createdAt).toLocaleTimeString()}`}
						</ListGroupItem>
					)
				})}
			</ListGroup>
		)
	}
}

export default ActionsPanelListComponent
