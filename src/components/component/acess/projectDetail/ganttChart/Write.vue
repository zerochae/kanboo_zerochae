<template>
  <div class="write-container">
    <div class="write-header">
      <span>일감 상세</span>
      <span><button>작성</button></span>
    </div>
    <hr class="write-line" />
    <table class="write-table">
      <tr>
        <th>상태</th>
        <td><input type="text"></td>
        <th>진척도</th>
        <td>
          <div class="write-item-progress">
            <div class="write-item-progress-fill"></div>
          </div>
          50%
        </td>
      </tr>
      <tr>
        <th>우선순위</th>
        <td><input type="text"></td>
        <th>시작일</th>
        <td><input type="text"></td>
      </tr>
      <tr>
        <th>담장자</th>
        <td>kade</td>
        <th>시작일</th>
        <td><input type="text"></td>
      </tr>
      <tr>
        <th>설명</th>
      </tr>
      <tr>
        <td colspan="4"><input type="text"></td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {};
</script>

<style>
.write-header {
  display: flex;
  justify-content: space-between;
  width: 50%;
}
.write-line {
  width: 50%;
  margin: 10px 0 10px 0;
}
.write-table {
  border: none;
  width: 100%;
  text-align: left;
  height: 70%;
}

.write-table input{
    width: 50px;
    background: none;
    border: none;
    outline: none;
}

.write-item-progress{
  /* position: relative; */
  right: 0;
  display: inline-block;
  height: 20px;
  max-width: 100%;
  background: #fff;
}

.write-item-progress-fill {
  /* display: inline-block; */
  height: 20px;
  width: 50%;
  background: #3f80a9;
}
</style>