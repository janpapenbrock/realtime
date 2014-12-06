realtime
========

Setup
-----

Clone this repo

```
git clone https://github.com/janpapenbrock/realtime.git
```

Create a Google API client key file

1. Create a project in [Google Developers Console](https://console.developers.google.com/project?authuser=0)
2. At `APIs`, enable `Analytics API`
3. Create an OAuth client ID, `Service Account` type
4. Note the mail address associated with it somewhere
5. Download the created file named `YOURPROJECTNAME-<hash>.p12`
6. Convert this file into `key-pem` with
```
openssl pkcs12 -in YOURPROJECTNAME-<hash>.p12 -out key.pem -nocerts -nodes
```
6. Put `key.pem` into `realtime/config/`

Allow your API project to access Analytics properties

1. Open Google Analytics
2. Navigate to `Admin` and choose your account on the left
3. Open `User Management`
4. At `Add permissions for:`, enter the mail address associated to your API client ID (`<long-string>@developer.gserviceaccount.com`). `Read and Analyze` setting is sufficent.

Configure Google Analytics views to be shown in realtime dashboard

1. Copy `realtime/config/google.json.sample` to `realtime/config/google.json`
2. Open `realtime/config/google.json` in your favorite editor
3. Set the mail address once again:
```
"email": "<long-string>@developer.gserviceaccount.com",
```
3. Analytics accounts are structured on three levels: Accounts, Properties and Views.
3. Realtime allows to add all **accounts** which should be considered for the dashboard
```
    "account": {
        "include": [ "1234567", "2345678" ]
    },
```
4. To avoid multiple views of the same website show up, filtering on both Property and View level is possible:
```
    "webProperty": {
        "exclude": [ "UA-123456789-1" ]
    },
    "profile": {
        "exclude": [ "9876543210" ]
    }
```

Start up
--------

When you are all set up, in a terminal, run

```
node index.js
```

Then open up Chrome and visit http://localhost:8888

Profit
------

The result of all this hard work should be something like this:
