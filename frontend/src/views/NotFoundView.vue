<template>
  <div class="not-found">
    <h2>404 - Page Not Found</h2>
    <p>The page you are looking for does not exist.</p>
    <router-link to="/" class="btn">Go to Home</router-link>
  </div>
</template>

<script>
export default {
  name: 'NotFoundView'
}
</script>

<style scoped>
.not-found {
  text-align: center;
  padding: 50px 0;
}

h2 {
  font-size: 2rem;
  margin-bottom: 20px;
}

p {
  margin-bottom: 30px;
  font-size: 1.2rem;
}
</style>