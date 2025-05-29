import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import Head from 'next/head';

// 습관 카드 데이터 (예시 5개, 나머지는 추가만 하면 됨)
const CARD_WIDTH = 261;
const CARD_GAP = 20;
const habitCards = [
  // 첫째 줄
  { text: "사람 많은 곳에 가기 전 괜히 긴장돼요", left: "calc(50% - 243px/2 - 547.5px - 10px - 12px)", top: 533 },
  { text: "싫은 말이 있어도 그냥 참고 넘겨요", left: `calc(50% - 243px/2 - 547.5px - 10px + ${(CARD_WIDTH + CARD_GAP) * 1}px - 12px)`, top: 533 },
  { text: "실수할까봐 계획을 계속 다시 세워요", left: `calc(50% - 243px/2 - 547.5px - 10px + ${(CARD_WIDTH + CARD_GAP) * 2}px - 12px)`, top: 533 },
  { text: "조용히 반복되는 행동을 하면 편해져요", left: `calc(50% - 243px/2 - 547.5px - 10px + ${(CARD_WIDTH + CARD_GAP) * 3}px - 12px)`, top: 533 },
  { text: "손에 뭔가 없으면 허전해요", left: `calc(50% - 243px/2 - 547.5px - 10px + ${(CARD_WIDTH + CARD_GAP) * 4}px - 12px)`, top: 532 },
  // 둘째 줄
  { text: "아무 생각 없이 다리를 떨어요", left: "calc(50% - 243px/2 - 547.5px + 140px - 10px - 12px)", top: 615 },
  { text: "혼자 있는게 더 편해요", left: `calc(50% - 243px/2 - 547.5px + 140px - 10px + ${(CARD_WIDTH + CARD_GAP) * 1}px - 12px)`, top: 615 },
  { text: "긴장될 때 손이나 입술을 만져요", left: `calc(50% - 243px/2 - 547.5px + 140px - 10px + ${(CARD_WIDTH + CARD_GAP) * 2}px - 12px)`, top: 615 },
  { text: "책상 물건이 딱 맞춰져 있어야 마음이 편해요", left: `calc(50% - 243px/2 - 547.5px + 140px - 10px + ${(CARD_WIDTH + CARD_GAP) * 3}px - 12px)`, top: 615 },
  // 셋째 줄
  { text: "멍하니 있거나 시간을 잊고 있을 때가 많아요", left: "calc(50% - 243px/2 - 547.5px - 10px - 12px)", top: 700 },
  { text: "물건이 잘 있는지 반복적으로 확인해요", left: `calc(50% - 243px/2 - 547.5px - 10px + ${(CARD_WIDTH + CARD_GAP) * 1}px - 12px)`, top: 700 },
  { text: "내 감정을 말로 설명하기 어렵게 느껴져요", left: `calc(50% - 243px/2 - 547.5px - 10px + ${(CARD_WIDTH + CARD_GAP) * 2}px - 12px)`, top: 700 },
  { text: "자리에 오래 앉아있는게 어려워요", left: `calc(50% - 243px/2 - 547.5px - 10px + ${(CARD_WIDTH + CARD_GAP) * 3}px - 12px)`, top: 700 },
  { text: "불편한 상황이면 자리를 피해요", left: `calc(50% - 243px/2 - 547.5px - 10px + ${(CARD_WIDTH + CARD_GAP) * 4}px - 12px)`, top: 700 },
  // 넷째 줄(추가)
  { text: "조용한 상황이 불편해서 뭐라도 틀어놔요", left: "calc(50% - 243px/2 - 547.5px - 10px - 12px + 140px)", top: 785 },
  { text: "말은 안해도 속으로 오래 곱씹어요", left: `calc(50% - 243px/2 - 547.5px - 10px + ${(CARD_WIDTH + CARD_GAP) * 1}px - 12px + 140px)`, top: 785 },
  { text: "무의식적으로 볼 안쪽을 씹은 적이 있어요", left: `calc(50% - 243px/2 - 547.5px - 10px + ${(CARD_WIDTH + CARD_GAP) * 2}px - 12px + 140px)`, top: 785 },
  { text: "방이 어질러져 있으면 불안해져요", left: `calc(50% - 243px/2 - 547.5px - 10px + ${(CARD_WIDTH + CARD_GAP) * 3}px - 12px + 140px)`, top: 785 },
  // 다섯째 줄(추가)
  { text: "메신저 답장을 여러 번 다시 읽어요", left: "calc(50% - 243px/2 - 547.5px - 10px - 12px + 3px)", top: 870 },
  { text: "마음에 걸리는게 있어도 아무렇지 않게 넘겨요", left: `calc(50% - 243px/2 - 547.5px - 10px + ${(CARD_WIDTH + CARD_GAP) * 1}px - 12px + 3px)`, top: 870 },
  { text: "지저분한걸 보면 바로 치우고 싶어요", left: `calc(50% - 243px/2 - 547.5px - 10px + ${(CARD_WIDTH + CARD_GAP) * 2}px - 12px + 3px)`, top: 870 },
  { text: "사람들과 함께 있어도 종종 다른 생각에 빠져요", left: `calc(50% - 243px/2 - 547.5px - 10px + ${(CARD_WIDTH + CARD_GAP) * 3}px - 12px + 3px)`, top: 870 },
  { text: "지루하면 자꾸 말하거나 농담을 해요", left: `calc(50% - 243px/2 - 547.5px - 10px + ${(CARD_WIDTH + CARD_GAP) * 4}px - 12px + 3px)`, top: 870 },
  // 여섯째 줄(추가)
  { text: "계획한것을 해내지 못하면 불안해요", left: "calc(50% - 243px/2 - 547.5px - 10px - 12px + 140px)", top: 955 },
  { text: "머리카락을 아무 생각 없이 자주 만져요", left: `calc(50% - 243px/2 - 547.5px - 10px + ${(CARD_WIDTH + CARD_GAP) * 1}px - 12px + 140px)`, top: 955 },
  { text: "사람들 속에 있어도 대화가 적어요", left: `calc(50% - 243px/2 - 547.5px - 10px + ${(CARD_WIDTH + CARD_GAP) * 2}px - 12px + 140px)`, top: 955 },
  { text: "불안할 때 손이나 옷짓을 만져요", left: `calc(50% - 243px/2 - 547.5px - 10px + ${(CARD_WIDTH + CARD_GAP) * 3}px - 12px + 140px)`, top: 955 },
  // 일곱째 줄(마지막 줄, 추가)
  { text: "손을 자주 씻지 않으면 찝찝해요", left: "calc(50% - 243px/2 - 547.5px - 10px - 12px + 3px)", top: 1040 },
  { text: "감정을 말하지 않고 글이나 물건으로 풀어요", left: `calc(50% - 243px/2 - 547.5px - 10px + ${(CARD_WIDTH + CARD_GAP) * 1}px - 12px + 3px)`, top: 1040 },
  { text: "나만의 상상/혼잣말을 자주 해요", left: `calc(50% - 243px/2 - 547.5px - 10px + ${(CARD_WIDTH + CARD_GAP) * 2}px - 12px + 3px)`, top: 1040 },
  { text: "불안할 때 손이나 옷깃을 만져요", left: `calc(50% - 243px/2 - 547.5px - 10px + ${(CARD_WIDTH + CARD_GAP) * 3}px - 12px + 3px)`, top: 1040 },
  { text: "작은 소리나 변화에도 예민해져요", left: `calc(50% - 243px/2 - 547.5px - 10px + ${(CARD_WIDTH + CARD_GAP) * 4}px - 12px + 3px)`, top: 1040 },
];

