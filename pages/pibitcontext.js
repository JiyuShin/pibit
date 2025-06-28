import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import Head from 'next/head';
import { useRouter } from 'next/router';

const BackButton = styled.div`
  position: absolute;
  top: 45px;
  left: 23px;
  width: 96px;
  height: auto;
  cursor: pointer;
  z-index: 9999;
  transition: transform 0.2s ease-in-out;
  
  &:hover {
    transform: scale(1.1);
  }
  
  img {
    width: 100%;
    height: auto;
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(15px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(15px);
  }
`;

const blink = keyframes`
  50% {
    opacity: 0;
  }
`;

const BlinkingCursor = styled.span`
  animation: ${blink} 1s step-end infinite;
`;

// 습관 카드 데이터 (예시 5개, 나머지는 추가만 하면 됨)
const CARD_WIDTH = 261;
const CARD_GAP = 20;
const habitCards = [
  // 첫째 줄
  { text: "사람 많은 곳에 가기 전 괜히 긴장돼요", left: "calc(50% - 243px/2 - 547.5px + 140px - 10px - 12px)", top: 653 },
  { text: "싫은 말이 있어도 그냥 참고 넘겨요", left: `calc(50% - 243px/2 - 547.5px + 140px - 10px + ${(CARD_WIDTH + CARD_GAP) * 1}px - 12px)`, top: 653 },
  { text: "실수할까봐 계획을 계속 다시 세워요", left: `calc(50% - 243px/2 - 547.5px + 140px - 10px + ${(CARD_WIDTH + CARD_GAP) * 2}px - 12px)`, top: 653 },
  { text: "조용히 반복되는 행동을 하면 편해져요", left: `calc(50% - 243px/2 - 547.5px + 140px - 10px + ${(CARD_WIDTH + CARD_GAP) * 3}px - 12px)`, top: 653 },
  // 둘째 줄
  { text: "아무 생각 없이 다리를 떨어요", left: "calc(50% - 243px/2 - 547.5px + 140px - 10px - 12px)", top: 735 },
  { text: "혼자 있는게 더 편해요", left: `calc(50% - 243px/2 - 547.5px + 140px - 10px + ${(CARD_WIDTH + CARD_GAP) * 1}px - 12px)`, top: 735 },
  { text: "긴장될 때 손이나 입술을 만져요", left: `calc(50% - 243px/2 - 547.5px + 140px - 10px + ${(CARD_WIDTH + CARD_GAP) * 2}px - 12px)`, top: 735 },
  { text: "책상 물건이 딱 맞춰져 있어야 마음이 편해요", left: `calc(50% - 243px/2 - 547.5px + 140px - 10px + ${(CARD_WIDTH + CARD_GAP) * 3}px - 12px)`, top: 735 },
  // 셋째 줄
  { text: "멍하니 있거나 시간을 잊고 있을 때가 많아요", left: "calc(50% - 243px/2 - 547.5px - 10px - 12px)", top: 820 },
  { text: "물건이 잘 있는지 반복적으로 확인해요", left: `calc(50% - 243px/2 - 547.5px - 10px + ${(CARD_WIDTH + CARD_GAP) * 1}px - 12px)`, top: 820 },
  { text: "내 감정을 말로 설명하기 어렵게 느껴져요", left: `calc(50% - 243px/2 - 547.5px - 10px + ${(CARD_WIDTH + CARD_GAP) * 2}px - 12px)`, top: 820 },
  { text: "자리에 오래 앉아있는게 어려워요", left: `calc(50% - 243px/2 - 547.5px - 10px + ${(CARD_WIDTH + CARD_GAP) * 3}px - 12px)`, top: 820 },
  { text: "불편한 상황이면 자리를 피해요", left: `calc(50% - 243px/2 - 547.5px - 10px + ${(CARD_WIDTH + CARD_GAP) * 4}px - 12px)`, top: 820 },
  // 넷째 줄(추가)
  { text: "조용한 상황이 불편해서 뭐라도 틀어놔요", left: "calc(50% - 243px/2 - 547.5px - 10px - 12px + 140px)", top: 905 },
  { text: "말은 안해도 속으로 오래 곱씹어요", left: `calc(50% - 243px/2 - 547.5px - 10px + ${(CARD_WIDTH + CARD_GAP) * 1}px - 12px + 140px)`, top: 905 },
  { text: "무의식적으로 볼 안쪽을 씹은 적이 있어요", left: `calc(50% - 243px/2 - 547.5px - 10px + ${(CARD_WIDTH + CARD_GAP) * 2}px - 12px + 140px)`, top: 905 },
  { text: "방이 어질러져 있으면 불안해져요", left: `calc(50% - 243px/2 - 547.5px - 10px + ${(CARD_WIDTH + CARD_GAP) * 3}px - 12px + 140px)`, top: 905 },
];

