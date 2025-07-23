import * as MENUS from 'constants/menus';

import { gql, useQuery } from '@apollo/client';
import { BlogInfoFragment } from 'fragments/GeneralSettings';
import { pageTitle } from 'utilities';

import {
  Header,
  Footer,
  Main,
  NavigationMenu,
  FeaturedImage,
  SEO,
  Row,
  Column,
} from '../components';

const GET_ALL_ATTORNEYS = gql`
  query GetAllAttorneys {
    attorneys(where: { parentIn: 0 }) {
      nodes {
        id
        title
        slug
      }
    }
  }
`;

export default function Attorney(props) {
  if (props.loading) {
    return <>Loading...</>;
  }

  const { title: siteTitle, description: siteDescription } =
    props?.data?.generalSettings;
  const primaryMenu = props?.data?.headerMenuItems?.nodes ?? [];
  const footerMenu = props?.data?.footerMenuItems?.nodes ?? [];
  const { title, content, featuredImage } = props?.data?.attorney ?? { title: '' };

  const { data, loading, error } = useQuery(GET_ALL_ATTORNEYS);

  if (loading) {
    return <p>Loading attorneys…</p>;
  }
  if (error) {
    return <p>Error loading attorneys: {error.message}</p>;
  }

  const { nodes: attorneys } = data.attorneys;

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
        <Row className="main-inner">
          <Column className="content full-width">
            <h1>Attorneys</h1>
            <div className="practice-box-list">
              {attorneys.map((attorney) => (
                <div></div>
              ))}
            </div>

          </Column>
        </Row>
      </Main>
      <Footer title={siteTitle} menuItems={footerMenu} />
    </>
  );
}

Attorney.variables = ({ uri }, ctx) => {
  return {
    uri,
    headerLocation: MENUS.PRIMARY_LOCATION,
    footerLocation: MENUS.FOOTER_LOCATION,
    asPreview: ctx?.asPreview,
  };
};

Attorney.query = gql`
  ${BlogInfoFragment}
  ${NavigationMenu.fragments.entry}
  ${FeaturedImage.fragments.entry}
  query GetAttorneyData(
    $uri: ID!
    $headerLocation: MenuLocationEnum
    $footerLocation: MenuLocationEnum
    $asPreview: Boolean = false
  ) {
    attorney(id: $uri, idType: URI, asPreview: $asPreview) {
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

