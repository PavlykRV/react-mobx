import React from 'react'
import { ListGroup, ListGroupItem } from 'react-bootstrap'

export function ActionsPanelListComponent(props) {
	return <ListGroup>
			<ListGroupItem bsStyle="success">Post added</ListGroupItem>
			<ListGroupItem bsStyle="info">Post changed</ListGroupItem>
			<ListGroupItem bsStyle="info">Category changed</ListGroupItem>
            <ListGroupItem bsStyle="danger">Post deleted</ListGroupItem>
		</ListGroup>
}
