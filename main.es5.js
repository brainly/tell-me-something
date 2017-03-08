'use strict';

var button = document.querySelector('button');
var progress = document.querySelector('.progress');
var all = [1, 2, 3, 4];
var playlist = [];

button.addEventListener('click', playMeASong);

function playMeASong() {
    button.disabled = true;

    if (playlist.length === 0) {
        playlist = all.sort(function () {
            return Math.random() - 0.5;
        }).slice();
    }

    var id = playlist.pop();
    var audio = new Audio('media/' + id + '.mp3');

    audio.addEventListener('playing', audioStarted);
    audio.addEventListener('timeupdate', audioUpdate.bind(null, audio));
    audio.addEventListener('ended', audioEnded);

    audio.play();
}

function audioStarted() {
    progress.style.opacity = 1;
    progress.style.width = 0;
}

function audioUpdate(audio) {
    progress.style.width = Math.round(audio.currentTime / audio.duration * 100) + '%';
}

function audioEnded() {
    button.disabled = false;

    function cleanUp() {
        progress.style.width = 0;
        progress.removeEventListener('transitionend', cleanUp);
    }

    function fadeOut() {
        progress.style.opacity = 0;
        progress.removeEventListener('transitionend', fadeOut);
        progress.addEventListener('transitionend', cleanUp);
    }

    progress.addEventListener('transitionend', fadeOut);
}
