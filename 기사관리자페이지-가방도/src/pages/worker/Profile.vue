<template>
  <div class="profile-container">
    <div class="profile-header">
      <h1>가방 운반 기사 프로필</h1>
      <div class="status-indicator">
        <span class="status-dot" :class="{ active: isOnline }"></span>
        <span class="status-text"> 온라인</span>
      </div>
    </div>

    <div class="profile-content">
      <div class="profile-section">
        <div class="profile-image">
          <img :src="profileImage" alt="프로필 이미지" />
          <button class="image-upload-btn" @click="uploadImage">
            <i class="fas fa-camera"></i>
          </button>
        </div>

        <div class="profile-info">
          <div class="info-group">
            <label>이름</label>
            <div class="input-wrapper">
              <input
                v-model="driverName"
                type="text"
                placeholder="이름을 입력하세요"
                :disabled="!isEditing" />
              <i class="fas fa-user"></i>
            </div>
          </div>

          <div class="info-group">
            <label>연락처</label>
            <div class="input-wrapper">
              <input
                v-model="driverPhone"
                type="tel"
                placeholder="연락처를 입력하세요"
                :disabled="!isEditing" />
              <i class="fas fa-phone"></i>
            </div>
          </div>

          <div class="info-group">
            <label>이메일</label>
            <div class="input-wrapper">
              <input
                v-model="driverEmail"
                type="email"
                placeholder="이메일을 입력하세요"
                :disabled="!isEditing" />
              <i class="fas fa-envelope"></i>
            </div>
          </div>

          <div class="info-group">
            <label>운반 도구</label>
            <div class="input-wrapper">
              <input
                v-model="vehicleInfo"
                type="text"
                placeholder="운반 도구 정보를 입력하세요 (예: 수하물 카트, 보호 커버 등)"
                :disabled="!isEditing" />
              <i class="fas fa-truck"></i>
            </div>
          </div>
        </div>
      </div>

      <div class="profile-stats">
        <div class="stat-card">
          <div class="stat-icon">
            <i class="fas fa-check-circle"></i>
          </div>
          <div class="stat-content">
            <h3>총 완료 운반</h3>
            <p class="stat-value">156</p>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon">
            <i class="fas fa-star"></i>
          </div>
          <div class="stat-content">
            <h3>평균 평가</h3>
            <p class="stat-value">{{ averageRating }}</p>
            <div class="rating-stars">
              <i
                v-for="n in 5"
                :key="n"
                class="fas fa-star"
                :class="{ filled: n <= Math.round(averageRating) }"></i>
            </div>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon">
            <i class="fas fa-clock"></i>
          </div>
          <div class="stat-content">
            <h3>평균 운반 시간</h3>
            <p class="stat-value">30분</p>
          </div>
        </div>
      </div>

      <div class="profile-actions">
        <button
          v-if="!isEditing"
          class="action-button edit"
          @click="startEditing">
          <i class="fas fa-edit"></i>
          프로필 수정
        </button>
        <div v-else class="action-buttons">
          <button class="action-button save" @click="saveProfile">
            <i class="fas fa-save"></i>
            저장
          </button>
          <button class="action-button cancel" @click="cancelEditing">
            <i class="fas fa-times"></i>
            취소
          </button>
        </div>
      </div>
    </div>

    <!-- 이미지 업로드 모달 -->
    <div v-if="showImageModal" class="modal">
      <div class="modal-content">
        <div class="modal-header">
          <h3>프로필 이미지 변경</h3>
          <button class="close-button" @click="closeImageModal">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <div class="modal-body">
          <div class="image-upload-area">
            <input
              type="file"
              accept="image/*"
              @change="handleImageUpload"
              ref="fileInput" />
            <div class="upload-preview" v-if="imagePreview">
              <img :src="imagePreview" alt="미리보기" />
            </div>
            <div v-else class="upload-placeholder">
              <i class="fas fa-cloud-upload-alt"></i>
              <p>이미지를 선택하세요</p>
            </div>
          </div>
          <div class="modal-actions">
            <button class="action-button save" @click="saveImage">
              <i class="fas fa-save"></i>
              저장
            </button>
            <button class="action-button cancel" @click="closeImageModal">
              <i class="fas fa-times"></i>
              취소
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const driverName = ref("홍길동");
const driverPhone = ref("010-1234-5678");
const driverEmail = ref("driver@example.com");
const vehicleInfo = ref("수하물 카트, 보호 커버, 안전 스트랩");
const isOnline = ref(true);
const isEditing = ref(false);
const showImageModal = ref(false);
const imagePreview = ref(null);
const fileInput = ref(null);

