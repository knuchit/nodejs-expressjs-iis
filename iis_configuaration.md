# How to Run Express.js API app Using IIS

## Step 1 Helloworld App
```text
helloworld
  node_modules
  package.json   
  server.js  
  web.config
```

```json
// package.json
{
  "name": "helloworld",
  "version": "1.0.0",
  "description": "this is sample express.js",
  "main": "serve.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev" : "nodemon ./server.js"

  },
  "author": "nuchit",
  "license": "ISC",
  "dependencies": {},
  "devDependencies": {
    "express": "^4.18.2",
    "nodemon": "^3.1.0"
  }
}

```

```javascript
// server.js
const express = require('express');
const app = express();

// config for iisnode
const port = process.env.PORT;

// http://localhost/
app.get('/', (req, res) => {
    const json = {
        message: 'Hello World!'
    };

    // response json
    res.json(json);

});

// start server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

```

```xml
<!-- web.config -->
<configuration>
    <system.webServer>
        <handlers>
            <add name="iisnode" path="server.js" verb="*" modules="iisnode" />
        </handlers>
        <rewrite>
            <rules>
                <rule name="sendToNode">
                    <match url="/*" />
                    <action type="Rewrite" url="server.js" />
                </rule>
            </rules>
        </rewrite>
    </system.webServer>
</configuration>
```

### Test
```text
npm install
npm run dev
```

# 
## Step 2 Install Software
1. Install IIS from Windows Features
2. Install URL Rewrite module download English: 
 [x64](https://download.microsoft.com/download/1/2/8/128E2E22-C1B9-44A4-BE2A-5859ED1D4592/rewrite_amd64_de-DE.msi) or 
  [x86](https://download.microsoft.com/download/D/8/1/D81E5DD6-1ABB-46B0-9B4B-21894E18B77F/rewrite_x86_en-US.msi)
3. Install Node.js for windows- download [nodejs](https://nodejs.org/en)
4. Install iisnode download-
([x64](https://github.com/azure/iisnode/releases/download/v0.2.21/iisnode-full-v0.2.21-x64.msi)) or ([x86](https://github.com/azure/iisnode/releases/download/v0.2.21/iisnode-full-v0.2.21-x86.msi))


[IISNode Ducument - https://github.com/Azure/iisnode?tab=readme-ov-file](https://github.com/Azure/iisnode?tab=readme-ov-file)

## Step 3 Deploy App
1. Create a new website in IIS
2. Set the physical path to the folder containing the app (example : D:\temp\expressjs\deploy_iisnode)
3. Set the IIS port(for example config to 3000)
4. Set the application pool .NET CLR version: **No Managed Code**
5. Create web.config file in the app folder
5. Add the following content to the web.config file

```xml
<?xml version="1.0" encoding="utf-8"?>
<configuration>
  <system.webServer>
    <handlers>
      <add name="iisnode" path="server.js" verb="*" modules="iisnode" />
    </handlers>
    <rewrite>
      <rules>
        <rule name="helloworld">
          <match url="/*" />
          <action type="Rewrite" url="server.js" />
        </rule>
      </rules>
    </rewrite>
  </system.webServer>
</configuration>
```
7. Restart IIS Site
8. Open browser and enter url -> http://localhost:3000/

```json
// response get json
{
    "message": "Hello World!"
}
```

# DONE :)