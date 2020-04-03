if ($("#intuitive").length) {

    function positionButtons () {
        var buttons_width = $('#intuitive .intuitive-wrap .buttons').width()
        if (buttons_width == undefined) return false
        console.log(buttons_width)
        $('#intuitive .intuitive-wrap .buttons').height(buttons_width).css({'margin-top':-(buttons_width/2)+"px"})
        var num = 10;
        var wrap = buttons_width/2;
        var item_w = $('#intuitive .intuitive-wrap .buttons .button_1').width()

        for (i = 0; i < num; i++) {
            var f = -2 / num * i * Math.PI;  // Рассчитываем угол каждой картинки в радианах
            var left = wrap + wrap * Math.sin(f) - (item_w/2) + 'px';
            var top = wrap + wrap * Math.cos(f) - (item_w/2) + 'px';
            if (i == 5) {
                $('#intuitive .intuitive-wrap .buttons .button_1').css({'top':top,'left':left})
            }
            if (i == 6) {
                $('#intuitive .intuitive-wrap .buttons .button_2').css({'top':top,'left':left})
            }
            if (i == 7) {
                $('#intuitive .intuitive-wrap .buttons .button_3').css({'top':top,'left':left})
            }
        }
    }

    $(window).resize(function(){
        positionButtons()
    })

    $(document).ready(function(){
        positionButtons()
    })

	  		

    var vmIntuitive = new Vue({
        el: '#intuitive',
        data: {
            subjects: [
                {
                    title: 'Квартира',
                    ico: '/images/intuitive/subject_1.svg',
                    windows: [ 2, 3, 4, 8 ]
                },
                {
                    title: 'Загородный дом',
                    ico: '/images/intuitive/subject_2.svg',
                    windows: [ 2, 3, 4, 5 ]
                },
                {
                    title: 'Нежилое помещение',
                    ico: '/images/intuitive/subject_3.svg',
                    windows: [ 2, 3, 4, 5, 6, 7 ]
                },
            ],
            questions: [
                [
                    {
                        title: 'Тип дома?',
                        num: '01',
                        next: true,
                        answers: [
                            {
                                title: 'Панель',
                                ico: '/images/intuitive/snow.svg',
                                status: false,
                                windows: []
                            },
                            {
                                title: 'Кирпичный',
                                ico: '/images/intuitive/snow.svg',
                                status: false,
                                windows: []
                            },
                            {
                                title: 'Монолит',
                                ico: '/images/intuitive/snow.svg',
                                status: false,
                                windows: []
                            },
                            {
                                title: 'Не знаю',
                                ico: '/images/intuitive/snow.svg',
                                status: false,
                                windows: []
                            },
                        ]
                    },
                    {
                        title: 'Средняя температура зимой?',
                        num: '02',
                        next: true,
                        answers: [
                            {
                                title: '1 - 5',
                                ico: '/images/intuitive/snow.svg',
                                status: false,
                                windows: []
                            },
                            {
                                title: '6 - 11',
                                ico: '/images/intuitive/snow.svg',
                                status: false,
                                windows: []
                            },
                            {
                                title: 'более 12',
                                ico: '/images/intuitive/snow.svg',
                                status: false,
                                windows: []
                            },
                        ]
                    },
                    {
                        title: 'Беспокоят?',
                        num: '03',
                        next: true,
                        answers: [
                            {
                                title: 'Холод',
                                ico: '/images/intuitive/snow.svg',
                                status: false,
                                windows: []
                            },
                            {
                                title: 'Шум',
                                ico: '/images/intuitive/snow.svg',
                                status: false,
                                windows: []
                            },
                            {
                                title: 'Ветер',
                                ico: '/images/intuitive/snow.svg',
                                status: false,
                                windows: []
                            },
                            {
                                title: 'Солнце',
                                ico: '/images/intuitive/snow.svg',
                                status: false,
                                windows: []
                            },
                            {
                                title: 'Ничего',
                                ico: '/images/intuitive/snow.svg',
                                status: false,
                                windows: []
                            },
                        ]
                    },
                    {
                        title: 'Внешний вид профиля?',
                        num: '04',
                        next: true,
                        answers: [
                            {
                                title: 'Обычный',
                                ico: '/images/intuitive/snow.svg',
                                status: false,
                                windows: []
                            },
                            {
                                title: 'Красивый',
                                ico: '/images/intuitive/snow.svg',
                                status: false,
                                windows: []
                            },
                            {
                                title: 'Не важно',
                                ico: '/images/intuitive/snow.svg',
                                status: false,
                                windows: []
                            },
                        ]
                    },
                    {
                        title: 'Ценовая категория?',
                        num: '05',
                        next: true,
                        answers: [
                            {
                                title: 'Подешевле',
                                ico: '/images/intuitive/snow.svg',
                                status: false,
                                windows: []
                            },
                            {
                                title: 'Подороже',
                                ico: '/images/intuitive/snow.svg',
                                status: false,
                                windows: []
                            },
                        ]
                    },
                ],
                [
                    {
                        title: 'Тип дома?',
                        num: '01',
                        next: true,
                        answers: [
                            {
                                title: 'Дерево',
                                ico: '/images/intuitive/snow.svg',
                                status: false,
                                windows: []
                            },
                            {
                                title: 'Кирпичный',
                                ico: '/images/intuitive/snow.svg',
                                status: false,
                                windows: []
                            },
                            {
                                title: 'Монолитный',
                                ico: '/images/intuitive/snow.svg',
                                status: false,
                                windows: []
                            },
                            {
                                title: 'Не знаю',
                                ico: '/images/intuitive/snow.svg',
                                status: false,
                                windows: []
                            },
                        ]
                    },
                    {
                        title: 'Средняя температура зимой?',
                        num: '02',
                        next: true,
                        answers: [
                            {
                                title: '0 - 10',
                                ico: '/images/intuitive/snow.svg',
                                status: false,
                                windows: []
                            },
                            {
                                title: '11 - 15',
                                ico: '/images/intuitive/snow.svg',
                                status: false,
                                windows: []
                            },
                            {
                                title: '16 - 30',
                                ico: '/images/intuitive/snow.svg',
                                status: false,
                                windows: []
                            },
                        ]
                    },
                    {
                        title: 'Беспокоят?',
                        num: '03',
                        next: true,
                        answers: [
                            {
                                title: 'Холод',
                                ico: '/images/intuitive/snow.svg',
                                status: false,
                                windows: []
                            },
                            {
                                title: 'Шум',
                                ico: '/images/intuitive/snow.svg',
                                status: false,
                                windows: []
                            },
                            {
                                title: 'Ветер',
                                ico: '/images/intuitive/snow.svg',
                                status: false,
                                windows: []
                            },
                            {
                                title: 'Солнце',
                                ico: '/images/intuitive/snow.svg',
                                status: false,
                                windows: []
                            },
                            {
                                title: 'Ничего',
                                ico: '/images/intuitive/snow.svg',
                                status: false,
                                windows: []
                            },
                        ]
                    },
                    {
                        title: 'Внешний вид профиля?',
                        num: '04',
                        next: true,
                        answers: [
                            {
                                title: 'Обычный',
                                ico: '/images/intuitive/snow.svg',
                                status: false,
                                windows: []
                            },
                            {
                                title: 'Красивый',
                                ico: '/images/intuitive/snow.svg',
                                status: false,
                                windows: []
                            },
                            {
                                title: 'Неважно',
                                ico: '/images/intuitive/snow.svg',
                                status: false,
                                windows: []
                            },
                        ]
                    },
                    {
                        title: 'Ценовая категория?',
                        num: '05',
                        next: true,
                        answers: [
                            {
                                title: 'Подешевле',
                                ico: '/images/intuitive/snow.svg',
                                status: false,
                                windows: []
                            },
                            {
                                title: 'Подороже',
                                ico: '/images/intuitive/snow.svg',
                                status: false,
                                windows: []
                            },
                        ]
                    },
                ],
                [
                    {
                        title: 'Тип помещения?',
                        num: '01',
                        next: true,
                        answers: [
                            {
                                title: 'Панель',
                                ico: '/images/intuitive/snow.svg',
                                status: false,
                                windows: []
                            },
                            {
                                title: 'Кирпич',
                                ico: '/images/intuitive/snow.svg',
                                status: false,
                                windows: []
                            },
                            {
                                title: 'Монолит',
                                ico: '/images/intuitive/snow.svg',
                                status: false,
                                windows: []
                            },
                            {
                                title: 'Другое',
                                ico: '/images/intuitive/snow.svg',
                                status: false,
                                windows: []
                            },
                            {
                                title: 'Незнаю',
                                ico: '/images/intuitive/snow.svg',
                                status: false,
                                windows: []
                            },
                        ]
                    },
                    {
                        title: 'Вид помещения?',
                        num: '02',
                        next: true,
                        answers: [
                            {
                                title: 'Офис',
                                ico: '/images/intuitive/snow.svg',
                                status: false,
                                windows: []
                            },
                            {
                                title: 'Склад',
                                ico: '/images/intuitive/snow.svg',
                                status: false,
                                windows: []
                            },
                            {
                                title: 'Пройти комиссию',
                                ico: '/images/intuitive/snow.svg',
                                status: false,
                                windows: []
                            },
                            {
                                title: 'Другое',
                                ico: '/images/intuitive/snow.svg',
                                status: false,
                                windows: []
                            },
                        ]
                    },
                    {
                        title: 'Внешний вид профиля?',
                        num: '03',
                        next: true,
                        answers: [
                            {
                                title: 'Обычный',
                                ico: '/images/intuitive/snow.svg',
                                status: false,
                                windows: []
                            },
                            {
                                title: 'Красивый',
                                ico: '/images/intuitive/snow.svg',
                                status: false,
                                windows: []
                            },
                            {
                                title: 'Не важно',
                                ico: '/images/intuitive/snow.svg',
                                status: false,
                                windows: []
                            },
                        ]
                    },
                    {
                        title: 'Ценовая категория?',
                        num: '04',
                        next: true,
                        answers: [
                            {
                                title: 'Подешевле',
                                ico: '/images/intuitive/snow.svg',
                                status: false,
                                windows: []
                            },
                            {
                                title: 'Подороже',
                                ico: '/images/intuitive/snow.svg',
                                status: false,
                                windows: []
                            },
                        ]
                    },
                ]
            ],
            currentQuestion: 0,
            currentSubject: null,
            showResult: false,
            windows: [
                {
                    title: 'Первое окно',
                    num: '01',
                    position: 'l',
                    img: {
                        l: '/images/intuitive/temp/11.png',
                        m: '/images/intuitive/temp/2.png',
                        r: '/images/intuitive/temp/33.png'
                    }
                },
                {
                    title: 'Второе окно',
                    num: '02',
                    position: 'm',
                    img: {
                        l: '/images/intuitive/temp/11.png',
                        m: '/images/intuitive/temp/2.png',
                        r: '/images/intuitive/temp/33.png'
                    }
                },
                {
                    title: 'Третье окно',
                    num: '03',
                    position: 'r',
                    img: {
                        l: '/images/intuitive/temp/11.png',
                        m: '/images/intuitive/temp/2.png',
                        r: '/images/intuitive/temp/33.png'
                    }
                },
                {
                    title: 'Четвертое окно',
                    num: '04',
                    position: null,
                    img: {
                        l: '/images/intuitive/temp/11.png',
                        m: '/images/intuitive/temp/2.png',
                        r: '/images/intuitive/temp/33.png'
                    }
                },
                {
                    title: 'Пятое окно',
                    num: '05',
                    position: null,
                    img: {
                        l: '/images/intuitive/temp/11.png',
                        m: '/images/intuitive/temp/2.png',
                        r: '/images/intuitive/temp/33.png'
                    }
                },
            ]
        },
        methods: {
            repeat: function () {
                Vue.set(vmIntuitive, 'currentQuestion', 0)
                Vue.set(vmIntuitive, 'currentSubject', null)
                Vue.set(vmIntuitive, 'showResult', false)
                this.questions.forEach(function(item, i){
                    item.forEach(function(item2, i2){
                        if (item2.next === false) {
                            Vue.set(vmIntuitive.questions[i][i2], 'next', true)
                        }
                        item2.answers.forEach(function(item3, i3){
                            if (item3.status === true) {
                                Vue.set(vmIntuitive.questions[i][i2].answers[i3], 'status', false)
                            }
                        })
                    })
                })
            },
            findInArray: function (array, value) {
                for (var i = 0; i < array.length; i++) {
                    if (array[i] == value) return i;
                }
                return -1;
            },
            selectionResult: function (array) {
                // Vue.set(vmIntuitive, 'windows', array)
            },
            useSubject: function (index) {
                Vue.set(vmIntuitive, 'currentSubject', index)
                this.selectionResult(this.subjects[this.currentSubject].windows)
            },
            useQuestion: function (index) {
                if (!this.questions[this.currentSubject][index].next || (this.questions[this.currentSubject][index-1] && !this.questions[this.currentSubject][index-1].next)) {
                    Vue.set(vmIntuitive, 'currentQuestion', index)
                }
            },
            useAnswer: function (index) {
                this.selectionResult(this.questions[this.currentSubject][this.currentQuestion].answers[index].windows)

                var temp = []
                this.questions[this.currentSubject][this.currentQuestion].answers.forEach(function(item, i, arr) {
                    temp.push(item.status)
                })
                if (this.findInArray(temp, true) != '-1') {
                    Vue.set(vmIntuitive.questions[this.currentSubject][this.currentQuestion], 'next', false)
                } else {
                    Vue.set(vmIntuitive.questions[this.currentSubject][this.currentQuestion], 'next', true)
                }
            },
            nextQuestion: function () {
                if (!this.questions[this.currentSubject][this.currentQuestion].next) {
                    if (this.questions[this.currentSubject].length == this.currentQuestion+1) {
                        Vue.set(vmIntuitive, 'showResult', true)
                        Vue.nextTick(function() {
                            positionButtons()
                        })                        
                        // this.windows.forEach(function(item, i){
                        //     console.log(item)
                        // })
                        // Vue.set(vmIntuitive.windows[0], 'position', 'l')
                        // Vue.set(vmIntuitive.windows[1], 'position', 'm')
                        // Vue.set(vmIntuitive.windows[2], 'position', 'r')
                    } else {
                        Vue.set(vmIntuitive, 'currentQuestion', (this.currentQuestion+1))
                    }
                }
            },
            moveWindow: function (direction, position = null) {
                if (direction === null) {
                    if (position == 'l') {
                        direction = 'next'
                    } else if (position == 'r') {
                        direction = 'prev'
                    } else {
                        return false
                    }
                }
                var l = null;
                var m = null;
                var r = null;
                this.windows.forEach(function(item, i, arr){
                    if (direction == 'next') {
                        if (item.position == 'r') {
                            Vue.set(vmIntuitive.windows[i], 'position', null)
                        }
                        if (item.position == 'm') {
                            r = i
                        }
                        if (item.position == 'l') {
                            m = i
                            if (i == 0) {
                                l = (vmIntuitive.windows.length)-1
                            } else {
                                l = i-1
                            }
                        }
                    } else if (direction == 'prev') {
                        if (item.position == 'l') {
                            Vue.set(vmIntuitive.windows[i], 'position', null)
                        }
                        if (item.position == 'm') {
                            l = i
                        }
                        if (item.position == 'r') {
                            m = i
                            if (i == (vmIntuitive.windows.length)-1) {
                                r = 0
                            } else {
                                r = i+1
                            }
                        }
                    }
                })
                Vue.set(this.windows[l], 'position', 'l')
                Vue.set(this.windows[m], 'position', 'm')
                Vue.set(this.windows[r], 'position', 'r')
            }
        }
    })
}