// Figma Polygon 1: 흰색 라운딩 삼각형
const Polygon1 = styled.div`
  position: absolute;
  width: 52px;
  height: 52px;
  left: 52px;
  top: 62px;
  z-index: 10;
`;

const Root = styled.div`
  position: relative;
  width: 1512px;
  height: 1275px;
  margin: 0 auto;
  background: linear-gradient(180deg, #D3E4FE 0%, #FFF7E0 100%);
  overflow: visible;
`;

// 배경 이미지
const BgImage = styled.div`
  position: absolute;
  width: 1734px;
  height: 1226px;
  left: -111px;
  top: -12px;
  background: url('/대지 3@4x.png');
  background-size: cover;
  z-index: 0;
`;

// 상단 오브젝트들
const Flower2 = styled.div`
  position: absolute;
  width: 143.3px;
  height: 101px;
  left: 130px;
  top: 32px;
  background: url('/module/flower.png') center/contain no-repeat;
  z-index: 1000;
`;
const Puffy2 = styled.div`
  position: absolute;
  width: 162.79px;
  height: 114.74px;
  left: 893.38px;
  top: 17.15px;
  background: url('/module/puffy.png') center/contain no-repeat;
  transform: rotate(5.42deg);
  z-index: 2001;
`;
const Wiggle2 = styled.div`
  position: absolute;
  width: 218.94px;
  height: 154.32px;
  left: 435.97px;
  top: -5px;
  background: url('/module/wiggle.png') center/contain no-repeat;
  transform: rotate(19.68deg);
  z-index: 1000;
`;
const Pinch2 = styled.div`
  position: absolute;
  width: 172.92px;
  height: 121.88px;
  left: 1088.78px;
  top: 13.83px;
  background: url('/module/pinch.png') center/contain no-repeat;
  transform: matrix(-0.98, 0.18, 0.18, 0.98, 0, 0);
  z-index: 2001;
  filter: brightness(1.15);
`;
const Finger2 = styled.div`
  position: absolute;
  width: 190.97px;
  height: 134.6px;
  left: 1282.64px;
  top: 5.42px;
  background: url('/module/finger.png') center/contain no-repeat;
  transform: rotate(10.03deg);
  z-index: 2001;
  filter: brightness(1.15);
`;
const Heart2 = styled.div`
  position: absolute;
  width: 147.62px;
  height: 104.05px;
  left: 295.81px;
  top: 28px;
  background: url('/module/heart.png') center/contain no-repeat;
  transform: rotate(21.31deg);
  z-index: 1000;
`;

