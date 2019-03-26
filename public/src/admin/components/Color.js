export default {
    name: 'Color',
    data () {
        return {
            color: [],
            material: []
        }
    },
    created: function () {
        this.get()
    },
    methods: {
        get: function () {
            axios.post('/admin/ColorList', {}).then((responce) => {
                this.color = responce.data.color
                this.material = responce.data.material
            })
        },
        del: function (index) {
            Vue.set(this.color[index], 'del', true)
        },
        add: function () {
            this.color.push({ iOrder: 9999 })
        },
        update: function () {
            axios.post('/admin/ColorUpdate', {
                color: this.color
            }).then((responce) => {
                this.color = responce.data.color
            })
        },
        upload: function () {
            
            var form = new FormData();

            form.append('file', event.target.files[0]);

            var index = event.target.name


            axios.post('/admin/ColorUpload', form, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'extension': event.target.files[0].name.split('.').pop()
                }
            }).then( (response) => {
                Vue.set(this.color[index], 'sColorTextureFileName', response.data.filename)
            })

        }
    },
    template: `
    <div class="ColorList">
        <form action="#" method="POST" @submit.prevent="update">
            <table class="table" v-if="color.length">
                <thead>
                    <tr>
                        <th width="50" scope="col">#</th>
                        <th scope="col">Название цвета</th>
                        <th width="130" scope="col">Материал</th>
                        <th width="130" scope="col">Код цвета</th>
                        <th width="130" scope="col">Название кода</th>
                        <th width="90" scope="col">Текстура</th>
                        <th width="130" scope="col">Сортировка</th>
                        <th width="48" scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in color" v-if="item.del !== true">
                        <td><span class="form-control form-control-sm border-0 bg-transparent">{{ item.iColorID }}</span></td>
                        <td>
                            <input class="form-control form-control-sm" type="text" v-model="item.sColorTitle" required>
                        </td>
                        <td>
                            <select class="form-control form-control-sm" v-model.number="item.iMaterialID" required>
                                <option v-for="(material, index) in material" :value="material.iMaterialID">{{ material.sMaterialTitle }}</option>
                            </select>
                        </td>
                        <td>
                            <input class="form-control form-control-sm" type="text" v-model="item.sColorCode">
                        </td>
                        <td>
                            <input class="form-control form-control-sm" type="text" v-model="item.sColorTitleCode" required>
                        </td>
                        <td>
                            <label class="file_upload mb-3">
                                <input type="file" :name="index" @change="upload" />
                                <img v-if="item.sColorTextureFileName" :src="'/images/color/' + item.sColorTextureFileName" />
                            </label>
                        </td>
                        <td>
                            <input class="form-control form-control-sm" type="text" v-model="item.iOrder" required>
                        </td>
                        <td>
                            <button type="button" class="btn btn-sm bg-light" v-on:click="del(index)">del</button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <button type="button" class="btn btn-sm btn-primary" v-on:click="add">Добавить цвет</button>
            <button type="submit" class="btn btn-sm btn-success float-right">Сохранить</button>
        </form>
    </div>
    `,
}
