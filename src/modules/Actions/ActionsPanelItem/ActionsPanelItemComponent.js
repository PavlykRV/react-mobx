import React, { Component } from 'react'
import { ListGroupItem } from 'react-bootstrap'
import { observer } from 'mobx-react'

// import styles
import './ActionsPanelItemComponent.css'

@observer
class ActionsPanelItemComponent extends Component {
    render() {
        const { action } = this.props
        return (
            <ListGroupItem bsStyle={action.type}>
                {`${action.content} ${new Date(action.createdAt).toLocaleTimeString()}`}
            </ListGroupItem>
        )
    }
}

export default ActionsPanelItemComponent
