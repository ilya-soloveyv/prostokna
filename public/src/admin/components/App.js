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
                {
                    title: 'Комплектующие',
                    uri: '/part'
                },
                {
                    title: 'Главная страница',
                    uri: '/index'
                },
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
                        <router-link v-bind:to="menu.uri" v-for="(menu, index) in menu" :key="index" tag="li">
                            <a>{{ menu.title }}</a>
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