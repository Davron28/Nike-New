// Burger
let burger = document.querySelector('.header__burger'),
    list = document.querySelector('.header__nav-list');


burger.addEventListener('click', function () {
    burger.classList.toggle('active')
    list.classList.toggle('active')
})
// **********************************************************************

// Header tabs 

const header = document.querySelector('.header');

const tab1 = document.querySelector('.tab-1');
const tab2 = document.querySelector('.tab-2');
const tab3 = document.querySelector('.tab-3');

const navLinks = document.querySelectorAll('.header__nav-link');
const headerTitle = document.querySelector('.header__content h2');
const headerText = document.querySelectorAll('.header__content p');
const headerBg = document.querySelector('.img__none');

tab1.addEventListener('click', changeTab1)
tab2.addEventListener('click', changeTab2)
tab3.addEventListener('click', changeTab3)

function changeTab1() {
    header.style = `background:  #EBFFE4`;
    navLinks.forEach((navLink) => {
        navLink.style = `color: #051101; opacity: 0.6;`
    })
    headerText.forEach((paragraph) => {
        paragraph.style = `color: ##5CBE3A; opacity: 0.7;`
    })
    headerTitle.style = `color: #5CBE3A;`;
    headerBg.style = `display: none;`;
}

function changeTab2() {
    headerBg.style = `display: flex`;
    navLinks.forEach((navLink) => {
        navLink.style = `color: #000000; opacity: 1;`
    })
}

function changeTab3() {
    header.style = `background: #051101;
    opacity: 0.85; `
    navLinks.forEach((navLink) => {
        navLink.style = `color: white; opacity: 1;`
    })
    headerText.forEach((paragraph) => {
        paragraph.style = `color: #5CBE3A; opacity: 1;`
    })
    headerTitle.style = `color: white;`;
    headerBg.style = `display: none;`;
}

// ***********************************************************************

// Video
class Player {
    constructor(selector) {
        this.player = document.querySelector(selector);
        this.video = this.player.querySelector('video');
        this.hidePanel = true;
        this.timer;
        this.listen = this.setVideoLine.bind(this);


        this.playVideo();
    }



    playVideo() {
        this.video.addEventListener('click', this.toggleVideo.bind(this));
        this.player.querySelector('.play').addEventListener('click', this.toggleVideo.bind(this));
        this.player.querySelector('.play__circle').addEventListener('click', this.toggleVideo.bind(this));
        this.video.addEventListener('dblclick', this.toggleFullscreen.bind(this));
        this.player.querySelector('.fullscreen').addEventListener('click', this.toggleFullscreen.bind(this));
        this.player.querySelector('.mute').addEventListener('click', this.toggleVolume.bind(this));
        this.player.querySelector('.volume__slider').addEventListener('input', this.setVolume.bind(this));
        this.player.querySelector('.video__speed').addEventListener('input', this.setSpeed.bind(this));
        this.video.addEventListener('loadedmetadata', this.setVideoTime.bind(this));
        this.video.addEventListener('timeupdate', this.timeUpdate.bind(this));
        this.player.querySelector('.panel__line').addEventListener('click', this.setVideoLine.bind(this));
        this.player.addEventListener('mousedown', () => {
            this.player.querySelector('.panel__line').addEventListener('mousemove', this.listen, false);
            // this.video.muted = true;
        },);
        this.player.addEventListener('mouseup', () => {
            this.player.querySelector('.panel__line').removeEventListener('mousemove', this.listen, false);
            // this.video.muted = false;
        });

    }


    toggleVideo() {
        this.playing = !this.playing;
        const playIcon = this.player.querySelector('.play .fas');
        const playCircle = this.player.querySelector('.play__circle');
        playIcon.classList.toggle('fa-play', !this.playing);
        playIcon.classList.toggle('fa-pause', this.playing);

        if (this.playing) {
            this.video.play();
            playCircle.style.display = 'none';
        } else {
            this.video.pause();
            playCircle.style.display = 'block';
            document.querySelector('.panel').style.bottom = '0';
        }
    }

