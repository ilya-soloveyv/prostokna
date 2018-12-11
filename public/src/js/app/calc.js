Vue.component('calc-title', {
    props: {
        title: String
    },
    template: '<h2>{{ title }}</h2>'
})

Vue.component('calc-selected-window', {
    props: {
        index: Number,
        id: Number,
        title: String,
        price: Number,
        material: Number,
        brand: Number,
        model: Number
    },
    template:
        '<ins v-on:click.self.capture="selectWindow(index, $event)">' +
            '<i class="material-icons" v-on:click="removeWindow(index, $event)">close</i>' +
            '<span data-El="num" v-on:click="selectWindow(index, $event)">' +
                '{{ title }}' +
                '<big class="calc_result" data-El="cost">{{ price }}</big>' +
            '</span>' +
        '</ins>',
    methods: {
        selectWindow: function (index, event) {
            Vue.set(vm, 'activeWindow', index)
            vm.selectedWindow.map(function (item, i) {
                if (i == index) {
                    return item.active = true
                } else {
                    return item.active = false
                }                
            })
        },
        removeWindow: function (index, event) {
            Vue.delete(vm.selectedWindow, index)
            
            if (index == vm.activeWindow) {
                if (vm.selectedWindow.length) {
                    Vue.set(vm, 'activeWindow', vm.selectedWindow.length-1)
                    Vue.set(vm.selectedWindow[vm.selectedWindow.length-1], 'active', true)
                } else {
                    Vue.set(vm, 'activeWindow', 0)
                }
            }
            
            // vm.selectedWindow.map(function (item, i) {
            //     if (i == 0) {
            //         return item.active = true
            //     }                
            // })
        }
    }
})

if($('#calc').length) {
    var vm;
    $.ajax({
        url: "/calc_data",
        type: "GET"
    }).done(function(json) {
        // $(json.materials).each(function(i, v){
        //     vm.materials.push(v)
        // })
        vm = new Vue({
            el: '#calc',
            data: {
                title: "Калькулятор",
                selectedWindow: [],
                activeWindow: 0,
                // activeWindow: {
                //     material: 0,
                //     brand: 0,
                //     model: 0
                // },
                nextSelectedWindowID: 1,
                calcSumma: 0,
                materials: json.materials
            },
            // mounted: function() {
                // this.$nextTick(function () {
                    // var _this = this
                    // this.materials.push({title:'1111'})
                    
                // })
            // },
            methods: {
                addNewWindow: function () {
                    this.selectedWindow.map(function (item) {
                        return item.active = false
                    })
                    this.selectedWindow.push({
                        index: this.nextSelectedWindowID++,
                        title: 'Новое окна',
                        price: 0,
                        active: true,
                        material: 0,
                        brand: 0,
                        model: 0
                    })
                    
                    Vue.nextTick(function () {
                        Vue.set(vm, 'activeWindow', vm.selectedWindow.length-1)
                        $('.scrollbar-outer').scrollTop(9999)
                    })
                },
                selectedMaterial: function (index) {
                    console.log(index)
                }
            }
        })
    })
}
