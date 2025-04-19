// src/logic/hanabiUtils.js

// 手札の1枚を表す初期状態のオブジェクト
export const initialCard = {
  ID: '',
  hint: '',
  selected: false,
  colorHints: { 赤: 'unknown', 青: 'unknown', 緑: 'unknown', 黄: 'unknown', 白: 'unknown' },
  numberHints: { 1: 'unknown', 2: 'unknown', 3: 'unknown', 4: 'unknown', 5: 'unknown' }
};

// 初期の手札を作成する関数。デフォルトで5枚。
export function createInitialHand(count = 5) {
  return Array(count).fill().map((_, i) => ({ ...initialCard, id: i + 1 }));
}

// 指定された index 番目のカードの selected をトグル（ON/OFF切替）します。
export function updateCardSelection(hand, index) {
  return hand.map((card, i) =>
    i === index ? { ...card, selected: !card.selected } : card
  );
}

// ヒントが出された際の処理（3状態: answer / excluded / unknown）
export function applyHintToHand(hand, type, value) {
  const typeLabel = type === 'color' ? '色' : '数字';
  return hand.map((card) => {
    const isSelected = card.selected;

    const allValues = type === 'color'
      ? ['赤', '青', '緑', '黄', '白']
      : [1, 2, 3, 4, 5];

    if (isSelected) {
      // 該当カードは指定値を answer に、それ以外を excluded に
      const newHints = {};
      allValues.forEach((v) => {
        newHints[v] = v === value ? 'answer' : 'excluded';
      });

      // ヒントを追加する際に改行を挿入
      return {
        ...card,
        [type]: value,
        hint: `${card.hint ? card.hint + '\n' : ''}${typeLabel}が${value}`,
        [`${type}Hints`]: newHints,
      };
    } else {
      // 選択されていないカードは、該当ヒントだけ excluded に更新
      return {
        ...card,
        hint: card.hint ? `${card.hint}\n${value}ではない` : `${value}ではない`,
        [`${type}Hints`]: {
          ...card[`${type}Hints`],
          [value]: 'excluded',
        },
      };
    }
  });
}

// 指定された index 番目のカードを「場に出す」処理
export function playCardFromHand(hand, index) {
  const newHand = [...hand];
  const nextId = Math.max(...hand.map((c) => c.id)) + 1;
  newHand.splice(index, 1);
  newHand.push({ ...initialCard, id: nextId });
  return newHand;
}
