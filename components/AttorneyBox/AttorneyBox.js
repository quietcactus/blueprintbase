import className from 'classnames/bind';
import Image from 'next/image';

import styles from './AttorneyBox.module.css';

const cx = className.bind(styles);

export default function AttorneyBox({ classNames, link, title, attorneyPhoto, attorneyPosition }) {
  if (!attorneyPhoto) {
    // attorneyPhoto = "https://wordpressbase.wpengine.com/wp-content/themes/paperstreet/images/_attorney.webp";
  }
  return (
    <a className={cx('attorney-single-box', classNames)} href={link}>
		<Image src={attorneyPhoto} alt={title} width="400" height="400" draggable="false" />
		<div className={cx('attorney-single-box-info')}>
			<h2>
				{title}
			</h2>
			{attorneyPosition && (
				<p>
					{attorneyPosition}
				</p>
			)}
		</div>
	</a>
  )
}