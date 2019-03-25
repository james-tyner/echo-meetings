# echo

## Database data structure
### User
- name
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
  "agenda": {
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

every request is scoped and requires authentication except login
