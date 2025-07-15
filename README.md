# sap-odata-node-js-crud-app
SAP OData : CRUD web app using Node JS

Demo

[![IMAGE ALT TEXT HERE](http://img.youtube.com/vi/_RzTsiJ2hTA/0.jpg)](http://www.youtube.com/watch?v=_RzTsiJ2hTA)

install module :

$>npm install --save axios body-parser express hbs

run app : 

$>node index.js

![alt text](https://github.com/jenizar/sap-odata-node-js-crud-app/blob/main/screenshots/pic1.png)

*)note:

a little addition to help test post data, namely using the curl tool via the terminal:

curl -X POST "http://vhcala4hci:50000/sap/opu/odata/sap/YPEGAWAI_SRV/PEGAWAISet" \
     -H "Content-Type: application/json" \
     -H "Authorization: Basic $(echo -n 'DEVELOPER:ABAPtr2022#01' | base64)" \
     -H "X-CSRF-Token: hIr1VSUvKNPb0fb9vLS4tw==" \
     -H "Cookie: sap-usercontext=sap-client=001; MYSAPSSO2=AjQxMDMBABhEAEUAVgBFAEwATwBQAEUAUgAgACAAIAACAAYwADAAMQADABBBADQASAAgACAAIAAgACAABAAYMgAwADIANQAwADcAMQAxADEANAAyADYABQAEAAAACAYAAlgACQACRQD%2fAPswgfgGCSqGSIb3DQEHAqCB6jCB5wIBATELMAkGBSsOAwIaBQAwCwYJKoZIhvcNAQcBMYHHMIHEAgEBMBowDjEMMAoGA1UEAxMDQTRIAggKIBcCAhUJATAJBgUrDgMCGgUAoF0wGAYJKoZIhvcNAQkDMQsGCSqGSIb3DQEHATAcBgkqhkiG9w0BCQUxDxcNMjUwNzExMTQyNjU5WjAjBgkqhkiG9w0BCQQxFgQUgSjWkz58nSaMkO1Z%216g9UFsbJkswCQYHKoZIzjgEAwQuMCwCFGptflAyUjbQfqMK7em%2fUB0CnT%21NAhQj9sq7CZc2xFEsPuXWF8TVVAxbBQ%3d%3d; SAP_SESSIONID_A4H_001=vqn5hA_deFKhN4NrOsRPUBrytldeYxHwvhcCQqwRAAI%3d;" \
     -d '{"Empid": "00000104",
  "Empname": "Ferry Chen",
  "Emppost": "Marketing Manager",
  "Empphoto": "https://github.com/jenizar/sap-odata-python-crud-app/blob/main/images/pria4.png?raw=true"
}' \
     -v

References:

1. https://sapcloudapps.wordpress.com/2025/07/15/sap-odata-crud-web-app-using-node-js/

2. https://www.googlecloudcommunity.com/gc/Apigee/CSRF-token-validation-failed-from-SAP-endpoint/m-p/181694

3. https://stackoverflow.com/questions/61655121/setting-a-variable-in-html-to-use-as-image-src

4. https://stackoverflow.com/questions/51069552/axios-delete-request-with-request-body-and-headers
