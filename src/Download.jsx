import { useEffect, useState } from 'react';

import { generateClient } from 'aws-amplify/api';

import { createLessonPlan } from './graphql/mutations';

import { listLessonPlans } from './graphql/queries';
import { getLessonPlan } from './graphql/queries';
import { downloadData } from 'aws-amplify/storage';

import { getUrl } from 'aws-amplify/storage';

import { list } from 'aws-amplify/storage';
const client = generateClient();

//This is a barebones download function-- it just lists all the objects in our bucket so you can choose to download one.
//The functionality will be hooked up to the search function for more meaningful downloads. 
//This is example code to show how it works.

const Download = (props) => {
    const [fileData, setFileData] = useState();
    const [fileStatus, setFileStatus] = useState(false);
    const [s3DownloadLinks, setS3DownloadLinks] = useState([]);

    async function listObjectsInBucket() {
        try {
            const s3Objects = await list('');
            const downloadLinks = await Promise.all(
                s3Objects.items.map(async (item) => {
                    const downloadLink = await generateDownloadLinks(item.key);
                    console.log("downloadLink: "+ downloadLink);
                    return downloadLink;
                })
            );
            setS3DownloadLinks(downloadLinks);
        } catch (error) {
            console.log(error);
        }
    }
       
    async function generateDownloadLinks(fileKey){
        try {
            const getUrlResult = await getUrl({key: fileKey});
            console.log('signed url: ', getUrlResult.url.href);
            console.log('searchparams url: ', getUrlResult.url.searchParams);

            return getUrlResult.url.href;
  // Alternatively, you can use `downloadResult.body.text()`
  // or `downloadResult.body.json()` get read body in Blob or JSON format.

        } catch (error) {
            console.log('Error : ', error);
        }

    }
    // async function downloadBlob(blob, filename) {
    //     const url = URL.createObjectURL(blob);
    //     // const a = document.createElement("a");
    //     // a.href = url;
    //     return url;
    // }

    useEffect(() => {
        listObjectsInBucket();
        // the [] means that the listObjects will only happen once, not every time download is rerendered.
    }, []);

    return (
        <div>
            {s3DownloadLinks.map((item, index) => (
                <div key = {index}>
                    <a href={item} target="_blank" download="">
                        Lesson {index+1}
                        </a>
                        </div>
            ))}
        </div>
    );

}
export default Download;

//This left in to show examples of additional options (ignore if none needed)
//To get url
// 

// const getUrlResult = await getUrl({
//   key: filename,
//   options: {
//     accessLevel?: 'guest' , // can be 'private', 'protected', or 'guest' but defaults to `guest`
//     targetIdentityId?: 'XXXXXXX', // id of another user, if `accessLevel` is `guest`
//     validateObjectExistence?: false,  // defaults to false
//     expiresIn?: 20 // validity of the URL, in seconds. defaults to 900 (15 minutes) and maxes at 3600 (1 hour)
//     useAccelerateEndpoint?: true; // Whether to use accelerate endpoint.
//   },
// });
// console.log('signed URL: ', getUrlResult.url);
// console.log('URL expires at: ', getUrlResult.expiresAt);
//To download file to memory buffer
// Downloads file content to memory

// const  { body, eTag } = await downloadData({
//     key,
//     data: file,
//     options: {
//       accessLevel: 'guest', // access level of the file being downloaded
//       onProgress: (event) => {
//         console.log(event.transferredBytes);
//       } // optional progress callback
//     }
//   }).result;
  

// try {
//   const downloadResult = await downloadData({ key: filename }).result;
//   const text = await downloadResult.body.text();
//   // Alternatively, you can use `downloadResult.body.blob()`
//   // or `downloadResult.body.json()` get read body in Blob or JSON format.
//   console.log('Succeed: ', text);
// } catch (error) {
//   console.log('Error : ', error);
// }