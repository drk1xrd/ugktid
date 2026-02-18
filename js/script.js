document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Мобильное Меню ---
    const burger = document.querySelector('.burger-menu');
    const nav = document.querySelector('.nav');
    const body = document.body;

    if(burger && nav) {
        burger.addEventListener('click', () => {
            nav.classList.toggle('active');
            burger.classList.toggle('toggle');
            // Блокируем скролл страницы при открытом меню
            if(nav.classList.contains('active')) {
                body.style.overflow = 'hidden';
            } else {
                body.style.overflow = '';
            }
        });

        // Закрываем меню при клике на ссылку
        document.querySelectorAll('.nav-list a').forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('active');
                burger.classList.remove('toggle');
                body.style.overflow = '';
            });
        });
    }

    // --- 2. Табы (Расписание) ---
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    if(tabBtns.length > 0) {
        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                tabBtns.forEach(b => b.classList.remove('active'));
                tabContents.forEach(c => c.classList.remove('active'));

                btn.classList.add('active');
                const tabId = btn.getAttribute('data-tab');
                const content = document.getElementById(tabId);
                if(content) {
                    content.classList.add('active');
                }
            });
        });
    }

    // --- 3. Фильтрация новостей ---
    const filters = document.querySelectorAll('.filter-btn');
    const cards = document.querySelectorAll('.news-card');

    if(filters.length > 0) {
        filters.forEach(btn => {
            btn.addEventListener('click', () => {
                filters.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const category = btn.getAttribute('data-filter');

                cards.forEach(card => {
                    // Анимация исчезновения
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.95)';
                    
                    setTimeout(() => {
                        if (category === 'all' || card.getAttribute('data-category') === category) {
                            card.style.display = 'flex';
                            // Анимация появления
                            setTimeout(() => {
                                card.style.opacity = '1';
                                card.style.transform = 'scale(1)';
                            }, 50);
                        } else {
                            card.style.display = 'none';
                        }
                    }, 300); // Ждем пока исчезнет
                });
            });
        });
    }

    // --- 4. Анимация при скролле (Scroll Reveal) ---
    // Выбираем элементы, которые хотим анимировать
    const animatedElements = document.querySelectorAll(
        '.feature-card, .news-card, .spec-card, .step-card, .about-text, .about-image, h2, .schedule-table, .file-link'
    );
    
    // Добавляем им начальный класс (скрываем)
    animatedElements.forEach(el => el.classList.add('scroll-reveal'));

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                // Если элемент появился на экране, добавляем класс видимости
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Больше не следим (анимация один раз)
            }
        });
    }, {
        threshold: 0.1, // Срабатывает, когда видно 10% элемента
        rootMargin: "0px 0px -50px 0px" // Небольшой отступ снизу
    });

    animatedElements.forEach(el => observer.observe(el));
});