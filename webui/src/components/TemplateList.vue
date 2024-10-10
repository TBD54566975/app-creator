<script setup lang="ts">
import { ref, onMounted, type Ref } from 'vue'
import { RouterLink } from 'vue-router'
import { type TemplateMetadata } from '@/templates';

const templates: Ref<TemplateMetadata[]> = ref([]);

onMounted(async () => {
    const templatesResponse = await fetch('/data/templates.json');
    if(!templatesResponse.ok) {
        throw new Error(`Template endpoint response: ${templatesResponse.status}`)
    }

    templates.value = await templatesResponse.json();
    // console.log(templates);
})
</script>
<template>
    <div class="template-list">
        <div class="item" v-for="template in templates" :key="template.path">
            <RouterLink :to="{name: 'template', params: {template: template.path}}">{{ template.name }}</RouterLink>
        </div>
    </div>
</template>
<style scoped>
.template-list {
    display: flex;
    flex-wrap: wrap;
}
.item {
    padding: 1em;
    margin: 1em;
    border: solid black 1px;
}
</style>