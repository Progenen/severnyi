class CookieBanner {
  constructor(selector, storageKey = 'cookies-accepted') {
    this.banner = document.querySelector(selector);
    this.storageKey = storageKey;
    
    if (!this.banner) return;
    
    this.init();
  }
  
  init() {
    // Проверяем localStorage
    if (this.isAccepted()) return;
    
    // Показываем баннер
    this.show();
    
    // Вешаем обработчики
    this.banner.querySelectorAll('[data-accept-cookies]').forEach(btn => {
    console.log('btn');
      btn.addEventListener('click', () => this.accept());
    });
    
    this.banner.querySelectorAll('[data-decline-cookies]')?.forEach(btn => {
      btn.addEventListener('click', () => this.decline());
    });
  }
  
  show() {
    setTimeout(() => {
      this.banner.classList.add('show');
    }, 1000);
  }
  
  hide() {
    this.banner.classList.remove('show');
  }
  
  accept() {
    console.log("click");
    localStorage.setItem(this.storageKey, 'true');
    this.hide();
  }
  
  decline() {
    localStorage.setItem(this.storageKey, 'false');
    this.hide();
  }
  
  isAccepted() {
    return localStorage.getItem(this.storageKey) !== null;
  }
  
  reset() {
    localStorage.removeItem(this.storageKey);
    this.show();
  }
}

// Использование
document.addEventListener('DOMContentLoaded', () => {
  const cookieBanner = new CookieBanner('.cookies-banner');

  console.log(cookieBanner);
  
  document.querySelector('[data-reset-cookies]')?.addEventListener('click', () => {
    cookieBanner.reset();
  });

});