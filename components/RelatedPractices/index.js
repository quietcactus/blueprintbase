// components/RelatedPractices.js
import { gql, useQuery } from '@apollo/client';

export default function RelatedPractices({ parentId, currentPractice, allPractices }) {

  const { children: { nodes: currentPracticeChildren }, parentDatabaseId: currentPracticeParentId } = currentPractice || {};

  console.log(currentPractice)
  console.log(allPractices)

  // initialize practicesToDisplay based on the current practice's children or root practices
  let practicesToDisplay = [];

  if (currentPracticeChildren.length || currentPracticeParentId !== null) {
    practicesToDisplay = currentPracticeChildren;
  }
  else {
    practicesToDisplay = rootPractices;
  }

  return (
    <section className="sidebar-block">
      <h2>{currentPractice?.title}</h2>
      <ul>
        {currentPractice && (
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
