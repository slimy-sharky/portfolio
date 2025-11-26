import sharkUrl from '../assets/shark.svg';

const canvas = document.getElementById('ocean-canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d')!;

let width: number, height: number;
let scrollY = 0;
let bubbles: Bubble[] = [];
let sharks: Shark[] = [];
let lightSource: LightSource;

function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
}

class Bubble {
    x: number;
    y: number;
    radius: number;
    speed: number;
    wobble: number;
    wobbleSpeed: number;

    constructor() {
        this.x = 0;
        this.y = 0;
        this.radius = 0;
        this.speed = 0;
        this.wobble = 0;
        this.wobbleSpeed = 0;
        this.reset();
    }

    reset() {
        this.x = Math.random() * width;
        this.y = height + Math.random() * 100;
        this.radius = Math.random() * 3 + 1;
        this.speed = Math.random() * 1 + 0.5;
        this.wobble = Math.random() * Math.PI * 2;
        this.wobbleSpeed = Math.random() * 0.03 + 0.01;
    }

    update(scrollDelta: number) {
        this.y -= this.speed + scrollDelta * 0.5;
        this.wobble += this.wobbleSpeed;
        this.x += Math.sin(this.wobble) * 0.5;

        if (this.y < -20) {
            this.reset();
        }
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${0.3 + Math.random() * 0.2})`;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(this.x - this.radius * 0.3, this.y - this.radius * 0.3, this.radius * 0.4, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${0.4 + Math.random() * 0.3})`;
        ctx.fill();
    }
}

class LightSource {
    x: number;
    y: number;
    radius: number;
    waveOffset: number;

    constructor() {
        this.x = width / 2;
        this.y = 0;
        this.radius = 200;
        this.waveOffset = 0;
    }

    update(time: number) {
        this.waveOffset = Math.sin(time * 0.001) * 50;
        this.x = width / 2 + this.waveOffset;
    }

    draw() {
        const gradient = ctx.createRadialGradient(
            this.x, this.y, 0,
            this.x, height / 2, height * 0.8
        );
        gradient.addColorStop(0, 'rgba(100, 200, 255, 0.4)');
        gradient.addColorStop(0.3, 'rgba(100, 200, 255, 0.2)');
        gradient.addColorStop(0.6, 'rgba(80, 180, 230, 0.1)');
        gradient.addColorStop(1, 'rgba(60, 160, 210, 0)');

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
    }

    getIntensityAt(x: number, y: number): number {
        const dx = x - this.x;
        const dy = y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDistance = height * 0.8;

        if (distance > maxDistance) return 0;
        return 1 - (distance / maxDistance);
    }
}

class Shark {
    x: number;
    y: number;
    size: number;
    speed: number;
    direction: number;
    wobble: number;
    wobbleSpeed: number;
    img: HTMLImageElement;
    loaded: boolean;

    constructor() {
        this.x = 0;
        this.y = 0;
        this.size = 0;
        this.speed = 0;
        this.direction = 1;
        this.wobble = 0;
        this.wobbleSpeed = 0;
        this.img = new Image();
        this.loaded = false;
        this.reset();
        this.createImage();
    }

    reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 150 + 100;
        this.speed = Math.random() * 0.3 + 0.2;
        this.direction = Math.random() > 0.5 ? 1 : -1;
        this.wobble = Math.random() * Math.PI * 2;
        this.wobbleSpeed = Math.random() * 0.02 + 0.01;
    }

    createImage() {
        this.img.src = sharkUrl;
        this.img.onload = () => {
            this.loaded = true;
        };
    }

    update() {
        this.x += this.speed * this.direction;
        this.wobble += this.wobbleSpeed;
        this.y += Math.sin(this.wobble) * 0.3;

        if (this.direction > 0 && this.x > width + this.size) {
            this.reset();
            this.x = -this.size;
        } else if (this.direction < 0 && this.x < -this.size) {
            this.reset();
            this.x = width + this.size;
        }
    }

    draw(lightIntensity: number) {
        if (!this.loaded) return;

        ctx.save();
        ctx.translate(this.x, this.y);
        if (this.direction < 0) {
            ctx.scale(-1, 1);
        }

        const opacity = Math.min(lightIntensity * 3, 0.9);
        ctx.globalAlpha = opacity;
        ctx.shadowColor = 'rgba(100, 200, 255, 0.8)';
        ctx.shadowBlur = 15 * lightIntensity;

        ctx.filter = 'invert(1) brightness(2)';
        ctx.drawImage(this.img, -this.size / 2, -this.size / 2, this.size, this.size);
        ctx.filter = 'none';

        ctx.restore();
    }

    getLightIntensity(lightSource: LightSource): number {
        return lightSource.getIntensityAt(this.x, this.y);
    }
}

function init() {
    resize();

    for (let i = 0; i < 50; i++) {
        bubbles.push(new Bubble());
    }

    lightSource = new LightSource();

    for (let i = 0; i < 5; i++) {
        sharks.push(new Shark());
    }
}

let lastScrollY = 0;
window.addEventListener('scroll', () => {
    scrollY = window.scrollY;
});

function animate() {
    const time = Date.now();
    const scrollDelta = (scrollY - lastScrollY) * 0.1;
    lastScrollY = scrollY;

    ctx.fillStyle = 'rgba(0, 26, 51, 0.3)';
    ctx.fillRect(0, 0, width, height);

    lightSource.update(time);
    lightSource.draw();

    for (let shark of sharks) {
        shark.update();
        const lightIntensity = shark.getLightIntensity(lightSource);
        shark.draw(lightIntensity);
    }

    for (let bubble of bubbles) {
        bubble.update(scrollDelta);
        bubble.draw();
    }

    requestAnimationFrame(animate);
}

window.addEventListener('resize', resize);
init();
animate();
