## QBE Kit Starter for Libraries ##

The QBE Starter kit for non-react, non-express, module libraries with typescript, babel and jest pre-installed / minimally configured (qbe-starter-tsbj-lib)

This project was once bootstrapped with [Create React App](https://github.com/facebook/create-react-app). The resultant project then had all references to React removed from sample code, tests and package.json
This was to get very a very consistent tool set for module / lbrary developers an React developers. As such it has the same webpack, babel, Typescript support, Jest test library and other supporting standard modules. We will update it from time to time as Create-React-App is updated with new versions of the tools

To use:

git clone https://bitbucket.corp.qbe.com/scm/gldig/qbekit-starter-tsbj-lib.git my-new-app

and fully re-initialise git with: cd my-new-app && rm -rf .git && git init
add new remote path to a new repo: git remote add origin https:/bitbucket.corp.qbe.com/scm/....my-new-repo-path....

## Available Scripts

In the project directory, you can run:

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

We love vs-code extensions: Test-Explorer-UI, Jest Test Explorer, Jest Run It and Jest Runner - keeping the tests always on, re-running on changes and highly visible through the explorer, with full babel/typscript source-mapping support.

Test Everything!

### `yarn build`

Runs babel, makes a lib folder with an ES5 version (excluding tests), for when the library get npm'd into another app that needs ES2015 compatability. Some work still needed when we look at the publish / npm install life cycle usages

Uses rm -rf to clear down the lib folder first - might be an issue on windows in not using WSL (hint: use WSL :) )

### `TO BE ADDED` ###

## `yarn publish`
To pubish the library as a QBE private repo npm resource.

If you really don't want to use yarn, then npm run-script will work too!
## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).


