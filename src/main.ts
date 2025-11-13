import './style.css';

const PASSWORD = import.meta.env.VITE_PRODUCT_PASSWORD;

function checkPassword(event: Event, productUrl: string): void {
  event.preventDefault();

  const password = prompt('パスワードを入力してください:');

  if (password === PASSWORD) {
    window.open(productUrl, '_blank')
  } else if (password !== null) {
    alert('パスワードが正しくありません');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const productLinks = document.querySelectorAll<HTMLAnchorElement>('a[data-protected="true"]');

  productLinks.forEach(link => {
    link.addEventListener('click', (event) => {
      const url = link.getAttribute('href');
      if (url) {
        checkPassword(event, url);
      }
    });
  });
});
