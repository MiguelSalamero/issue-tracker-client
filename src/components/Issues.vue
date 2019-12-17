<template>
  <div >
    <div class="header pt-5 text-left">
      <h1>Issues</h1>
    </div>
    <br>
    <div class="container-fluid">
      <div id = pageActions class="row float-right">
          <button class="btn btn-light"><router-link to="/newissue"> Create issue</router-link></button>
          <button class="btn btn-light">Logout</button>
      </div>
    </div>

	<thead class="thead-dark">
        <tr>
          <th scope="col">Filter by: </th>
          <th scope="col"><a v-on:click="created()" href="#"> All</a></th>
          <th scope="col"><a v-on:click="filterby('status=New%26Open')" href="#"> Open </a></th>
          <th scope="col"><a v-on:click="filterby('assignee='+1)" href="#"> My issues </a></th>
          <th scope="col"><a v-on:click="filterby('watcher='+1)" href="#"> Watching </a></th>
        </tr>
      </thead>

    <table class="table text-left table-hover">
      <thead class="thead-dark">
        <tr>
          <th style="width: 5%" scope="col"></th>
          <th v-if = "sorttitle" style="width: 35%" scope="col"><a v-on:click="sortby('Title')" href="#">Title</a></th>
          <th v-else style="width: 35%" scope="col"><a v-on:click="sortby('-Title')" href="#">Title</a></th>
          <th scope="col"><a v-on:click="sortby('kind')" href="#"> T</a></th>
          <th scope="col"><a v-on:click="sortby('priority')" href="#"> P</a></th>
          <th scope="col"><a v-on:click="sortby('status')" href="#"> Status</a></th>
          <th scope="col"><a v-on:click="sortby('votes')" href="#"> Votes</a></th>
          <th v-if = "sortassignee" scope="col"><a v-on:click="sortby('assignee')" href="#"> Assignee</a></th>
          <th v-else scope="col"><a v-on:click="sortby('-assignee')" href="#"> Assignee</a></th>
          <th v-if = "sortcreated" scope="col"><a v-on:click="sortby('created')"  href="#"> Created</a></th>
          <th v-else scope="col"><a v-on:click="sortby('-created')" href="#"> Created</a></th>          
          <th v-if = "sortupdated" scope="col"><a v-on:click="sortby('updated')" href="#"> Updated</a></th>          
          <th v-else scope="col"><a v-on:click="sortby('-updated')" href="#"> Updated</a></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="issue in issues" v-bind:key="issue.id"> 
          <td>#{{issue.id}}</td>
          <td> <router-link :to="{ name: 'ShowIssue', params: { id: issue.id }}">{{issue.Title}}</router-link></td>
          <td> <a v-on:click="filterby('type='+issue.Type)" href="#"> {{issue.Type}}</a></td>
          <td> <a v-on:click="filterby('priority='+issue.Priority)" href="#"> {{issue.Priority}}</a></td>
          <td> <a v-on:click="filterby('status='+issue.Status)" href="#"> {{issue.Status}}</a></td>
          <td>{{issue.Votes}}</td>
          <td>{{issue.Assignee}}</td>
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

	function sleep(ms) {
		return new Promise(resolve => setTimeout(resolve, ms));
	}

  export default {
    name: 'Issues',
    data() {
      return {
        issues: null,
        sortcreated: false,
        sortupdated: false,
        sorttitle: false,
        sortassignee: false,
      };
    },
    created: function() {
      axios
        .get('https://blooming-dusk-00596.herokuapp.com/api/issues?api_key=9zWzwy3pR5wrVcukdvz2', {headers: {Accept: '*/*'}})
        .then(res => {
          this.issues = res.data;
        })
    },
    methods: {
      sortby: function(sorting) {
        axios
          .get('https://blooming-dusk-00596.herokuapp.com/api/issues?sort='+sorting+'&api_key=9zWzwy3pR5wrVcukdvz2', {headers: {Accept: '*/*'}})
          .then(res => {
            sleep(800)
            this.issues = res.data;
          }) 
        if (sorting == 'created' || sorting == '-created') {
          this.sortcreated = !this.sortcreated
        }
        else if (sorting == 'updated' || sorting == '-updated') {
          this.sortupdated = !this.sortupdated
        }
        else if (sorting == 'Title' || sorting == '-Title') {
          this.sorttitle = !this.sorttitle
        }
        else if (sorting == 'assignee' || sorting == '-assignee') {
          this.sortassignee = !this.sortassignee
        }
      },
      filterby: function(filter) {
        axios
          .get('https://blooming-dusk-00596.herokuapp.com/api/issues?'+filter+'&api_key=9zWzwy3pR5wrVcukdvz2', {headers: {Accept: '*/*'}})
          .then(res => {
        sleep(800)
      this.issues = res.data;
      }) 
    }
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
