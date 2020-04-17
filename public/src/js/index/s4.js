if (document.querySelector('.layout-index')) {
    upload()
    
    if (clientWidth() < 900) {
        let items = document.querySelectorAll('.s4-list li')

        items[0].classList.add('isActive')

        items.forEach(item => {
            item.addEventListener('click', event => {
                items.forEach(el => el.classList.remove('isActive'))

                event.currentTarget.classList.add('isActive')
            })
        })
    }
}