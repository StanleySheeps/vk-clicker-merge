// main.js — гарантированная инициализация с vkBridge (регистр: vkBridge)

console.log('🔥 main.js: старт');

/**
 * Ожидание vkBridge и отправка VKWebAppInit
 * @returns {Promise<Object>} — возвращает vkBridge при успехе
 */
function waitForVkBridgeInit(maxAttempts = 300, interval = 100) {
  return new Promise((resolve, reject) => {
    let attempts = 0;

    const tryInit = () => {
      attempts++;

      // Проверяем наличие vkBridge и метода send
      if (typeof window.vkBridge !== 'undefined' && typeof window.vkBridge.send === 'function') {
        console.log(`✅ vkBridge найден на попытке ${attempts}`);

        // Пытаемся инициализировать
        try {
          window.vkBridge.send('VKWebAppInit')
            .then(() => {
              console.log('✅ VKWebAppInit успешно отправлен');
              resolve(window.vkBridge);
            })
            .catch(err => {
              console.error('❌ Ошибка VKWebAppInit:', err);
              if (attempts >= maxAttempts) {
                reject(new Error('Не удалось отправить VKWebAppInit'));
              } else {
                setTimeout(tryInit, interval);
              }
            });
        } catch (e) {
          console.error('🔴 Исключение при вызове send:', e);
          if (attempts >= maxAttempts) {
            reject(new Error('Исключение при вызове vkBridge.send'));
          } else {
            setTimeout(tryInit, interval);
          }
        }
      } else {
        console.log(`⏳ vkBridge ещё не доступен, попытка ${attempts}`);
        if (attempts >= maxAttempts) {
          reject(new Error('Превышено время ожидания: vkBridge не появился'));
          return;
        }
        setTimeout(tryInit, interval);
      }
    };

    // Начинаем попытки
    tryInit();
  });
}

// Основной поток приложения
document.addEventListener('DOMContentLoaded', () => {
  const app = document.getElementById('app');
  app.innerHTML = '<div class="card"><h1>Загрузка</h1><p>Ожидание vkBridge...</p></div>';

  waitForVkBridgeInit()
    .then(vkBridge => {
      console.log('✅ Приложение инициализировано. Получаем данные пользователя...');
      app.innerHTML = '<div class="card"><h1>Подготовка</h1><p>Загружаем профиль...</p></div>';

      return vkBridge.send('VKWebAppGetUserInfo')
        .then(user => {
          console.log('👤 Пользователь:', user);
          app.innerHTML = `
            <div class="card">
              <img src="${user.photo_200 || 'https://vk.com/images/camera_100.png'}" alt="Аватар" class="avatar" />
              <h1>Привет, ${user.first_name || 'Пользователь'}!</h1>
            </div>
          `;
        });
    })
    .catch(err => {
      console.error('🔴 Фатальная ошибка:', err);
      app.innerHTML = `
        <div class="card">
          <h1>❌ Ошибка</h1>
          <p>Не удалось запустить приложение</p>
          <p style="font-size:12px; color:#888;">${err.message}</p>
        </div>
      `;
    });
});