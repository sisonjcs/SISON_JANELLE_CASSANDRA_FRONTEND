<script setup lang="ts">
</script>

<template>
  <!-- <header>
    <RouterLink to="/home">
      <p>
        Home
      </p>
    </RouterLink>
    <RouterLink to="/task-counter">
      <p>
        Task Counter
      </p>
    </RouterLink>
    <RouterLink to="/task-list">
      <p>
        Task List
      </p>
    </RouterLink>
  </header> -->
  <RouterView />
</template>

<style scoped>
header {
  display: flex;
  justify-content: center;
  gap: 30px;
  background: linear-gradient(
    135deg,
    #42B883,
    #2c9f75
  );
  padding: 10px;
}

header p {
  color: white;
  font-weight: bold;
  font-size: 20px;
  padding: 10px;
  border-radius: 10px;
}

header p:hover {
  background: rgb(30, 190, 129);
}

main {
  display: flex;
  justify-content: center;
  align-items: center;
}

</style>