<script setup>
import { onMounted } from 'vue'
import { useClassroom } from '@/stores/classroom'

const store = useClassroom()

onMounted(store.getClassrooms)
</script>

<template>
  <div class="flex flex-col mx-auto md:w-96 w-full">
    <h1 class="text-2xl font-bold mb-4 text-center">Classroom List</h1>

    <RouterLink :to="{ name: 'classrooms.create' }" class="btn btn-primary w-full">
      Add Classroom
    </RouterLink>

    <div class="border-t h-[1px] my-6"></div>
    <div class="flex flex-col gap-2">
      <div
        v-for="classroom in store.classrooms"
        :key="classroom.id"
        class="flex bg-gray-100 w-full p-2 justify-between"
      >
        <div class="flex items-center overflow-hidden w-full">
          <div class="text-xl plate">
            {{ classroom.name }}
          </div>
          <div class="font-normal text-gray-600 pl-2 grow truncate">
            {{ classroom.is_active }}
          </div>
        </div>
        <div class="flex gap-1">
          <RouterLink
            :to="{ name: 'classrooms.edit', params: { id: classroom.id } }"
            class="btn btn-secondary text-sm"
          >
            Edit
          </RouterLink>
          <button type="button" class="btn text-white bg-red-600 hover:bg-red-500 text-sm">
            X
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
