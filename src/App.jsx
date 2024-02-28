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
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Download from './Download.jsx';
import Contribute from './components/Contribute.jsx';
import Overview from './components/Overview.jsx';
import SearchComponent from '/Users/eringeier/social-justice-math-app/src/components/SearchComponent.jsx';


//Configure is used for authenication

Amplify.configure(config)
//This is a simple id code generator-- production level requires more sophistication, checking for already in use, etc.
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

function App() {
 // const [lessons, setLessons] = useState([]);
  const[file, setFile] = useState([]);
  const[id, setId] = useState([]);
  //The following code was used to verify connection to database
  //useEffect(()=>{getLessons();}, []);
  const client = generateClient();
  // const getLessons =  async () => {
  //   try {
  //     const lessonData = await client.graphql({query:listLessonPlans});
  //     const lessonList = lessonData.data.listLessonPlans.items;
  //     console.log("All the lessons: "+lessonList);
  //     setLessons(lessonList);
  //   } catch (res) {
  //     console.error("error on fetching", res);
  //   }
  // }
  const handleFileLoad = (event) => {
    console.log('loaded');
    const selectedFile = event.target.files[0];
    //generate key for file, put in state 
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
    <Router>
    <Authenticator >
    
        {({signOut, user}) => (
        
        <div className="App">
          <div className="navbar">
          <Navbar />
            </div> 
          
          <button className="sign-out-button" onClick={signOut}>Sign Out</button>
            <header className='App-header'>

             <div>
             </div>
       <Routes>
          <Route path="/contribute" element={<Contribute />} />
          <Route path="/index.html" element={<Overview/>} />
          <Route path="/search" element={<SearchComponent/>} />
          <Route path="/download" element={<Download/>} />
        </Routes>
        </header> 
            </div>
            
            )} 
      
    </Authenticator>
    </Router>
  );
}

export default withAuthenticator(App);
