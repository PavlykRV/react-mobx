import React, { Component } from 'react'
import { observer } from 'mobx-react'

// import conponent
import { Grid, Row, Col } from 'react-bootstrap'
import HeaderComponent from './modules/App/Header/HeaderComponent'
import ActionsPanelListComponent from './modules/Actions/ActionsPanelList/ActionsPanelListComponent'
import CategoryListComponent from './modules/Categories/CategoryList/CategoryListComponent'
import PostAddComponent from './modules/Posts/PostAdd/PostAddComponent'
import PostsListComponent from './modules/Posts/PostsList/PostsListComponent'

// import mobx store
import observablePostsStore from './stores/storePost'
import observableCategoriesStore from './stores/storeCategories'
import observableAppActionsStore from './stores/storeAppActions'
// import global styles
import './App.css'

@observer
class App extends Component {
	render() {
		return (
			<Grid>
				<Row>
					<Col xs={12}>
						<HeaderComponent />
					</Col>
				</Row>
				<Row>
					<Col xs={10} xsOffset={1} md={3} mdOffset={0}>
						<CategoryListComponent store={observableCategoriesStore} />
					</Col>
					<Col xs={12} md={6}>
						<PostAddComponent store={observablePostsStore} />
						<PostsListComponent store={observablePostsStore} />
					</Col>
					<Col xs={10} xsOffset={1} md={3} mdOffset={0}>
						<ActionsPanelListComponent store={observableAppActionsStore} />
					</Col>
				</Row>
			</Grid>
		)
	}
}

export default App
