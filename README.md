# echo

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
- members: [u_id]

### Meeting
- title
- time: timestamp
- location
- invitees: [u_id]
- agenda items: [agenda]
- team: t_id
- start: timestamp
- end: timestamp

### Agenda (nested in meeting)
- title
- description
- notes
- task items: [t_id]

### Task
- name
- descirption
- due: timestamp
- assignees: [u_id]
- status: int
- team: t_id
- meeting: m_id
- agenda: a_id
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

### Meeting
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
    "agendas": [{
    }],
    "team": {
      "id": "",
      "name": "Team Echo",
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

### Agenda (nested in meeting)
```json
{
  "agenda": {
    "id": "",
    "title": "",
    "description": "",
    "notes": "",
    "tasks": ["", ""]
  }
}
```

### Task
```json
{
  "task": {
    "id": "",
    "name": "",
    "description": "",
    "due": "1553479225106",
    "status": "1",
    "team": "",
    "meeting": "",
    "agenda": ""
  }
}
```

### Errors and Status Codes
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

#### Other status codes
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
    "members": [{
      "id": "",
      "name": "Tommy Trojan",
      "username": "trojan.echo",
      "email": "trojan@usc.edu",
      "image": null
    }, {
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
    "members": [{"id": ""}, {"id": ""}]
  }
}
```

Authentication required, will return an Team

Required fields: name

Optional fields: description, body, and members as an array of Strings

##### Update Team
`PUT /:team/:t_id`

Optional fields: name, description, body, and members

##### Delete Team

`DELETE /:team/:t_id`
