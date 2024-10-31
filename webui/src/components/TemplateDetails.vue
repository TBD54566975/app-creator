<script setup lang="ts">
import type { TemplateMetadata } from '@/templates'
import TemplateCustomizer from './TemplateCustomizer.vue'
import { onMounted, ref, type Ref } from 'vue'
import VueMarkdown from 'vue-markdown-render'

const props = defineProps(['path'])
const template: Ref<TemplateMetadata | null> = ref(null)
const showModal = ref(false)

onMounted(async () => {
  const templateDetailsRequest = await fetch('/data/' + props.path + '.json')
  if (!templateDetailsRequest.ok) {
    throw new Error(`Template details endpoint response: ${templateDetailsRequest.status}`)
  }

  template.value = await templateDetailsRequest.json()
})
</script>
<template>
  <RouterLink to="/">&lt;- Return to list</RouterLink><br />
  <a :href="'/data/' + path + '.zip'" v-if="template != null && template.variables == null"
    >download .zip</a
  >
  <a href="#" v-if="template != null && template.variables != null" @click="showModal = !showModal"
    >customize and download</a
  >
  |
  <a href="#">new GitHub repo</a><br />
  <TemplateCustomizer v-if="template != null && showModal" :template-metadata="template" />
  <div class="template-details">
    <VueMarkdown :source="template.description" v-if="template != null" />
  </div>
</template>
