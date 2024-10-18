<script setup lang="ts">
import type { TemplateMetadata } from '@/templates'
import { onMounted, ref, type Ref } from 'vue'
import VueMarkdown from 'vue-markdown-render'

const props = defineProps(['path'])
const template: Ref<TemplateMetadata> = ref({})

onMounted(async () => {
  const templateDetailsRequest = await fetch('/data/' + props.path + '.json')
  if (!templateDetailsRequest.ok) {
    throw new Error(`Template details endpoint response: ${templateDetailsRequest.status}`)
  }

  template.value = await templateDetailsRequest.json()
})
</script>
<template>
  <RouterLink to="/">&lt;- Return to list</RouterLink>
  <a :href="'/data/' + path + '.zip'">download .zip</a> | <a href="#">new GitHub repo</a>
  <div class="template-details">
    <VueMarkdown :source="template.description" v-if="template.description != undefined" />
  </div>
</template>
