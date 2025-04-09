<template>
    <div class="reservation-status">
      <div class="status-container">
        <h2>예약 상태</h2>
  
        <div class="status-card">
          <div class="status-header">
            <h3>예약 정보</h3>
            <span class="status-badge"> {{}} </span>
          </div>
  
          <div class="status-content">
            <div class="info-grid">
              <div class="info-item">
                <label>예약 번호</label>
                <p>{{}}</p>
              </div>
              <div class="info-item">
                <label>서비스 유형</label>
                <p>{{}}</p>
              </div>
              <div class="info-item">
                <label>예약 날짜</label>
                <p>{{}}</p>
              </div>
              <div class="info-item">
                <label>예약 시간</label>
                <p>{{}}</p>
              </div>
              <div class="info-item">
                <label>주소</label>
                <p>{{}}</p>
              </div>
              <div class="info-item">
                <label>상세주소</label>
                <p>{{}}</p>
              </div>
            </div>
  
            <div class="notes-section">
              <label>추가 요청사항</label>
              <p>{{}}</p>
            </div>
          </div>
        </div>
  
        <div class="process-flow">
          <h3>진행 상태</h3>
          <div class="steps">
            <div>
              <div class="step-number">{{}}</div>
              <div class="step-content">
                <h4>{{}}</h4>
                <p>{{}}</p>
              </div>
            </div>
          </div>
        </div>
  
        <div class="action-buttons">
          <button class="modify-btn">예약 수정</button>
          <button class="cancel-btn">예약 취소</button>
          <button class="list-btn">예약 목록</button>
        </div>
      </div>
  
      <!-- 취소 확인 모달 -->
      <div class="modal">
        <div class="modal-content">
          <h3>예약 취소 확인</h3>
          <div class="modal-body">
            <p>정말로 예약을 취소하시겠습니까?</p>
            <p class="warning">취소 후에는 복구할 수 없습니다.</p>
          </div>
          <div class="modal-actions">
            <button class="cancel-btn">아니오</button>
            <button class="confirm-btn">예, 취소합니다</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup></script>
  
  <style scoped>
  .reservation-status {
    padding: 2rem;
    max-width: 1200px;
    margin: 0 auto;
  }
  
  .status-container {
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    padding: 2rem;
  }
  
  h2 {
    margin-bottom: 2rem;
    color: #333;
  }
  
  h3 {
    margin-bottom: 1.5rem;
    color: #333;
  }
  
  .status-card {
    background: #f5f5f5;
    border-radius: 8px;
    padding: 1.5rem;
    margin-bottom: 2rem;
  }
  
  .status-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
  }
  
  .status-badge {
    padding: 0.5rem 1rem;
    border-radius: 4px;
    font-size: 0.9rem;
    font-weight: 500;
  }
  
  .status-badge.upcoming {
    background: #e3f2fd;
    color: #1976d2;
  }
  
  .status-badge.in_progress {
    background: #fff3e0;
    color: #f57c00;
  }
  
  .status-badge.completed {
    background: #e8f5e9;
    color: #4caf50;
  }
  
  .status-badge.cancelled {
    background: #ffebee;
    color: #f44336;
  }
  
  .info-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1.5rem;
  }
  
  .info-item label {
    display: block;
    color: #666;
    margin-bottom: 0.5rem;
  }
  
  .info-item p {
    margin: 0;
    color: #333;
  }
  
  .notes-section {
    margin-top: 1.5rem;
    padding-top: 1.5rem;
    border-top: 1px solid #ddd;
  }
  
  .notes-section label {
    display: block;
    color: #666;
    margin-bottom: 0.5rem;
  }
  
  .notes-section p {
    margin: 0;
    color: #333;
  }
  
  .process-flow {
    margin-bottom: 2rem;
  }
  
  .steps {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }
  
  .step {
    display: flex;
    gap: 1rem;
    opacity: 0.5;
  }
  
  .step.active {
    opacity: 1;
  }
  
  .step.completed {
    opacity: 1;
  }
  
  .step-number {
    width: 2rem;
    height: 2rem;
    background: #ddd;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 500;
    color: #666;
  }
  
  .step.active .step-number {
    background: #4caf50;
    color: white;
  }
  
  .step.completed .step-number {
    background: #4caf50;
    color: white;
  }
  
  .step-content {
    flex: 1;
  }
  
  .step-content h4 {
    margin: 0 0 0.5rem 0;
    color: #333;
  }
  
  .step-content p {
    margin: 0;
    color: #666;
    font-size: 0.9rem;
  }
  
  .action-buttons {
    display: flex;
    justify-content: flex-end;
    gap: 0.5rem;
  }
  
  .modify-btn,
  .cancel-btn,
  .list-btn {
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-weight: 500;
  }
  
  .modify-btn {
    background: #4caf50;
    color: white;
  }
  
  .modify-btn:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
  
  .cancel-btn {
    background: #f44336;
    color: white;
  }
  
  .cancel-btn:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
  
  .list-btn {
    background: #f5f5f5;
    color: #333;
  }
  
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
  }
  
  .modal-content {
    background: white;
    padding: 2rem;
    border-radius: 8px;
    width: 90%;
    max-width: 500px;
  }
  
  .modal-body {
    margin-bottom: 1.5rem;
  }
  
  .modal-body .warning {
    color: #f44336;
    margin-top: 0.5rem;
  }
  
  .modal-actions {
    display: flex;
    justify-content: flex-end;
    gap: 0.5rem;
  }
  
  .modal-actions .cancel-btn {
    background: #f5f5f5;
    color: #333;
  }
  
  .modal-actions .confirm-btn {
    background: #f44336;
    color: white;
  }
  
  @media (max-width: 768px) {
    .reservation-status {
      padding: 1rem;
    }
  
    .status-container {
      padding: 1.5rem;
    }
  
    .info-grid {
      grid-template-columns: 1fr;
    }
  
    .action-buttons {
      flex-direction: column;
    }
  }
  </style>
  