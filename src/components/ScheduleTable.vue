<script lang="ts">
import type { Trigger } from '@/models/Schedule';

export default {
  props: ['items', 'shownTab'],
  emits: ['ScheduleDelete'],
  data () {
    return {
    sortBy: [{ key: 'creator.name', order: 'asc' }],
    headers: [
      {
        title: 'Title',
        align: 'start',
        sortable: true,
        key: 'title',
      },
      { title: 'CREATOR', key: 'creator.name', sortable: true},
      { title: 'RECIPIENTS', key: 'recipients', sortable: true},
      { title: 'INTERVAL', key: 'interval' },
      { title: 'NEXT DELIVERY', key: 'next_delivery' },
      { title: '', key: 'delete', sortable: false },
    ],
  }},
  methods: {
    deleteSchedule(id: string, shownTab: Trigger) {
        this.$emit('ScheduleDelete', {
          id: id,
          deleteSchedule: shownTab
        })
    }
  }
}
</script>
<template>
  <v-data-table
    v-model:sort-by="sortBy"
    :headers="headers"
    :items="items"
    class="elevation-1"
  >
    <template v-slot:item.creator.name="{ item }">
      <span onmouseover="">{{ item.raw.creator.name }}</span>
    </template>
    <template v-slot:item.delete="{ item }">
      <img class="icon" src="../assets/icons/trash_icon.png" @click="deleteSchedule(item.raw.creator.id, shownTab)"/>
    </template>
    <template v-slot:item.interval="{ item }">
      <span class="interval">{{ item.raw.interval }}</span>
    </template>
  </v-data-table>
</template>

<style scoped>
.icon {
  width: 25px;
  height: 25px;
}
.icon:hover {
  cursor: pointer;
}
.v-data-table__tr:hover .icon{
  visibility: visible;
}
.v-data-table__tr .icon {
  visibility: hidden;
}
.interval {
  background-color: #d9ffd9;
  padding: 5px;
}
</style>