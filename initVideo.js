const stop = (video) => {
    video.pause();
}
const play = (video) => {
    video.play();
}

const expand = (video) => {
    video.setAttribute('data-mode', 'expanded')
    video.parentElement.parentElement.parentElement.setAttribute('data-mode', 'expanded');
    document.querySelector('.layout').setAttribute('data-mode', 'expanded');
}

const colapse = (video) => {
    video.removeAttribute('data-mode')
    video.parentElement.parentElement.parentElement.removeAttribute('data-mode');
    document.querySelector('.layout').removeAttribute('data-mode');
}

const getBrightness = (video) => {
    const match = video.style.filter.match(/brightness\((\d*)\)/);
    if (match) {
        return match[1];
    } else {
        return 100;
    }
}
const getContrast = (video) => {
    const match = video.style.filter.match(/contrast\((\d*)\)/);
    if (match) {
        return match[1];
    } else {
        return 100;
    }
}

const changeBrightness = (video, brightness) => {
    const contrast = getContrast(video);
    video.style.filter = `contrast(${contrast}%) brightness(${brightness}%)`
}

const changeContrast = (video, contrast) => {
    const brightness = getBrightness(video);
    video.style.filter = `contrast(${contrast}%) brightness(${brightness}%)`
}

const changeVolume = (video, volume) => {
    video.muted = false;
    video.volume = volume;
}

function initVideo(video, url) {
    video.addEventListener('playing', () => {
        video.setAttribute('data-state', 'played')
    })
    video.addEventListener('pause', () => {
        video.setAttribute('data-state', 'paused')
    });
    video.addEventListener('click', () => {
        video.paused ? play(video) : stop(video);
    });
    if (Hls.isSupported()) {
        var hls = new Hls();
        hls.loadSource(url);
        hls.attachMedia(video);
        hls.on(Hls.Events.MANIFEST_PARSED, function () {
            video.play();
        });
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = url;
        video.addEventListener('loadedmetadata', function () {
            video.play();
        });
    }
}
