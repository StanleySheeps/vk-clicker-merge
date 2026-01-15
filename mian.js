// main.js — работает везде

document.addEventListener('DOMContentLoaded', () => {
  const app = document.getElementById('app');

  // Проверяем, загрузился ли VK Bridge
  if (!window.VKBridge) {
    app.innerHTML = '<h1>🔴 VKBridge не загрузился</h1>';
    return;
  }

  console.log('✅ VKBridge найден');

  // Инициализируем приложение
  VKBridge.send('VKWebAppInit', {})
    .then(() => {
      console.log('✅ VKWebAppInit отправлен');

      // Получаем данные пользователя
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
      console.error('❌ Ошибка:', err);
      app.innerHTML = '<h1>Ошибка загрузки</h1>';
    });
});