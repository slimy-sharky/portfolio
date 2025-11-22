import stickySlimeMixUrl from './assets/sticky_slime_mix.webp';
import howToMakeStickySlime1Url from './assets/how_to_make_sticky_slime_1.webp';
import howToMakeStickySlime2Url from './assets/how_to_make_sticky_slime_2.webp';
import howToMakeStickySlime3Url from './assets/how_to_make_sticky_slime_3.webp';
import howToMakeStickySlime4Url from './assets/how_to_make_sticky_slime_4.webp';
import type { SurveyFormData, SurveyResponse } from './types/survey';

const stickySlimeMixImages = document.querySelectorAll<HTMLImageElement>('.sticky-slime-mix');
stickySlimeMixImages.forEach(image  => {
  image.src = stickySlimeMixUrl;
})

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

const form = document.getElementById('surveyForm') as HTMLFormElement;
const result = document.getElementById('result') as HTMLDivElement;

form.addEventListener('submit', async (e: Event) => {
  e.preventDefault();

  const submitButton = form.querySelector('button[type="submit"]') as HTMLButtonElement;
  submitButton.disabled = true;
  submitButton.textContent = '送信中...';

  const formData: SurveyFormData = {
    name: (document.getElementById('name') as HTMLInputElement).value,
    email: (document.getElementById('email') as HTMLInputElement).value,
    product: (document.getElementById('product') as HTMLSelectElement).value,
    rating: (document.querySelector('input[name="rating"]:checked') as HTMLInputElement)?.value || '',
    message: (document.getElementById('message') as HTMLTextAreaElement).value,
  };

  try {
    const response = await fetch('/api/survey', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    const data: SurveyResponse = await response.json();

    result.classList.remove('hidden');

    if (response.ok && data.success) {
      result.innerHTML = `
        <div class="bg-green-50 border-2 border-green-400 rounded-lg p-6">
          <p class="text-green-800 font-bold text-lg text-center">✓ アンケートのご協力ありがとうございました！</p>
          <p class="text-green-700 text-center mt-2">お客様のご意見を今後の商品開発に活かしてまいります。</p>
        </div>
      `;
      form.reset();
    } else {
      result.innerHTML = `
        <div class="bg-red-50 border-2 border-red-400 rounded-lg p-6">
          <p class="text-red-800 font-bold text-center">送信に失敗しました。もう一度お試しください。</p>
        </div>
      `;
    }
  } catch (error) {
    console.error('Error:', error);
    result.classList.remove('hidden');
    result.innerHTML = `
      <div class="bg-red-50 border-2 border-red-400 rounded-lg p-6">
        <p class="text-red-800 font-bold text-center">エラーが発生しました。しばらく時間をおいて再度お試しください。</p>
      </div>
    `;
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = '送信する';
  }
});
