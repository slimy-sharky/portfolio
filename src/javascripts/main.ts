import stickySlimeMix5lUrl from '../assets/sticky_slime_mix_5l.webp';
import stickySlimeMix25lUrl from '../assets/sticky_slime_mix_25l.webp';
import bucketUrl from '../assets/bucket.webp';
import bottleUrl from '../assets/bottle.webp';
import bakingSodaUrl from '../assets/baking_soda.webp';

const stickySlimeMix5lImages = document.getElementById('sticky-slime-mix-5l') as HTMLImageElement;
if (stickySlimeMix5lImages !== null) {
  stickySlimeMix5lImages.src = stickySlimeMix5lUrl;
}

const stickySlimeMix25lImages = document.getElementById('sticky-slime-mix-25l') as HTMLImageElement;
if (stickySlimeMix25lImages !== null) {
  stickySlimeMix25lImages.src = stickySlimeMix25lUrl;
}

const bucketImage = document.getElementById('bucket') as HTMLImageElement;
if (bucketImage !== null) {
  bucketImage.src = bucketUrl;
}

const bottleImage = document.getElementById('bottle') as HTMLImageElement;
if (bottleImage !== null) {
  bottleImage.src = bottleUrl;
}

const bakingSodaImage = document.getElementById('baking-soda') as HTMLImageElement;
if (bakingSodaImage !== null) {
  bakingSodaImage.src = bakingSodaUrl;
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
