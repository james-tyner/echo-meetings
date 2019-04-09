<template>
  <main>
    <section>
      <div id="filterbar">
        Filter by group:
        <div id="options">
          <a href="#" class="filter-group selected">ALL</a>
          <a href="#" class="filter-group">ITP 460</a>
          <a href="#" class="filter-group">WRIT 340</a>
          <a href="#" class="filter-group">SOCCER CLUB</a>
        </div> <!-- #options -->
      </div> <!-- #filterbar -->
    </section>

    <hr/>

    <!-- kanban -->
    <section>
      <div id="kanban">
        <div id="not-started">
          <button class="num-circle" disabled>4</button>
          <h2>Not Started</h2>
          <div class="clear-float"></div>
          <section class="task-list">
            <div v-for="task in fakeTasks">
              <TaskCard v-bind:task="task"> </TaskCard>
            </div>
          </section>
          

        </div> <!-- #not-started -->

        <div id="in-progress">
          <button class="num-circle" disabled>1</button>
          <h2>In Progress</h2>
          <div class="clear-float"></div>

          <!-- card 1 -->
          
        </div> <!-- #in-progress -->

        <div id="complete">
          <button class="num-circle" disabled>2</button>
          <h2>Complete</h2>
          <div class="clear-float"></div>

          

        </div> <!-- #complete -->

        <div class="clear-float"></div>
      </div> <!-- #kanban -->
    </section>
  </main>
</template>

<script>
import TaskCard from "../components/tasks/TaskCard.vue"
export default {
  name: 'tasks',
  components:{
    TaskCard
  },
  data:function(){
    return{
      fakeTasks:{
        "task1": {
          "id": 1,
          "name": "Finish A11",
          "description": "need to finish",
          "due": "1553479225106",
          "status": "1"
        },
        "task2": {
          "id": 2,
          "name": "Finish Everything",
          "description": "please finish everything",
          "due": "1553479225106",
          "status": "1"
        }
      }
    }
  }
  }

</script>
