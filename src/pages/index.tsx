import CircleBox from "@/components/CircleBox";
import Header from "@/components/Header";
import { Question, questions, scoreMappings } from "@/data/data";
import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";
import React, { useRef, useEffect } from 'react';
import LineChart from '@/components/LineChart'

export default function Home() {
  const questionRefs = useRef(questions.map(() => React.createRef()));
  const [message, setMessage] = useState<string>("");
  const [showChart, setShowChart] = useState(false);
  const [selectedBox, setSelectedBox] = useState<{ [id: number]: number }>(
    questions.reduce((prev, curr) => ({ ...prev, [curr.id]: 0 }), {})
  );
  

  const [typeScores, setTypeScores] = useState<{ [type: string]: number }>({
    mileage: 0,
    price: 0,
    familiarity: 0,
    care: 0,
  });

  const totalScore = typeScores.mileage + typeScores.price + typeScores.familiarity + typeScores.care;

  const handleBoxClick = (questionId: number, value: number) => {
    const prevValue = selectedBox[questionId];  // 前回の値を取得
  
    setSelectedBox(prev => ({ ...prev, [questionId]: value }));
  
    const questionType = questions.find((q) => q.id === questionId)?.type;
    if (questionType) {
      setTypeScores((prev) => ({
        ...prev,
        [questionType]: (prev[questionType] || 0) - prevValue + value,  // 前回の値を引き、新たな値を加える
      }));
    }
    const currentIndex = questions.findIndex(q => q.id === questionId);
    const nextIndex = currentIndex + 1;
    if (nextIndex < questionRefs.current.length && questionRefs.current[nextIndex].current) {
      const element = questionRefs.current[nextIndex].current;
      const offset = 100; // 望むオフセット量（ピクセル単位）
  
      if (element instanceof HTMLElement) {
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
  }; 

  const calculatePersonality = (typeScores: { [type: string]: number }) => {
    const personality = [
      typeScores.mileage > 3 ? 'X' : 'X',
      typeScores.price > 3 ? 'X' : 'X',
      typeScores.familiarity > 3 ? 'X' : 'X',
      typeScores.care > 3 ? 'X' : 'X',
    ].join('');

    return personality;
  };

  const calculateNewScores = (typeScores: { [type: string]: number }) => {
    return {
      price: scoreMappings.price[typeScores.price as keyof typeof scoreMappings.price] ?? 0,
      mileage: scoreMappings.mileage[typeScores.mileage as keyof typeof scoreMappings.mileage] ?? 0,
      familiarity: scoreMappings.familiarity[typeScores.familiarity as keyof typeof scoreMappings.familiarity] ?? 0,
      care: scoreMappings.care[typeScores.care as keyof typeof scoreMappings.care] ?? 0,
    };
  };

  const handleSubmit = () => {
    const personality = calculatePersonality(typeScores)
    setMessage("あなたは ガソリン車 から EV に乗り換えると, 5年後に" + personality + "万円お得になります！")
    setShowChart(true);
  }

  return (
    <Box sx={{py:8, display:"flex", flexDirection:"column", alignItems:"center", maxWidth: "500px", margin: "auto"}}>
      <Header />
      
      {questions.map((question: Question, index) => (
        <Box key={question.id} ref={questionRefs.current[index]} sx={{ mt: 10, mx: "auto", width: '100%', maxWidth: "500px" }}>
          <Typography sx={{fontWeight:"bold"}}>Q, {question.text}</Typography>
          <Box
            sx={{
              mt:2,
              display: 'flex',
              justifyContent: 'space-around',
              alignItems: 'center',
            }}
          >
            {[5, 4, 3, 2, 1].map((value, index) => {
              // サイズの決定
              let size;
              if (index === 2) size = 40; // 中心のボックス
              else if (index === 1 || index === 3) size = 60; // 2番目と4番目のボックス
              else size = 80; // 1番目と5番目のボックス
              
              let backgroundColor = "transparent";
              if (index === 0 || index === 1) {
                backgroundColor = "rgb(19, 20, 79)"; // 左側の2つ
              } else if (index === 3 || index === 4) {
                backgroundColor = "rgb(34, 155, 43)"; // 右側の2つ
              } else if (index === 2) {
                backgroundColor = "rgb(100, 100, 100)"; // 真ん中
              }

              return (
                <CircleBox 
                  key={index}
                  onClick={() => handleBoxClick(question.id, value)} 
                  selected={selectedBox[question.id] === value}
                  size={size}
                  backgroundColor={backgroundColor}
                />
              )
            })}
          </Box>
          <Box sx={{display:"flex", justifyContent:"space-between", mx:6, mt:2}}>
            <Typography sx={{color:"rgb(19, 20, 79)", fontWeight:"bold"}}>{question.options[0]}</Typography>
            <Typography sx={{color:"rgb(34, 155, 43)", fontWeight:"bold"}}>{question.options[1]}</Typography>
          </Box>
        </Box>
      ))}


        
      <Button 
        variant="contained" 
        sx={{mt:4, width:"100px",
        backgroundColor: 'lightgray', // ボタンの背景色を薄い灰色に設定
        '&:hover': {
          backgroundColor: "rgb(34, 155, 43)", // ホバー時の背景色も設定可能
        },}}
        onClick={handleSubmit}
        >
          診断する
        </Button>
        <Typography sx={{mt:4, fontSize:"2rem"}}>{message}</Typography>
    
    {/* LineChart コンポーネントの条件付き表示 */}
    {showChart && <LineChart scoreData={totalScore} />}
    {/* LineChart にスコアデータを渡す */}
    </Box>
  );
}
