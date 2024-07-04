import classNames from 'classnames/bind';
import { ReactNode } from 'react';
import style from './Modal.module.scss';

interface ModalProps {
  children: any;
  visible: boolean;
  title: string;
  onClose: () => void;
}

const css = classNames.bind(style);

function Modal({ title, visible, onClose, children }: ModalProps): ReactNode {
  return (
    visible && (
      <div className={css('modal')}>
        <div className={css('overlay')}></div>
        <div className={css('body')}>
          <h2 className={css('title')}>{title}</h2>
          <div className={css('inner')}>{children}</div>
          <button className={css('btn-close')} onClick={onClose}>Close</button>
        </div>
      </div>
    )
  );
}

export default Modal;
