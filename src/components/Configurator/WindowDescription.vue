<template>
  <div class="window-description">
    <div class="tabs">
      <div class="brand">О бренде</div>
      <div class="parameters">Характеристики</div>
      <div class="description">Описание</div>
    </div>
    <div class="content">
      <div class="brand" v-if="active === 'brand'">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam aliquam
        atque corrupti id ratione. Ullam necessitatibus provident possimus, vel
        iusto fugit repellat consequatur reiciendis cumque vitae, doloribus
        aliquid quis sapiente?
      </div>
      <div class="parameters" v-if="active === 'parameters'"></div>
      <div class="description" v-if="active === 'description'">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quidem
        pariatur magnam at atque qui aspernatur doloremque voluptatibus ducimus
        quaerat aperiam, amet, rerum ratione obcaecati architecto inventore
        corporis ipsum magni odio!
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WindowDescription',
  data() {
    return {
      active: 'brand'
    };
  }
};
</script>

<style lang="scss" scoped>
.content {
}
</style>
