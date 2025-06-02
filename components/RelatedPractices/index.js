// components/RelatedPractices.js
import { gql, useQuery } from '@apollo/client';

export default function RelatedPractices({ parentId, allPractices, rootData }) {

  console.log('RelatedPractices', { parentId, allPractices, rootData });

  // const { practice } = data || {};
  // const rootPractices = rootData?.practices?.nodes || [];

  // if allPractices.children.nodes is not empty, practicesToDisplay is allPractices, else it is rootData
  const practicesToDisplay = allPractices?.children?.nodes?.length
    ? allPractices.children.nodes
    : rootData || {};



  return (
    <section className="sidebar-block">
      <h2>{allPractices?.title}</h2>
      <ul>
        {allPractices && (
          <li>
            <a href="/practice-areas/">Overview</a>
          </li>
        )}
        {practicesToDisplay.map((child) => (
          <li key={child.databaseId} data-post-id={child.databaseId}>
            <a href={child.uri}>{child.title}</a>
          </li>
        ))}
      </ul>
    </section>
  );
}
