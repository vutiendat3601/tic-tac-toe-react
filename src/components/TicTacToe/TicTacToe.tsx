import classNames from 'classnames/bind';
import { MouseEvent, useEffect, useState } from 'react';
import DrawIcon from '../../assets/img/-1.png';
import OIcon from '../../assets/img/o.png';
import XIcon from '../../assets/img/x.png';
import Modal from '../Modal/Modal';
import style from './TicTacToe.module.scss';

const css = classNames.bind(style);

type Sign = 'X' | 'O' | '-1';

const lines: number[][] = [
  // Horizontal lines
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],

  // Vertical lines
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],

  // Diagonal lines
  [0, 4, 8],
  [2, 4, 6],
];

function getResult(data: Sign[]): Sign {
  for (const line of lines) {
    let i = 1;
    while (i < line.length) {
      if (data[line[i]] !== data[line[i - 1]]) {
        break;
      }
      i++;
    }
    if (i == line.length && data[line[i - 1]] !== '-1') {
      return data[line[i - 1]];
    }
  }
  return '-1';
}

function TicTacToe() {
  const [data, setData] = useState<Sign[]>(Array<Sign>(9).fill('-1'));
  const [count, setCount] = useState<number>(0);
  const [lock, setLock] = useState<boolean>(false);
  const [winner, setWinner] = useState<Sign>('-1');
  const [visible, setVisible] = useState<boolean>(false);
  console.log(data);
  const toggle = (_e: MouseEvent<HTMLDivElement>, num: number) => {
    if (!lock && data[num] == '-1') {
      const who = count % 2 === 0 ? 'X' : 'O';
      setData((data) => {
        const newData = [...data];
        newData[num] = who;
        return newData;
      });
      setCount((count) => count + 1);
    }
  };

  useEffect(() => {
    checkWin();
  }, [data]);

  const checkWin = () => {
    const result = getResult(data);
    if (result != '-1' || count == 9) {
      setLock(true);
      setWinner(result);
      setVisible(true);
    }
  };

  const reset = () => {
    setData(Array<Sign>(9).fill('-1'));
    setLock(false);
    setCount(0);
  };

  return (
    <div className={css('container')}>
      <h1 className={css('h1')}>TIC TAC TOE</h1>
      <div className={css('board')}>
        <div className={css('row-1')}>
          {[0, 1, 2].map((num) => (
            <div
              key={num}
              className={css('box')}
              onClick={(e: MouseEvent<HTMLDivElement>) => toggle(e, num)}
            >
              {data[num] !== '-1' && (
                <img src={data[num] == 'X' ? XIcon : OIcon} alt="" />
              )}
            </div>
          ))}
        </div>
        <div className={css('row-2')}>
          {[3, 4, 5].map((num) => (
            <div
              key={num}
              className={css('box')}
              onClick={(e: MouseEvent<HTMLDivElement>) => toggle(e, num)}
            >
              {data[num] !== '-1' && (
                <img src={data[num] === 'X' ? XIcon : OIcon} alt="" />
              )}
            </div>
          ))}
        </div>
        <div className={css('row-3')}>
          {[6, 7, 8].map((num) => (
            <div
              key={num}
              className={css('box')}
              onClick={(e: MouseEvent<HTMLDivElement>) => toggle(e, num)}
            >
              {data[num] !== '-1' && (
                <img src={data[num] === 'X' ? XIcon : OIcon} alt="" />
              )}
            </div>
          ))}
        </div>
      </div>
      <button className={css('btn-reset')} onClick={reset}>
        Reset
      </button>
      <Modal title="Result" onClose={() => setVisible(false)} visible={visible}>
        {winner === '-1' ? (
          <div>
            <h2 className={css('h2')}>Draw</h2>
            <img className={css('winner-logo')} src={DrawIcon} />
          </div>
        ) : (
          <div>
            <h2 className={css('h2')}>Congratulations</h2>
            <img
              className={css('winner-logo')}
              src={winner == 'O' ? OIcon : XIcon}
            />
          </div>
        )}
      </Modal>
    </div>
  );
}

export default TicTacToe;
