<template>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/settings">Settings</router-link>
  </div>
  <router-view /> <!-- router-view is a functional component that renders the matched component for the given path -->
</template>

<style>

body {
  color: #fff;
  background: #2c3e50;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #fff;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>