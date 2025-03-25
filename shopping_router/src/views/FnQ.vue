<template>
            <div class="faq-container">
            <h2>자주 묻는 질문(FAQ)</h2>
            <table class="faq-table">
                <thead>
                    <tr><!--tr t의 row 줄은 꼭 필요-->
                        <th>번호</th><!--th t의 headline-->
                        <th>질문</th>                        
                    </tr>
                </thead>
                <tbody><!--faqs다 보여주고 paginatiedFAQs는 원하는 값 계산되어 보임-->
                    <template v-for="(faq, index) in paginatiedFAQs" :key="index"><!--template 태그로 잡히지 않으나 v-for같이 실행할 작업을 위해 씀-->
                        <!-- 질문줄 -->
                        <tr @click="toggleFAQ(index)" class="question-row" ><!--toggleFAQ()한이유는 내용이 많다보니 const 함수에 index 담아 쓰려고 -->
                            <!-- 번호 -->
                            <!-- <td>{{ index+1 }}</td>td t의 discription, index+1이어야 1부터 시작 -->
                            <td>{{ (cuurentPage - 1 ) * itemsPerpage + index + 1 }}</td><!--(cuurentPage - 1 ) * itemsPerpage start안에 있어 쓸수없어
                            밖에다 하나 더 만들어 쓸 수 있음 -->
                            <!-- 내용 -->
                            <td>{{ faq.question }}<span class="toggle-icon">{{ activeIndex === index ? "▲" : "▼"  }}</span></td>
                        </tr>
                        <!-- 답변줄 -->
                        <tr v-if="activeIndex === index" class="answser-row">
                            <td colspan="2">{{ faq.answer }}</td><!--colspan="2" 위에 메뉴가 2개라 병합한 것임 3개면 3을 씀-->
                        </tr>
                    </template>
                </tbody>
            </table>
            <!-- 페이지네이션  -->
            <div class="pagination">
                <button @click="previewPage" :disabled="cuurentPage === 1">이전</button><!--:disabled는 페이지 끝나면 비활성화를 위하여 설정-->
                <span>{{ cuurentPage }} / {{ totalPages }}</span>
                <button @click="nextPage" :disabled="cuurentPage === totalPages">다음</button>
            </div>
        </div>    
</template>

