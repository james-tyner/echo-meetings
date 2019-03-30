<template>
  <div class="card team-card" :class="colorBand">
    <h2 class="card-heading" v-on:click="toggle()">{{team.name}}</h2>
    <div class="team-info" v-if="showAll">
      <p class="team-desc" contenteditable="true">{{team.description}}</p>
      <div class="team-members">
        <div v-for="member in team.members" class="member">
          <div class="profile-photo" :style="{ 'background-image' : 'url(' + member.image + ')'}"></div>
          <p class="member-name">{{member.name}}</p>
          <a class="member-email" :href="'mailto:' + member.email">{{member.email}}<i class="far fa-envelope"></i></a>
        </div>
        <div class="member">
          <p class="new-member" contenteditable="true"></p>
        </div>
      </div>
    </div>
    <div v-else v-on:click="toggle()" class="team-photos">
      <div class="profile-photo" v-for="member in team.members" :style="{ 'background-image': 'url(' + member.image + ')' }"></div>
    </div>
  </div>
</template>

<script>
  export default {
    name:"team-card",
    props:{
      team:Object
    },
    computed:{
      colorBand:function(){
        return (this.team.color + '-color-band')
      },
      teamText:function(){
        return (this.team.color)
      }
    },
    methods:{
      toggle(){
        this.showAll = !this.showAll
      }
    },
    data:function(){
      return {
        showAll:false
      }
    }
  }
</script>