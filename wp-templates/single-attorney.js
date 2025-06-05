import * as MENUS from 'constants/menus';
import { useEffect } from 'react';
import { gql } from '@apollo/client';
import { BlogInfoFragment } from 'fragments/GeneralSettings';
import { pageTitle } from 'utilities';

import {
  Header,
  Footer,
  Main,
  EntryHeader,
  NavigationMenu,
  FeaturedImage,
  SEO,
  Row,
  Column,
  BannerAttorney
} from '../components';

export default function Component(props) {
  // Loading state for previews
  if (props.loading) {
    return <>Loading...</>;
  }

  const { title: siteTitle, description: siteDescription } =
    props?.data?.generalSettings;
  const primaryMenu = props?.data?.headerMenuItems?.nodes ?? [];
  const footerMenu = props?.data?.footerMenuItems?.nodes ?? [];
  const { title, content, featuredImage, attorneyFields } = props?.data?.attorney ?? { title: '' };
  const attorney = props?.data?.attorney;

  return (
    <>
      <SEO
        title={pageTitle(
          props?.data?.generalSettings,
          title,
          props?.data?.generalSettings?.title
        )}
        description={siteDescription}
        imageUrl={featuredImage?.node?.sourceUrl}
      />
      <Header
        title={siteTitle}
        description={siteDescription}
        menuItems={primaryMenu}
      />
      <BannerAttorney attorney={attorney} />
      <Main className='main'>
        <Row className='main-inner'>
          <Column className='content'>
            <div dangerouslySetInnerHTML={{ __html: content }}  ></div>
          </Column>
          <Column className='sidebar'>
            {attorneyFields?.sidebarText && (
              <section className="sidebar-block" dangerouslySetInnerHTML={{ __html: attorneyFields.sidebarText }} />
            )}
          </Column>
        </Row>
      </Main >
      <Footer title={siteTitle} menuItems={footerMenu} />
    </>
  );
}

Component.variables = ({ databaseId }, ctx) => {
  return {
    databaseId,
    headerLocation: MENUS.PRIMARY_LOCATION,
    footerLocation: MENUS.FOOTER_LOCATION,
    asPreview: ctx?.asPreview,
  };
};

Component.query = gql`
  ${BlogInfoFragment}
  ${NavigationMenu.fragments.entry}
  ${FeaturedImage.fragments.entry}
  query GetPageData(
    $databaseId: ID!
    $headerLocation: MenuLocationEnum
    $footerLocation: MenuLocationEnum
    $asPreview: Boolean = false
  ) {
    attorney(id: $databaseId, idType: DATABASE_ID, asPreview: $asPreview) {
      title
      content
      attorneyFields {
        position
        phone
        email
        fax
        sidebarText
      }
      ...FeaturedImageFragment
    }
    generalSettings {
      ...BlogInfoFragment
    }
    footerMenuItems: menuItems(where: { location: $footerLocation }) {
      nodes {
        ...NavigationMenuItemFragment
      }
    }
    headerMenuItems: menuItems(where: { location: $headerLocation }) {
      nodes {
        ...NavigationMenuItemFragment
      }
    }
  }
`;
