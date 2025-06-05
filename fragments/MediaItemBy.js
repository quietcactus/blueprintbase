import { gql } from "@apollo/client";

export const MediaItemByFragment = gql`
  fragment MediaItemByFragment on MediaItem {
    sourceUrl
    altText
    title
    caption
    mediaDetails {
      width
      height
    }
}
`;