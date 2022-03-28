import React from 'react';

class SearchBar extends React.Component {
    state = {
        imageData: '',
    };

    onHandleInput = e => {
        const { value } = e.target;
        this.setState({ imageData: value });
    };

    onSubmitSearch = e => {
        e.preventDefault();
        if (this.state.imageData.trim() === '') return;
        console.log(' :>> ');
        this.props.onSubmit(this.state.imageData);
        this.setState({ imageData: '' });
    };

    render() {
        return (
            <header>
                <form onSubmit={this.onSubmitSearch}>
                    <button type="submit">
                        <span>Search</span>
                    </button>

                    <input
                        type="text"
                        autoComplete="off"
                        autoFocus
                        placeholder="Search images and photos"
                        onChange={this.onHandleInput}
                        value={this.state.imageData}
                    />
                </form>
            </header>
        );
    }
}

export default SearchBar;
