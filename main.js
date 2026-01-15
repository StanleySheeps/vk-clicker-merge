// main.js — простой, надёжный, рабочий

document.addEventListener('DOMContentLoaded', () => {
  const app = document.getElementById('app');
  console.log('🔥 main.js: старт');

  // Проверяем VKBridge
  if (!window.VKBridge) {
    console.error('🔴 VKBridge не доступен');
    app.innerHTML = '<h1>🔴 VKBridge не загрузился</h1>';
    return;
  }

  console.log('✅ VKBridge найден');

  try {
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
  } catch (e) {
    console.error('🔴 Ошибка в try/catch:', e);
    app.innerHTML = '<h1>Критическая ошибка</h1>';
  }
});