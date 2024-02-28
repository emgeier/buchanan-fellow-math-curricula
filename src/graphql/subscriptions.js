/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateLessonPlan = /* GraphQL */ `
  subscription OnCreateLessonPlan(
    $filter: ModelSubscriptionLessonPlanFilterInput
    $owner: String
  ) {
    onCreateLessonPlan(filter: $filter, owner: $owner) {
      id
      title
      description
      filePath
      mathTopic
      socialJusticeTopic
      author
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const onUpdateLessonPlan = /* GraphQL */ `
  subscription OnUpdateLessonPlan(
    $filter: ModelSubscriptionLessonPlanFilterInput
    $owner: String
  ) {
    onUpdateLessonPlan(filter: $filter, owner: $owner) {
      id
      title
      description
      filePath
      mathTopic
      socialJusticeTopic
      author
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const onDeleteLessonPlan = /* GraphQL */ `
  subscription OnDeleteLessonPlan(
    $filter: ModelSubscriptionLessonPlanFilterInput
    $owner: String
  ) {
    onDeleteLessonPlan(filter: $filter, owner: $owner) {
      id
      title
      description
      filePath
      mathTopic
      socialJusticeTopic
      author
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
