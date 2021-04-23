/**
 SPDX-License-Identifier: Apache-2.0
*/
import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import { processCSVRecords, processTextRecords } from 'openidl-mapper/FileProcessor'

function App() {
  const [selectedFile, setSelectedFile] = useState();
  const [isSelected, setIsSelected] = useState(false);
  const [fileText, setFileText] = useState();
  const [resultRecords, setResultRecords] = useState({})
  const [inputRecords, setInputRecords] = useState([])
  const [token, setToken] = useState('')
  const [fileProcessed, setFileProcessed] = useState(false)
  const [fileType, setFileType] = useState('text')
  const [schema, setSchema] = useState('statplan')
  var theText = ''

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    setIsSelected(true);
    event.preventDefault()
    const reader = new FileReader()
    reader.onload = async (event) => {
      const text = (event.target.result)
      console.log(text)
      setFileText(text)
      setInputRecords(text.split('\n'))
      setIsSelected(true)
      setFileProcessed(false)
    };
    reader.readAsText(event.target.files[0])
    setResultRecords({});
  };

  const handleSubmission = async () => {
    console.log('submitted', selectedFile)

    let payloads = []
    if (fileType === 'csv') {
      payloads = await processCSVRecords(fileText)
    } else {
      payloads = await processTextRecords(fileText)
    }
    console.log('payloads',payloads)
    // console.log(JSON.stringify(payload))

  for (let payload of payloads) {
    try {

      // const response = await fetch('http://insurance-data-manager-service.default.svc.cluster.local/openidl/api/load-insurance-data', {
        // const response = await fetch('http://insurance-data-manager-service:8080/openidl/api/load-insurance-data', {
      // const response = await fetch('http://192.168.64.8:32211/openidl/api/load-insurance-data', {
      const response = await fetch('http://insurance-data-manager-aais.test.io/openidl/api/load-insurance-data', {
        // const response = await fetch('http://localhost:8080/openidl/api/load-insurance-data', {
          method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'authorization': 'Bearer ' + token
        },
        body: JSON.stringify(payload)
      });
      setResultRecords(payload);
      setFileProcessed(true);
    } catch (error) {
      console.log('Error with post of insurance data ' + error);
      return
    }
  }
}
  
  const changeToken = async (event) => {
    setToken(event.target.value)
  }

  const changeFileType = async (event) => {
    setFileType(event.target.value)
  }

  const changeSchema = async (event) => {
    setSchema(event.target.value)
  }

  const items = []
  for (let row of inputRecords) {
    items.push(<tr><td><pre>{row}</pre></td></tr>)
  }

  var submitButton = 
    isSelected && !fileProcessed 
      ? <button enabled onClick={handleSubmission}>Submit</button>
      : <button disabled onClick={handleSubmission}>Submit</button>
  

  return (
    <div className="App">
      <header className="App-header">
        <h1>Upload a File</h1>
      </header>
      <form>
        <p>Token</p>
        <input type="password" value={token} name="token" onChange={changeToken}/>
        <p>File Type</p>
        <select value={fileType} name="fileType" onChange={changeFileType}>
          <option value="csv">CSV</option>
          <option value="text">Text</option>
        </select>
        <p>Schema</p>
        <select value={schema} name="schema" onChange={changeSchema}>
          <option value="statplan">AAIS Stat Plan</option>
          <option value="dataLakeExport">Data Lake Export</option>
        </select>
      </form>
      <hr/>
      <h2>File Selection</h2>
      <div>
        <input type="file" name="file" onChange={changeHandler} />
        <div>
          {submitButton}
        </div>
      </div>
      <hr/>
      <div>
        <h2>Input Records</h2>
        <table>
          {items}
        </table>
      </div>
      <hr/>

      <div><h2>Loaded Records</h2>Processed {resultRecords.length} Records</div>
    </div>
  );

}

export default App;
