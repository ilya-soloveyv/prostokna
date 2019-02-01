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
    methods: {
      deleteWindow: function(index, e) {
        console.log(index);
        //this.list.splice(index, 1);
        console.log(this.list[index]);
        console.log(e);
      },
    },
    mounted() {
      $.ajax({
        url: "/calc_data",
        type: "GET"
      }).done((json) => {
        console.log(json)
      })
    },
  })
}
