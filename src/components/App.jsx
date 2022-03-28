import React from 'react';
import Gallery from './ImageGallery/ImageGallery';
import fetchFunc from './Searchbar/fetchImage';
import SearchBar from './Searchbar/searchbar';

class App extends React.Component {
    state = {
        status: 'idle',
        searchImg: '',
        pagination: 3,
        imagesArray: null,
    };

    onSearchSubmit = e => {
        this.setState({ searchImg: e, pagination: 1 });
        console.log('e app ', e);
    };

    componentDidUpdate(prevProps, prevState) {
        if (prevState !== this.state) {
            const { searchImg, pagination } = this.state;
            fetchFunc(searchImg, pagination)
                .then(res => res.json())
                .then(data => this.setState({ imagesArray: data }));
        }
    }

    submitData = data => {
        this.setState({ imagesArray: data });
    };

    render() {
        return (
            <>
                <SearchBar onSubmit={this.onSearchSubmit} />
                {this.state.imagesArray && (
                    <Gallery images={this.state.imagesArray.hits} />
                )}
            </>
        );
    }
}

export default App;
