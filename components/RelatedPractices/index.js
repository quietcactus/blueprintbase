// components/RelatedPractices.js
import { gql, useQuery } from '@apollo/client';

export default function RelatedPractices({ currentPractice, allPractices }) {

  // Destructure currentPractice variables
  const {
    children: { nodes: currentPracticeChildren },
    parentDatabaseId: currentPracticeParentId
  } = currentPractice || {};

  // Destructure currentPractice variables 
  let {
    title: currentPracticeTitle,
    uri: overviewUrl
  } = currentPractice || {};

  let practicesToDisplay = [];

  if (currentPracticeChildren.length) {
    practicesToDisplay = currentPracticeChildren;
    overviewUrl = currentPracticeParentId === null ? '/practice-areas/' : '';
  }
  else if (currentPracticeParentId !== null) {
    practicesToDisplay = allPractices.filter(
      (practice) => practice.parentDatabaseId === currentPracticeParentId
    );

    // Find and set the parent practice URL as the overview URL
    const parentPractice = allPractices.find(
      (practice) => practice.databaseId === currentPracticeParentId
    );
    overviewUrl = parentPractice.uri;
  }
  else {
    practicesToDisplay = allPractices;
    currentPracticeTitle = 'Practice Areas';
    overviewUrl = '/practice-areas/';
  }

  return (
    <section className="sidebar-block">
      <h2>{currentPracticeTitle}</h2>
      <ul>
        {currentPractice && (
          <li>
            <a href={overviewUrl}>Overview</a>
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
