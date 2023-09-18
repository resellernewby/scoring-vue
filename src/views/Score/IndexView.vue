<template>
  <div class="flex flex-col mx-auto md:w-96 w-full">
    <h1 class="text-2xl font-bold mb-4 text-center">Score List View</h1>
    <RouterLink :to="{ name: 'score.create' }" class="btn btn-primary w-full">
      Add Score
    </RouterLink>
  </div>
</template>
