import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import QRCode from "react-qr-code";
import styled from "styled-components";
import WhiteBackArrowIcon from "../../assets/icons/WhiteBackArrow.svg";

const Payment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { productName, price } = location.state || {}; // 구매한 오브제 정보 받기
  const [qrUrl, setQrUrl] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const jquery = document.createElement("script");
    jquery.src = "https://code.jquery.com/jquery-1.12.4.min.js";
    const iamport = document.createElement("script");
    iamport.src = "https://cdn.iamport.kr/js/iamport.payment-1.2.0.js";
    document.head.appendChild(jquery);
    document.head.appendChild(iamport);
    return () => {
      document.head.removeChild(jquery);
      document.head.removeChild(iamport);
    };
  }, []);

  const requestPay = (pgProvider) => {
    if (!price) {
      alert("유효한 가격 정보를 확인할 수 없습니다.");
      return;
    }

    const { IMP } = window;
    IMP.init("imp11681810"); // 가맹점 식별 코드 사용

    IMP.request_pay(
      {
        pg: pgProvider, // PG 상점 ID
        pay_method: "card",
        merchant_uid: `mid_${new Date().getTime()}`, // Unique ID
        name: productName, // 구매한 오브제 이름
        amount: price, // 구매한 오브제 가격
        buyer_email: "test@naver.com",
        buyer_name: "코드쿡",
        buyer_tel: "010-1234-5678",
        buyer_addr: "서울특별시",
        buyer_postcode: "123-456",
        m_redirect_url: "/payment-result" // 결제 완료 후 돌아갈 URL
      },
      async (rsp) => {
        if (rsp.success) {
          const paymentUrl = `intent://${pgProvider}/pg?url=https://online-pay.kakao.com/pay/mockup/${rsp.imp_uid}#Intent;scheme=kakaotalk;package=com.kakao.talk;S.browser_fallback_url=https%3A%2F%2Fplay.google.com%2Fstore%2Fapps%2Fdetails%3Fid%3Dcom.kakao.talk;end`;
          setQrUrl(paymentUrl);

          // 주문 정보를 서버에 저장
          try {
            await axios.post("https://moodfriend.site/api/v1/payment/order", {
              productName: productName,
              price: price,
              impUid: rsp.imp_uid,
              merchantUid: rsp.merchant_uid,
              mileageIncrement: 0 // 예시로 0 설정
            });
          } catch (error) {
            console.error("주문 정보 저장 실패:", error);
          }
        } else {
          alert("결제 실패: " + rsp.error_msg);
        }
      }
    );
  };

  return (
    <>
      <Box>
        <BackButton src={WhiteBackArrowIcon} onClick={() => navigate(-1)} />
        <MyText>충전소</MyText>
      </Box>
      <TopRow>
        <ObjCheckText>결제 페이지</ObjCheckText>
      </TopRow>
      <PaymentContainer>
        <p>가격: {price !== null ? `${price}원` : "가격 조회 중..."}</p>
        <PaymentButton
          onClick={() => requestPay("kakaopay.TC0ONETIME")}
          disabled={price === null}
        >
          카카오페이로 결제하기
        </PaymentButton>
        <PaymentButton
          onClick={() => requestPay("tosspay.TOSSPAY")}
          disabled={price === null}
        >
          토스페이로 결제하기
        </PaymentButton>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        {qrUrl && (
          <QRCodeContainer>
            <h3>모바일로 결제하기</h3>
            <QRCode value={qrUrl} />
          </QRCodeContainer>
        )}
      </PaymentContainer>
    </>
  );
};

export default Payment;

const PaymentContainer = styled.div`
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const PaymentButton = styled.button`
  background-color: ${(props) => props.theme.color.primaryColor};
  color: #ffffff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 10px;
  margin-right: 10px;
  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  margin-top: 10px;
`;

const QRCodeContainer = styled.div`
  margin-top: 20px;
  text-align: center;
  h3 {
    margin-bottom: 10px;
  }
`;

const Box = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 15px;
  background-color: ${(props) => props.theme.color.primaryColor};
  position: relative;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
`;

const BackButton = styled.img`
  position: absolute;
  left: 20px;
  cursor: pointer;
  width: 24px;
  height: 24px;
`;

const MyText = styled.span`
  font-size: 18px;
  color: #ffffff;
  font-weight: bold;
`;

const TopRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px 0;
`;

const ObjCheckText = styled.span`
  color: black;
  font-size: 16px;
  font-weight: bold;
  margin-left: 40px;
`;
