<template>
    <div class="card">
      <form>
        <div>
          <label for="name">이름:</label>
          <input type="text" id="name" required />
        </div>
        <div>
          <label for="date">날짜:</label>
          <input type="date" id="date" required />
        </div>
        <div>
          <label for="message">메시지:</label>
          <textarea id="message"></textarea>
        </div>
        <button class="button primary">예약하기</button>
      </form>
    </div>
  </template>
  