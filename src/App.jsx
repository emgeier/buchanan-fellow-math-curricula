import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { Amplify } from 'aws-amplify';
import awsconfig from './aws-exports'
import { Authenticator, withAuthenticator } from '@aws-amplify/ui-react'
import '@aws-amplify/ui-react/styles.css';
import {listLessonPlans} from './graphql/queries';
import {useState} from 'react';
import config from './amplifyconfiguration.json';
import {generateClient} from 'aws-amplify/api';
import {upLoadData, uploadData} from 'aws-amplify/storage'
import DatabaseEntry from './DatabaseEntry';


Amplify.configure(config)
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

function App() {
  const [lessons, setLessons] = useState([]);
  const[file, setFile] = useState([]);
  const[id, setId] = useState([]);
  useEffect(()=>{getLessons();}, []);
  const client = generateClient();
  const getLessons =  async () => {
    try {
      const lessonData = await client.graphql({query:listLessonPlans});
      const lessonList = lessonData.data.listLessonPlans.items;
      console.log(lessonList);
      setLessons(lessonList);
    } catch (res) {
      console.error("error on fetching", res);
    }
  }
  const handleFileLoad = (event) => {
    console.log('loaded');
    const selectedFile = event.target.files[0];
    //generate key for file, put in state as well
    const randomNumber = getRandomInt(100, 99999999); // Generate a random number

    console.log(randomNumber);
    setId(randomNumber);
    setFile(selectedFile);

  }
  const handleUpload = async () => {
    if (!file) return;

    try {
      const result = await uploadData({
        key: id,
        data: file,
        // options: {
        //   accessLevel: 'private'
        // }
      }).result;
      console.log('File uploaded successfully!');
      console.log(result);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };
  
  
  return (
    <Authenticator >
    
        {({signOut, user}) => (
        
        <div className="App">
            <header className='App-header'>
              <button onClick={signOut}>Sign Out</button>
              <h1>AWS React Amplify Demo </h1>
              <h3>Lesson Plan</h3>
                <input  type= "file" onChange={handleFileLoad}></input>
                <button onClick={handleUpload}>Submit Lesson Plan</button>
                <DatabaseEntry id = {id}/>
              </header> 
            </div>
            )} 
      
    </Authenticator>
  );
}

export default withAuthenticator(App);
