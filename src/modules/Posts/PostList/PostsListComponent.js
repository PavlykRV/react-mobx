import React from 'react'
import {
    Panel,
    FormControl,
    ButtonToolbar,
    Button,
    Well
} from 'react-bootstrap'

export function PostsListComponent(props) {
    return (
        <Well>
            <Panel>
                <Panel.Heading>
                    <Panel.Title componentClass="h3">Panel heading with a title 1</Panel.Title>
                </Panel.Heading>
                <Panel.Body>Panel content</Panel.Body>
            </Panel>

            <Panel>
                <Panel.Heading>
                    <Panel.Title componentClass="h3">Panel heading with a title 2</Panel.Title>
                </Panel.Heading>
                <Panel.Body>Panel content</Panel.Body>
            </Panel>
        </Well>
        
    )
}
