import stickySlimeMixUrl from '../assets/sticky_slime_mix.webp';
import howToMakeStickySlime1Url from '../assets/how_to_make_sticky_slime_1.webp';
import howToMakeStickySlime2Url from '../assets/how_to_make_sticky_slime_2.webp';
import howToMakeStickySlime3Url from '../assets/how_to_make_sticky_slime_3.webp';
import howToMakeStickySlime4Url from '../assets/how_to_make_sticky_slime_4.webp';

const stickySlimeMixImages = document.querySelectorAll<HTMLImageElement>('.sticky-slime-mix');
stickySlimeMixImages.forEach(image => {
  image.src = stickySlimeMixUrl;
});

const howToMakeStickySlime1Image = document.getElementById('how-to-make-sticky-slime-1') as HTMLImageElement;
if (howToMakeStickySlime1Image !== null) {
  howToMakeStickySlime1Image.src = howToMakeStickySlime1Url;
}


const howToMakeStickySlime2Image = document.getElementById('how-to-make-sticky-slime-2') as HTMLImageElement;
if (howToMakeStickySlime2Image !== null) {
  howToMakeStickySlime2Image.src = howToMakeStickySlime2Url;
}

const howToMakeStickySlime3Image = document.getElementById('how-to-make-sticky-slime-3') as HTMLImageElement;
if (howToMakeStickySlime3Image !== null) {
  howToMakeStickySlime3Image.src = howToMakeStickySlime3Url;
}

const howToMakeStickySlime4Image = document.getElementById('how-to-make-sticky-slime-4') as HTMLImageElement;
if (howToMakeStickySlime4Image !== null) {
  howToMakeStickySlime4Image.src = howToMakeStickySlime4Url;
}
