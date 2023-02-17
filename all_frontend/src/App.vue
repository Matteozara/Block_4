<template>
  <div id="app">
    <div class="rettangolo">
      <h1 class="nome">Block 4</h1>
    </div>
    <router-view/>
  </div>
</template>

<style>
::-webkit-scrollbar {
  display: none;
}

#app {
  background-image: linear-gradient(to top right, #e8f1f3 0%, #75cbf3e0 50%, #3194f0ea 100%);
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  position: absolute;
  top: 0; 
  left: 0; 
  min-width: 100%;
  min-height: 100%;
}
.scroll-off {
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    height: 100%;
    max-height: 100vh;
    overflow: hidden;
    padding-bottom: 1px;
}
.nome {
  font-size: 90px;
  color: #e6f5ff;
}
.rettangolo {
  width: 400px;
  height: 100px;
  background-color: #007acc;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 60px;
}
</style>
