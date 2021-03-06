import Vue from 'vue';

import s1Left from '../../components/index/s1/Left.vue';
import s1Actions from '../../components/index/s1/Actions.js';
import s5Gallery from '../../components/index/s5/Gallery.js';

export default {
  name: 'Index',
  props: ['section', 'part'],
  components: {
    s1Left,
    s1Actions,
    s5Gallery
  },
  data() {
    return {
      sections: [
        {
          title: 'Приветственный экран',
          link: 's1',
          parts: [
            {
              title: 'Левый блок',
              link: 'left'
            },
            {
              title: 'Товары и акции',
              link: 'actions'
            }
          ]
        },
        {
          title: 'Второй экран',
          link: 's2'
        },
        {
          title: 'Третий экран',
          link: 's3'
        },
        {
          title: 'Четвертый экран',
          link: 's4'
        },
        {
          title: 'Галерея',
          link: 's5'
        },
        {
          title: 'Шестой экран',
          link: 's6'
        },
        {
          title: 'Седьмой экран',
          link: 's7'
        },
        {
          title: 'Восьмой экран',
          link: 's8'
        }
      ]
    };
  },
  computed: {
    parts() {
      const section = this.sections.find(x => x.link == this.section);
      if (section && section.parts) return section.parts;
      return [];
    }
  },
  template: `
    <div id="indexPage">
      <div class="partBlock sections">
        <h2>
          <span>Секция</span>
        </h2>
        <div class="blockData">
          <ul>
            <li v-for="s in sections">
              <router-link :to="'/index/' + s.link" active-class="active">
                {{ s.title }}
              </router-link>
            </li>
          </ul>
        </div>
      </div>
      <div class="partBlock parts">
        <h2>
          <span>Раздел</span>
        </h2>
        <div class="blockData">
          <ul>
            <li v-for="p in parts">
              <router-link :to="'/index/' + section + '/' + p.link" active-class="active">
                {{ p.title }}
              </router-link>
            </li>
          </ul>
        </div>
      </div>
      <div class="partEdit">
        <s1Left v-if="section === 's1' && part === 'left'"></s1Left>
        <s1Actions v-if="section === 's1' && part === 'actions'"></s1Actions>
        <s5Gallery v-if="section === 's5'"></s5Gallery>
      </div>
    </div>
  `
};
