<template>
  <div class="detail-container">
    <div class="detail-header">
      <span class="detail-title">일감 상세</span>
      <span class="button-zone" ><button class="update-btn btn">수정</button>
        <button class="delete-btn btn">삭제</button>
        </span>
    </div>
    <hr class="detail-line" />
    <table class="detail-table">
      <tr>
        <th>상태</th>
        <td>진행중</td>
        <th>진척도</th>
        <td class="detail-progress">
          <div class="detail-item-progress">
            <div class="detail-item-progress-fill"></div>
          </div>
          <span class="detail-item-progress-percent">50%</span>
        </td>
      </tr>
      <tr>
        <th>우선순위</th>
        <td>낮음</td>
        <th>시작일</th>
        <td>2021-0101</td>
      </tr>
      <tr>
        <th>담장자</th>
        <td>kade</td>
        <th>시작일</th>
        <td>2021-0101</td>
      </tr>
      <tr>
        <th>설명</th>
      </tr>
      <tr>
        <td colspan="4">asdfasdfasdfasdfasdjfklasdjklf</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.detail-container{
  border-radius: 25px;
  margin: 20px;
  height: calc(30vh - 40px);
  width: 50vw;
  padding: 20px;
  background: #2C2F3B;
}

.detail-header {
  display: flex;
  justify-content: space-between;
  width: 50%;
}

.detail-title{
  font-size: 22px;
}
.detail-line {
  width: 50%;
  margin: 0 0 6px 0;
}

.update-btn{
  background: #FF8906;
}

.delete-btn{
  background: #FF5C5C;
}

.btn{
  color: white;
  margin: 0 0 10px 10px;
  border-radius: 15px;
  width: 50px;
  padding: 2px;
  -webkit-filter: drop-shadow(0px 15px 15px rgba(10, 10, 10, 0.8));
}

.detail-table {
  border: none;
  width: 90%;
  text-align: left;
  height: 80%;
}

.detail-table th,td{
  width: 30px;
}

.detail-progress{
  position: relative;
}

.detail-item-progress {
  height: 20px;
  max-width: 60%;
  background: #414556;
}

.detail-item-progress-fill {
  height: 20px;
  width: 50%;
  background: #3f80a9;
}

.detail-item-progress-percent{
  position: absolute;
  top: 0;
  right: 10%;
}

</style>