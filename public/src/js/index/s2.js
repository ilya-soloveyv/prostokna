if (document.querySelector('.layout-index')) {
    if (clientWidth() > 910) {
        const s2Cards = document.querySelectorAll('.s2-main-list > li');
        const s2CloseCardBtns = document.querySelectorAll('.s2-front-card .card-close');
        const s2BackCardBtns = document.querySelectorAll('.s2-front-card .card-back');
        const s2CardLinks = document.querySelectorAll('.s2-back-card .more');

        s2Cards.forEach((card, index) => {
            card.addEventListener('click', event => {
                let frontCardTarget = event.currentTarget
                let backCardTarget = document.querySelectorAll('.s2-back-card-wrap')[index]

                if (frontCardTarget.classList.contains('active')) return;

                s2Cards.forEach(el => {
                    el.classList.add('inactive');
                    el.classList.remove('active');
                });

                frontCardTarget.classList.remove('inactive');
                frontCardTarget.classList.add('active');
                
                hiddenCards();

                backCardTarget.classList.add('isActive');

                if (backCardTarget.offsetHeight < backCardTarget.querySelector('.s2-back-card').scrollHeight) {
                    backCardTarget.classList.add('isScroll')
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
    } else {
        const s2Cards = document.querySelectorAll('.s2-main-list > li')
        const s2CardLinks = document.querySelectorAll('.s2-back-card .more')
        const closeBtn = document.querySelector('.s2-close')
        const secondaryList = document.querySelector('.s2-secondary-list')
        const backBtn = document.querySelector('.s2-back')
        
        $('.s2-secondary-list').slick()

        s2Cards.forEach((card, index) => {
            card.addEventListener('click', event => {
                secondaryList.classList.add('isActive')
                closeBtn.classList.add('isActive')

                $('.s2-secondary-list').slick('slickGoTo', index)
            })
        });

        closeBtn.addEventListener('click', () => {
            secondaryList.classList.remove('isActive')
            closeBtn.classList.remove('isActive')
        })

        s2CardLinks.forEach(link => {
            link.addEventListener('click', event => {
                let target = event.target;

                showLowerLevelsLists(true);

                target.nextElementSibling.classList.add('isShown');

                event.preventDefault();
                event.stopPropagation();
            })
        })

        backBtn.addEventListener('click', event => {
            let shownList = document.querySelectorAll('.isShown');

            if (!shownList.length) return;

            shownList[shownList.length - 1].classList.remove('isShown');

            if (shownList.length === 1) showLowerLevelsLists(false);
        })
    }
}

function showLowerLevelsLists(bool) {
    let backBtn = document.querySelector('.s2-card.active .card-back') || document.querySelector('.s2-back');
    let activeBackCard = document.querySelector('.s2-back-card-wrap.isActive') || document.querySelector('.s2-back-card-wrap.slick-current');
    let firstList = activeBackCard.querySelector('.s2-back-card > ol');

    if (bool === true) {
        firstList.classList.add('isActive')
        backBtn.classList.add('show')
    } else {
        firstList.classList.remove('isActive')
        backBtn.classList.remove('show')
    }
}

function hiddenCards() {
    let shownCards = document.querySelectorAll('.s2 .isShown');
    let scrollCards = document.querySelectorAll('.s2 .isScroll');
    let activeCards = document.querySelectorAll('.s2 .isActive');

    shownCards.forEach(el => el.classList.remove('isShown'));
    scrollCards.forEach(el => el.classList.remove('isScroll'));
    activeCards.forEach(el => el.classList.remove('isActive'));
}