<script setup lang="ts">
import type { TemplateMetadata } from '@/templates'
import { ref, type Ref } from 'vue'
import { ZipArchive } from '@shortercode/webzip'

const props = defineProps<{
  templateMetadata: TemplateMetadata
}>()
const values: Ref<Map<string, string>> = ref({})

async function download() {
  const downloadResp = await fetch('/data/' + props.templateMetadata.path + '.zip')
  const zip = await ZipArchive.from_blob(await downloadResp.blob())
  const files = zip.files()
  while (true) {
    const entry = files.next()
    if (entry.done) {
      break
    }
    const filename = entry.value[0]
    const file = entry.value[1]
    console.log(filename, file)
    zip.set(filename, 'TEST LOL\n\n' + file.get_string())
  }

  const blob = zip.to_blob()
  const url = URL.createObjectURL(blob)
  console.log('redirecting to', url)
  window.location.replace(url)
}
</script>
<template>
  <p>Customize this template before downloading:</p>
  <table v-if="props.templateMetadata.variables">
    <tr v-for="[k, v] in Object.entries(props.templateMetadata.variables)" :key="k">
      <td>{{ v.name }}</td>
      <td>
        <input type="text" :name="k" v-if="v.type == 'text'" v-model="values[k]" />
        <select :name="k" v-if="v.type == 'select'" v-model="values[k]">
          <option v-for="opt in v.options" :key="opt.value" :value="opt.value">
            {{ opt.label }}
          </option>
        </select>
      </td>
    </tr>
    <tr>
      <td>
        <pre>{{ values }}</pre>
      </td>
      <td><button @click="download">Download</button></td>
    </tr>
  </table>
</template>
