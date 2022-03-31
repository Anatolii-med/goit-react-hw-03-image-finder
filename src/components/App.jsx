import React from 'react';
import Gallery from './ImageGallery/ImageGallery';
import fetchFunc from './Searchbar/fetchImage';
import SearchBar from './Searchbar/searchbar';
import Button from './Button/button';
import Spinner from './Loader/loader';
import { Modal } from './Modal/modal';
import Notiflix from 'notiflix';

class App extends React.Component {
    state = {
        status: 'idle',
        searchImg: [],
        pagination: 1,
        imagesArray: null,
        error: '',
        modalImgURL: '',
    };

    resetPagination = () => {
        this.setState({ pagination: 1 });
    };

    onSearchSubmit = searchValue => {
        this.setState({ searchImg: searchValue, status: 'pending' });
        this.resetPagination();
    };

    updatePaginationPage = () => {
        this.setState(prevState => ({ pagination: prevState.pagination + 1 }));
        window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth',
        });
    };

    onModalOpen = modalImgURL => {
        this.setState({ modalImgURL: modalImgURL, status: 'modal' });
        console.log('fullImgUrl :>> ', modalImgURL);
    };

    onModalClose = () => {
        this.setState({ modalImgURL: '', status: 'resolved' });
    };

    componentDidUpdate(prevProps, prevState) {
        const { searchImg, pagination } = this.state;
        const searchImgPrev = prevState.searchImg;
        const paginationPrev = prevState.pagination;
        const imagesArrayPrev = prevState.imagesArray;

        const firstFetch = searchImgPrev !== searchImg && pagination === 1;

        if (firstFetch) {
            const { searchImg, pagination } = this.state;
            fetchFunc(searchImg, pagination)
                .then(res => res.json())
                .then(data => {
                    if (data.total === 0) {
                        Notiflix.Notify.failure(
                            `Мы не смогли найти ваш запрос "${searchImg}"`
                        );
                        return this.setState({ status: 'rejected' });
                    }
                    Notiflix.Notify.success(
                        `По запросу "${searchImg}" мы нашли ${data.totalHits} изображений`
                    );
                    this.setState({
                        imagesArray: data.hits,
                        status: 'resolved',
                    });
                })
                .catch(error => this.setState({ error, status: 'rejected' }));
        }

        const secondaryFetch =
            paginationPrev !== pagination && pagination !== 1;

        if (secondaryFetch) {
            fetchFunc(searchImg, pagination)
                .then(res => res.json())
                .then(data =>
                    this.setState(() => ({
                        imagesArray: [...imagesArrayPrev, ...data.hits],
                        status: 'resolved',
                    }))
                )
                .catch(error => this.setState({ error, status: 'rejected' }));
        }
    }

    submitData = data => {
        this.setState({ imagesArray: data });
    };

    render() {
        if (this.state.status === 'idle') {
            return (
                <>
                    <SearchBar onSubmit={this.onSearchSubmit} />
                </>
            );
        }

        if (this.state.status === 'pending') {
            return (
                <>
                    <SearchBar onSubmit={this.onSearchSubmit} />
                    <Spinner />
                </>
            );
        }

        if (this.state.status === 'resolved') {
            return (
                <>
                    <SearchBar onSubmit={this.onSearchSubmit} />
                    <Gallery
                        images={this.state.imagesArray}
                        onItemClick={this.onModalOpen}
                    />
                    <Button onClick={this.updatePaginationPage} />
                </>
            );
        }

        if (this.state.status === 'modal') {
            return (
                <>
                    <SearchBar onSubmit={this.onSearchSubmit} />
                    <Gallery images={this.state.imagesArray} />
                    <Modal
                        largeImageUrl={this.state.modalImgURL}
                        onClose={this.onModalClose}
                    />
                </>
            );
        }
        if (this.state.status === 'rejected') {
            return (
                <>
                    <SearchBar onSubmit={this.onSearchSubmit} />
                </>
            );
        }
    }
}

export default App;
