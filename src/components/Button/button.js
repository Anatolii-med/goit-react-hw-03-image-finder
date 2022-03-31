import React from 'react';
import { ButtonStyle } from './button.styled';

export default class Button extends React.Component {
    render() {
        const { onClick } = this.props;
        return (
            <ButtonStyle type="button" onClick={onClick}>
                Load more images
            </ButtonStyle>
        );
    }
}