const profileImage = ref("/images/default-avatar.png");
const averageRating = ref(4.8);

const startEditing = () => {
  isEditing.value = true;
};

const cancelEditing = () => {
  isEditing.value = false;
};

const saveProfile = () => {
  // 실제 API 호출 로직 추가 예정
  console.log("프로필 저장:", {
    name: driverName.value,
    phone: driverPhone.value,
    email: driverEmail.value,
    vehicle: vehicleInfo.value,
  });
  isEditing.value = false;
};

const uploadImage = () => {
  showImageModal.value = true;
};

const closeImageModal = () => {
  showImageModal.value = false;
  imagePreview.value = null;
};

const handleImageUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      imagePreview.value = e.target.result;
    };
    reader.readAsDataURL(file);
  }
};

const saveImage = () => {
  if (imagePreview.value) {
    profileImage.value = imagePreview.value;
  }
  closeImageModal();
};
</script>

<style scoped>
.profile-container {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.profile-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.profile-header h1 {
  font-size: 2rem;
  color: #2c3e50;
  margin: 0;
}

.status-indicator {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.status-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: #95a5a6;
}

.status-dot.active {
  background-color: #2ecc71;
}

.status-text {
  color: #7f8c8d;
  font-size: 0.875rem;
}

.profile-content {
  display: grid;
  gap: 2rem;
}

.profile-section {
  display: grid;
  grid-template-columns: 200px 1fr;
  gap: 2rem;
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 2rem;
}

.profile-image {
  position: relative;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  overflow: hidden;
}

.profile-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.image-upload-btn {
  position: absolute;
  bottom: 10px;
  right: 50%;
  transform: translateX(50%);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #3498db;
  color: white;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.image-upload-btn:hover {
  background-color: #2980b9;
}

.profile-info {
  display: grid;
  gap: 1.5rem;
}

.info-group {
  display: grid;
  gap: 0.5rem;
}

.info-group label {
  color: #7f8c8d;
  font-size: 0.875rem;
}

.input-wrapper {
  position: relative;
}

.input-wrapper input {
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 2.5rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
}

.input-wrapper input:disabled {
  background-color: #f8f9fa;
  cursor: not-allowed;
}

.input-wrapper input:focus {
  border-color: #3498db;
  outline: none;
}

.input-wrapper i {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #7f8c8d;
}

.profile-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.stat-card {
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.stat-icon {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: white;
}

.stat-card:nth-child(1) .stat-icon {
  background-color: #2ecc71;
}

.stat-card:nth-child(2) .stat-icon {
  background-color: #f1c40f;
}

.stat-card:nth-child(3) .stat-icon {
  background-color: #3498db;
}

.stat-content {
  flex: 1;
}

.stat-content h3 {
  margin: 0 0 0.5rem 0;
  color: #7f8c8d;
  font-size: 0.875rem;
}

.stat-value {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 600;
  color: #2c3e50;
}

.rating-stars {
  display: flex;
  gap: 0.25rem;
}

.rating-stars i {
  color: #ddd;
}

.rating-stars i.filled {
  color: #f1c40f;
}

.profile-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
}

.action-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.action-button.edit {
  background-color: #3498db;
  color: white;
}

.action-button.save {
  background-color: #2ecc71;
  color: white;
}

.action-button.cancel {
  background-color: #e74c3c;
  color: white;
}

.action-button:hover {
  opacity: 0.9;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.2);
  width: 90%;
  max-width: 500px;
  padding: 1.5rem;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.modal-header h3 {
  margin: 0;
  color: #2c3e50;
}

.close-button {
  background: none;
  border: none;
  font-size: 1.25rem;
  color: #7f8c8d;
  cursor: pointer;
}

.image-upload-area {
  border: 2px dashed #ddd;
  border-radius: 5px;
  padding: 2rem;
  text-align: center;
  cursor: pointer;
}

.upload-preview {
  width: 200px;
  height: 200px;
  margin: 0 auto;
  border-radius: 5px;
  overflow: hidden;
}

.upload-preview img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.upload-placeholder {
  color: #7f8c8d;
}

.upload-placeholder i {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1.5rem;
}

@media (max-width: 768px) {
  .profile-container {
    padding: 1rem;
  }

  .profile-section {
    grid-template-columns: 1fr;
  }

  .profile-image {
    margin: 0 auto;
  }

  .profile-stats {
    grid-template-columns: 1fr;
  }

  .profile-actions {
    flex-direction: column;
  }

  .action-button {
    width: 100%;
    justify-content: center;
  }
}
</style>