const TopBar = styled.div`
  position: absolute;
  width: 1325px;
  height: 48px;
  left: 150px;
  top: 57px;
  background: rgba(255, 255, 255, 0.2);
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.15);
  border-radius: 41.5px;
  z-index: 3;
`;

const Logo = styled.div`
  position: absolute;
  width: 485px;
  height: 169px;
  left: calc(50% - 485px/2 + 0.5px);
  top: -2px;
  font-family: 'Pragati Narrow', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 100px;
  line-height: 169px;
  text-align: center;
  color: #FFFFFF;
  text-shadow: 4px 4px 38px rgba(0, 0, 0, 0.07);
  z-index: 2001;
`;

const MainCard = styled.div`
  position: absolute;
  width: 1436px;
  height: 1074px;
  left: calc(50% - 1431px/2 + 0.5px);
  top: 157px;
  background: rgba(255, 255, 255, 0.2);
  box-shadow: 3px 3px 30px rgba(0, 0, 0, 0.05);
  border-radius: 15px;
  z-index: 1;
`;

// Group 2 - Figma 스타일의 여러 겹 Ellipse
const Ellipse4 = styled.div`
  position: absolute;
  width: 283.3425px;
  height: 283.3425px;
  left: 612.29875px;
  top: 172.32875px;
  background: #E4C9EE;
  filter: blur(20px);
  border-radius: 50%;
  z-index: 1;
`;

const CenterCircle = styled.div`
  position: absolute;
  width: 257px;
  height: 257px;
  left: 625.97px;
  top: 186px;
  border-radius: 50%;
  overflow: hidden;
  background: transparent;
  z-index: 10;
`;

// 회전 애니메이션 (반시계, 60초에 한 바퀴)
const rotateCCW = keyframes`
  0% { transform: rotate(0deg) translateY(-80px) rotate(0deg); }
  100% { transform: rotate(-360deg) translateY(-80px) rotate(360deg); }
`;

const RotatingEllipse = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform-origin: 50% 50%;
  animation: ${rotateCCW} 60s linear infinite;
