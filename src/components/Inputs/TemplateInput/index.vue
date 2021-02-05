<template>
  <b-form-group
    :label-class="$s.label"
    v-bind="$attrs"
    v-on="$listeners">
    <template #label>
      {{ label }}<span
        v-if="required"
        :class="$s.point">
        *
      </span>
    </template>
    <template #default>
      <slot />
    </template>
  </b-form-group>
</template>

<script>
export default {
  name: 'TextInput',
  inheritAttrs: false,
  props: {
    label: {
      type: String,
      default: '',
    },
    required: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" module="$s">
.label{
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 3px;
}
.point{
  font-size: 14px;
  font-weight: bold;
  color: #862043;
}
</style>
