import className from 'classnames/bind';

import styles from './PracticeBox.module.css';
const cx = className.bind(styles);


export default function PracticeBox({ classNames, link, title }) {
  return (
    <a className={cx('practice-box', classNames)} href={link}>{title}</a>
  );
}