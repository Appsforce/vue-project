<script setup lang="ts">
const props = defineProps<{
    input: string
  }>();
const emit = defineEmits(['inputData']);
const sendInput = (e: any) => {
    emit("inputData", e.target.value)
  }
</script>



<template>
<div class="header">
    <h1 class="title">Summaries and notifications</h1>
    <input class="input" type="input" placeholder="Search" @change="sendInput" :value="input"/>
</div>
</template>