    toggleFullscreen() {
        const full = document.fullscreenElement;
        const fullIcon = this.player.querySelector('.fullscreen .fas');
        fullIcon.classList.toggle('fa-expand', full);
        fullIcon.classList.toggle('fa-compress', !full);
        if (!full) {
            this.player.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
    }

    toggleVolume() {
        this.sounding = !this.sounding;
        const volumeIcon = this.player.querySelector('.mute .fas');
        const volumeSlider = this.player.querySelector('.volume__slider');
        volumeIcon.classList.toggle('fa-volume-up', !this.sounding);
        volumeIcon.classList.toggle('fa-volume-mute', this.sounding);
        if (this.sounding) {
            this.video.muted = true;
            volumeSlider.setAttribute('data-volume', volumeSlider.value);
            volumeSlider.value = 0;
        } else {
            this.video.muted = false;
            volumeSlider.value = volumeSlider.getAttribute('data-volume');
        }
    }

    setVolume() {
        this.video.volume = this.player.querySelector('.volume__slider').value / 100;
    }

    setSpeed() {
        this.video.playbackRate = this.player.querySelector('.video__speed').value;
    }

    setVideoTime() {
        const duration = Math.floor(this.video.duration);
        this.player.querySelector('.time__duration').innerHTML = `${Math.floor(duration / 60)}:${Math.floor(duration % 60)}`;
    }

    timeUpdate() {
        const duration = Math.floor(this.video.duration);
        const current = Math.floor(this.video.currentTime);

        let seconds;

        if (current % 60 < 10) {
            seconds = `0${current % 60}`;
        } else {
            seconds = `${current % 60}`;
        }

        this.player.querySelector('.time__current').innerHTML = `${Math.floor(current / 60)}:${seconds}`;
        this.player.querySelector('.panel__line-current').style.width = `${current / duration * 100}%`;

        let timer;

        if (this.hidePanel) {
            this.hidePanel = false;
            this.timer = setTimeout(() => {
                this.player.querySelector('.panel').style.bottom = '-74px';
            }, 4000)
        }
        this.video.addEventListener('mousemove', this.hide.bind(this));
    }
    hide() {
        this.hidePanel = true;
        clearTimeout(this.timer);
        document.querySelector('.panel').style.bottom = '0';
    }

    setVideoLine() {

        const lineWidth = this.player.querySelector('.panel__line').clientWidth;
        const position = event.offsetX;
        const duration = Math.floor(this.video.duration);
        this.player.querySelector('.panel__line-current').style.width = `${position / lineWidth * 100}%`;
        this.video.currentTime = position / lineWidth * duration;
    }
}

let player = new Player('.player');
// **********************************************************************



// Slider start

class Slider {
    constructor(options) {
        this.slider = options.slider;
        this.sliderList = this.slider.querySelector('.slider__list');
        this.sliderItems = this.slider.querySelectorAll('.slider__item');
        this.btnPrev = this.slider.querySelector('.prev');
        this.btnNext = this.slider.querySelector('.next');
        this.width = this.sliderItems[0].clientWidth;
        this.height = this.sliderItems[0].clientHeight;
        this.activeSlide = 0;
        this.timeMove = 1000;
        this.dir = options.direction.toUpperCase() == 'X' ? 'X' : 'Y';
        this.moveSlide = this.dir == 'X' ? this.width : this.height;
        this.dotsDisable = options.dotsDisable;
        this.interval = options.interval == undefined ? this.timeMove + 1000 : options.interval;

        if (this.dotsDisable == 'false') {
            this.active = true;
            this.ul = document.createElement('ul');
            this.ul.classList.add('slider__dots');
            this.sliderItems.forEach(() => {
                const li = document.createElement('li');
                this.ul.appendChild(li)
            })

            this.slider.appendChild(this.ul);
            this.dots = this.slider.querySelectorAll('.slider__dots li');
            this.dots[this.activeSlide].classList.add('active');

            this.dots.forEach((dot, key) => {
                dot.addEventListener('click', () => {
                    this.controlsDots(key)
                })
            })
        }

        if (options.play == 'true') {
            let autoPlay = setInterval(() => {
                this.move(this.btnNext);
            }, this.interval);
            this.slider.addEventListener('mouseenter', () => {
                clearInterval(autoPlay);
            })
            this.slider.addEventListener('mouseleave', () => {
                autoPlay = setInterval(() => {
                    this.move(this.btnNext);
                }, this.interval);
            })
        }

        this.sliderList.style = `width: ${this.width}px;
        height: ${this.height}px;
        `
        this.sliderItems.forEach((slide, num) => {
            slide.style = `position: absolute;
            top: 0;
            left: 0;`
        })
        
        this.sliderItems.forEach((slide, num) => {
            if (num != this.activeSlide) {
                slide.style.transform = `translate${this.dir}(${this.moveSlide}px)`;
            }
            if (num == this.sliderItems.length - 1) {
                slide.style.transform = `translate${this.dir}(${-this.moveSlide}px)`;
            }
        })

        this.btnNext.addEventListener('click', () => {
            this.move(this.btnNext);
        })
        this.btnPrev.addEventListener('click', () => {
            this.move(this.btnPrev)
        })

    }
    move(btn) {
        this.btnNext.disabled = true;
        this.btnPrev.disabled = true;
        setTimeout(() => {
            this.btnNext.disabled = false;
            this.btnPrev.disabled = false;
        }, this.timeMove + 200);
        let btnPrevOrNext = btn == this.btnNext ? -this.moveSlide : this.moveSlide;

        this.sliderItems.forEach((slide, num) => {
            if (num != this.activeSlide) {
                slide.style.transform = `translate${this.dir}(${-btnPrevOrNext}px)`;
                slide.style.transition = `0ms`;
            }
        })

        this.sliderItems[this.activeSlide].style.transform = `translate${this.dir}(${btnPrevOrNext}px)`;
        this.sliderItems[this.activeSlide].style.transition = `${this.timeMove}ms`;
        if (this.dotsDisable == 'false') {
            this.dots[this.activeSlide].classList.remove('active')
        };

        if (btn == this.btnNext) {
            this.activeSlide++;
            if (this.activeSlide >= this.sliderItems.length) {
                this.activeSlide = 0;
            }
        } else if (btn == this.btnPrev) {
            this.activeSlide--;
            if (this.activeSlide < 0) {
                this.activeSlide = this.sliderItems.length - 1;
            }
        }

        this.sliderItems[this.activeSlide].style.transform = `translate${this.dir}(${0}px)`;
        this.sliderItems[this.activeSlide].style.transition = `${this.timeMove}ms`;
        if (this.dotsDisable == 'false') {
            this.dots[this.activeSlide].classList.add('active')
        };
    }
    controlsDots(dotKey) {

        if (this.active && dotKey != this.activeSlide) {
            this.sliderItems.forEach((slide) => {
                slide.style.transition = `0ms`;
            })
            this.active = false;
            this.dots.forEach((dot) => {
                dot.classList.remove('active');
            })
            let moveLeftOrRight = dotKey > this.activeSlide ? this.moveSlide : -this.moveSlide;
            this.sliderItems[dotKey].style.transform = `translate${this.dir}(${moveLeftOrRight}px)`;
            setTimeout(() => {
                this.sliderItems[this.activeSlide].style.transform = `translate${this.dir}(${-moveLeftOrRight}px)`;
                this.sliderItems[this.activeSlide].style.transition = `${this.timeMove}ms`;
                this.dots[this.activeSlide].classList.remove('active');
                this.activeSlide = dotKey;
                this.sliderItems[this.activeSlide].style.transform = `translate${this.dir}(${0}px`;
                this.sliderItems[this.activeSlide].style.transition = `${this.timeMove}ms`;
                this.dots[this.activeSlide].classList.add('active');
            }, 100);
            setTimeout(() => {
                this.active = true;
            }, this.timeMove + 200);
        }
    }
}

const sliders = document.querySelectorAll('.slider');

sliders.forEach((slider) => {
    const direction = slider.getAttribute('data-direction') == 'Y' ? 'Y' : 'X';
    const dotsDisable = slider.hasAttribute('dots-disabled') ? 'true' : 'false';
    const autoPlay = slider.hasAttribute('auto-play') ? 'true' : 'false';
    const timeInterval = Number(slider.getAttribute('interval'));
    const interval = timeInterval != 0 ? timeInterval : undefined;
    new Slider({
        slider: slider,
        timeMove: 1000,
        direction: direction,
        dotsDisable: dotsDisable,
        play: autoPlay,
        interval: interval,
    })
});

// ***********************************************************************