import React, { useEffect } from 'react';
import '../App.css';
import { Amplify } from 'aws-amplify';
import { Authenticator, withAuthenticator } from '@aws-amplify/ui-react'
import '@aws-amplify/ui-react/styles.css';
import {useState} from 'react';
import config from '../amplifyconfiguration.json';
import {generateClient} from 'aws-amplify/api';
import {upLoadData, uploadData} from 'aws-amplify/storage'
import DatabaseEntry from '../DatabaseEntry';


Amplify.configure(config);

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

function Contribute() {
  const [lessons, setLessons] = useState([]);
  const[file, setFile] = useState([]);
  const[id, setId] = useState([]);
  const client = generateClient();

  const handleFileLoad = (event) => {
    console.log('loaded');
    const selectedFile = event.target.files[0];
    //generate key for file, put in state as well
    const randomNumber = getRandomInt(100, 99999999);

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
  //The contribution section is divided into two functions: file selection/uploading (into S3) and metadata entry(into DynamoDB), for easy reading. 
  //In a final solution, file and metadata uploading will be triggered with one button.
  //File uploading is handled here, in this component. 
  //Metadata uploading component, DatabaseEntry, is called here.

  return (
    
    <Authenticator >
    
        {({signOut, user}) => (
        
        <div className="App">
            
              <h2>Lesson Plan</h2>
                
                <div className='input-container'><input  type= "file" onChange={handleFileLoad}></input></div>
                <button onClick={handleUpload}>Submit Lesson Plan</button>
                <div className='overview-container'>
                <DatabaseEntry id = {id}/>
                </div>
                
                
            </div>
            )} 
      
    </Authenticator>

  );
}

export default withAuthenticator(Contribute);