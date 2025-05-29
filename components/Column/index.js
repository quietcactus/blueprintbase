import className from 'classnames/bind';
import styles from './Column.module.css';

const cx = className.bind(styles);

export default function Column({ children, className }) {
  return (
    <div className={cx('col', className)}>
      {children}
    </div>
  );
}