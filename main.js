// main.js — для Mini Apps ВК (гарантированная инициализация)

console.log('🔥 main.js: старт');

// Попробуем инициализировать сразу — даже до DOM
if (typeof window.vkBridge !== 'undefined') {
  console.log('✅ VkBridge доступен — инициализируем');
  try {
    window.vkBridge.send('VKWebAppInit');
  } catch (e) {
    console.error('🔴 Ошибка VKWebAppInit:', e);
  }
} else {
  console.log('⏳ VkBridge ещё не доступен — ждём...');
}

// После загрузки DOM — снова проверим
document.addEventListener('DOMContentLoaded', () => {
  const app = document.getElementById('app');

  if (typeof window.vkBridge === 'undefined') {
    console.error('🔴 VkBridge не доступен даже после загрузки');
    app.innerHTML = '<h1>🔴 VkBridge не найден</h1>';
    return;
  }

  console.log('✅ VkBridge найден в DOM');

  // Повторная инициализация (на всякий случай)
  window.vkBridge.send('VKWebAppInit')
    .then(() => {
      console.log('✅ VKWebAppInit отправлен');
      return window.vkBridge.send('VKWebAppGetUserInfo');
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
      app.innerHTML = '<h1>Ошибка получения данных</h1>';
    });
});