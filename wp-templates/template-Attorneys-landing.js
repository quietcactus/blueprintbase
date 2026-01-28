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
  AttorneyResultsWrapper,
  AttorneyBox,
} from '../components';

const GET_ALL_ATTORNEYS = gql`
  query GetAllAttorneys {
    attorneys(where: { parentIn: 0, orderby: { field: MENU_ORDER, order: ASC } }) {
      nodes {
        id
        title
        uri
        attorneyFields {
          thumbnailPhoto {
            node {
              sourceUrl
            }
          }
          position
        }
      }
    }
  }
`;

export default function Attorney(props) {
  const { data, loading, error } = useQuery(GET_ALL_ATTORNEYS);

  if (props.loading) {
    return <>Loading...</>;
  }

  const { title: siteTitle, description: siteDescription } =
    props?.data?.generalSettings;
  const primaryMenu = props?.data?.headerMenuItems?.nodes ?? [];
  const footerMenu = props?.data?.footerMenuItems?.nodes ?? [];
  const { title, featuredImage } = props?.data?.attorney ?? { title: '' };

  console.log(data);

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
      {/* test */}
      <Main>
        <Row className="main-inner test">
          <Column className="content full-width">
            <h1>Attorneys</h1>
            <AttorneyResultsWrapper attorneys={attorneys} >
              {attorneys.map((attorney) => (
                <AttorneyBox
                  key={attorney.id}
                  title={attorney.title}
                  link={attorney.uri}
                  attorneyPhoto={attorney.attorneyFields?.thumbnailPhoto?.node?.sourceUrl}
                  attorneyPosition={attorney.attorneyFields?.position}
                />
              ))}
            </AttorneyResultsWrapper>
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

