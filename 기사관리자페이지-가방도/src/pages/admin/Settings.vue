<template>
  <div class="settings-container">
    <h1 class="settings-title">설정</h1>

    <div class="settings-grid">
      <!-- 알림 설정 -->
      <div class="settings-card">
        <div class="card-header">
          <i class="fas fa-bell"></i>
          <h2>알림 설정</h2>
        </div>
        <div class="card-body">
          <div class="setting-item">
            <div class="setting-info">
              <h3>이메일 알림</h3>
              <p>새로운 예약 및 변경사항을 이메일로 받습니다.</p>
            </div>
            <label class="switch">
              <input type="checkbox" v-model="settings.emailNotifications" />
              <span class="slider round"></span>
            </label>
          </div>

          <div class="setting-item">
            <div class="setting-info">
              <h3>푸시 알림</h3>
              <p>실시간 예약 알림을 받습니다.</p>
            </div>
            <label class="switch">
              <input type="checkbox" v-model="settings.pushNotifications" />
              <span class="slider round"></span>
            </label>
          </div>

          <div class="setting-item">
            <div class="setting-info">
              <h3>취소 알림</h3>
              <p>예약 취소 시 알림을 받습니다.</p>
            </div>
            <label class="switch">
              <input type="checkbox" v-model="settings.cancelNotifications" />
              <span class="slider round"></span>
            </label>
          </div>
        </div>
      </div>

      <!-- 테마 설정 -->
      <div class="settings-card">
        <div class="card-header">
          <i class="fas fa-palette"></i>
          <h2>테마 설정</h2>
        </div>
        <div class="card-body">
          <div class="setting-item">
            <div class="setting-info">
              <h3>다크 모드</h3>
              <p>어두운 테마로 전환합니다.</p>
            </div>
            <label class="switch">
              <input type="checkbox" v-model="settings.darkMode" />
              <span class="slider round"></span>
            </label>
          </div>

          <div class="setting-item">
            <div class="setting-info">
              <h3>색상 테마</h3>
              <p>인터페이스의 주요 색상을 선택합니다.</p>
            </div>
            <div class="color-picker">
              <div
                v-for="color in colorThemes"
                :key="color.value"
                class="color-option"
                :class="{ active: settings.colorTheme === color.value }"
                :style="{ backgroundColor: color.value }"
                @click="settings.colorTheme = color.value"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- 시스템 설정 -->
      <div class="settings-card">
        <div class="card-header">
          <i class="fas fa-cog"></i>
          <h2>시스템 설정</h2>
        </div>
        <div class="card-body">
          <div class="setting-item">
            <div class="setting-info">
              <h3>자동 저장</h3>
              <p>변경사항을 자동으로 저장합니다.</p>
            </div>
            <label class="switch">
              <input type="checkbox" v-model="settings.autoSave" />
              <span class="slider round"></span>
            </label>
          </div>

          <div class="setting-item">
            <div class="setting-info">
              <h3>언어</h3>
              <p>인터페이스 언어를 선택합니다.</p>
            </div>
            <select v-model="settings.language" class="language-select">
              <option value="ko">한국어</option>
              <option value="en">English</option>
              <option value="ja">日本語</option>
            </select>
          </div>
        </div>
      </div>

      <!-- 데이터 관리 -->
      <div class="settings-card">
        <div class="card-header">
          <i class="fas fa-database"></i>
          <h2>데이터 관리</h2>
        </div>
        <div class="card-body">
          <div class="setting-item">
            <div class="setting-info">
              <h3>데이터 백업</h3>
              <p>모든 데이터를 백업합니다.</p>
            </div>
            <button class="action-button" @click="backupData">백업하기</button>
          </div>

          <div class="setting-item">
            <div class="setting-info">
              <h3>데이터 복원</h3>
              <p>백업된 데이터를 복원합니다.</p>
            </div>
            <button class="action-button restore" @click="restoreData">
              복원하기
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="settings-footer">
      <button class="save-button" @click="saveSettings">설정 저장</button>
    </div>

    <!-- 저장 완료 토스트 -->
    <div v-if="showToast" class="toast">설정이 저장되었습니다.</div>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";

