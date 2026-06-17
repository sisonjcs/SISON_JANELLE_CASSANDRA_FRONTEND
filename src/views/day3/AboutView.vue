<script setup>
</script>

<template>
    <div class="about-view">
        <!-- <h1>
            about
        </h1> -->
        <div class="about-content">
            <img src="@/assets/logo.svg" width="70px" height="70px" />
            <h1>
                About
            </h1>
            <p>
                A task management page made with Vue.
            </p>
        </div>
    </div>
</template>

<style scoped>
.about-view {
    width: 100%;
    height: 100vh;
    margin: 40px auto;
}

.about-content {
    max-width: 480px;
    width: 100%;
    font-family: Arial, sans-serif;
    padding: 32px;
    margin: 50px auto;
    background: #f9fafb;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.2);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.about-content h1 {
    font-weight: bold;
}

</style>