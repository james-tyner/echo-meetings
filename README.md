# echo
## Authentication
1. `/login` User clicks Google Login button
2. `/api/auth/google` Redirect to Google, user logins using Google
3. `/api/auth/google/redirect` Redirected from Google
4. `/?token=` Front-end receives token; ajax to back-end and verify
5. `/` Redirected to Dashboard

## Database data structure
Mongodb

Everything has a unique ID and is assigned to it automatically.

### User
- name
- username
- password (encrypted)
- email

### Team
- name
- description
- color
- members: [user_id]

### Meeting
- title
- time: timestamp
- location
- invitees: [user_id]
- agenda items: [agenda]
- team: team_id
- start: timestamp
- end: timestamp

### Agenda (nested in meeting)
- title
- description
- notes
- task items: [task_id]

### Task
- name
- descirption
- due: timestamp
- assignees: [user_id]
- status: int
- team: team_id
- meeting: meeting_id
- agenda: agenda_id
​
## API Spec
### JSON Objects returned by API
#### User
```json
{
  "user": {
    "id": "",
    "name": "Tommy Trojan",
    "token": "",
    "username": "trojan.echo",
    "email": "trojan@usc.edu",
    "image": null
  }
}
```

#### Team
```json
{
  "team": {
    "id": "",
    "name": "Team Echo",
    "description": "",
    "color": "green",
    "members": [{
      "name": "Tommy Trojan",
      "username": "trojan.echo",
      "email": "trojan@usc.edu",
      "image": null
    }, {
      "name": "Mars Tan",
      "username": "mars.tanjx",
      "email": "jianxuat@usc.edu",
      "image": null
    }]
  }
}
```

#### Meeting
```json
{
  "meeting": {
    "id": "",
    "title": "",
    "time": "1553479225106",
    "location": "TTH 110",
    "invitees": [{
      "name": "Tommy Trojan",
      "username": "trojan.echo",
      "email": "trojan@usc.edu",
      "image": null
    }, {
      "name": "Mars Tan",
      "username": "mars.tanjx",
      "email": "jianxuat@usc.edu",
      "image": null
    }],
    "agendas": [],
    "team": {
      "id": "",
      "name": "Team Echo",
      "color": "green",
      "description": "",
      "members": [{
        "name": "Tommy Trojan",
        "username": "trojan.echo",
        "email": "trojan@usc.edu",
        "image": null
      }, {
        "name": "Mars Tan",
        "username": "mars.tanjx",
        "email": "jianxuat@usc.edu",
        "image": null
      }]
    },
    "start": "1553479225106",
    "end": "1553480225106"
  }
}
```

#### Agenda (nested in meeting)
```json
{
  "agenda": {
    "id": "",
    "title": "",
    "description": "",
    "notes": "",
    "tasks": [{
      "id": "",
      "name": "",
      "description": "",
      "due": "1553479225106",
      "status": "1"
    }]
  }
}
```

#### Task
```json
{
  "task": {
    "id": "",
    "name": "",
    "description": "",
    "due": "1553479225106",
    "status": "1"
  }
}
```

#### Errors and Status Codes
If a request fails any validations, expect a 422 and errors in the following format:

```json
{
  "errors":{
    "body": [
      "can't be empty"
    ]
  }
}
```

##### Other status codes
401 for Unauthorized requests, when a request requires authentication but it isn't provided

403 for Forbidden requests, when a request may be valid but the user doesn't have permissions to perform the action

404 for Not found requests, when a resource can't be found to fulfill the request

### Endpoints
every request is scoped and requires authentication except login

#### Team
##### Get all Teams
`GET /api/team`

Example response:

```json
{
  "teams": [{
    "id": "",
    "name": "Team Echo",
    "description": "",
    "color": "green",
    "members": [{
      "id": "",
      "name": "Mars Tan",
      "username": "mars.tanjx",
      "email": "jianxuat@usc.edu",
      "image": null
    }]
  }]
}
```

##### Create a Team
`POST /api/team`

Example request body:

```json
{
  "team": {
    "name": "Team Echo",
    "description": "",
    "color": "green",
    "members": [{"id": ""}, {"id": ""}]
  }
}
```

Authentication required, will return a Team

Required fields: name

Optional fields: description, body, members as an array of Strings

##### Update Team
`PUT /api/team/:team_id`

Optional fields: name, description, body, members

##### Delete Team
`DELETE /api/team/:team_id`

#### Meeting
##### Get all Meetings
`GET /api/meeting`

Example response:

```json
{
  "meetings": [{
    "id": "",
    "title": "",
    "time": "1553479225106",
    "location": "TTH 110",
    "invitees": [{
      "name": "Tommy Trojan",
      "username": "trojan.echo",
      "email": "trojan@usc.edu",
      "image": null
    }],
    "agendas": [{
      "id": "",
      "title": "",
      "description": "",
      "notes": "",
      "tasks": [{
        "id": "",
        "name": "",
        "description": "",
        "due": "1553479225106",
        "status": "1"
      }]
    }],
    "team": {
      "id": "",
      "name": "Team Echo",
      "description": "",
      "color": "green",
      "members": [{
        "name": "Mars Tan",
        "username": "mars.tanjx",
        "email": "jianxuat@usc.edu",
        "image": null
      }]
    },
    "start": "1553479225106",
    "end": "1553480225106"
  }]
}
```

##### Create Meeting
`POST /api/meeting`

Example request body:

```json
{
  "meeting": {
    "title": "",
    "time": "1553479225106",
    "location": "TTH 110",
    "invitees": [{
      "name": "Tommy Trojan",
      "username": "trojan.echo",
      "email": "trojan@usc.edu",
      "image": null
    }],
    "team": {"id": ""}
  }
}
```

Authentication required, will return a Meeting

Required fields: title, time, team

Optional fields: location, invitees

##### Update Meeting
`PUT /api/meeting/:meeting_id`

Optional fields: title, time, location, invitees

##### Delete Meeting
`DELETE /api/meeting/:meeting_id`

#### Task
##### Get all Tasks
`GET /api/task​`

Example response:

```json
{
  "tasks": [{
    "id": "",
    "name": "",
    "description": "",
    "due": "1553479225106",
    "status": "1"
  }]
}
```

##### Update Task
`PUT /api/task/:task_id​`

```json
{
  "task": {
    "name": "",
    "description": "",
    "due": "1553479225106",
    "status": "1"
  }
}
```

Optional fields: name, description, due, status
