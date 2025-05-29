import * as MENUS from 'constants/menus';
import { gql } from '@apollo/client';
import { BlogInfoFragment } from 'fragments/GeneralSettings';
import { pageTitle } from 'utilities';

import {
  Header,
  Footer,
  Main,
  ContentWrapper,
  EntryHeader,
  NavigationMenu,
  FeaturedImage,
  SEO,
  Row,
  Column
} from '../components';

export default function Practice(props) {
  if (props.loading) {
    return <>Loading...</>;
  }

  const { title: siteTitle, description: siteDescription } =
    props?.data?.generalSettings;
  const primaryMenu = props?.data?.headerMenuItems?.nodes ?? [];
  const footerMenu = props?.data?.footerMenuItems?.nodes ?? [];
  const { title, content, featuredImage } = props?.data?.practice ?? { title: '' };

  return (
    <>
      <SEO
        title={pageTitle(
          props?.data?.generalSettings,
          title,
          siteTitle
        )}
        description={siteDescription}
        imageUrl={featuredImage?.node?.sourceUrl}
      />
      <Header
        title={siteTitle}
        description={siteDescription}
        menuItems={primaryMenu}
      />

      <Main>
        <EntryHeader title={title} image={featuredImage?.node} />
        <Row className="main-inner">
          <Column className="content">
            <div className="entry-content" dangerouslySetInnerHTML={{ __html: content }} />
          </Column>
          <Column className="sidebar">
            <div className="sidebar-inner">
              <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit veniam est molestias expedita illum optio ea veritatis magnam ducimus, suscipit quis nisi ipsa deleniti asperiores, rerum quisquam atque! Quibusdam, maxime?</p>
            </div>
          </Column>
        </Row>
      </Main>
      <Footer title={siteTitle} menuItems={footerMenu} />
    </>
  );
}

Practice.variables = ({ uri }, ctx) => {
  return {
    uri,
    headerLocation: MENUS.PRIMARY_LOCATION,
    footerLocation: MENUS.FOOTER_LOCATION,
    asPreview: ctx?.asPreview,
  };
};

Practice.query = gql`
  ${BlogInfoFragment}
  ${NavigationMenu.fragments.entry}
  ${FeaturedImage.fragments.entry}
  query GetPracticeData(
    $uri: ID!
    $headerLocation: MenuLocationEnum
    $footerLocation: MenuLocationEnum
    $asPreview: Boolean = false
  ) {
    practice(id: $uri, idType: URI, asPreview: $asPreview) {
      title
      content
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
