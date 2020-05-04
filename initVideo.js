const stop = (video) => {
    video.pause();
}
const play = (video) => {
    video.play();
}

const expand = (video) => {
    video.setAttribute('data-mode', 'expanded')
    document.body.setAttribute('data-mode', 'expanded');
}

const colapse = (video) => {
    video.setAttribute('data-mode', 'colapsed')
    document.body.setAttribute('data-mode', 'colapsed');
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
    video.addEventListener('dblclick', () => {
        expand(video);
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
