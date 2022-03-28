// 22642975-54ab0d01d9c1b1285598c5aff
const key = '22642975-54ab0d01d9c1b1285598c5aff';
const fetchFunc = function (imageData, pagination) {
    return fetch(
        `https://pixabay.com/api/?q=${imageData}&page=${pagination}&key=${key}&image_type=photo&orientation=horizontal&per_page=12`
    );
};

export default fetchFunc;