const showToast = ref(false);

const settings = reactive({
  emailNotifications: true,
  pushNotifications: true,
  cancelNotifications: true,
  darkMode: false,
  colorTheme: "#3498db",
  autoSave: true,
  language: "ko",
});

const colorThemes = [
  { value: "#3498db", label: "파란색" },
  { value: "#2ecc71", label: "초록색" },
  { value: "#e74c3c", label: "빨간색" },
  { value: "#f1c40f", label: "노란색" },
  { value: "#9b59b6", label: "보라색" },
];

const saveSettings = () => {
  // 실제로는 API 호출로 설정을 저장
  showToast.value = true;
  setTimeout(() => {
    showToast.value = false;
  }, 3000);
};

const backupData = () => {
  // 데이터 백업 로직
  alert("데이터 백업이 시작되었습니다.");
};

const restoreData = () => {
  // 데이터 복원 로직
  alert("데이터 복원이 시작되었습니다.");
};
</script>

<style scoped>
.settings-container {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.settings-title {
  font-size: 2rem;
  color: #2c3e50;
  margin-bottom: 2rem;
}

.settings-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.settings-card {
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.card-header {
  padding: 1.5rem;
  background: #f8f9fa;
  border-bottom: 1px solid #eee;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.card-header i {
  font-size: 1.5rem;
  color: #3498db;
}

.card-header h2 {
  margin: 0;
  font-size: 1.25rem;
  color: #2c3e50;
}

.card-body {
  padding: 1.5rem;
}

.setting-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
  border-bottom: 1px solid #eee;
}

.setting-item:last-child {
  border-bottom: none;
}

.setting-info h3 {
  margin: 0 0 0.25rem 0;
  color: #2c3e50;
  font-size: 1rem;
}

.setting-info p {
  margin: 0;
  color: #7f8c8d;
  font-size: 0.875rem;
}

/* 토글 스위치 스타일 */
.switch {
  position: relative;
  display: inline-block;
  width: 50px;
  height: 24px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: 0.4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 16px;
  width: 16px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  transition: 0.4s;
}

input:checked + .slider {
  background-color: #3498db;
}

input:checked + .slider:before {
  transform: translateX(26px);
}

.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}

/* 색상 선택기 */
.color-picker {
  display: flex;
  gap: 0.5rem;
}

.color-option {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  cursor: pointer;
  border: 2px solid transparent;
  transition: transform 0.2s ease;
}

.color-option:hover {
  transform: scale(1.1);
}

.color-option.active {
  border-color: #2c3e50;
}

/* 언어 선택 */
.language-select {
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: white;
  font-size: 0.875rem;
}

/* 액션 버튼 */
.action-button {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 5px;
  background-color: #3498db;
  color: white;
  cursor: pointer;
  font-size: 0.875rem;
  transition: background-color 0.3s ease;
}

.action-button:hover {
  background-color: #2980b9;
}

.action-button.restore {
  background-color: #2ecc71;
}

.action-button.restore:hover {
  background-color: #27ae60;
}

/* 저장 버튼 */
.settings-footer {
  display: flex;
  justify-content: flex-end;
  margin-top: 2rem;
}

.save-button {
  padding: 0.75rem 2rem;
  border: none;
  border-radius: 5px;
  background-color: #3498db;
  color: white;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.save-button:hover {
  background-color: #2980b9;
}

/* 토스트 메시지 */
.toast {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  padding: 1rem 2rem;
  background-color: #2ecc71;
  color: white;
  border-radius: 5px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  animation: slideIn 0.3s ease, fadeOut 0.3s ease 2.7s;
}

@keyframes slideIn {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes fadeOut {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}

@media (max-width: 768px) {
  .settings-container {
    padding: 1rem;
  }

  .settings-grid {
    grid-template-columns: 1fr;
  }

  .setting-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }

  .toast {
    bottom: 1rem;
    right: 1rem;
    left: 1rem;
    text-align: center;
  }
}
</style>
