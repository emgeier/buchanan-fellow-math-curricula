import React, { useEffect } from 'react';
import './App.css';
import { Amplify } from 'aws-amplify';
import '@aws-amplify/ui-react/styles.css';
import {listLessonPlans} from './graphql/queries';
import {useState} from 'react';
import {generateClient} from 'aws-amplify/api';

// query SearchLessonPlansByMathTopic {
//     searchLessonPlans(filter: { mathTopic: { eq: "fractions" } }) {
//       items {
//         id
//         title
//         mathTopic
//         socialJusticeTopic
//       }
//     }
//   }

//Additional Search strategies to be employed here

const Search = (props) => {
    return (
        <div>

        </div>
    );

}

export default Search


