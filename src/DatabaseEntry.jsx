import { useEffect, useState } from 'react';

import { generateClient } from 'aws-amplify/api';

import { createLessonPlan } from './graphql/mutations';
//import { createLesson } from './graphql/mutations';
//import { listLessonPlans } from './graphql/queries';

const client = generateClient();

const DatabaseEntry = (props) => {
    //how do you do this best, honestly, just use filePath?
    console.log(props.id);
  const initialState = { id: props.id, title: '', description: '', filePath: props.id , mathTopic: 'fractions', socialJusticeTopic: 'racial equality', author: 'Erin'};
  
  const [formState, setFormState] = useState(initialState);
  const [lessonPlans, setLessonPlans] = useState([]);

//   useEffect(() => {
//     fetchLessonPlans();
//   }, []);

  function setInput(key, value) {
    setFormState({ ...formState, [key]: value });
  }

//   async function fetchLessonPlans() {
//     try {
//       const lessonPlanData = await client.graphql({
//         query: listLessonPlans
//       });
//       const lessonPlans = lessonPlanData.data.listLessonPlans.items;
//       setLessonPlans(lessonPlans);
//     } catch (err) {
//       console.log('error fetching ');
//     }
//   }

  async function addLessonPlan() {
    try {
        console.log("owner: " + formState.author);
        console.log("id:" +  formState.id);
        //description optional? only id necessary?
      if (!formState.title || !formState.description) 
      {console.log('title or description empty');
        return;}
        
      const lessonPlan = { ...formState };
      setLessonPlans([...lessonPlans, lessonPlan]);
      setFormState(initialState);
      console.log(lessonPlan);
      await client.graphql({
        query: createLessonPlan,
        variables: {
          input: lessonPlan
        }
      });
    } catch (err) {
      console.log('error creating lesson plan:', err);
    }
  }

  return (
    <div style={styles.container}>
      <h3>Lesson Plan Metadata</h3>
      <input
        onChange={(event) => setInput('title', event.target.value)}
        style={styles.input}
        value={formState.title}
        placeholder="Title"
      />
      <input
        onChange={(event) => setInput('description', event.target.value)}
        style={styles.input}
        value={formState.description}
        placeholder="Description"
      />
      <button style={styles.button} onClick={addLessonPlan}>
        Input Lesson Plan Metadata
      </button>
      {lessonPlans.map((lessonPlan, index) => (
        //explain:
         <div key={lessonPlan.id ? lessonPlan.id : index} style={styles.lessonPlan}>
            
         </div>
      ))}
    </div>
  );
};

const styles = {
  container: {
    width: 400,
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 20
  },
  lessonPlan: { marginBottom: 15 },
  input: {
    border: 'none',
    backgroundColor: '#ddd',
    marginBottom: 10,
    padding: 8,
    fontSize: 18
  },
  lessonPlanName: { fontSize: 20, fontWeight: 'bold' },
  lessonPlanDescription: { marginBottom: 0 },
  button: {
    backgroundColor: 'black',
    color: 'white',
    outline: 'none',
    fontSize: 18,
    padding: '12px 0px'
  }
};

export default DatabaseEntry;