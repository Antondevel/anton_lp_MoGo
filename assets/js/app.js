
// JQuery


// $(function() {

//     var header = $("#header"),
//         introH = $("#intro").innerHeight(),
//         scrollOffset = $(window).scrollTop();


//     /* Fixed Header */
//     checkScroll(scrollOffset);

//     $(window).on("scroll", function() {
//         scrollOffset = $(this).scrollTop();

//         checkScroll(scrollOffset);
//     });

//     function checkScroll(scrollOffset) {
//         if( scrollOffset >= introH ) {
//             header.addClass("fixed");
//         } else {
//             header.removeClass("fixed");
//         }
//     }



//     /* Smooth scroll */
//     $("[data-scroll]").on("click", function(event) {
//         event.preventDefault();

//         var $this = $(this),
//             blockId = $this.data('scroll'),
//             blockOffset = $(blockId).offset().top;

//         $("#nav a").removeClass("active");
//         $this.addClass("active");

//         $("html, body").animate({
//             scrollTop:  blockOffset
//         }, 500);
//     });



//     /* Menu nav toggle */
//     $("#nav_toggle").on("click", function(event) {
//         event.preventDefault();

//         $(this).toggleClass("active");
//         $("#nav").toggleClass("active");
//     });



//     /* Collapse */
//     $("[data-collapse]").on("click", function(event) {
//         event.preventDefault();

//         var $this = $(this),
//             blockId = $this.data('collapse');

//         $this.toggleClass("active");
//     });


//     /* Slider */
//     $("[data-slider]").slick({
//         infinite: true,
//         fade: false,
//         slidesToShow: 1,
//         slidesToScroll: 1
//     });

// });

// шапка 

document.addEventListener('DOMContentLoaded', function () {
    const nav = document.getElementById('nav');
    const navToggle = document.getElementById('nav_toggle');

    // Обработчик для открытия/закрытия бургер-меню
    navToggle.addEventListener('click', function () {
        this.classList.toggle('active');
        nav.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    });

    // Обработчик для плавного скролла по клику на ссылки меню
    document.querySelectorAll('.nav__link').forEach(link => {
        link.addEventListener('click', function (event) {
            event.preventDefault(); // Отменяет стандартное поведение ссылки
            const targetId = this.getAttribute('data-scroll'); // Получение значения атрибута data-scroll
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop, // Прокрутка до нужного элемента
                    behavior: 'smooth' // Плавная прокрутка
                });

                // Закрытие меню после клика на ссылку
                nav.classList.remove('active');
                navToggle.classList.remove('active');
                document.body.classList.remove('no-scroll');
            }
        });
    });
});



// Аккордеон


const accordionHeaders = document.querySelectorAll('.accordion__header');

accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
        const item = header.closest('.accordion__item');
        const content = item.querySelector('.accordion__content');
        const isActive = content.classList.contains('active');

        // Закрываем все открытые секции
        document.querySelectorAll('.accordion__content.active').forEach(openContent => {
            openContent.style.maxHeight = openContent.scrollHeight + 'px'; // Сначала задаем текущую высоту
            requestAnimationFrame(() => {
                openContent.style.maxHeight = null;
                openContent.classList.remove('active');
                openContent.closest('.accordion__item').classList.remove('active');
            });
        });

        // Открываем текущую секцию, если она была закрыта
        if (!isActive) {
            content.classList.add('active');
            item.classList.add('active');
            content.style.maxHeight = content.scrollHeight + 'px';

            // Используем setTimeout для установки max-height на auto после завершения анимации
            setTimeout(() => {
                content.style.maxHeight = 'auto';
            }, 500); // Время должно совпадать с transition в CSS
        }
    });
});



// Слайдер 
document.addEventListener('DOMContentLoaded', () => {
    const sliders = document.querySelectorAll('.reviews'); // Находим все слайдеры на странице

    sliders.forEach(slider => {
        const track = slider.querySelector('.reviews__track');
        const slides = Array.from(track.children);
        const prevButton = slider.querySelector('.reviews__btn--prev');
        const nextButton = slider.querySelector('.reviews__btn--next');
        let currentIndex = 0;

        const moveToSlide = (index) => {
            track.style.transform = `translateX(-${index * 100}%)`;
            currentIndex = index;
        };

        prevButton.addEventListener('click', (e) => {
            e.preventDefault();
            if (currentIndex === 0) {
                moveToSlide(slides.length - 1);
            } else {
                moveToSlide(currentIndex - 1);
            }
        });

        nextButton.addEventListener('click', (e) => {
            e.preventDefault();
            if (currentIndex === slides.length - 1) {
                moveToSlide(0);
            } else {
                moveToSlide(currentIndex + 1);
            }
        });
    });
});



