export default {
    name: 'Color',
    data () {
        return {
            color: [],
            editIndex: false,
            material: []
        }
    },
    created: function () {
        this.get()
    },
    updated () {
		// $(this.$refs.select).selectpicker('refresh')
	},
    methods: {
        get: function () {
            axios.post('/admin/ColorList', {}).then((responce) => {
                this.color = responce.data.color
                this.material = responce.data.material
            })
        },
        del: function (index) {
            Vue.set(this, 'editIndex', index)
            Vue.set(this.color[index], 'del', true)
            this.update()
        },
        add: function () {
            this.color.push({ iOrder: 9999 })
            var last_index = this.color.length-1;
            this.edit(last_index)
        },
        edit: function (index) {
            Vue.set(this, 'editIndex', index)
            this.color.forEach((color, i) => {
                Vue.set(this.color[i], 'edit', false)
            });
            Vue.set(this.color[index], 'edit', true)
            Vue.nextTick(function () {
                $('input[name=sColorTitle]').focus()
            })
        },
        update: function () {
            var index = this.editIndex
            Vue.set(this, 'editIndex', false)
            axios.post('/admin/ColorUpdate', {
                color: this.color[index]
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
        <div class="card mb-3" v-if="color.length">
            <div class="card-body p-0">
                <form @submit.prevent="update">
                    <table class="table m-0">
                        <thead>
                            <tr>
                                <th width="50" scope="col" class="border-0">#</th>
                                <th scope="col" class="border-0">Название цвета</th>
                                <th width="150" scope="col" class="border-0">Материал</th>
                                <th width="130" scope="col" class="border-0">Код цвета</th>
                                <th width="130" scope="col" class="border-0">Название кода</th>
                                <th width="90" scope="col" class="border-0">Текстура</th>
                                <th width="130" scope="col" class="border-0">Сортировка</th>
                                <th width="200" scope="col" class="border-0"></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item, index) in color" v-if="item.del !== true">
                                <td>
                                    <span class="form-control form-control-sm border-1 border-white bg-transparent">{{ item.iColorID }}</span>
                                </td>
                                <td>
                                    <input v-if="item.edit === true" class="form-control form-control-sm" type="text" name="sColorTitle" v-model="item.sColorTitle" required>
                                    <span v-if="item.edit !== true" class="form-control form-control-sm border-1 border-white bg-transparent">{{ item.sColorTitle }}</span>
                                </td>
                                <td>
                                    <select v-if="item.edit === true" class="form-control form-control-sm pl-1" ref="select" v-model.number="item.iMaterialID" required>
                                        <option v-for="(material, index) in material" :value="material.iMaterialID">{{ material.sMaterialTitle }}</option>
                                    </select>
                                    <span v-if="item.edit !== true" class="form-control form-control-sm border-1 border-white bg-transparent">
                                        <template v-if="item.iMaterialID">
                                            {{ item.material.sMaterialTitle }}
                                        </template>
                                        <template v-else>
                                            Не выбрано
                                        </template>                                        
                                    </span>
                                </td>
                                <td>
                                    <input v-if="item.edit === true" class="form-control form-control-sm" type="text" v-model="item.sColorCode">
                                    <span v-if="item.edit !== true" class="form-control form-control-sm border-1 border-white bg-transparent">{{ item.sColorCode }}</span>
                                </td>
                                <td>
                                    <input v-if="item.edit === true" class="form-control form-control-sm" type="text" v-model="item.sColorTitleCode" required>
                                    <span v-if="item.edit !== true" class="form-control form-control-sm border-1 border-white bg-transparent">{{ item.sColorTitleCode }}</span>
                                </td>
                                <td>
                                    <label class="file_upload mb-3">
                                        <input type="file" :name="index" @change="upload" />
                                        <img v-if="item.sColorTextureFileName" :src="'/images/color/' + item.sColorTextureFileName" />
                                    </label>
                                </td>
                                <td>
                                    <input v-if="item.edit === true" class="form-control form-control-sm" type="text" v-model="item.iOrder" required>
                                    <span v-if="item.edit !== true" class="form-control form-control-sm border-1 border-white bg-transparent">{{ item.iOrder }}</span>
                                </td>
                                <td>
                                    <button type="button" v-if="item.edit !== true" class="btn btn-sm btn-light" @click.prevent="edit(index)"><i class="material-icons">edit</i></button>
                                    <button type="submit" v-if="item.edit === true" class="btn btn-sm btn-success"><i class="material-icons">update</i></button>                                    
                                    <button type="button" v-if="item.edit === true" class="btn btn-sm btn-danger" @click.prevent="del(index)"><i class="material-icons">remove</i></button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </form>
            </div>
        </div>
        <button type="button" class="btn btn-sm btn-primary" v-on:click="add">Добавить цвет</button>
    </div>
    `,
}
