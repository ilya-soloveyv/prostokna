$(".section.s8 .fp_bg .flex-block .bottom-block .type-block ul li").on("click", function() {
    $(this).addClass('active').siblings().removeClass('active');
});

Vue.directive('phone', {
  bind(el) {  
    el.oninput = function(e) {
      if (!e.isTrusted) {
        return;
      }
      if(this.value.length >= 2) {
        var s = this.value;
        this.value = s.substr(3);
      }
      let x = this.value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/);
      this.value = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '') + (x[4] ? '-' + x[4] : '');
      this.value='+7 ' + this.value;
      el.dispatchEvent(new Event('input'));
    }
  }
});

var app = new Vue({
  el: '#submitForm',
  data: {
    files: [],
    isNone:  '',
    hideSubmit: false,
    showMessage: false,
    name: 'asdf',
    phone: '',
    message: ''
  },
  mounted() {
    Vue.nextTick(function() {
      // $("#phoneInput").inputmask({"mask": "+7(999) 999-99-99"});
    })
  },
  methods: {
    addFiles(){
      this.$refs.files.click();
    },

    submitFiles(){
      // console.log(this.name)
      // console.log(this.phone)
      // console.log(this.message)
      // console.log(this.files)

      let data = new FormData()
      data.append('name', this.name)
      data.append('tel', this.phone)
      data.append('message', this.message)
      var files = this.files
      for (var i = 0; i < files.length; i++) {
        data.append('file[]', files[i])
      }
      // for( var i = 0; i < this.files.length; i++ ){
      //   let file = this.files[i];
      //   data.append('files[' + i + ']', file);
      // }

      // console.log(data)

      axios.post( '/send',
        data,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      ).then(function(){
        console.log('SUCCESS!!');
      })
      .catch(function(){
        console.log('FAILURE!!');
      });

      
      return false
      if(this.phone.length<18) {
        this.showMessage = true;
        return
      }
      Vue.set(this, 'hideSubmit', true);
      var v = this;
      setTimeout(
        function() { 
          Vue.set(v, 'hideSubmit', false);
        }, 
        3000
      );
      this.showMessage = false;
      let formData = new FormData();
      for( var i = 0; i < this.files.length; i++ ){
        let file = this.files[i];
        formData.append('files[' + i + ']', file);
      }
      formData.append('phone', this.phone)
      console.log(formData)
    },

    handleFilesUpload(){
      let uploadedFiles = this.$refs.files.files;
      for( var i = 0; i < uploadedFiles.length; i++ ){
        this.files.push( uploadedFiles[i] );
      }
      console.log('handleFileUpload', this.files.length);
      if(this.files.length >= 3) {
          this.isNone='none';
        }
    },
    removeFile( key ){
      this.files.splice( key, 1 );
      if(this.files.length < 3) {
          this.isNone='';
        }
    },
    makeShortName( fileName) {
      var ext = fileName.substr(fileName.lastIndexOf('.'));
      if(fileName.length > 20) {
        fileName = fileName.substr(0, 10) + '...' + fileName.substr(name.length-5);
      }
      return fileName;
    }
  }
})  
  
