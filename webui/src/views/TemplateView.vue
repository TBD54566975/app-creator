<script setup lang="ts">
import TemplateDetails from '@/components/TemplateDetails.vue';


</script>

<template>
    <TemplateDetails :path="$route.params.template"/>
</template>