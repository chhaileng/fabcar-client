import React from 'react';
import { Link } from 'react-router-dom';

export default class NotFound extends React.Component {
    render() {
        return(
            <div>
                <h4>404 Page not found</h4>
                <h6><Link to='/'>Back to homepage</Link></h6>
            </div>
        )
    }
}