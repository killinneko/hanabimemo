// src/components/Hanabimemo.jsx

import { useState } from 'react';
import {
  createInitialHand,
  updateCardSelection,
  applyHintToHand,
  playCardFromHand
} from '../logic/hanabiUtils';

const HanabiMemo = () => {
  const [hand, setHand] = useState(createInitialHand());

  const handleSelect = (index) => {
    setHand(updateCardSelection(hand, index));
  };

  const applyHint = (type, value) => {
    setHand(applyHintToHand(hand, type, value));
  };

  const playCard = (index) => {
    setHand(playCardFromHand(hand, index));
  };

  const colorMap = {
    赤: 'red',
    青: 'blue',
    緑: 'green',
    黄: 'gold',
    白: 'gray'
  };

  return (
    <div className="container py-3">
      <h2 className="mb-4">花火のヒントをメモするサイト</h2>
      <div className="row g-3">
        {hand.map((card, i) => (
          <div key={i} className="col-md-2 col-sm-4">
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <label className="form-check mb-2">
                  <input
                    type="checkbox"
                    className="form-check-input me-2"
                    checked={card.selected}
                    onChange={() => handleSelect(i)}
                  />
                  ID: {card.id}
                </label>
                <div className="mb-2">
                  <strong>色ヒント</strong>
                  <div className="d-flex flex-wrap gap-1 mt-1">
                    {Object.keys(colorMap).map((c) => {
                      const status = card.colorHints?.[c];
                      if (status === 'excluded') return null;
                      return (
                        <span
                          key={c}
                          className="badge rounded-pill px-3 py-2 fw-bold"
                          style={{
                            backgroundColor: status === 'answer' ? colorMap[c]: 'white',
                            color: status === 'answer' ? 'white' : colorMap[c],
                            border: '1px solid #ccc'
                          }}
                        >
                          {c}
                        </span>
                      );
                    })}
                  </div>
                </div>

                <div className="mb-2">
                  <strong>数字ヒント</strong>
                  <div className="d-flex flex-wrap gap-1 mt-1">
                    {[1, 2, 3, 4, 5].map((n) => {
                      const status = card.numberHints?.[n];
                      if (status === 'excluded') return null;
                      return (
                        <span
                          key={n}
                          className="badge rounded-pill px-3 py-2 fw-bold"
                          style={{
                            backgroundColor: status === 'answer' ? 'black' : 'white',
                            color: status === 'answer' ? 'white' : 'black',
                            border: '1px solid #ccc'
                          }}
                        >
                          {n}
                        </span>
                      );
                    })}
                  </div>
                </div>
                
                <div className="mb-2">
                <p className="mb-2">
  ヒント: <pre>{card.hint || 'なし'}</pre>
</p>

                </div>

                <button
                  onClick={() => playCard(i)}
                  className="btn btn-outline-danger btn-sm mt-2"
                >
                  出す
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4">
        <h4>ヒントを追加</h4>

        <div className="mb-2">
          色:
          {Object.keys(colorMap).map((c) => (
            <button
              key={c}
              onClick={() => applyHint('color', c)}
              className="btn btn-outline-secondary btn-sm fw-bold ms-2"
              style={{ color: colorMap[c], borderColor: colorMap[c] }}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="mb-2">
          数字:
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              onClick={() => applyHint('number', n)}
              className="btn btn-outline-dark btn-sm fw-bold ms-2"
            >
              {n}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HanabiMemo;
