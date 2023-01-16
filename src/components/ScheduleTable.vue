<script lang="ts">
import type { Trigger } from '@/models/Schedule';

export default {
  props: ['items', 'shownTab'],
  emits: ['ScheduleDelete'],
  data() {
    return {
      chooseClass: true,
      sortBy: [{ key: 'creator.name', order: 'asc' }],
      headers: [
        { title: 'TITLE', align: 'start', sortable: true, key: 'title', width: 200 },
        { title: 'CREATOR', key: 'creator.name', sortable: true, width: 160 },
        { title: 'RECIPIENTS', key: 'recipients', sortable: true },
        { title: 'INTERVAL', key: 'interval' },
        { title: 'NEXT DELIVERY', key: 'next_delivery', width: 190 },
        { title: '', key: 'delete', sortable: false },
      ],
    }
  },
  methods: {
    deleteSchedule(id: string, shownTab: Trigger) {
      this.$emit('ScheduleDelete', {
        id: id,
        deleteSchedule: shownTab
      })
    },
    itemRowBackground: function () {
      return this.chooseClass ? 'colored-row' : 'colored-row'
    },
    firstLetters(creatorName: string, item: any) {
      const firstLetters = creatorName.match(/\b(\w)/g); //Finds first letter of word in string
      return firstLetters?.join('')
    }
  }
}
</script>
<template>
  <v-data-table v-model:sort-by="sortBy" :headers="headers" :items="items" class="elevation-1" hide-default-footer>
    <template v-slot:item.creator.name="{ item }">
      <div class="creator-container"><span class="letters-box">{{
        firstLetters(item.raw.creator.name,
        item)
      }}</span><span>{{ item.raw.creator.name }}</span></div>
    </template>
    <template v-slot:item.delete="{ item }">
      <img class="icon" src="../assets/icons/trash_icon.png" @click="deleteSchedule(item.raw.creator.id, shownTab)" />
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

.v-data-table__tr:hover .icon {
  visibility: visible;
}

.v-data-table__tr .icon {
  visibility: hidden;
}

:deep(.v-data-table__tr) {
  font-size: 14px;
  height: 70px;
}

:deep(.v-data-table__tr:nth-of-type(odd) td) {
  background-color: var(--rowCol);
}

:deep(.v-data-table__tr:hover td) {
  background-color: var(--tableHover);
}

:deep(.v-data-table__th) {
  color: var(--rowColor) !important;
  background-color: var(--primary) !important;
}

:deep(.v-data-table-footer) {
  display: none;
}

.interval {
  background-color: var(--intervalColor);
  padding: 5px;
  border-radius: 3px;
}

.colored-row {
  background-color: var(--rowCol);
}

.letters-box {
  margin-right: 8px;
  color: var(--lettersBox);
  background-color: var(--lettersBoxBackground);
  font-size: 10px;
  font-weight: 600;
  padding: 2px 3px 2px 3px;
}

.creator-container {
  display: flex;
  align-items: center;
}
</style>