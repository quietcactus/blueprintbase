import { useState } from 'react';
import className from 'classnames/bind';

import styles from './Accordion.module.css';

const cx = className.bind(styles);
export default function Accordion({ className, title, answer }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={cx('accordion-item', { 'active': isOpen }, className)}>
      <h3>
        <button className={cx('accordion-item-title')} onClick={toggleAccordion} aria-expanded="false" data-close-siblings="true">
          <span>{title}</span>
        </button>
      </h3>
      <div className={cx('accordion-item-content')}>
        {answer.map((item, index) => (
          <p key={index}>{item}</p>
        ))}
      </div>
    </div>
  );
}