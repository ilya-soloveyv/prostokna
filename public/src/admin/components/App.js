export default {
    name: 'App',
    data: function () {
        return {
            menu: [
                {
                    title: 'Окна',
                    uri: '/product',
                },
                {
                    title: 'Материалы',
                    uri: '/material',
                },
                {
                    title: 'Бренды',
                    uri: '/brand',
                },
                {
                    title: 'Цвета',
                    uri: '/color',
                },
                {
                    title: 'Галлерея',
                    uri: '/gallery',
                },
                // {
                //     title: 'Комплектующие',
                //     uri: '/part',
                //     list: [
                //         {
                //             title: 'Ручки',
                //             uri: '/part/handle'
                //         },
                //         {
                //             title: 'Шторы',
                //             uri: '/part/curtain'
                //         },
                //         {
                //             title: 'Жалюзи',
                //             uri: '/part/jalousie'
                //         },
                //         {
                //             title: 'Сетки',
                //             uri: '/part/grid'
                //         },
                //         {
                //             title: 'Подоконники',
                //             uri: '/part/sill'
                //         },
                //         {
                //             title: 'Клапаны',
                //             uri: '/part/valve'
                //         }
                //     ]
                // }
            ]
        }
    },
    methods: {

    },
    template: `
        <div id="app">

            <div class="sidebar">
                <div class="fixed">
                    <router-link to="/" class="logo" exact>
                        <img src="/images/logo_rgb.png" />
                    </router-link>
                    <ul class="menu">
                        <router-link v-bind:to="menu.uri" v-for="(menu, index) in menu" :key="index" tag="li" exact>
                            <a>{{ menu.title }}</a>
                            <ul v-if="menu.list">
                                <router-link v-bind:to="menu2.uri" v-for="(menu2, index2) in menu.list" :key="index2" tag="li" exact>
                                    <a>{{ menu2.title }}</a>
                                </router-link>
                            </ul>
                        </router-link>
                    </ul>
                </div>
            </div>

            <div class="data">
                <router-view></router-view>
            </div>

        </div>
    `,
}