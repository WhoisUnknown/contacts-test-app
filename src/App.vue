<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
html{
  box-sizing: border-box;
}

*, *:before, *:after{
  box-sizing: inherit;
}

#app{
  font-family: 'Fira Sans', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.reset-link{
  text-decoration: none;
  color:inherit;
  &:hover{
    text-decoration: none;
  }
}
.w100{
  width: 100%;
}
</style>
