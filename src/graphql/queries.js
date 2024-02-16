/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getLessonPlan = /* GraphQL */ `
  query GetLessonPlan($id: ID!) {
    getLessonPlan(id: $id) {
      id
      title
      description
      filePath
      mathTopic
      socialJusticeTopic
      owner
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listLessonPlans = /* GraphQL */ `
  query ListLessonPlans(
    $filter: ModelLessonPlanFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listLessonPlans(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        description
        filePath
        mathTopic
        socialJusticeTopic
        owner
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
