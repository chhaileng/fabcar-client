import React from 'react';
import axios from 'axios';

import { Link } from 'react-router-dom';

export default class AllCars extends React.Component {
    constructor() {
        super();
        this.state = {
            cars: [],
            showLoading: true
        }
    }
    componentDidMount() {
        axios.get('http://master:3000/cars').then(res => {
            this.setState({showLoading: false});
            if(res.data.status) {
                this.setState({cars: res.data.cars})
            } else {
                alert(res.data.error.message)
            }
        }).catch(err => {
            this.setState({showLoading: false});
            alert('Something went wrong')
        })
    }

    render() {
        const tbody = this.state.cars.map(car => {
            return <tr key={car.Key}>
                <td>{car.Key}</td>
                <td>{car.Record.make}</td>
                <td>{car.Record.model}</td>
                <td>{car.Record.color}</td>
                <td>{car.Record.owner}</td>
                <td>
                    <Link to={'/change-owner/' + car.Key} className="waves-effect waves-light btn light-blue darken-3"><i className="material-icons">edit</i></Link>
                </td>
            </tr>
        })
        return (
            <div>
                <h4>All Cars</h4>
                <table className='striped responsive-table centered'>
                    <thead>
                        <tr>
                            <th>Key</th>
                            <th>Make</th>
                            <th>Model</th>
                            <th>Color</th>
                            <th>Owner</th>
                            <th style={{width: 100}}>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {tbody}
                    </tbody>
                </table>
                { this.state.showLoading ? <div className="progress"><div className="indeterminate"></div></div> : null}
            </div>
        )
    }
}