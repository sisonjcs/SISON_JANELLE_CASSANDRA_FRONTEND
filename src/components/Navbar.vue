<script setup>
</script>

<template>
    <nav class="page-nav">
        <RouterLink to="/home">Home</RouterLink>
        <RouterLink to="/stats">Stats</RouterLink>
        <RouterLink to="/about">About</RouterLink>
    </nav>
</template>

<style scoped>
.page-nav {
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgb(235, 235, 235);
    max-width: fit-content;
    margin: 0 auto;
    padding: 10px;
    border-radius: 10px;
    gap: 10px;
}

.page-nav a {
    padding: 10px;
    border-radius: 10px;
    font-weight: bold;
    min-width: 100px;
    text-align: center;
}

.router-link-active {
    background: hsla(160, 100%, 37%, 1);
    padding: 10px;
    color: white;
}
</style>