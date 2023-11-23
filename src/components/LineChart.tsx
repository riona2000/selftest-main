// LineChart.tsx
import React from 'react'; // React のインポートを追加
import { faker } from '@faker-js/faker';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ChartOptions,
  ChartData,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement);

export const options: ChartOptions<'line'> = {};

export default function LineChart(props): JSX.Element {
    const { scoreData } = props; // props から scoreData を取得

    const labels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]; // labels の定義
    const data: ChartData<'line'> = {
        labels, // 正しいシンタックスで labels を設定
        datasets: [
            {
                data: labels.map((year) => scoreData * year), // 各年のスコアを計算
            },
        ],
    };

    return <Line options={options} data={data} />;
}
