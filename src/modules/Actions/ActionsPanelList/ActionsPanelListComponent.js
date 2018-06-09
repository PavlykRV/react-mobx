import React, { Component } from 'react'
import { ListGroup, ListGroupItem } from 'react-bootstrap'
import { observer } from 'mobx-react';

@observer
class ActionsPanelListComponent extends Component {
	render() {
        return (
            <ListGroup>
                <ListGroupItem bsStyle="success">Post added</ListGroupItem>
                {this.props.store.appActions.map(action => {
                    return <ListGroupItem key={action.id} bsStyle={action.type}>{action.content}</ListGroupItem>
                })}
            </ListGroup>
        )
    }
}

export default ActionsPanelListComponent
