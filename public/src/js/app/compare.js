if ($('#compare').length) {
    vm = new Vue({
        el: '#compare',
        data: {
            maxItems: 6,
            list: [
                {
                    title: "Rehau Blitz"
                },
                {
                    title: "Montblanc"
                },
                {
                    title: "Default Windows"
                },
            ]
        },
        mounted() {
          //console.log("hello from compare")
        },
    })
}
