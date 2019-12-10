<template>
  <div class="container">
    <h3>Issues:</h3>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">id</th>
          <th scope="col">Title</th>
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
          <td>{{issue.Prority}}</td>
          <td>{{issue.Status}}</td>
          <td>{{issue.Votes}}</td>
          <td>{{issue.asignee_id}}</td>
          <td>{{issue.created_at}}</td>
          <td>{{issue.updated_at}}</td>
        </tr>
      </tbody>
    </table> 
  </div> 
</template>

<script>
  import axios from 'axios';

  export default {
    name: 'Issues',
    data() {
      return {
        users: null,
      };
    },
    created: function() {


      axios
        .get('https://blooming-dusk-00596.herokuapp.com/api/issues?api_key=9zWzwy3pR5wrVcukdvz2', {headers: {Accept: '*/*'}})
        .then(res => {
          this.issues = res.data;
        })
    }
  }
</script>

<style type="text/css">
  .issue-attrs {
    border: 1px solid 
    #DFE1E6;
    border-radius: 5px;
    padding: 10px;
    margin-top: 10px;
    border-spacing: 0;
    width: 350px;
    margin: 0px;
    display: block;
  }
   .sidebar {
    width: 300px;
    display: table-cell;
    vertical-align: top;
    }
  .dl {
    margin: 8px;
    padding-left: 120px;
  }
  .issue-attrs dt{
    float: left;
    margin-left: 10px;
    text-align: right;
    width: 120px;
    display: block;
  }
  .issue-attrs dd{
    padding-left: 21px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    background: transparent;
  }
  
a, a:visited, a:hover, a:active {
  color: inherit;
  background: transparent;
}
.dropdown2 {
  position: relative;
  display: inline-block;
}
.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  padding: 12px 16px;
  z-index: 1;
}
.dropdown2:hover .dropdown-content {
  display: block;
}
</style>