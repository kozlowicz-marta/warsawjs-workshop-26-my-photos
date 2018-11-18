function setup() {
    fetchPhotos('/photos').then(photos => {
        console.log(photos);
        render(photos);
        zoomPhoto(photos[0]);
    });
}

function removeElement(sel) {
    const $element = document.querySelector(sel);

    if ($element) {
        $element.remove();
    }
}

function displayPhotoDetails(photo) {
    const template = `
        <div>
            <h3>${photo.author}</h3>
            <p>${photo.title}</p>
            <p>${photo.tags.map(el => `#${el}`).join(', ')}</p>
        </div>
    `;

    removeElement('.details');

    const $divContainer = document.createElement('div');
    $divContainer.classList.add('details');
    $divContainer.innerHTML = template;

    const $area = document.querySelector('#app');
    $area.appendChild($divContainer);
}

function zoomPhoto(photo) {
    removeElement('.full');

    const $area = document.querySelector('#app');
    const $bigSize = document.createElement('img');

    $bigSize.classList.add('full');
    $bigSize.setAttribute('src', photo.image);
    $area.appendChild($bigSize);

    displayPhotoDetails(photo);
}

function render(photos) {
    const $area = document.querySelector('#app');
    photos.forEach(photo => {
        const $img = document.createElement('img');

        $img.setAttribute('src', photo.thumb);
        $img.addEventListener('click', () => {
            console.log(photo);
            zoomPhoto(photo);
        });

        $area.appendChild($img);
    });
}

function fetchPhotos() {
    return fetch('/photos').then(res => res.json());

    // return {
    //     then: (cb) => {
    //         cb([{
    //             thumb: 'ciasteczko'
    //         }]);
    //     }
    // }
}

document.addEventListener('DOMContentLoaded', setup);
