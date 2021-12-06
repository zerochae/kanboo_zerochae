<template>
  <div class="detail-container">
    <div class="detail-header">
      <span>일감 상세</span>
      <span><button>수정</button> <button>삭제</button></span>
    </div>
    <hr class="detail-line" />
    <table class="detail-table">
      <tr>
        <th>상태</th>
        <td>진행중</td>
        <th>진척도</th>
        <td>
          <div class="detail-item-progress">
            <div class="detail-item-progress-fill">

            </div>
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
.detail-header {
  display: flex;
  justify-content: space-between;
  width: 50%;
}
.detail-line {
  width: 50%;
  margin: 10px 0 10px 0;
}
.detail-table {
  border: none;
  width: 100%;
  text-align: left;
  height: 80%;
}

.detail-item-progress {
  height: 20px;
  max-width: 60%;
  background: #fff;
}

.detail-item-progress-fill {
  height: 20px;
  width: 50%;
  background: #3f80a9;
}

</style>