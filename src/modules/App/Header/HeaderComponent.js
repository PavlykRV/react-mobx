import React from 'react'
import { Navbar, Nav, NavItem} from 'react-bootstrap'

export default function HeaderComponent(props) {
	return (
		<Navbar>
			<Navbar.Header>
				<Navbar.Brand>
					<a href="#home">React-Mobx</a>
				</Navbar.Brand>
			</Navbar.Header>
		</Navbar>
	)
}
