function setup() {
    fetchPhotos('/photos').then(photos => {
        console.log(photos);
        render(photos);
        zoomPhoto(photos[0]);
    });
}

function removeFullPhoto() {
    const $full = document.querySelector('.full');
    if ($full) {
        $full.remove();
    }
}

function removeDetails() {
    const $div = document.querySelector('.div');
    if ($div) {
        $div.remove();
    }
}

function displayPhotoDetails(photo) {
    const template = `
    <div>
    <h3>${photo.author}</h3>, 
    <p>${photo.title}</p>,
     <p>${photo.tags.map(el => `#${el}`).join(', ')}</p>
     </div>
     `;
    const $divContainer = document.createElement('div');
    $divContainer.innerHTML = template;

    const $area = document.querySelector('#app');
    $area.appendChild($divContainer);
}

function zoomPhoto(photo) {
    removeFullPhoto();
    removeDetails();

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
