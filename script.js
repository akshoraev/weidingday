// Функция для анимации конверта
function initEnvelope() {
    const envelope = document.querySelector('.envelope');
    const envelopeContainer = document.querySelector('.envelope-container');
    const mainContent = document.querySelector('.main-content');
    
    if (envelope) {
        envelope.addEventListener('click', () => {
            envelope.classList.add('opened');
            
            // После открытия конверта показываем основной контент
            setTimeout(() => {
                envelopeContainer.classList.add('hidden');
                mainContent.style.display = 'block';
                
                // Запускаем анимацию для основного контента
                const header = document.querySelector('header');
                if (header) {
                    header.classList.add('visible');

                    // Добавляем класс 'visible' декоративным элементам
                    const topElement = header.querySelector('.decorative-element-top');
                    const bottomElement = header.querySelector('.decorative-element-bottom');
                    if (topElement) {
                        topElement.classList.add('visible');
                    }
                    if (bottomElement) {
                        bottomElement.classList.add('visible');
                    }
                }
                
                // Запускаем таймер и анимации скролла
                updateCountdown();
                setInterval(updateCountdown, 1000);
                window.addEventListener('scroll', handleScrollAnimation);
                handleScrollAnimation();
            }, 1500);
        });
    }
}

// Функция для анимации появления элементов при скролле
function handleScrollAnimation() {
    const elements = document.querySelectorAll('section, .invitation p, .countdown, .details, .dresscode, .rsvp, .map-button');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('visible');
        }
    });
}

// Функция для таймера обратного отсчета
function updateCountdown() {
    const weddingDate = new Date('2025-07-26T18:00:00');
    const now = new Date();
    const difference = weddingDate - now;

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    const timer = document.getElementById('timer');
    if (!timer.children.length) {
        timer.innerHTML = `
            <div class="countdown-item">
                <span class="countdown-number">${days}</span>
                <span class="countdown-label">дней</span>
            </div>
            <div class="countdown-item">
                <span class="countdown-number">${hours}</span>
                <span class="countdown-label">часов</span>
            </div>
            <div class="countdown-item">
                <span class="countdown-number">${minutes}</span>
                <span class="countdown-label">минут</span>
            </div>
            <div class="countdown-item">
                <span class="countdown-number">${seconds}</span>
                <span class="countdown-label">секунд</span>
            </div>
        `;
    } else {
        const numbers = timer.querySelectorAll('.countdown-number');
        numbers[0].textContent = days;
        numbers[1].textContent = hours;
        numbers[2].textContent = minutes;
        numbers[3].textContent = seconds;
    }
}

// Функция для обработки ответов на приглашение
function respond(isComing) {
    const name = document.getElementById('guestName').value;
    const botToken = '7102104604:AAG_iNKoOTqbXFN5PGS0aWcf2jM6hXIQWc8'; // Ваш токен бота
    const chatId = '664244150'; // Ваш Chat ID

    if (!name) {
        alert('Пожалуйста, введите ваше имя');
        return;
    }

    const status = isComing ? 'Придет' : 'Не придет';
    const messageText = `Новый ответ на приглашение:\nИмя: ${name}\nСтатус: ${status}`;

    const apiUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;

    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            chat_id: chatId,
            text: messageText
        })
    })
    .then(response => {
        if (!response.ok) {
            // Можно добавить более детальную обработку ошибок
            console.error('Ошибка при отправке сообщения в Telegram:', response.statusText);
            alert('Произошла ошибка при отправке вашего ответа.');
        } else {
            // Успешная отправка
            const thankYouMessage = isComing
                ? `Спасибо, ${name}! Мы будем рады видеть вас на нашей свадьбе!`
                : `Спасибо за ответ, ${name}. Жаль, что вы не сможете присутствовать.`;
            alert(thankYouMessage); // Можно заменить на более элегантное уведомление
            // Очистить поле ввода после успешной отправки
            document.getElementById('guestName').value = '';
        }
    })
    .catch(error => {
        console.error('Ошибка сети или другая ошибка:', error);
        alert('Произошла ошибка при отправке вашего ответа.');
    });
}

// Инициализация
document.addEventListener('DOMContentLoaded', () => {
    initEnvelope();
}); 