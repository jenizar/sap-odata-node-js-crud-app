const path = require('path');
const express = require('express');
const hbs = require('hbs');
const bodyParser = require('body-parser');
const app = express();
const axios = require('axios');
const { Buffer } = require('buffer');

// Replace with your actual username and password
const username = 'DEVELOPER';
const password = 'ABAPtr2022#01';
const emplist = '';

const url1 = 'http://vhcala4hci:50000/sap/opu/odata/sap/YPEGAWAI_SRV/PEGAWAISet';
const url2 = 'http://vhcala4hci:50000/sap/opu/odata/sap/YPEGAWAI_SRV/PEGAWAISet?$format=json';

// Encode credentials in Base64 for Basic Auth
const auth = Buffer.from(`${username}:${password}`).toString('base64');

cookies_list = {};

//set views file
app.set('views', path.join(__dirname, 'views'));
//set view engine
app.set('view engine', 'hbs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
//set folder public as static folder for static file
app.use('/assets', express.static(__dirname + '/public'));

async function getEmployeeData(simplifiedEmployees) {
  try {
    const response = await axios.get(url2, {
      auth: {
        username: username,
        password: password
      },
      headers: {
        'Accept': 'application/json'
      }
    });

        // Extract the list of employees
        const employees = response.data.d.results;

        // Map only required fields
        const simplifiedEmployees = employees.map(emp => ({
            Empid: emp.Empid,
            Empname: emp.Empname,
            Emppost: emp.Emppost,
            Empphoto: emp.Empphoto.trim() // Trim any whitespace in URL
        }));

        // Output or use the simplified data
        //console.log(JSON.stringify(simplifiedEmployees, null, 2));

        return simplifiedEmployees;
        emplist = simplifiedEmployees;
    } catch (error) {
        console.error('Error fetching data:', error.message);
    }
}

//route for homepage
app.get('/', (req, res) => {
// Call the function
getEmployeeData().then(
  function(value) {myDisplayer(value);}
);
function myDisplayer(some) {
   console.log(some);
        res.render('ec_view', {
            emplist: some
        });   
}
  
})

//route for insert data
app.post('/save', (req, res) => {
  let empid = req.body.empid;
  let empname = req.body.empname;
  let emppost = req.body.emppost;
  let empphoto = req.body.empphoto;
  const employee = {
    'Empid': empid, 
    'Empname': empname, 
    'Emppost': emppost, 
    'Empphoto': empphoto
  }
  payload = JSON.stringify(employee, null, 1);   

  postToOData();

async function postToOData() {
  try {
    // Step 1: Fetch CSRF Token
        const getTokenResponse = await axios({
            method: 'get', // You can also use HEAD
            url: url1,
            headers: {
                'Authorization': `Basic ${auth}`,
                'X-CSRF-Token': 'Fetch',
                'Content-Type': 'application/json'
            },
            // Optional: if server uses cookies for session
            withCredentials: true
        });

    const csrfToken = getTokenResponse.headers['x-csrf-token'];
    const rawCookies = getTokenResponse.headers['set-cookie'];

        //rawCookies.forEach(cookie => {          
        rawCookies.forEach((cookieString) => {  
            // Split by the first '=' to separate name and value
            const parts = cookieString.split(';');
            const nameValue = parts[0].split('=');
            const cookieName = nameValue[0];
            const cookieValue = nameValue[1];
            cookies_list[cookieName] = cookieValue
          });

        console.log(csrfToken);        
        cookAll = 'sap-usercontext=' + cookies_list['sap-usercontext'] + '; ' +
                  'MYSAPSSO2=' + cookies_list['MYSAPSSO2'] + '; ' +
                  'SAP_SESSIONID_A4H_001=' + cookies_list['SAP_SESSIONID_A4H_001'] + ';';  
        //console.log(cookAll);   

    //return csrfToken;
    if (!csrfToken) {
      throw new Error('Failed to retrieve CSRF token');
    }

    // Step 2: POST the data
    const response = await axios.post(url1, payload, {      
            headers: {    
                'Authorization': `Basic ${auth}`,            
                'x-csrf-token': csrfToken,      
                'Cookie': `"${cookAll}"`,       
                'content-type': 'application/json'
            },
            // Optional: if server uses cookies for session
            withCredentials: true                       
    });
  
    console.log('Success:', response.status, response.data);
        // Redirect back to homepage
    res.redirect('/');
  } catch (error) {
    console.log(JSON.stringify(payload, null, 1));
     console.log(cookAll);

    console.error('Error:', error.response?.status, error.response?.data || error.message);  
  }
}  
});

//route for update data
app.post('/update', (req, res) => {
  let empid = req.body.empid;
  let empname = req.body.empname;
  let emppost = req.body.emppost;
  let empphoto = req.body.empphoto;
  const employee = {
    'Empid': empid, 
    'Empname': empname, 
    'Emppost': emppost, 
    'Empphoto': empphoto
  }
  payload = JSON.stringify(employee, null, 1); 
  postToOData2();

async function postToOData2() {
  try {
    // Step 1: Fetch CSRF Token
        const getTokenResponse = await axios({
            method: 'get', // You can also use HEAD
            url: url1,
            headers: {
                'Authorization': `Basic ${auth}`,
                'X-CSRF-Token': 'Fetch',
                'Content-Type': 'application/json'
            },
            // Optional: if server uses cookies for session
            withCredentials: true
        });

    const csrfToken = getTokenResponse.headers['x-csrf-token'];
    const rawCookies = getTokenResponse.headers['set-cookie'];

        //rawCookies.forEach(cookie => {          
        rawCookies.forEach((cookieString) => {  
            // Split by the first '=' to separate name and value
            const parts = cookieString.split(';');
            const nameValue = parts[0].split('=');
            const cookieName = nameValue[0];
            const cookieValue = nameValue[1];
            cookies_list[cookieName] = cookieValue
          });

        console.log(csrfToken);        
        cookAll = 'sap-usercontext=' + cookies_list['sap-usercontext'] + '; ' +
                  'MYSAPSSO2=' + cookies_list['MYSAPSSO2'] + '; ' +
                  'SAP_SESSIONID_A4H_001=' + cookies_list['SAP_SESSIONID_A4H_001'] + ';';  
        //console.log(cookAll);   

    //return csrfToken;
    if (!csrfToken) {
      throw new Error('Failed to retrieve CSRF token');
    }

    // Step 2: POST the data
    const response = await axios.post(url1, payload, {      
            headers: {    
                'Authorization': `Basic ${auth}`,            
                'x-csrf-token': csrfToken,      
                'Cookie': `"${cookAll}"`,       
                'content-type': 'application/json'
            },
            // Optional: if server uses cookies for session
            withCredentials: true                       
    });
  
    console.log('Success:', response.status, response.data);
        // Redirect back to homepage
    res.redirect('/');
  } catch (error) {
    console.log(payload);
     console.log(cookAll);

    console.error('Error:', error.response?.status, error.response?.data || error.message);  
  }
} 
});

//route for delete data
app.post('/delete', (req, res) => {
  const empid = req.body.empid;
  const employee = {
    'Empid': empid
  }
  payload = JSON.stringify(employee, null, 1); 
     // console.log(payload, null, 1);
  postToOData3(empid);

async function postToOData3(empid) {
  try {
    // Step 1: Fetch CSRF Token
        const getTokenResponse = await axios({
            method: 'get', // You can also use HEAD
            url: url1,
            headers: {
                'Authorization': `Basic ${auth}`,
                'X-CSRF-Token': 'Fetch',
                'Content-Type': 'application/json'
            },
            // Optional: if server uses cookies for session
            withCredentials: true
        });

    const csrfToken = getTokenResponse.headers['x-csrf-token'];
    const rawCookies = getTokenResponse.headers['set-cookie'];

        //rawCookies.forEach(cookie => {          
        rawCookies.forEach((cookieString) => {  
            // Split by the first '=' to separate name and value
            const parts = cookieString.split(';');
            const nameValue = parts[0].split('=');
            const cookieName = nameValue[0];
            const cookieValue = nameValue[1];
            cookies_list[cookieName] = cookieValue
          });

        console.log(csrfToken);        
        cookAll = 'sap-usercontext=' + cookies_list['sap-usercontext'] + '; ' +
                  'MYSAPSSO2=' + cookies_list['MYSAPSSO2'] + '; ' +
                  'SAP_SESSIONID_A4H_001=' + cookies_list['SAP_SESSIONID_A4H_001'] + ';';  
       //console.log(cookAll);   
       empid = `'${empid}'`
       url3 = 'http://vhcala4hci:50000/sap/opu/odata/sap/YPEGAWAI_SRV/PEGAWAISet' + '(' + empid + ')'

    //return csrfToken;
    if (!csrfToken) {
      throw new Error('Failed to retrieve CSRF token');
    }

    // Step 2: POST the data
    const response = await axios.delete(url3, {      
            headers: {    
                'Authorization': `Basic ${auth}`,            
                'x-csrf-token': csrfToken,      
                'Cookie': `"${cookAll}"`,       
                'content-type': 'application/json'
            },
            // Optional: if server uses cookies for session
            withCredentials: true                       
    });
  
    console.log('Success:', response.status, response.data);
        // Redirect back to homepage
    res.redirect('/');
  } catch (error) {
    console.log(payload);
     console.log(cookAll);
     console.log(empid);
     console.log(url3);
    console.error('Error:', error.response?.status, error.response?.data || error.message);  
  }
} 
});

//server listening
const port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log("Server is running at port " + port);
});   