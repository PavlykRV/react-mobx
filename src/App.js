import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import { Grid, Row, Col } from 'react-bootstrap'

class App extends Component {
	render() {
		return <Grid>
				<Row>
					<Col xs={12}>
                        <span>Header component</span>
                    </Col>
				</Row>
				<Row>
					<Col xs={12} md={6} xsOffset={3}>
                        <span>Postlist component</span>
					</Col>
				</Row>
			</Grid>
	}
}

export default App
