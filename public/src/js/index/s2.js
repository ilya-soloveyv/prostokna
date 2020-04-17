if (document.querySelector('.layout-index')) {
    if (clientWidth() > 910) {
        const s2Cards = document.querySelectorAll('.s2-main-list > li');
        const s2CloseCardBtns = document.querySelectorAll('.s2-front-card .card-close');
        const s2BackCardBtns = document.querySelectorAll('.s2-front-card .card-back');
        const s2CardLinks = document.querySelectorAll('.s2-back-card .more');

        s2Cards.forEach(card => {
            card.addEventListener('click', event => {
                let target = event.target.closest('.s2-card');

                if (target.classList.contains('active')) return;

                s2Cards.forEach(el => {
                    el.classList.add('inactive');
                    el.classList.remove('active');
                });

                target.classList.remove('inactive');
                target.classList.add('active');
                
                hiddenCards();

                if (target.querySelector('.s2-back-card').offsetHeight != target.querySelector('.s2-back-card').scrollHeight) {
                    target.classList.add('isScroll')
                }
            })
        });

        s2CloseCardBtns.forEach(btn => {
            btn.addEventListener('click', event => {
                s2Cards.forEach(el => {
                    el.classList.remove('active');
                    el.classList.remove('inactive');
                });

                hiddenCards();

                event.stopPropagation();
            })
        });

        s2CardLinks.forEach(link => {
            link.addEventListener('click', event => {
                let target = event.target;

                showLowerLevelsLists(true);

                target.nextElementSibling.classList.add('isShown');

                event.preventDefault();
                event.stopPropagation();
            })
        })

        s2BackCardBtns.forEach(btn => {
            btn.addEventListener('click', event => {
                let shownList = document.querySelectorAll('.isShown');

                if (!shownList.length) return;

                shownList[shownList.length - 1].classList.remove('isShown');

                if (shownList.length === 1) showLowerLevelsLists(false);
            })
        });
    } else if (clientWidth() < 910 && clientWidth() > 600) {
        const s2cards = document.querySelectorAll('.s2-cards .s2-front-card');
        const s2CloseBtn = document.querySelector('.s2-close');
        const s2CardLinks = document.querySelectorAll('.s2-first-level .more');

        s2cards.forEach((card, index) => {
            card.addEventListener('click', event => {
                let target = event.target.closest('.s2');
                target.classList.add('isActive');
                
                fullpage_api.moveTo('s2', index);
            })
        })

        s2CardLinks.forEach(link => {
            link.addEventListener('click', event => {
                let target = event.target;

                target.closest('.s2-first-level').classList.add('isActive');

                target.nextElementSibling.classList.add('isShown');

                event.preventDefault();
                event.stopPropagation();
            })
        })

        s2CloseBtn.addEventListener('click', () => {
            hiddenCards();

            document.querySelector('.s2').classList.remove('isActive');
        });
    } else {
        $('.s2 .slick-slider').slick({
            prevArrow: '.s2 .slick-prev',
            nextArrow: '.s2 .slick-next',
        })

        const s2cards = document.querySelectorAll('.s2-cards .s2-front-card');
        const s2CloseBtn = document.querySelector('.s2-close');
        const s2CardLinks = document.querySelectorAll('.s2-first-level .more');

        s2cards.forEach((card, index) => {
            card.addEventListener('click', event => {
                let target = event.target.closest('.s2');
                target.classList.add('isActive');
                
                fullpage_api.moveTo('s2', index);
            })
        })

        s2CardLinks.forEach(link => {
            link.addEventListener('click', event => {
                let target = event.target;

                target.closest('.s2-first-level').classList.add('isActive');

                target.nextElementSibling.classList.add('isShown');

                event.preventDefault();
                event.stopPropagation();
            })
        })

        s2CloseBtn.addEventListener('click', () => {
            hiddenCards();

            document.querySelector('.s2').classList.remove('isActive');
        });
    }
}

function showLowerLevelsLists(bool) {
    let activeCard = document.querySelector('.s2-card.active');
    let firstList = activeCard.querySelector('.s2-back-card > ol');
    let backBtn = activeCard.querySelector('.card-back');

    if (bool === true) {
        firstList.classList.add('isActive');
        backBtn.classList.add('show');
    } else {
        firstList.classList.remove('isActive');
        backBtn.classList.remove('show');
    }
}

function hiddenCards() {
    let shownCards = document.querySelectorAll('.s2 .isShown');
    let scrollCards = document.querySelectorAll('.s2 .isScroll');

    shownCards.forEach(el => el.classList.remove('isShown'));
    scrollCards.forEach(el => el.classList.remove('isScroll'));
}