const Root = styled.div`
  position: relative;
  width: 1512px;
  height: 100vh;
  margin: 0 auto;
  background: linear-gradient(180deg, #D3E4FE 0%, #FFF7E0 100%);
  overflow: hidden;
  z-index: 2001;
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

const InstructionText = styled.p`
  position: absolute;
  top: 537px;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  font-family: 'Pretendard Variable', sans-serif;
  font-size: 18px;
  font-weight: 600;
  text-align: center;
  color: #666666;
  z-index: 2002;
  line-height: 1.6;
  white-space: pre-line;
  transition: opacity 0.5s ease-in-out;
  opacity: ${props => props.show ? 1 : 0};
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
  top: 206.32875px;
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
  top: 220px;
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

  opacity: 0;
  transform: translateY(15px);
  will-change: opacity, transform;

  animation: ${props => {
    if (props.isFadingOut) return fadeOut;
    if (props.visible) return fadeIn;
    return 'none';
  }} 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;

  animation-delay: ${props => props.delay}s;
  pointer-events: ${props => (props.visible && !props.isFadingOut ? 'auto' : 'none')};

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
  width: 230.4px;
  height: 48px;
  left: calc(50% - 115.2px);
  top: 850px;
  background: #D4C2F2;
  border: 1px solid #C0AEE8;
  box-shadow: 0px 8px 32px 0px rgba(212, 194, 242, 0.37);
  border-radius: 24px;
  font-family: 'Pretendard Variable', sans-serif;
  font-weight: 700;
  font-size: 20px;
  line-height: 24px;
  color: #8B8B8B;
  transform: scale(0.8);
  transition: opacity 0.5s ease-in-out, transform 0.5s ease-in-out;
  cursor: pointer;
  z-index: 2001;
  opacity: ${props => props.visible ? 1 : 0};
  transform: ${props => props.visible ? 'translateY(0)' : 'translateY(20px)'};
  pointer-events: ${props => props.visible ? 'auto' : 'none'};

  &:disabled {
    background: #E0E0E0;
    color: #9E9E9E;
    cursor: not-allowed;
    box-shadow: none;
  }

  &:hover:not(:disabled) {
    background: #C0AEE8;
    box-shadow: 0px 10px 35px 0px rgba(192, 174, 232, 0.5);
    transform: translateY(-2px);
  }
`;

const Group = styled.div``;

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

const PageContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #F3F3F3;
  overflow: hidden;
  position: relative;
  transition: opacity 0.5s ease-in-out;
  opacity: ${({ isFadingOut }) => (isFadingOut ? 0 : 1)};
`;

