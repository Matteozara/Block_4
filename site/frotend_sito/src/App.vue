<template>
  <div id="app">
    <h1 class="animate__animated animate__backInDown T">
      Block 4
    </h1>
    <router-view />
  </div>
</template>

<style>
::-webkit-scrollbar {
  display: none;
}
@import url('https://fonts.googleapis.com/css2?family=Sedgwick+Ave+Display&display=swap');

#app {


  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  position: fixed;
  top: 0;
  left: 0;
  min-width: 100%;
  min-height: 100%;
}
.T {
  font-size: 100px;
  color: white;
  font-family: 'Sedgwick Ave Display';
  text-shadow: 10px 10px 5px black;
  margin-bottom: 30px;
}

html, body {
  width: 100%;
  height:100%;
}

body {
    background: linear-gradient(-45deg, #00cccc, #1a8cff, #004d99, #000d1a);
    background-size: 400% 400%;
    animation: gradient 15s ease infinite;
}

@keyframes gradient {
    0% {
        background-position: 0% 50%;
    }
    50% {
        background-position: 100% 50%;
    }
    100% {
        background-position: 0% 50%;
    }
}
/*
.testo {
    color: #fff;
    background-image: -webkit-linear-gradient(92deg,#ffffff,#ffff00, #df5735);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    -webkit-animation: hue 60s infinite linear;
  font-size: 35px;
  margin-top: 5%;
  font-family: Arial;
}

@-webkit-keyframes hue {
    from {
      -webkit-filter: hue-rotate(0deg);
    }
    
    to {
      -webkit-filter: hue-rotate(360deg);
    }
}
*/
</style>