<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import type { Ref } from 'vue';
import mockData from "./mock/mock-schedules.json";
import type { Schedule, DataByTrigger, Trigger } from "./models/Schedule"
import ScheduleTable from './components/ScheduleTable.vue';
import Navbar from './components/Navbar.vue';
import ScheduleHeader from './components/ScheduleHeader.vue'
import { ScheduleService } from './services/ScheduleService';
import Spinner from './components/Spinner.vue'

const data: Ref<Schedule[] | []> = ref([])
const filterdData: Ref<DataByTrigger> = ref({ "one-time": [], 'data': [], 'time': [] });

const isLoading = ref(true)
const input = ref("")
const shownTab: Ref<Trigger> = ref("data")

async function fetchData() {
  const res = await new Promise<Schedule[]>((resolve) => {
    setTimeout(() => {
      resolve(mockData as Schedule[]);
    }, 1000);
  });
  data.value = res;
  isLoading.value = false;
}

const deleteSchedule = (deletedItem: { deleteSchedule: Trigger, id: string }) => {
  data.value = data.value.filter(({ creator }) => creator.id.toString() !== deletedItem.id.toString())
}

const tabChanged = (tab: Trigger) => {
  shownTab.value = tab;
}

const searchChanged = (search: string) => {
  const formattedData: DataByTrigger = { "one-time": [], 'data': [], 'time': [] }
  data.value.forEach((schedule: Schedule) => {
    if (schedule.title.toLowerCase().includes(search.toLowerCase()))
      formattedData[schedule.trigger].push(ScheduleService.formatData(schedule))
  })
  filterdData.value = formattedData;
}

watch([data], ([data]) => {
  const formattedData: DataByTrigger = { "one-time": [], 'data': [], 'time': [] }
  data.forEach((task: Schedule) => formattedData[task.trigger].push(ScheduleService.formatData(task)))
  filterdData.value = formattedData;
})

onMounted(fetchData);

</script>

<template>
  <div class="table-page-container">
    <div class="table-data-container">
      <div v-if="!isLoading">
        <ScheduleHeader :input="input" @inputData="searchChanged" />
        <Navbar :filterdData="filterdData" @tab-changed="tabChanged" :shownTab="shownTab" />
        <ScheduleTable :items="filterdData[shownTab]" :shownTab="shownTab"
          @ScheduleDelete="(Schedule) => deleteSchedule(Schedule)" />
      </div>
      <div class="spinner" v-else>
        <Spinner />
      </div>
    </div>
  </div>
</template>

<style scoped>
.table-page-container .table-data-container {
  width: 90%;
  margin: auto;
  background-color: var(--primary);
}

.table-page-container {
  height: 100vh;
  background-color: var(--primary);
}

.spinner {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
</style>