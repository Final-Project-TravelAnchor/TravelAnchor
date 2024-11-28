import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";

// CircularProgressChart의 Props 정의
interface CircularProgressProps {
  size?: string; // 컴포넌트 크기
  value?: number; // 프로그레스 값
  pathColor?: string; // 진행 경로 색상
  trailColor?: string; // 배경 경로 색상
  textColor?: string; // 텍스트 색상
}

// ChangingProgressProvider의 Props 정의
interface ChangingProgressProviderProps {
    interval?: number;
  values: number[];
  children: (value: number) => React.ReactNode;
}

// ChangingProgressProvider 구현 (애니메이션 효과 제공)
const ChangingProgressProvider = ({
    interval = 100, // 애니메이션 속도 (밀리초)
    startValue = 0,
    endValue,
    children,
  }: {
    interval?: number; // 간격
    startValue?: number; // 시작 값
    endValue: number; // 목표 값
    children: (value: number) => React.ReactNode;
  }) => {
    const [currentValue, setCurrentValue] = useState(startValue);

    useEffect(() => {
        if (currentValue >= endValue) return; // 목표 값에 도달하면 종료
    
        const step = (endValue - startValue) / 100; // 100단계로 나눔
        const timer = setInterval(() => {
          setCurrentValue((prev) => {
            const nextValue = prev + step;
            if (nextValue >= endValue) {
              clearInterval(timer); // 목표 값에 도달 시 정지
              return endValue;
            }
            return nextValue;
          });
        }, interval);
    
        return () => clearInterval(timer); // 컴포넌트 언마운트 시 정리
      }, [currentValue, endValue, interval, startValue]);
    
      return <>{children(Math.round(currentValue))}</>; // 소수점 제거
    };

// CircularProgressChart 구현 (ChangingProgressProvider 활용)
export const CircularProgressChart = ({
  size = "100px",
  value = 50,
  pathColor = "#5F81FF",
  trailColor = "#DFE8FF",
  textColor = "#2B2D36",
}: CircularProgressProps) => {
  return (
    <ProgressbarContainer $size={size}>
      <ChangingProgressProvider startValue={0} endValue={value} interval={20}>
        {(percentage) => (
          <CircularProgressbar
            value={percentage}
            className="progressbar"
            text={`${percentage}%`}
            strokeWidth={15}
            styles={buildStyles({
              pathColor: pathColor, // 진행 경로 색상
              trailColor: trailColor, // 배경 경로 색상
              textColor: textColor, // 텍스트 색상
              textSize: "16px", // 텍스트 크기
              pathTransitionDuration: 0.1, // 애니메이션 속도
              
            })}
          />
        )}
      </ChangingProgressProvider>
    </ProgressbarContainer>
  );
};

// 스타일링 정의
interface ContainerProps {
  $size: string;
}

const ProgressbarContainer = styled.div<ContainerProps>`
  width: ${({ $size }) => $size};
  height: ${({ $size }) => $size};
`;

export default CircularProgressChart;
