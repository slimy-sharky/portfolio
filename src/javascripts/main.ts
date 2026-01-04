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

// Windowインターフェースを拡張して、copyLinkを登録できるようにする
declare global {
  interface Window {
    copyLink: (id: string, btn: HTMLButtonElement) => void;
  }
}

/**
 * 指定したIDのアンカーリンクをクリップボードにコピーする
 * @param id 要素のID
 * @param btn クリックされたボタン要素
 */
const copyLink = (id: string, btn: HTMLButtonElement): void => {
  // 現在のURL（オリジン + パス）に #ID を付加
  const url: string = `${window.location.origin}${window.location.pathname}#${id}`;
  const originalHTML: string = btn.innerHTML;

  navigator.clipboard.writeText(url)
    .then(() => {
      // 成功時：チェックマークSVGに差し替え
      btn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-lg" viewBox="0 0 16 16">
          <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425z"/>
        </svg>
      `;

      // フィードバック用に一時的に色と背景のクラスを追加
      const feedbackClasses: string[] = ['text-green-400', 'bg-green-500/20'];
      btn.classList.add(...feedbackClasses);

      // 2秒後に元に戻す
      setTimeout(() => {
        btn.innerHTML = originalHTML;
        btn.classList.remove(...feedbackClasses);
      }, 2000);
    })
    .catch((err: Error) => {
      console.error('リンクのコピーに失敗しました:', err);
    });
};

// HTMLのonclick属性から呼べるようにグローバルスコープに公開
window.copyLink = copyLink;