export default function PibitContext() {
  const router = useRouter();
  const { name: rawName } = router.query;
  const [typedText, setTypedText] = useState('');
  const [selectedHabits, setSelectedHabits] = useState([]);

  const [fullText1, setFullText1] = useState('');
  const [fullText2, setFullText2] = useState('');
  const [fullText3, setFullText3] = useState('');

  const [currentText, setCurrentText] = useState('');
  const [showText, setShowText] = useState(false);
  const [step, setStep] = useState(0); // 0:init, 1:text1, 2:cards1, 3:text3, 4:cards2
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (router.isReady) {
      const name = rawName || '사용자';
      const text1 = `${name}님의 Dna 검사 키트는 안전하게 잘 도착했어요!\n더욱 정확한 감정 유형을 파악하기 위해 18가지 카테고리를 기반으로 간단한 조사를 진행할게요!`;
      const text2 = `${name}님에게 해당된다고 생각하는 사소한 습관이나 일상적인 생각 2가지를 선택해주세요!`;
      const text3 = `흥미롭네요! 이제 남은 2가지를 선택하신 후, 습관 유형 탐색하기 버튼을 눌러 조사를 마무리해주세요!`;

      setFullText1(text1);
      setFullText2(text2);
      setFullText3(text3);
      
      setSelectedHabits([]);
      setIsFadingOut(false);
      setStep(1);
      setCurrentText(text1);
    }
  }, [router.isReady, rawName]);

  useEffect(() => {
    if (step === 2 && selectedHabits.length === 2) {
      setShowText(false);

      setTimeout(() => {
        setStep(3);
        setCurrentText(fullText3);
      }, 500);
    } else if (step === 4 && selectedHabits.length === 4) {
      // 4단계에서 4개가 모두 선택되면 버튼이 나타나도록 상태 업데이트
      // (실제 버튼 표시는 selectedHabits.length === 4 조건으로 이미 처리됨)
    }
  }, [selectedHabits.length, step, fullText3]);

  useEffect(() => {
    if (!currentText || step === 0) return;

    let i = 0;
    setTypedText('');
    setShowText(true);

    const type = () => {
      if (i < currentText.length) {
        setTypedText(currentText.slice(0, i + 1));
        i++;
        setTimeout(type, 50);
      } else {
        if (currentText === fullText1) {
          setTimeout(() => {
            setShowText(false);
            setTimeout(() => {
              setCurrentText(fullText2);
            }, 500);
          }, 1000);
        } else if (currentText === fullText2) {
          setTimeout(() => setStep(2), 100);
        } else if (currentText === fullText3) {
          setTimeout(() => setStep(4), 100);
        }
      }
    };
    type();
  }, [currentText]);

  const handleCardClick = (index) => {
    if (step !== 2 && step !== 4) return;

    setSelectedHabits(prev => {
      if (prev.includes(index)) {
        return prev.filter(idx => idx !== index);
      } else if (prev.length < 4) {
        return [...prev, index];
      } else {
        return prev;
      }
    });
  };

  const rowTops = [...new Set(habitCards.map(card => card.top))].sort((a, b) => a - b);
  const group1Cards = habitCards.filter(card => card.top < 800);
  const group2Cards = habitCards.filter(card => card.top >= 800);

  // group2 카드들의 위치를 group1 카드들의 위치에 매핑
  const remappedGroup2Cards = group2Cards.map((card, index) => {
    // group1Cards의 개수가 더 적으므로, 순환해서 위치를 참조하도록 변경
    const originalCardInGroup1 = group1Cards[index % group1Cards.length];
    if (!originalCardInGroup1) return card; // 혹시 모를 에러 방지
    return {
      ...card,
      top: originalCardInGroup1.top,
      left: originalCardInGroup1.left,
    };
  });

  const ROW_ANIMATION_DELAY = 0.2;

  const handleBack = () => {
    router.push({
      pathname: '/pibitdna',
      query: { name: rawName }
    });
  };

  const handleNextClick = () => {
    if (selectedHabits.length === 4) {
      setIsFadingOut(true);
    }
  };

  useEffect(() => {
    if (isFadingOut && selectedHabits.length === 4) {
      const selectedTexts = selectedHabits.map(index => habitCards[index].text);
      setTimeout(() => {
        router.push({
          pathname: '/pibitemotion',
          query: { 
            name: rawName,
            habits: JSON.stringify(selectedTexts)
          }
        });
      }, 500); // Corresponds to the transition duration
    }
  }, [isFadingOut, rawName, router, selectedHabits]);

  return (
    <PageContainer isFadingOut={isFadingOut}>
      <Head>
        <title>PIBIT-습관 선택</title>
        <meta name="description" content="PIBIT" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
      </Head>

      <main>
        <Root>
          <BackButton onClick={() => router.back()}>
            <img src="/whiteb.png" alt="뒤로 가기" />
          </BackButton>
          <BgImage />
          <Rectangle10 />
          <Flower2 />
          <Puffy2 />
          <Wiggle2 />
          <Pinch2 />
          <Finger2 />
          <Heart2 />
          <Logo>PIBIT</Logo>
          <InstructionText show={showText}>
            {typedText}
            {(typedText.length < currentText.length) && <BlinkingCursor>_</BlinkingCursor>}
          </InstructionText>
          <MainCard />
          <Ellipse4 style={{
            position: 'absolute',
            width: '283.3425px',
            height: '283.3425px',
            left: '612.29875px',
            top: '206.32875px',
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
          <Group>
            {group1Cards.map((card, i) => {
              const originalIndex = habitCards.findIndex(c => c.text === card.text);
              return (
                <HabitCard
                  key={`g1-${i}`}
                  className={selectedHabits.includes(originalIndex) ? 'selected' : ''}
                  style={{ left: card.left, top: card.top }}
                  onClick={() => handleCardClick(originalIndex)}
                  visible={step === 2}
                  isFadingOut={isFadingOut}
                  delay={(i < 4 ? 0 : 1) * ROW_ANIMATION_DELAY}
                >
                  {card.text}
                </HabitCard>
              );
            })}
            {remappedGroup2Cards.map((card, i) => {
              const originalIndex = habitCards.findIndex(c => c.text === card.text);
              return (
                <HabitCard
                  key={`g2-${i}`}
                  className={selectedHabits.includes(originalIndex) ? 'selected' : ''}
                  style={{ left: card.left, top: card.top }}
                  onClick={() => handleCardClick(originalIndex)}
                  visible={step === 4}
                  isFadingOut={isFadingOut}
                  delay={(i < 4 ? 0 : 1) * ROW_ANIMATION_DELAY}
                >
                  {card.text}
                </HabitCard>
              );
            })}
          </Group>
          <BottomButton
            visible={selectedHabits.length === 4}
            disabled={selectedHabits.length !== 4}
            onClick={handleNextClick}
          >습관 유형 탐색하기</BottomButton>
        </Root>
      </main>
    </PageContainer>
  );
} 