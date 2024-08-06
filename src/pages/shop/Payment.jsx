import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const PaymentPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // 아임포트 스크립트 로드
    const script = document.createElement("script");
    script.src = "https://cdn.iamport.kr/js/iamport.payment-1.2.0.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handlePayment = () => {
    const order = {
      productId: 1,
      productName: "상품1",
      price: 3000,
      quantity: 1,
      buyerName: "김민규",
      buyerTel: "010-1234-5678"
    };

    const impCode = process.env.REACT_APP_IMP_CODE;

    if (!window.IMP) {
      alert("아임포트 로드 중 오류가 발생했습니다.");
      return;
    }

    window.IMP.init(impCode);
    window.IMP.request_pay(
      {
        pg: "kakaopay",
        pay_method: "card",
        merchant_uid: `order_${new Date().getTime()}`, // 주문번호 생성
        name: order.productName,
        amount: order.price, // 결제 가격
        buyer_name: order.buyerName,
        buyer_tel: order.buyerTel,
        m_redirect_url: `${window.location.origin}/payment-result` // 리디렉션 URL 설정
      },
      (rsp) => {
        if (rsp.success) {
          // 결제 성공 시 백엔드로 결과를 전송
          fetch("/api/v1/payment/order", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              impUid: rsp.imp_uid,
              merchantUid: rsp.merchant_uid,
              order
            })
          })
            .then((res) => res.json())
            .then((result) => {
              if (result.success) {
                alert("결제가 완료되었습니다.");
                navigate("/"); // 결제 완료 후 메인 페이지로 이동
              } else {
                alert("결제 처리에 실패하였습니다.");
              }
            })
            .catch((error) => {
              console.error("결제 처리 중 오류 발생:", error);
              alert("결제 처리 중 오류가 발생했습니다.");
            });
        } else {
          alert(`결제에 실패하였습니다. ${rsp.error_msg}`);
        }
      }
    );
  };

  return (
    <div>
      <button onClick={handlePayment}>카카오페이 결제</button>
    </div>
  );
};

export default PaymentPage;
