<template>
  <component
    :is="currentComponent"
    v-bind="$attrs"
  >
    <slot></slot>
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useDevice } from '../utils/device'

const props = defineProps<{
  mobileComponent: any
  desktopComponent: any
}>()

const { isMobile } = useDevice()

const currentComponent = computed(() => {
  return isMobile() ? props.mobileComponent : props.desktopComponent
})
</script>