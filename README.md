# Project-tracker

## NPM Scripts

### Production

- Run `npm run start` command to prepare and start the application.

### Development

- Run `npm run prepare` to prepare your local environment
- Run `npm run dev` to develop with `dev` environment (Change port if you want in the `dev` npm script). Open `localhost:{PORT}` in a browser - default is 3001
- Run `npm run livereload` to run livereload server for client code. Open the url shown in the console after livereload running starting with words 'Webserver started at ...' (`dev` script should be run also) 

## Servers

- Development => [Dev Server](https://dev-project-tracker.herokuapp.com) - [![Development](https://ci.appveyor.com/api/projects/status/2v81h5t0sbggv8wh/branch/development?svg=true)](https://ci.appveyor.com/project/VanDalkvist/project-tracker/branch/development)

- Master => [Master Server](https://master-project-tracker.herokuapp.com) - [![Master](https://ci.appveyor.com/api/projects/status/2v81h5t0sbggv8wh/branch/master?svg=true)](https://ci.appveyor.com/project/VanDalkvist/project-tracker/branch/master)

## New features delivering process

- Create feature branch with simple task name
- Commit or commits to feature branch
- Create a PR to `development` branch
- Check build status
- Check DEV server
- Create a PR to `master` branch
- Code review (accept or request new changes)
- Merge the PR to `master` branch
- Check MASTER server