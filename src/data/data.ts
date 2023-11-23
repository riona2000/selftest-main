export interface Question {
  id: number;
  text: string;
  type: string;
  options: string[];
}

export const questions: Question[] = [
  {
    id: 1,
    text: 'ほしい車の価格帯は？',
    type: 'price',
    options: ["300万円 以下", "700万円 以上"],
  },
  {
    id: 2,
    text: 'たくさん運転したいですか？',
    type: 'mileage',
    options: ["1,000km/年 未満", "20,000km/年 以上"],
  },
  {
    id: 3,
    text: '家の周りで充電器を見たことがありますか？',
    type: 'familiarity',
    options: ["見たことがない", "20個 以上"],
  },
  {
    id: 4,
    text: '車を大切に使っていきたい！',
    type: 'care',
    options: ["5年 未満", "15年 以上"],
  }
]

export const scoreMappings = {
  price: {
    5: 300,
    4: 400,
    3: 500,
    2: 600,
    1: 700,
  },
  mileage: {
    5: 1000,
    4: 5000,
    3: 10000,
    2: 15000,
    1: 20000,
  },
  familiarity: {
    5: 1,
    4: 5,
    3: 10,
    2: 15,
    1: 20,
  },
  care: {
    5: 5,
    4: 7,
    3: 10,
    2: 12,
    1: 15,
  },
};
