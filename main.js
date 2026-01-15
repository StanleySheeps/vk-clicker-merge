// main.js — для ВК Mini Apps (работает на телефоне)

document.addEventListener('DOMContentLoaded', () => {
  const app = document.getElementById('app');
  console.log('🔥 main.js: старт');

  // VKBridge доступен как VkBridge (с большой B!) в Mini Apps
  if (typeof window.VkBridge === 'undefined') {
    console.error('🔴 VkBridge не доступен');
    app.innerHTML = '<h1>🔴 VkBridge не найден</h1>';
    return;
  }

  console.log('✅ VkBridge найден');

  try {
    // Инициализация приложения
    window.VkBridge.send('VKWebAppInit');

    // Получаем информацию о пользователе
    window.VkBridge.send('VKWebAppGetUserInfo')
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
        console.error('❌ Ошибка:', err);
        app.innerHTML = '<h1>Ошибка получения данных</h1>';
      });
  } catch (e) {
    console.error('🔴 Ошибка инициализации:', e);
    app.innerHTML = '<h1>Критическая ошибка</h1>';
  }
});