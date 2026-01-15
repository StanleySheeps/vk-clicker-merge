// main.js — с проверкой и ожиданием VKBridge

document.addEventListener('DOMContentLoaded', () => {
  const app = document.getElementById('app');
  console.log('🔥 main.js: старт');

  // Функция-ожидание VKBridge
  function waitForVKBridge(retries = 50) {
    if (window.VKBridge) {
      console.log('✅ VKBridge найден');
      initApp();
      return;
    }

    if (retries <= 0) {
      console.error('🔴 VKBridge не загрузился за отведённое время');
      app.innerHTML = '<h1>🔴 VKBridge не загрузился</h1>';
      return;
    }

    console.log('⏳ Ожидаем VKBridge...');
    setTimeout(() => waitForVKBridge(retries - 1), 100); // ждём 100мс
  }

  function initApp() {
    // Инициализация
    VKBridge.send('VKWebAppInit')
      .then(() => {
        console.log('✅ VKWebAppInit отправлен');
        return VKBridge.send('VKWebAppGetUserInfo');
      })
      .then(user => {
        console.log('👤 Пользователь:', user);
        app.innerHTML = `
          <div class="card">
            <img src="${user.photo_200}" alt="Аватар" class="avatar" />
            <h1>Привет, ${user.first_name}!</h1>
          </div>
        `;
      })
      .catch(err => {
        console.error('❌ Ошибка VK:', err);
        app.innerHTML = `<h1>Ошибка: ${err.error_data?.error_msg || 'Неизвестная ошибка'}</h1>`;
      });
  }

  waitForVKBridge();
});