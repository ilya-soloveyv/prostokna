$(".section.s8 .fp_bg .flex-block .bottom-block .type-block ul li").on("click", function() {
    $(this).addClass('active').siblings().removeClass('active');
});



var app = new Vue({
    el: '#submitForm',
    data: {
      files: [],
      isNone:  '',
      hideSubmit: false
    },
    mounted() {
      Vue.nextTick(function() {
        $("#phoneInput").inputmask({"mask": "+7(999) 999-99-99"});
      })
    },
    methods: {
      addFiles(){
        this.$refs.files.click();
      },

      submitFiles(){
        Vue.set(this, 'hideSubmit', true);
        var v = this;
        setTimeout(
          function() { 
            Vue.set(v, 'hideSubmit', false);
          }, 
          3000
        );
        let formData = new FormData();
        for( var i = 0; i < this.files.length; i++ ){
          let file = this.files[i];
          formData.append('files[' + i + ']', file);
        }
        // axios.post( '/select-files',
        //   formData,
        //   {
        //     headers: {
        //         'Content-Type': 'multipart/form-data'
        //     }
        //   }
        // ).then(function(){
        //   console.log('SUCCESS!!');
        // })
        // .catch(function(){
        //   console.log('FAILURE!!');
        // });
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