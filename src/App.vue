<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import type { Ref } from 'vue';
import mockData from "./mock/mock-schedules.json";
import type { Schedule, DataByTrigger, TableLength, Trigger } from "./models/Schedule"
import ScheduleTable from './components/ScheduleTable.vue';
import Navbar from './components/Navbar.vue';
import ScheduleHeader from './components/ScheduleHeader.vue'
import { ScheduleService } from './services/ScheduleService';


const ScheduleData: Ref<DataByTrigger> = ref({ "one-time": [], 'data': [], 'time': [] });

async function fetchData() {
  const res = new Promise<Schedule[]>((resolve) => {
    setTimeout(() => {
      resolve(mockData as Schedule[]);
    }, 1000);
  });
  const data = await res;
  const formattedData: DataByTrigger = { "one-time": [], 'data': [], 'time': [] }
  await data.forEach((task: Schedule) => formattedData[task.trigger].push(ScheduleService.formatData(task)))
  ScheduleData.value = formattedData;
  console.log(ScheduleData.value)
}

onMounted(fetchData);


const tablesLength: Ref<TableLength> = ref({"data": 0, time: 0, "one-time": 0})
const filteredTable: Ref<Schedule[] | []> = ref([])


watch(() => ScheduleData.value, (todoData) => {
   tablesLength.value.data = todoData.data.length
   tablesLength.value.time = todoData.time.length
   tablesLength.value["one-time"] = todoData['one-time'].length
   filteredTable.value = todoData[shownTab.value]
})
const choosenTab = ref({ "data": false, "time": true, "one-time": false })
const input = ref("")


const deleteSchedule = (ScheduleDeleteData: {deleteSchedule: Trigger, id: string}) => {
  filteredTable.value = filteredTable.value.filter((Schedule) => Schedule.creator.id.toString() != ScheduleDeleteData.id);
  tablesLength.value[ScheduleDeleteData.deleteSchedule] = filteredTable.value.length;
}


const shownTab: Ref<Trigger> = ref("time")
watch(() => choosenTab.value, (choosenTab) => {
  if (choosenTab.data)
  {
    shownTab.value = "data"
  }
  else if (choosenTab["one-time"])
  {
    shownTab.value = "one-time"
  }
  else
  {
    shownTab.value = "time"
  }
})
watch(() => [input.value, shownTab.value], ([input, shownTab]) => {
  filteredTable.value = ScheduleData.value[shownTab as Trigger].filter((schedule: Schedule) => 
    schedule.title.toLowerCase().includes(input.toLowerCase()),
  )
  tablesLength.value[shownTab as Trigger] = filteredTable.value.length
})
watch(() => shownTab.value, (shownTab, prevShownTab) => {
  input.value = ""
  tablesLength.value[prevShownTab] = ScheduleData.value[prevShownTab].length
})
</script>

<template>
  <div class="table-page-container">
    <div class="table-data-container">
      <ScheduleHeader :input="input" @inputData="(value) => input = value"/>
      <Navbar :tablesLen="tablesLength" @choosenTab="(value) => choosenTab = value"/>
      <ScheduleTable :items="filteredTable" :shownTab="shownTab" @ScheduleDelete="(Schedule) => deleteSchedule(Schedule)"/>
    </div>
  </div>  
</template>

<style scoped>
  .table-data-container {
    width: 80%;
    margin: auto;
    background-color: #f7f8fb;
  }
  .table-page-container
  {
    height: 100vh;
    background-color: #f7f8fb;
  }
</style>
