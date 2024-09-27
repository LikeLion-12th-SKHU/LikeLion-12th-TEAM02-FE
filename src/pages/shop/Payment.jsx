import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import WhiteBackArrowIcon from "../../assets/icons/WhiteBackArrow.svg";
import KakaopayIcon from "../../assets/icons/Kakaopay.svg";

const PaymentPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { productName, price: initialPrice } = location.state || {};
  const [price, setPrice] = useState(initialPrice || 0);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdn.iamport.kr/js/iamport.payment-1.2.0.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handlePayment = (pg) => {
    const order = {
      productId: 1,
      productName: productName || "상품1",
      price: price,
      quantity: 1,
      buyerName: "김민규",
      buyerTel: "010-1234-5678"
    };

    const impCode = process.env.REACT_APP_IMP_CODE;
    console.log(impCode);

    if (!window.IMP) {
      alert("아임포트 로드 중 오류가 발생했습니다.");
      return;
    }

    console.log("impCode:", impCode);
    console.log("pg:", pg);
    console.log("order:", order);

    window.IMP.init(impCode);
    window.IMP.request_pay(
      {
        pg: pg,
        pay_method: "card",
        merchant_uid: `order_${new Date().getTime()}`,
        name: order.productName,
        amount: order.price,
        buyer_name: order.buyerName,
        buyer_tel: order.buyerTel,
        m_redirect_url: `${window.location.origin}/payment-result`
      },
      (rsp) => {
        console.log("response:", rsp);
        if (rsp.success) {
          fetch("/api/v1/payment/order", {
            method: "POST",
            headers: {
              "Content-type": "application/x-www-form-urlencoded;charset=utf-8"
            },
            body: JSON.stringify({
              impUid: rsp.imp_uid,
              merchantUid: rsp.merchant_uid,
              order
            })
          })
            .then((res) => res.json())
            .then((result) => {
              console.log("result:", result);
              if (result.success) {
                alert("결제가 완료되었습니다.");
                navigate("/");
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
    <>
      <Box>
        <BackButton src={WhiteBackArrowIcon} onClick={() => navigate(-1)} />
        <MyText>주문/결제</MyText>
      </Box>
      <Content>
        <TopRow>
          <ObjCheckText>결제 금액</ObjCheckText>
        </TopRow>
        <FormGroup>
          <PriceInput
            type="number"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
          />
          <h3>원</h3>
        </FormGroup>
      </Content>
      <ButtonContent>
        <ObjCheckText>결제 수단</ObjCheckText>
        <PaymentButton onClick={() => handlePayment("kakaopay")}>
          <img src={KakaopayIcon} alt="KakaoPay" />
        </PaymentButton>
      </ButtonContent>
    </>
  );
};

export default PaymentPage;

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

const Content = styled.div`
  background-color: white;
  margin: 10px;
  padding: 20px;
`;

const ButtonContent = styled.div`
  display: block;
  justify-content: space-around;
  gap: 20px;
  background-color: white;
  margin: 10px;
  padding: 20px;
`;

const TopRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const ObjCheckText = styled.div`
  font-size: 16px;
  font-weight: bold;
`;

const FormGroup = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;

const PriceInput = styled.input`
  font-size: 16px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 100%;
  max-width: 300px;
  text-align: right;
  margin: 5px;
`;

const PaymentButton = styled.button`
  background-color: white;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  display: inline;
  align-items: center;
  justify-content: center;
  padding: 10px;
  margin-top: 10px;

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }

  img {
    width: 80px;
    height: 40px;
  }
`;