<script setup>
// import { preview } from 'vite';
import { computed, ref } from 'vue';
// FAQ 더미 데이터
const faqs = ref([
  {
    question: "배송 기간은 얼마나 걸리나요?",
    answer: "보통 2~3일 이내에 배송됩니다.",
  },
  {
    question: "반품은 어떻게 하나요?",
    answer: "고객센터로 문의 후 반품 접수가 가능합니다.",
  },
  {
    question: "회원 가입 없이 주문할 수 있나요?",
    answer: "네, 비회원 주문도 가능합니다.",
  },
  {
    question: "상품 교환이 가능한가요?",
    answer: "구매 후 7일 이내에 교환 신청이 가능합니다.",
  },
  {
    question: "포인트는 어떻게 사용하나요?",
    answer: "결제 시 포인트를 적용할 수 있습니다.",
  },
  {
    question: "할인 쿠폰은 어디서 받나요?",
    answer: "이벤트 페이지에서 확인할 수 있습니다.",
  },
  {
    question: "배송비는 얼마인가요?",
    answer: "3만원 이상 구매 시 무료 배송입니다.",
  },
  {
    question: "주문 취소는 어떻게 하나요?",
    answer: "마이페이지에서 취소 가능합니다.",
  },
  {
    question: "해외 배송이 되나요?",
    answer: "현재 해외 배송은 지원하지 않습니다.",
  },
  {
    question: "현금 영수증 발급이 되나요?",
    answer: "결제 시 현금영수증 요청이 가능합니다.",
  },
  {
    question: "A/S는 어떻게 받나요?",
    answer: "고객센터를 통해 A/S 접수 가능합니다.",
  },
  {
    question: "적립금 사용 조건이 있나요?",
    answer: "5,000포인트 이상부터 사용 가능합니다.",
  },
  {
    question: "출고 전 변경이 가능한가요?",
    answer: "출고 전 변경 요청은 고객센터에 문의하세요.",
  },
  {
    question: "정품 인증은 어떻게 하나요?",
    answer: "정품 보증서와 함께 인증 가능합니다.",
  },
  {
    question: "기프트 카드 사용 방법은?",
    answer: "결제 페이지에서 적용할 수 있습니다.",
  },
]);
// 현재 활성화된 질문 인덱스에 대한 값 (아코디언 기능을 위한 상태)
const activeIndex = ref(null)//자바스크립트는 시작전 빈배열 등으로 시작점을 설정해 두어야 함수등을 사용할 수 있다.
// 아코디언 기능의 토글함수(FAQ)클릭시 열고 닫기
const toggleFAQ = (index)=>{
    console.log(`명령어 위  현재 활성화된 FAQ 인덱스= ${activeIndex.value}`);//활성화된 FAQ 인덱스=클릭해 활성화된
    console.log(`클릭된 FAQ 인덱스=${index}`);//활성화된 FAQ 인덱스=클릭해 활성화된
    // 현재 클릭한 질문이 이미 열려있다면 닫고(null설정) 아니면 해당 인덱스로 변경하라 명령어
    activeIndex.value = activeIndex.value === index ?  null : index//여기는 토글기능 명령어 만듦 null 값이 있어서 다른 항목을 클릭하면 자동으로 닫힘역할됨
    console.log(`명령어 아래 현재 활성화된 FAQ 인덱스= ${activeIndex.value}`);//활성화된 FAQ 인덱스=클릭해 활성화된    
}
//페이지네이션 적용
// 페이지네이션 상태(현재 페이지를 저장)-그냥 보여질 것을 계산한 것임 
const cuurentPage = ref(1)//1페이지를 시작으로 담아 바로 보이게 담아둠
// 사용자가 보고 있는 페이지안 몇 줄을 보일 것인지 담음( 몇번까지 보는려는가)
const itemsPerpage = 5 //5줄 보임==> 여기만 바꾸면 됨 (보이는 줄 개수 설정으로)
// 총 15줄을 5개 씩보이려고 페이지수 계산
console.log(faqs.value.length);//15로 표시됨
console.log(faqs.value.length / itemsPerpage);//3로 표시됨
const totalPages = computed(()=>{    
    return Math.ceil(faqs.value.length / itemsPerpage)//Math.ceil 소수점을 반올림하는 명령어    
})
// 이제는 진짜 보여지게 현재 페이지에 표시할 FAQ목록(computed)
  // const start = (cuurentPage.value - 1) * itemsPerpage  //시작을 담아둠 0으로 써 0인덱스 쓰려고  
  // console.log(start);//0으로 나옴  
  // const result = faqs.value.slice(start , start + itemsPerpage) //인덱스 0/1/2/3/4 보이니 5개 보임
const paginatiedFAQs = computed(()=>{
    const start = (cuurentPage.value - 1) * itemsPerpage  //시작을 담아둠 0으로 써 0인덱스 쓰려고  
    console.log(`현재페이지:${start}`);//0으로 나옴  
    const result = faqs.value.slice(start , start + itemsPerpage) //인덱스 0/1/2/3/4 보이니 5개 보임
    return result
})
// 이전버튼 클릭시
const previewPage = ()=>{
    activeIndex.value = null;//하면 페이지 자동 닫힘됨
    if (cuurentPage.value > 1){// 다되면 비활성화를위해 if를 씀
        cuurentPage.value--//이전이니 --를 씀
    } 
} 
// 다음버튼 클릭시
const nextPage = ()=>{
    activeIndex.value = null;//하면 페이지 자동 닫힘됨
    if(cuurentPage.value < totalPages.value){//3으로 한정하면 계속 바꿔야 하니 totalPages로 설정 안 바뀌면 value 쓰는 것을 잊지 말자
        cuurentPage.value++
    }
}
</script>

<style scoped>
.faq-container{
    max-width: 700px;
    margin: auto;
    padding: 20px;
    text-align: center;
}
.faq-table{
    width: 100%;
    border-collapse: collapse ; /*태이블 명령어에 따로된 공간을 같이 붙게 만듦 */
}
th, td{
    border: 1px solid #ddd;
    padding: 20px;
}
th{
    background-color: #007bff;
    color: #fff;
}
.answser-row{
    background-color: #f9f9f9;
    cursor: pointer;
}
.toggle-icon{
    float: right;
    font-size: 12px;
    margin-right: 50px;
}
.question-row{
    text-align: left;
}
.faq-table td:first-child{
    text-align: center;
}
.pagination button:disabled{/*.pagination으로 잡아서 굳이 따로 하나하나 잡을 필요 없음, :disabled가 있어야 속성을 찾아감*/
    background-color: #ccc;
    cursor: not-allowed;/*커서 포인터 없이 금지 표시됨*/
}
</style>