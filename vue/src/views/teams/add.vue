<template>
  <main id="add-team-main">
    <form action="/api/team" method="post">
      <div id="name">
        <h3>Team Name</h3>
        <input type="text" name="name" placeholder="The Best Team Ever…"></input>
      </div>
      <div id="location">
        <h3>Description</h3>
        <textarea type="text" name="name" placeholder="A group dedicated to world peace" ></textarea>
      </div>
      <button type="submit">Create New Team</button>
    </form>

    <section id="add-members" class="right-bar">
        <h4>Add Members</h4>
        <PersonSearch :people="fakePeople"></PersonSearch>
    </section>
  </main>
</template>

<script>
import PersonSearch from "../../components/PersonSearch.vue"

export default {
  name: 'add-team',
  components: {
    PersonSearch
  },
  data:function(){
    return {
      fakePeople:[{
      "id":1,
      "name": "Tommy Trojan",
      "username": "trojan.echo",
      "email": "trojan@usc.edu",
      "image": null
    }, {
      "id":2,
      "name": "Mars Tan",
      "username": "mars.tanjx",
      "email": "jianxuat@usc.edu",
      "image": null
    }, {
      "id":3,
      "name": "Tommy Trojan",
      "username": "trojan.echo",
      "email": "trojan@usc.edu",
      "image": null
    }, {
      "id":4,
      "name": "Mars Tan",
      "username": "mars.tanjx",
      "email": "jianxuat@usc.edu",
      "image": null
    }]
    }
  }
}
</script>
