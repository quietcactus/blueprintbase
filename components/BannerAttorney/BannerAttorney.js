import className from 'classnames/bind';
import { gql, useQuery } from '@apollo/client';
import { MediaItemByFragment } from 'fragments/MediaItemBy';
import Row from 'components/Row';
import Column from 'components/Column';
import Image from 'next/image';
import { useState } from 'react';

import styles from './BannerAttorney.module.css';

const GET_ATTORNEY_DEFAULT_IMAGE = gql`
  ${MediaItemByFragment}
  query GetAttorneyDefaultImage($imageId: Int!) {
    mediaItemBy(mediaItemId: $imageId) {
      ...MediaItemByFragment
    }
  }
`;

const GET_ATTORNEY_BACKGROUND_IMAGE = gql`
  ${MediaItemByFragment}
  query GetAttorneyDefaultImage($imageId: Int!) {
    mediaItemBy(mediaItemId: $imageId) {
      ...MediaItemByFragment
    }
  }
`;

const cx = className.bind(styles);

export default function BannerAttorney({ attorney, className, featuredImage }) {
  const [imageLoaded, setImageLoaded] = useState(false);

  const {
    data: { mediaItemBy: { sourceUrl: defaultImageUrl } = {} } = {},
    loading: defaultImageLoading,
    error: defaultImageError,
  } = useQuery(GET_ATTORNEY_DEFAULT_IMAGE, {
    variables: { imageId: 1544 },
  });

  const {
    data: { mediaItemBy: { sourceUrl: defaultbackgroundUrl } = {} } = {},
    loading: defaultBackgroundLoading,
    error: defaultBackgroundError,
  } = useQuery(GET_ATTORNEY_BACKGROUND_IMAGE, {
    variables: { imageId: 1545 },
  });

  if (defaultImageError) return <p>Error: {defaultImageError.message}</p>;

  // Set default image for the attorney banner
  const attorneyImage = defaultImageUrl;
  const attorneyBackground = featuredImage?.node?.sourceUrl ? featuredImage.node.sourceUrl : defaultbackgroundUrl;
  const attorneyFields = attorney?.attorneyFields || {};
  return (
    <div className={cx('banner', className)} id="banner" style={{ backgroundImage: `url(${attorneyBackground})` }} >
      <Row>
        <Column className={cx('banner-inner')}>
          <div className={cx('attorney-banner-left')}>
            <Image 
              src={attorneyImage} 
              alt="Paul J. Williams attorney photo" 
              width="400" 
              height="400" 
              draggable="false"
              onLoad={() => setImageLoaded(true)}
              className={cx('attorney-image', { 'image-loaded': imageLoaded })}
            />
          </div>
          <div className={cx('attorney-banner-right')}>
            <div className={cx('attorney-banner-name')}>
              <h1>{attorney?.title}</h1>
            </div>
            <div className={cx('attorney-banner-info')}>
              <p><a className={cx('no-underline')} href={`mailto:${attorneyFields?.email}`}><i className={cx('fas fa-envelope small-margin-right')}></i>{attorneyFields?.email}</a></p>
              <div className={cx('attorney-banner-phone-fax attorney-banner-flex-row')}>
                <p><a className={cx('no-underline tel-link')} href={`tel:+1-${attorneyFields?.phone}`}><i className={cx('fas fa-phone small-margin-right')}></i>{attorneyFields?.phone}</a></p>
                <p><i className={cx('fas fa-fax small-margin-right')}></i>{attorneyFields?.fax}</p>
              </div>
              <p className={cx('generate-vcard')}><i className={cx('fas fa-address-card small-margin-right')}></i><a className="no-underline" href="https://wordpressbase.wpengine.com/wp-content/themes/paperstreet/vcard/vcard.php?name=paul-j-williams">Download vCard</a></p>
              <p className={cx('generate-pdf')}><a className={cx('no-underline external-link')} href="#" target="_blank" rel="noopener" aria-label="Opens in a new tab"><i className={cx('fas fa-file-pdf small-margin-right')}></i>Print PDF</a></p>
            </div>
          </div>
        </Column>
      </Row >
    </div >

  );
}