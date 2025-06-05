import className from 'classnames/bind';
import styles from './Row.module.css'

const cx = className.bind(styles);

export default function Row({ children, className }) {
  return (
    <div className={cx('row', className)}>
      {children}
    </div>
  );
}