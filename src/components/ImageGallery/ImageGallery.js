import Item from 'components/ImageGalleryItem/imageGalleryItem';
import React from 'react';

export default class ImageGallery extends React.Component {
    render() {
        return (
            <ul>
                {this.props.images.map(item => {
                    return (
                        <Item
                            sours={item.previewURL}
                            id={item.id}
                            altern={item.tags}
                        />
                    );
                })}
            </ul>
        );
    }
}