`;

const Ellipse9 = styled(RotatingEllipse)`
  width: 144px;
  height: 144px;
  left: 50%;
  top: 50%;
  margin-left: -72px;
  margin-top: -72px;
  background: linear-gradient(270deg, #E6E6FF 0%, #B5B6FF 100%);
  filter: blur(20px);
  animation: ${rotateCCW} 9.5s linear infinite;
`;
const Ellipse10 = styled(RotatingEllipse)`
  width: 144px;
  height: 144px;
  left: 50%;
  top: 50%;
  margin-left: -72px;
  margin-top: -72px;
  background: linear-gradient(270deg, #E6E6FF 0%, #B5B6FF 100%);
  filter: blur(5px);
  animation: ${rotateCCW} 10.5s linear infinite;
`;
const Ellipse11 = styled(RotatingEllipse)`
  width: 172.8px;
  height: 172.8px;
  left: 50%;
  top: 50%;
  margin-left: -86.4px;
  margin-top: -86.4px;
  background: linear-gradient(270deg, #E6E6FF 0%, #B5B6FF 100%);
  filter: blur(15px);
  animation: ${rotateCCW} 11.5s linear infinite;
  z-index: 2000;
  border-radius: 50%;
`;
const Ellipse7 = styled(RotatingEllipse)`
  width: 144px;
  height: 144px;
  left: 50%;
  top: 50%;
  margin-left: -72px;
  margin-top: -72px;
  background: #DCAAF4;
  filter: blur(15px);
  animation: ${rotateCCW} 12.5s linear infinite;
`;
const moveEllipseActive = keyframes`
  0%   { transform: translate(0px, 0px); }
  20%  { transform: translate(40px, -40px); }
  40%  { transform: translate(-40px, 40px); }
  60%  { transform: translate(40px, 40px); }
  80%  { transform: translate(-40px, -40px); }
  100% { transform: translate(0px, 0px); }
`;

const Ellipse12 = styled(RotatingEllipse)`
  width: 172.8px;
  height: 172.8px;
  left: 50%;
  top: 50%;
  margin-left: -86.4px;
  margin-top: -86.4px;
  background: #FFF7E0;
  filter: blur(20px);
  opacity: 0.95;
  animation: ${moveEllipseActive} 7s ease-in-out infinite;
  z-index: 2000;
  border-radius: 50%;
`;

// 중앙 원형 그라데이션(블러) 그룹 - 원 밖으로 색상 안 나가게
const Blur1 = styled.div`
  position: absolute;
  width: 180px;
  height: 180px;
  left: 30px;
  top: 20px;
  background: #e4c9ee;
  filter: blur(30px);
  border-radius: 50%;
  opacity: 0.7;
`;

const Blur2 = styled.div`
  position: absolute;
  width: 160px;
  height: 160px;
  left: 60px;
  top: 80px;
  background: #ffdff7;
  filter: blur(30px);
  border-radius: 50%;
  opacity: 0.7;
`;

const Blur3 = styled.div`
  position: absolute;
  width: 140px;
  height: 140px;
  left: 50px;
  top: 120px;
  background: #fff7e0;
  filter: blur(30px);
  border-radius: 50%;
  opacity: 0.7;
`;

const CenterText = styled.div`
  position: absolute;
  width: 100%;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  text-align: center;
  font-family: 'Pretendard Variable', sans-serif;
  font-size: 32px;
  color: #fff;
  font-weight: 500;
  z-index: 10;
`;

const HabitCard = styled.div`
  position: absolute;
  width: 261px;
  height: 52px;
  background: #fff;
  box-shadow: 3px 4px 10px rgba(0,0,0,0.25);
  border-radius: 20px;
  font-family: 'Pretendard Variable', sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 30px;
  text-align: center;
  color: #9A9A9A;
  text-shadow: 4px 4px 38px rgba(0,0,0,0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 20;
  border: 2px solid transparent;
  cursor: pointer;
  transition: box-shadow 0.18s, border 0.18s;
  outline: none;

  &:hover {
    box-shadow: 3px 4px 20px rgba(255, 214, 77, 0.35), 3px 4px 18px rgba(0,0,0,0.35);
  }
  &.selected, &:focus-visible {
    border: 2.5px solid #FFD64D;
    box-shadow: 0 0 0 4px rgba(255, 214, 77, 0.18), 3px 4px 20px rgba(0,0,0,0.25);
  }
`;

const BottomButton = styled.button`
  position: absolute;
  width: 252.56px;
  height: 54.56px;
  left: calc(50% - 252.56px/2 + 0.5px);
  top: 1143px;
  background: #FFF7E0;
  border: 1px solid #FFD64D;
  box-shadow: 6px 6px 20px 3px rgba(100, 61, 130, 0.25);
  border-radius: 50px;
  font-family: 'Pretendard Variable', sans-serif;
  font-weight: 600;
  font-size: 26.4px;
  color: #8B8B8B;
  cursor: pointer;
  z-index: 30;
`;

// 자유로운 곡선 움직임 keyframes (예시: x, y가 각각 sin/cos)
const moveEllipse1 = keyframes`
  0%   { transform: translate(0px, 0px);}
  25%  { transform: translate(-10px, 5px);}
  50%  { transform: translate(-5px, 12px);}
  75%  { transform: translate(5px, 5px);}
  100% { transform: translate(0px, 0px);}
`;
const moveEllipse2 = keyframes`
  0%   { transform: translate(0px, 0px);}
  25%  { transform: translate(7px, -5px);}
  50%  { transform: translate(12px, 5px);}
  75%  { transform: translate(5px, 10px);}
  100% { transform: translate(0px, 0px);}
`;
const moveEllipse3 = keyframes`
  0%   { transform: translate(0px, 0px);}
  25%  { transform: translate(-5px, -7px);}
  50%  { transform: translate(-10px, 5px);}
  75%  { transform: translate(5px, 2px);}
  100% { transform: translate(0px, 0px);}
`;
const moveEllipse4 = keyframes`
  0%   { transform: translate(0px, 0px);}
  25%  { transform: translate(10px, 10px);}
  50%  { transform: translate(20px, -10px);}
  75%  { transform: translate(-10px, 10px);}
  100% { transform: translate(0px, 0px);}
`;
const moveEllipse5 = keyframes`
  0%   { transform: translate(0px, 0px);}
  25%  { transform: translate(-7px, 5px);}
  50%  { transform: translate(5px, -10px);}
  75%  { transform: translate(7px, 5px);}
  100% { transform: translate(0px, 0px);}
`;

const AnimatedEllipse = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  border-radius: 50%;
  will-change: transform;
  z-index: 100;
`;

const moveEllipseA = keyframes`
  0%   { transform: translate(0px, 0px); }
  25%  { transform: translate(-30px, 20px); }
  50%  { transform: translate(-60px, 40px); }
  75%  { transform: translate(-30px, 20px); }
  100% { transform: translate(0px, 0px); }
`;
const moveEllipseB = keyframes`
  0%   { transform: translate(0px, 0px); }
  25%  { transform: translate(40px, -30px); }
  50%  { transform: translate(80px, -60px); }
  75%  { transform: translate(40px, -30px); }
  100% { transform: translate(0px, 0px); }
`;
const moveEllipseC = keyframes`
  0%   { transform: translate(0px, 0px); }
  25%  { transform: translate(-10px, -20px); }
  50%  { transform: translate(-20px, -40px); }
  75%  { transform: translate(-10px, -20px); }
  100% { transform: translate(0px, 0px); }
`;
const moveEllipseD = keyframes`
  0%   { transform: translate(0px, 0px); }
  25%  { transform: translate(30px, 30px); }
  50%  { transform: translate(60px, 60px); }
  75%  { transform: translate(30px, 30px); }
  100% { transform: translate(0px, 0px); }
`;
const moveEllipseE = keyframes`
  0%   { transform: translate(0px, 0px); }
  25%  { transform: translate(-30px, 30px); }
  50%  { transform: translate(-60px, 60px); }
  75%  { transform: translate(-30px, 30px); }
  100% { transform: translate(0px, 0px); }
`;

const Ellipse8 = styled(AnimatedEllipse)`
  width: 216px;
  height: 216px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background: #FFDFF7;
  filter: blur(8px);
  opacity: 0.7;
  z-index: 100;
`;
const Ellipse5 = styled(AnimatedEllipse)`
  width: 144px;
  height: 144px;
  left: 50%;
  top: 50%;
  margin-left: -72px;
  margin-top: -72px;
  background: #E4C9EE;
  filter: blur(10px);
  opacity: 0.7;
  animation: ${rotateCCW} 4s linear infinite;
`;
const moveEllipseCenter = keyframes`
  0%   { transform: translate(0px, 0px); }
  25%  { transform: translate(10px, -10px); }
  50%  { transform: translate(-10px, 10px); }
  75%  { transform: translate(10px, 10px); }
  100% { transform: translate(0px, 0px); }
`;
const moveEllipse6 = keyframes`
  0%   { transform: translate(-25px, -25px); }
  25%  { transform: translate(-40px, 10px); }
  50%  { transform: translate(0px, 25px); }
  75%  { transform: translate(25px, 0px); }
  100% { transform: translate(-25px, -25px); }
`;
const Ellipse6 = styled(AnimatedEllipse)`
  width: 172.8px;
  height: 172.8px;
  left: 50%;
  top: 50%;
  margin-left: -86.4px;
  margin-top: -86.4px;
  background: #C1C1FB;
  filter: blur(20px);
  opacity: 0.7;
  animation: ${moveEllipse6} 4.5s ease-in-out infinite;
  z-index: 2000;
  border-radius: 50%;
`;

const Ellipse3 = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background: #fff;
  border-radius: 50%;
  z-index: 2;
`;

const moveEllipseSafe = keyframes`
  0%   { transform: translate(0px, 0px); }
  25%  { transform: translate(25px, -25px); }
  50%  { transform: translate(-25px, 25px); }
  75%  { transform: translate(25px, 25px); }
  100% { transform: translate(0px, 0px); }
`;

const moveEllipse10 = keyframes`
  0%   { transform: translate(25px, -25px); }
  25%  { transform: translate(40px, 20px); }
  50%  { transform: translate(0px, 25px); }
  75%  { transform: translate(-25px, 0px); }
  100% { transform: translate(25px, -25px); }
`;

const TopTitle = styled.div`
  position: absolute;
  top: 50%;
  left: calc(50% + 5px);
  transform: translate(-50%, -50%);
  font-family: 'Pretendard', 'Pretendard Variable', 'sans-serif';
  font-weight: 600;
  font-size: 24px;
  color: #fff;
  letter-spacing: 0.01em;
  z-index: 9999;
  pointer-events: none;
  line-height: 1.1;
  white-space: pre-line;
  width: 100%;
  max-width: 100%;
  text-align: center;
`;

// Rectangle 10이 Polygon1 바로 아래에 있다고 가정하고, width만 15px 늘림
const Rectangle10 = styled.div`
  position: absolute;
  width: 1345px;
  height: 48px;
  left: 130px;
  top: 57px;
  background: rgba(255, 255, 255, 0.2);
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.15);
  border-radius: 41.5px;
  pointer-events: none;
  z-index: 999;
`;

export default function PibitContext() {
  const [selectedIdxs, setSelectedIdxs] = useState([]);
  return (
    <>
      <Head>
        {/* Pretendard Google Fonts CDN */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Pretendard:wght@600&display=swap" rel="stylesheet" />
      </Head>
      <Root>
        <BgImage />
        <Rectangle10 />
        <Polygon1>
          <svg width="52" height="52" viewBox="0 0 52 52" style={{ transform: 'rotate(-45deg)' }}>
            <path
              d="M26 12
                 Q38 22, 42 40
                 Q26 34, 10 40
                 Q14 22, 26 12
                 Z"
              fill="#FAF9FB"
            />
          </svg>
        </Polygon1>
        <Flower2 />
        <Puffy2 />
        <Wiggle2 />
        <Pinch2 />
        <Finger2 />
        <Heart2 />
        <Logo>PIBIT</Logo>
        <MainCard />
        <Ellipse4 style={{
          position: 'absolute',
          width: '283.3425px',
          height: '283.3425px',
          left: '612.29875px',
          top: '172.32875px',
          zIndex: 1
        }} />
        <CenterCircle>
           <Ellipse3 />
           <Ellipse8 />
           <Ellipse5 />
           <Ellipse6 />
           <Ellipse9 />
           <Ellipse10 />
           <Ellipse11 />
           <Ellipse7 />
           <Ellipse12 />
           <TopTitle>pibit create helper</TopTitle>
        </CenterCircle>
        {habitCards.map((card, i) => (
          <HabitCard
            key={i}
            className={selectedIdxs.includes(i) ? 'selected' : ''}
            style={
              card.text === "책상 물건이 딱 맞춰져 있어야 마음이 편해요"
                ? { left: card.left, top: card.top, fontSize: '13.145328px' }
              : card.text === "마음에 걸리는게 있어도 아무렇지 않게 넘겨요" || card.text === "사람들과 함께 있어도 종종 다른 생각에 빠져요"
                ? { left: card.left, top: card.top, fontSize: '13.482px' }
                : { left: card.left, top: card.top }
            }
            onClick={() => {
              setSelectedIdxs(prev => {
                if (prev.includes(i)) {
                  return prev.filter(idx => idx !== i);
                } else if (prev.length < 5) {
                  return [...prev, i];
                } else {
                  return prev;
                }
              });
            }}
          >
            {card.text}
          </HabitCard>
        ))}
        <BottomButton>습관 유형 탐색하기</BottomButton>
      </Root>
    </>
  );
} 