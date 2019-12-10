<template>
  <div >
    <div class="header text-left">
      <h1>Issues</h1>
    </div>
    <br>
    <div class="container-fluid">
      <div id = pageActions class="row float-right">
          <button class="btn btn-light">Create Issue</button>
          <button class="btn btn-light">Logout</button>
      </div>
    </div>



    <table class="table text-left">
      <thead class="thead-dark">
        <tr>
          <th style="width: 5%" scope="col">id</th>
          <th style="width: 35%" scope="col">Title</th>
          <th scope="col">Description</th>
          <th scope="col">T</th>
          <th scope="col">P</th>
          <th scope="col">Status</th>
          <th scope="col">Votes</th>
          <th scope="col">Assignee</th>
          <th scope="col">Created</th>
          <th scope="col">Updated</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="issue in issues" v-bind:key="issue.id"> 
          <td>{{issue.id}}</td>
          <td>{{issue.Title}}</td>
          <td>{{issue.Description}}</td>
          <td>{{issue.Type}}</td>
          <td>{{issue.Priority}}</td>
          <td>{{issue.Status}}</td>
          <td>{{issue.Votes}}</td>
          <td>{{issue.asignee_id}}</td>
          <td>{{issue.created_at | dateshow}}</td>
          <td>{{issue.updated_at | dateshow}}</td>
        </tr>
      </tbody>
    </table> 
  </div> 
</template>

<script>
  import axios from 'axios';
  import moment from 'moment'

  export default {
    name: 'Issues',
    data() {
      return {
        issues: null,
      };
    },
    created: function() {
      axios
        .get('https://blooming-dusk-00596.herokuapp.com/api/issues?api_key=9zWzwy3pR5wrVcukdvz2', {headers: {Accept: '*/*'}})
        .then(res => {
          this.issues = res.data;
        })
    },
    filters: {
      dateshow: function(value) {
        return moment(value).fromNow();
      }
    }
  }
</script>

<style>

#pageActions {
  margin-left: 30px;
  margin-right: 30px;
  margin-bottom: 30px;
}

#app{
  margin-left: 30px;
  margin-right: 30px;
}

</style>