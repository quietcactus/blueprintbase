import className from 'classnames/bind';

import styles from './AttorneyResultsWrapper.module.css';

const cx = className.bind(styles);

export default function AttorneyResultsWrapper({ classNames, children }) {
  return (
    <div className={cx('attorney-results', classNames)}>
      {children}
    </div>
  );
}