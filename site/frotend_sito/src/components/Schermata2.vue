<template>
  <div class="Schermata">
      <span class="tab">
        <Tabellone2/>
      </span>
      <span class="scritte">
        <Scritte2/>
      </span>
  </div>
</template>

<script>
import Tabellone2 from '@/components/Tabellone2.vue'
import Scritte2 from '@/components/Scritte2.vue'

export default {
    components : {
        Tabellone2,
        Scritte2
    }
}
</script>

<style scoped>
.Schermata {
    display: flex;
}
.tab {
    width: 30%;
    height: 30%;
    padding-right: 15%;
    padding-left: 5%;
}
.scritte {
    width: 50%;
    height: 100%;
    text-align: left;
}
</style>