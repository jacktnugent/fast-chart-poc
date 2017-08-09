# SmartSignal Analytic Maintenance Microapp

### Build Status [![Build Status](https://apm1.jenkins.build.ge.com/job/APM-STUF/job/SmartSignal/job/IO/job/APM-SS-Maintenance-MicroApp/job/APM-SS-Maintenance-MicroApp-Build-master/badge/icon)](https://apm1.jenkins.build.ge.com/job/APM-STUF/job/SmartSignal/job/IO/job/APM-SS-Maintenance-MicroApp/job/APM-SS-Maintenance-MicroApp-Build-master/?style=plastic)
### IO Deploy Status [![Deploy Status](https://apm1.jenkins.build.ge.com/job/APM-STUF/job/SmartSignal/job/IO/job/Deploy-DEV/badge/icon)](https://apm1.jenkins.build.ge.com/job/APM-STUF/job/SmartSignal/job/IO/job/Deploy-DEV/?style=plastic)

## Prerequisites

### For Windows Users
#### Git Bash
If you are using a Windows machine, it would be easier on you if you use the **Git Bash** terminal. Git Bash comes packaged with [Git for Windows](https://git-scm.com), so if you have been using git on your Windows machine, you probably already have it.

#### Bower
As noted in the **Troubleshooting** section, to use Bower in Windows, you need to use the native **Windows command prompt**. There are some cases where the Git Bash terminal will not work.

### For Everyone

#### Node.js
1. Download and install [Node.js](https://nodejs.org). It's recommended that you just get the latest.
2. Verify you have Node by checking the version in your terminal.

	```bash
	$ node --version
	```

3. Verify you have NPM (Node Package Manager) installed by checking the version in your terminal.

	```bash
	$ npm --version
	```

4. Add proxy settings to your NPM configuration file located in your home (or user) directory.
	```bash
	$ npm config set proxy http://pitc-zscaler-americas-cincinnati3pr.proxy.corporate.ge.com:80
	$ npm config set https-proxy http://pitc-zscaler-americas-cincinnati3pr.proxy.corporate.ge.com:80
	```
	This updates the `.npmrc` file located in your home (or user) directory.

_You should see the versions that you have installed printed to the console._


#### Bower
1. Open your terminal and type the following to install [Bower](https://bower.io/) globally.

	```bash
	$ npm install --global bower
	```

2. Verify you have Bower installed by attempting to check the version.

	```bash
	$ bower --version
	```

3. Bower Settings

	Add proxy settings to your `.bowerrc` file located in your home (or user) directory. Note that you may have to add this file manually.
    ```json
    {
      "proxy": "http://PITC-Zscaler-Americas-Cincinnati3PR.proxy.corporate.ge.com:80",
      "https-proxy": "http://PITC-Zscaler-Americas-Cincinnati3PR.proxy.corporate.ge.com:80",
      "no-proxy": "github.build.ge.com"
    }
    ```

_You should be able to see the version of Bower you just installed. Try restarting your terminal if you get an error._

## Running Locally

If you are going to run this application as a MicroApp within AppHub (which you probably are), then you should follow the setup instructions detailed in the [AppHub GitHub repository](https://github.build.ge.com/hubs/ui-app-hub).

Before starting this MicroApp, the proxies and environment variables need to be set up.

_**OPTION 1**_

```bash
./build_dev.sh
```

This will build the project and watch for any changes in the directories leaving the server directory

```bash
./start_local_server.sh dev
```

This will set the environment variables and do npm start 

Options for start_local_server.sh are dev/qa/local - default goes to dev

_**OR OPTION 2**_

You can also do 
```bash
./build_dev.sh | ./start_local_server.sh dev
```

This will run both at the same time, it will build the project and start the server.

**_The issue with option 2 is that you wont be able to see the echo's from the build_dev.sh._**


##Running Tests

_**OPTION 1**_

Install karma-cli globally. This will help you run the karma commands from anywhere
```bash
 npm install -g karma-cli
```

After karma is installed globally, run the following command

```bash
cd public
karma start karma.conf.js
```
_**OPTION 2**_
Using the karma installed along with public/package.json
```bash
cd public
./node_modules/.bin/karma start karma.conf.js
```




## Troubleshooting

### Bower is not working in Windows
If you are having trouble using Bower in Windows, there are some settings that may fix the problems. Please take a look at the [Bower Troubleshooting](https://github.com/bower/bower/wiki/Troubleshooting) page and follow their suggestions. If you are having proxy issues with Bower, take a look at the section below that describes how to set up your `.bowerrc` file appropriately.

**Note** that you should use the native **Windows command prompt** when interacting with Bower. There are some cases where the Git Bash terminal will not work.

### Help! I'm having proxy issues!

Proxies are a difficult to get set up correctly. The sections above give you some pointers on what may be required to help you run this application within the GE proxies. After trying those settings, you will have to restart your terminal for the changes to take effect.

_Note that the proxy URLs shown below are recommended for those located in the Chicago area._


## Code Layout

### Packages, Client-Side and Server-Side
To isolate the set of packages exposed to the client-side, there are two package.json files - one at the root level for
the whole microapp, and the other within the "public" folder for just the client-side. This prevents exposing to the
client all of the packages used in the server-side.
# fast-chart-poc
