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
  PracticeBox,
} from '../components';

const GET_ALL_PRACTICES = gql`
  query GetAllPractices {
    practices(where: { parentIn: 0 }) {
      nodes {
        id
        title
        slug
      }
    }
  }
`;

export default function Practice(props) {
  // Fetch all practice areas
  const { data, loading, error } = useQuery(GET_ALL_PRACTICES);

  if (props.loading) {
    return <>Loading...</>;
  }

  const { title: siteTitle, description: siteDescription } =
    props?.data?.generalSettings;
  const primaryMenu = props?.data?.headerMenuItems?.nodes ?? [];
  const footerMenu = props?.data?.footerMenuItems?.nodes ?? [];
  const { title, featuredImage } = props?.data?.practice ?? { title: '' };

  if (loading) {
    return <p>Loading practice areas…</p>;
  }
  if (error) {
    return <p>Error loading practice areas: {error.message}</p>;
  }

  // Destructure practices from the fetched data
  const { nodes: practices } = data.practices;

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
            <h1>Practice Areas</h1>
            <div className="practice-box-list">
              {practices.map((practice) => (
                <PracticeBox
                  key={practice.id}
                  title={practice.title}
                  link={`/practice/${practice.slug}`}
                />
              ))}
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

// Define the GraphQL query to fetch practice data
// The data is stored in the props.data object
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

