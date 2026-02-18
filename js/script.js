document.addEventListener('DOMContentLoaded', () => {
    
    // --- Мобильное меню ---
    const burger = document.querySelector('.burger-menu');
    const nav = document.querySelector('.nav');

    if(burger && nav) {
        burger.addEventListener('click', () => {
            nav.classList.toggle('active');
            burger.classList.toggle('toggle');
        });
    }

    // --- Табы (для страницы расписания) ---
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    if(tabBtns.length > 0) {
        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Убираем активный класс у всех кнопок и контента
                tabBtns.forEach(b => b.classList.remove('active'));
                tabContents.forEach(c => c.classList.remove('active'));

                // Добавляем активный класс текущей кнопке
                btn.classList.add('active');

                // Показываем соответствующий контент
                const tabId = btn.getAttribute('data-tab');
                const content = document.getElementById(tabId);
                if(content) {
                    content.classList.add('active');
                }
            });
        });
    }

    // --- Плавная прокрутка ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#' || targetId.length < 2) return;
            
            // Если ссылка ведет на ID на текущей странице
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });
});
