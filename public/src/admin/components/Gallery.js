export default {
    name: "Gallery",
    data () {
        return {
            gallery_group: [],
            gallery: [],
            gallery_index: false
        }
    },
    components: {
        // Sortable
    },
    created: function () {
        this.get()
    },
    updated () {

    },
    methods: {
        get: function () {
            axios.post('/admin/GalleryList', {}).then((responce) => {
                this.gallery_group = responce.data.gallery_group
                this.gallery = responce.data.gallery
            })
        },
        use: function (index) {
            Vue.set(this, "gallery_index", index)
        },
        add: function () {
            this.gallery.push({
                // gallery_group: [],
                gallery_images: [],
                iOrder: 9999
            })
            var index = this.gallery.length-1;
            this.use(index)
        },
        upload: function () {
            var form = new FormData();

            Array.from(event.target.files).forEach(file => {
                form.append('file', file);
                console.log(file)
            })

            axios.post('/admin/GalleryUpload', form, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    // 'extension': event.target.files[0].name.split('.').pop()
                }
            }).then( (response) => {
                response.data.forEach(name => {
                    this.gallery[this.gallery_index].gallery_images.push({
                        sGalleryImageName: name,
                        iGalleryImageOrder: 9999
                    })
                });
            })
            
            
            // console.log(event.target.files[0])
            // var index = event.target.files[0].name
            // console.log(index)
            // axios.post('/admin/GalleryUpload', form, {
            //     headers: {
            //         'Content-Type': 'multipart/form-data',
            //         'extension': event.target.files[0].name.split('.').pop()
            //     }
            // }).then( (response) => {
            //     this.gallery[this.gallery_index].gallery_images.push({
            //         sGalleryImageName: response.data
            //     })
            // })
        },
        delImage: function (index) {
            Vue.set(this.gallery[this.gallery_index].gallery_images[index], 'del', true)
        },
        update: function (e) {
            $("#galleryEdit").modal('hide')
            axios.post('/admin/GalleryUpdate', {
                gallery: this.gallery[this.gallery_index]
            }).then((responce) => {
                Vue.set(this, 'gallery', responce.data.gallery)
            })
            Vue.set(this, 'gallery_index', false)
            e.preventDefault()
        },
        remove: function () {
            $("#galleryEdit").modal('hide')
            axios.post('/admin/GalleryRemove', {
                iGalleryID: this.gallery[this.gallery_index].iGalleryID
            }).then((responce) => {
                Vue.set(this, 'gallery', responce.data.gallery)
            })
            Vue.set(this, 'gallery_index', false)
        }
    },
    template: `
    <div class="gallery">

        <div class="row" id="gallery_list">
            <div class="col-sm-3 mb-4" v-for="gallery, index in gallery" v-if="gallery.iGalleryID">
                <div class="card" data-toggle="modal" data-target="#galleryEdit" v-on:click="use(index)">
                    <img class="card-img-top" v-if="gallery.gallery_images[0]" :src="'/images/gallery/' + gallery.gallery_images[0].sGalleryImageName" alt="Card image cap">
                    <img class="card-img-top" v-else src="/images/gallery/empty.png">
                    <div class="card-body">
                        <h5 class="card-title">{{ gallery.sGalleryTitle }}</h5>
                        <p class="card-text">{{ gallery.gallery_group.sGalleryGroupTitle }}</p>
                    </div>
                </div>
            </div>
        </div>

        <button class="btn btn-primary" data-toggle="modal" data-target="#galleryEdit" v-on:click="add">Добавить</button>

        <div class="modal" tabindex="-1" role="dialog" id="galleryEdit">
            <div class="modal-dialog modal-lg modal-dialog-centered" role="document" v-if="gallery_index !== false">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">
                            <template v-if="gallery[gallery_index].sGalleryTitle">{{ gallery[gallery_index].sGalleryTitle }}</template>
                            <template v-else><span class="text-black-50">Название...</span></template>
                        </h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <form id="galleryEditForm" @submit="update">
                            <div class="row">
                                <div class="col-6">
                                    <div class="form-group">
                                        <label for="sGalleryTitle">Название</label>
                                        <input type="text" class="form-control" id="sGalleryTitle" v-model="gallery[gallery_index].sGalleryTitle" required>
                                    </div>
                                    <div class="row">
                                        <div class="col-8">
                                            <div class="form-group">
                                                <label for="sGalleryTitleMin">Короткое название</label>
                                                <input type="text" class="form-control" id="sGalleryTitleMin" v-model="gallery[gallery_index].sGalleryTitleMin" required>
                                            </div>
                                        </div>
                                        <div class="col-4">
                                            <div class="form-group">
                                                <label for="iOrder">Сортировка</label>
                                                <input type="text" class="form-control" id="iOrder" v-model="gallery[gallery_index].iOrder" required>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="iGalleryGroupID">Группа</label>
                                        <select v-model="gallery[gallery_index].iGalleryGroupID" class="form-control" required>
                                            <option v-for="group, index in gallery_group" :value="group.iGalleryGroupID">{{ group.sGalleryGroupTitle }}</option>
                                        </select>
                                    </div>
                                    <div class="form-group">
                                        <label for="tGalleryText">Описание</label>
                                        <textarea class="form-control" id="tGalleryText" v-model="gallery[gallery_index].tGalleryText" rows=10></textarea>
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="form-group mb-0">
                                        <label for="tGalleryText">Галлерея</label>
                                        <div class="row pl-2 pr-2" id="gallery_images_list">
                                            <div class="col-4 pl-2 pr-2" v-for="image, index in gallery[gallery_index].gallery_images" v-if="image.del !== true">
                                                <img :src="'/images/gallery/' + image.sGalleryImageName" class="rounded img-fluid mb-3">
                                                <i class="material-icons remove" v-on:click="delImage(index)">clear</i>
                                                <input type="text" class="gallery_image_order_input" v-model="image.iGalleryImageOrder">
                                            </div>
                                        </div>
                                    </div>
                                    <label class="btn btn-primary btn-sm">
                                        Добавить изображение
                                        <input type="file" @change="upload" multiple style="display: none;" />
                                    </label>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div v-if="gallery[gallery_index].iGalleryID" class="modal-footer justify-content-between">
                        <button type="button" class="btn btn-danger" @click="remove">Удалить</button>
                        <button type="submit" form="galleryEditForm" class="btn btn-primary">Сохранить</button>
                    </div>
                    <div v-else class="modal-footer">
                        <button type="submit" form="galleryEditForm" class="btn btn-primary">Сохранить</button>
                    </div>
                </div>
            </div>
        </div>

    </div>
    `,
}
