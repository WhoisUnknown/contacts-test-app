<template>
  <Multiselect
    v-bind="$attrs"
    :class="$s.multiselect"
    v-on="$listeners" />
</template>

<script>
import Multiselect from 'vue-multiselect';
export default {
  name: 'UIMultiselect',
  components: {
    Multiselect,
  },
  inheritAttrs: false,
};
</script>

<style lang="scss" module="$s">
.multiselect{
  border: 2px solid #DFE7E3;
  border-radius: 5px;
  color: #404F4C;
  font-weight: 500;
  font-size: 14px;
  height: 36px;
  min-height: 36px;
  [class="multiselect__tags"]{
    border:none;
    height: 36px;
    min-height: 36px;
  }
}
</style>
