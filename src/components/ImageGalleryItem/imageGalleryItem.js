import React from 'react';
export default class Item extends React.Component {
    render() {
        const { sours, altern, id } = this.props;
        return (
            <li key={id}>
                <img src={sours} alt={altern} />
            </li>
        );
    }
}
