import React from 'react';

import { BrowserRouter, Route, Link } from 'react-router-dom';

import AllCars from './AllCars';
import AddCar from './AddCar';
import ChangeOwner from './ChangeOwner';

class App extends React.Component {
	render() {
		return (
			<BrowserRouter>
				<nav className='light-blue darken-3'>
					<div className="nav-wrapper container">
						<Link to='/' className="brand-logo">Fabric Car</Link>
						<ul id="nav-mobile" className="right hide-on-med-and-down">
							<li><Link to='/'><i className='material-icons left'>directions_car</i>All Cars</Link></li>
							<li><Link to='/add'><i className="material-icons left">add_circle_outline</i>Add Car</Link></li>
						</ul>
					</div>
				</nav>
				<div className='container'>
					<Route exact path="/" component={AllCars} />
					<Route exact path="/add" component={AddCar} />
					<Route exact path="/change-owner/:key" component={ChangeOwner} />
				</div>
			</BrowserRouter>
		);
	}
}

export default App;
