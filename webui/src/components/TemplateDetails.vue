<script setup lang="ts">
import type { TemplateMetadata } from '@/templates';
import { onMounted, ref, type Ref } from 'vue';

const props = defineProps(['path']);
const template: Ref<TemplateMetadata> = ref({});

onMounted(async () => {
    const templateDetailsRequest = await fetch('/data/' + props.path + '.json');
    if(!templateDetailsRequest.ok) {
        throw new Error(`Template details endpoint response: ${templateDetailsRequest.status}`)
    }

    template.value = await templateDetailsRequest.json();
});
</script>
<template>
    <RouterLink to="/">&lt;- Return to list</RouterLink>
    <h1>{{ template.name }}</h1>
    <a href="#">download .zip</a> | <a href="#">new GitHub repo</a>
    <div class="template-details">
        <pre>{{ template.description }}</pre>
    </div>
</template>