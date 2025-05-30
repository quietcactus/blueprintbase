// components/RelatedPractices.js
import { gql, useQuery } from '@apollo/client';

const PRACTICE_FIELDS = gql`
  fragment PracticeFields on Practice {
    databaseId
    title
    uri
  }
`;

const GET_PRACTICE_AREA = gql`
  query GetPracticeArea($id: ID!) {
    practice(id: $id, idType: DATABASE_ID) {
      ...PracticeFields
      children {
        nodes {
          ...PracticeFields
        }
      }
    }
  }
  ${PRACTICE_FIELDS}
`;

export default function RelatedPractices({ parentId }) {
  const { data, loading, error } = useQuery(GET_PRACTICE_AREA, {
    variables: { id: parentId },
  });

  if (loading) return <p>Loading sidebar…</p>;
  if (error) return <p>Error loading sidebar: {error.message}</p>;

  const { practice } = data;

  return (
    <section className="sidebar-block">
      <h2>{practice.title}</h2>
      <ul data-parent-id={practice.databaseId} data-overview-id={practice.databaseId}>
        <li>
          <a href={practice.uri}>Overview</a>
        </li>
        {practice.children.nodes.map((child) => (
          <li key={child.databaseId} data-post-id={child.databaseId}>
            <a href={child.uri}>{child.title}</a>
          </li>
        ))}
      </ul>
    </section>
  );
}
