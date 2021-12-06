<template>
  <div class="ganttChart-container">
    <Chart class="chart" />
    <div class="gantt-footer">
      <Detail class="detail" />
      <Write class="write" />
    </div>
  </div>
</template>

<script>
import Chart from "../../../component/acess/projectDetail/ganttChart/Chart.vue";
import Detail from "../../../component/acess/projectDetail/ganttChart/Detail.vue";
import Write from "../../../component/acess/projectDetail/ganttChart/Write.vue";

export default {
  components: {
    Chart,
    Detail,
    Write,
  },
};
</script>

<style scoped>
.ganttChart-container {
  padding: 20px;
}

.gantt-footer {
  display: flex;
}

.chart {
  height: calc(60vh - 70px);
  background: red;
  margin: 20px;
}

.detail {
  margin: 20px;
  height: calc(30vh - 40px);
  width: 50vw;
  padding: 20px;
  background: #2C2F3B;
}
.write {
  margin: 20px;
  height: calc(30vh - 40px);
  width: 50vw;
  padding: 20px;
  background: #2C2F3B;
}
</style>