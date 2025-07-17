<template>
  <div class="app">
    <header>
      <div class="logo-container">
        <img src="/logo.svg" alt="Flag Explorer Logo" class="logo" />
        <h1>Flag Explorer</h1>
      </div>
      <p class="tagline">Discover countries from around the world. Explore flags, learn about populations, capitals, and more.</p>
    </header>
    <main>
      <router-view />
    </main>
    <footer>
      <p>&copy; 2025 Flag Explorer</p>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: Arial, sans-serif;
  line-height: 1.6;
  color: #333;
  background-color: #f5f5f5;
}

.app {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

header {
  margin-bottom: 30px;
  text-align: center;
}

.logo-container {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
}

.logo {
  width: 48px;
  height: 48px;
  margin-right: 15px;
  color: #3498db;
}

.tagline {
  color: #666;
  font-size: 1.1rem;
  max-width: 800px;
  margin: 0 auto;
}

main {
  min-height: calc(100vh - 200px);
}

footer {
  margin-top: 40px;
  text-align: center;
  font-size: 0.8rem;
  color: #666;
  padding: 20px 0;
}

/* Button styles */
.btn {
  display: inline-block;
  background: #3498db;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  text-decoration: none;
  font-size: 1rem;
  margin-bottom: 20px;
  transition: background-color 0.3s;
}

.btn:hover {
  background: #2980b9;
}
</style>