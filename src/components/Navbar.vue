<script setup lang="ts">
import { toRefs, ref} from 'vue';
import type { TableLength, ChoosenTab } from '@/models/Schedule';
import type { Ref } from 'vue';

  const props = defineProps<{
    tablesLen: TableLength,
  }>();
  const { tablesLen } = toRefs(props)
  const emit = defineEmits(['choosenTab']);
  const choosenTab: Ref<ChoosenTab> = ref({data: false, time: true, "one-time": false})
</script>


<template>
    <div class="nav-container">
        <div class="nav-item" :class="{'nav-item-clicked': choosenTab.data}" @click="choosenTab = {data: true, time: false, 'one-time': false}; emit('choosenTab', choosenTab);" v-if="tablesLen">Data triggered ({{ tablesLen.data }})</div>
        <div class="nav-item" :class="{'nav-item-clicked': choosenTab.time}" @click="choosenTab = {data: false, time: true, 'one-time': false}; emit('choosenTab', choosenTab);" v-if="tablesLen">Time triggered ({{ tablesLen.time }})</div>
        <div class="nav-item" :class="{'nav-item-clicked': choosenTab['one-time']}" @click="choosenTab = {data: false, time: false, 'one-time': true}; emit('choosenTab', choosenTab);" v-if="tablesLen">Sent once ({{ tablesLen["one-time"] }})</div>
    </div>
</template>

<style>
    .nav-container
    {
        display: flex;
        flex-direction: row;
        width: 100%;
        height: 70px;
        margin-bottom: 20px;
        
        
    }
    .nav-item
    {
        display: flex;
        align-self: center;
        justify-content: center;
        line-height: 70px;
        font-weight: bold;
        width: 33%;
        font-size: 20px;
        color:gray;
        border-bottom: 1px solid gray;
    }
    .nav-item:hover
    {
        cursor: pointer;
        font-weight: bold;
        border-bottom: 5px solid gray;
    }
    .nav-item-clicked
    {
        cursor: pointer;
        font-weight: bold;
        color: black;
        border-bottom: 5px solid black;
    }
    .nav-item-clicked:hover
    {
        border-bottom: 5px solid black;
    }
    .title
    {
        padding: 30px;
    }
    .container 
    {
        background-color: #f7f8fb;
    }
    .header
    {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
    }
    .input
    {
        height: 40px;
        font-size: 18px;
        padding: 5px;
        border: 1px solid #1a5cd6;
        border-radius: 5px;
    }
</style>