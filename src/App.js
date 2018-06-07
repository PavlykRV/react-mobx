import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import { Grid, Row, Col } from 'react-bootstrap'
import { Header } from './modules/App/Header'
import { CategoryList } from './modules/Categories/CategoryList'
import { PostAdd } from './modules/Posts/PostAdd'
import { ActionsPanel } from './modules/Actions/ActionsPanelList'
import { PostsList } from './modules/Posts/PostList'

class App extends Component {
	render() {
		return <Grid>
				<Row>
					<Col xs={12}>
						<Header />
					</Col>
				</Row>
				<Row>
					<Col xs={3} md={3}>
						<CategoryList />
					</Col>
					<Col xs={9} md={6}>
						<PostAdd />
						<PostsList />
					</Col>
					<Col xs={3} md={3}>
						<ActionsPanel />
					</Col>
				</Row>
			</Grid>
	}
}

export default App
