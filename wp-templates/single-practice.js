import * as MENUS from 'constants/menus';
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
  RelatedPractices,
  Accordion
} from '../components';

export default function Practice(props) {
  if (props.loading) {
    return <>Loading...</>;
  }

  // Set page title and description
  const { title: siteTitle, description: siteDescription } =
    props?.data?.generalSettings;

  // Set primary menu items
  const primaryMenu = props?.data?.headerMenuItems?.nodes ?? [];

  console.log(primaryMenu)

  // Set footer menu items
  const footerMenu = props?.data?.footerMenuItems?.nodes ?? [];

  // Set current practice area data
  const currentPractice = props?.data?.currentPracticeArea ?? [];

  // Set all practice areas data
  const { nodes: allPractices } = props?.data?.allPracticeAreas ?? { nodes: [] };

  // Destructure current practice area data
  const {
    databaseId,
    parentDatabaseId: currentPracticeParentId,
    title,
    content,
    featuredImage
  } = props?.data?.currentPracticeArea ?? { title: '' };

  // console.log('allPractices', allPractices);
  // console.log('currentPractice', currentPractice);

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
            <Accordion
              className="accordion"
              title="Frequently Asked Questions"
              answer={[
                'Aenean tellus metus, bibendum sed, posuere ac, mattis non, nunc. Aenean massa. Donec sodales sagittis magna. Vestibulum suscipit nulla quis orci. In auctor lobortis lacus.',
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi.',
              ]}
            />
          </Column>
          <Column className="sidebar">
            <div className="sidebar-inner">
              <RelatedPractices currentPractice={currentPractice} allPractices={allPractices} />
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

const PracticeFieldsFragment = gql`
  fragment PracticeFieldsFragment on Practice {
    databaseId
    title
    uri
    parentDatabaseId
  }
`;

Practice.query = gql`
  ${BlogInfoFragment}
  ${NavigationMenu.fragments.entry}       # NavigationMenuItemFragment
  ${FeaturedImage.fragments.entry}        # FeaturedImageFragment
  ${PracticeFieldsFragment}

  query GetPracticeData(
    $uri: ID!
    $headerLocation: MenuLocationEnum
    $footerLocation: MenuLocationEnum
    $asPreview: Boolean = false
  ) {
    currentPracticeArea: practice(id: $uri, idType: URI, asPreview: $asPreview) {
      content
      ...PracticeFieldsFragment
      ...FeaturedImageFragment
      children {
        nodes {
          ...PracticeFieldsFragment
        }
      }
    }
    allPracticeAreas: practices {
      nodes {
        ...PracticeFieldsFragment
      }
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
