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
  color: var(--pageTitle);
}
.input {
  height: 40px;
  font-size: 18px;
  padding: 5px;
  border: 1px solid var(--inputBorder);
  border-radius: 5px;
}
</style>


