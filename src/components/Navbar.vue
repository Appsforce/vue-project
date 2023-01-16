<script setup lang="ts">
import type { DataByTrigger, Trigger } from '@/models/Schedule';



const props = defineProps<{
    filterdData: DataByTrigger,
    shownTab: Trigger,
}>();
defineEmits<{ (e: 'tab-changed', tab: Trigger): void }>();
</script>

<template>
    <div class="nav-container">
        <div class="nav-item" :class="{ 'nav-item-clicked': shownTab === 'data' }"
            @click="$emit('tab-changed', 'data')">
            <div>
                <v-icon size="20" icon="mdi-chart-line"></v-icon>
                Data triggered
                ({{ filterdData.data.length }})
            </div>
        </div>
        <div class="nav-item" :class="{ 'nav-item-clicked': shownTab === 'time' }"
            @click="$emit('tab-changed', 'time')">
            <div>
                <v-icon size="20" icon="mdi-clock-time-eight-outline"></v-icon>
                Time triggered ({{ filterdData.time.length }})
            </div>
        </div>
        <div class="nav-item" :class="{ 'nav-item-clicked': shownTab === 'one-time' }"
            @click="$emit('tab-changed', 'one-time')">
            <div>
                <v-icon size="20" icon="mdi-send-outline"></v-icon>
                Sent once ({{ filterdData["one-time"].length }})
            </div>
        </div>
    </div>
</template>

<style>
.nav-container {
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 55px;
}

.nav-item {
    display: flex;
    align-self: center;
    justify-content: center;
    gap: 10px;
    line-height: 55px;
    font-weight: bold;
    width: 33.333%;
    font-size: 23px;
    height: 55px;
    color: var(--navColor);
    border-bottom: 1px solid var(--navColor);
}

.nav-item:hover {
    cursor: pointer;
    color: var(--navHover);
    border-bottom: 1px solid var(--navHover);
}

.nav-item-clicked {
    display: flex;
    align-items: center;
    font-weight: bold;
    color: var(--navHover);
    border-bottom: 5px solid var(--navHover);
}

.nav-item-clicked:hover {
    border-bottom: 5px solid var(--navHover);
}

.title {
    padding: 30px;
}

.container {
    background-color: var(--primary);
}

.header {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
}
</style>