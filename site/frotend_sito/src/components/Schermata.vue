<template>
  <div class="Schermata">
      <span class="tab">
        <Tabellone/>
      </span>
      <span class="scritte">
        <Scritte/>
      </span>
  </div>
</template>

<script>
import Tabellone from '@/components/Tabellone.vue'
import Scritte from '@/components/Scritte.vue'

export default {
    components : {
        Tabellone,
        Scritte
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