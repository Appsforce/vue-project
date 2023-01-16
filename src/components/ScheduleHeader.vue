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
      <input class="input" type="input" placeholder="Search" @input="sendInput" :value="input"/>
 </div>
</template>

<style scoped>
.title {
  color: #3f434e;
}
.input {
  height: 40px;
  font-size: 18px;
  padding: 5px;
  border: 1px solid #1a5cd6;
  border-radius: 5px;
}
</style>


