<template>
  <div class="text-left">
    
<div style="width: 100%;">
  <div style="float:left; width: 70%" class="p-5">
    <div class="header">
      <div class="section-title">
        <h2> {{issue.Title}}  </h2>
        <div class="section-title2 px-3">
          <h8> Issue #{{issue.id}}    
          </h8>
        </div>
      </div>
    </div>
  
    <div class="row">
      <div class="column col-sm-9">
        <div class="px-3">
          <p style="font-size: 90%">
            <strong> {{creatorName}}</strong> created an issue {{issue.created_at | dateshow}}
          </p>
          <p style="font-size: 100%">
              {{issue.Description}}
          </p>
        </div>
        <div>
        </div>
        <hr width="100%" align="left">
    </div>
    <div class="issue-comments-container">
      
      <h2>Comments({{comments.length}})</h2>
        <tr v-for="comment in comments" v-bind:key="comment.id"> 
        <div>
          <p><b>{{comment.user_id}}</b></p>
          <p style="font-size: 100%">{{comment.text}}</p>
          <p class="text-muted" style="font-size: 90%">
          {{comment.created_at | dateshow}}
        </p></div>
        <br>
        </tr>
      
      <form >
        <div>
          <textarea v-model="comment_text" placeholder="What do you want to say?" class="form-control" name="comment[text]" id="comment_text"></textarea>
          <br>
          <input type="file" name="comment[attachment]" id="comment_attachment"><br>
          <i>Not implemented yet</i>
          <hr>
          <button v-on:click="createComment" type="button" class="btn btn-outline-secondary" data-disable-with="Create comment">
          <router-link to="/">Create Comment </router-link>
          </button>
        </div>
      </form>    
    </div>

    
  </div>

</div>
</div>

  <div class= "pt-5" style="float:left;">
      <div style="width: 100%" class="sidebar col-sm-3">
        <div class="row pb-3">
          <div class="pr-1">
              <a class="btn btn-primary" style="color: white">Open</a> 
          </div>
          
           <div>
              <div class="dropdown2">
                <button type="button" class="btn btn-secondary dropdown-toggle">Workflow</button>
                <div class="dropdown-content">
                    <li>New</li> 
                    <li>Open</li> 
                    <li>On hold</li> 
                    <li>Resolved</li> 
                    <li>Invalid</li> 
                    <li>Won't fix</li> 
                    <li>Closed</li> 
                </div>
              </div>
          </div> 
          <div class="pl-3">
            <button type="button" class="btn btn-light"> Attach </button> 
          </div>
    
          <div class="col-sm-2">
            <button class="btn btn-light">
                Edit
            </button>
          </div>
    
          <div class="">
            <button class="btn btn-light" value="Delete">
                Delete
            </button>
          </div>


          <div class="pl-1">
            <button class="btn btn-light">     
              <router-link to="/">Back</router-link>
            </button>
          </div>

      </div>
    </div>
    <div class="issue-attrs">
          <dl>
            <dt> Asignee </dt>
              <dd><a v-if="issue.assignee_id == null" href="https://blooming-dusk-00596.herokuapp.com/issues?assignee=5">-</a>
              <a v-else href="https://blooming-dusk-00596.herokuapp.com/issues?assignee=5">{{assigneeName}}</a></dd>
          </dl>
          <dl>
            <dt> Type </dt>
              <dd><a href="https://blooming-dusk-00596.herokuapp.com/issues?type=Task"><img src="IssueTracker_show_files/Task.webp" width="20" height="20"> {{issue.Type}}</a></dd>
          </dl>
          <dl>
            <dt>Priority</dt>
              <dd><a href="https://blooming-dusk-00596.herokuapp.com/issues?priority=Major"><img src="IssueTracker_show_files/Major.webp" width="20" height="20"> {{issue.Priority}}</a></dd>
          </dl>
          <dl>
            <dt>Status</dt>
            <dd><a href="https://blooming-dusk-00596.herokuapp.com/issues?status=Duplicate">{{issue.Status}}</a></dd>
          </dl>
          <dl>
            <dt>Votes</dt>
              <dd>
                {{issue.Votes}} -
                <a v-on:click="vote" class="vote" rel="nofollow" href="#">Vote </a>
                <a v-on:click="unvote" class="vote" rel="nofollow" href="#">Unvote</a>


              </dd>
          </dl>
          <dl>
            <dt>Watchers</dt>
              <dd>
                    <a class="vote" rel="nofollow" data-method="post" href="https://blooming-dusk-00596.herokuapp.com/issues/3/watch?view=issue">{{issue.Watchers}}</a>
              </dd>
          </dl>
        </div>
      </div>
  </div>
</template>























<script>

import axios from 'axios';
import moment from 'moment'


export default {
  name: 'ShowIssue',
  data() {
    return {
        issue: null,
        comments: null,
        comment_text: '',
        issue_id: '',
        creatorName: '',
        assigneeName: ''
    }
  },
  created: function() {
    this.issue_id = this.$route.params.id
    axios
      .get('https://blooming-dusk-00596.herokuapp.com/api/issues/'+this.$route.params.id+'/?api_key=9zWzwy3pR5wrVcukdvz2', {headers: {Accept: '*/*'}})
      .then(res => {
        this.issue = res.data.issue;
        this.creatorName = res.data.userCreatorName;
        this.assigneeName = res.data.userAssignedName;  
      })
    axios
      .get('https://blooming-dusk-00596.herokuapp.com/api/issues/'+this.$route.params.id+'/comments/?api_key=9zWzwy3pR5wrVcukdvz2', {headers: {Accept: '*/*'}})
      .then(res => {
        this.comments = res.data;
      })
  },
  filters: {
    dateshow: function(value) {
      return moment(value).fromNow();
    }
  },
  methods: {
    createComment: function() {
      axios
        .post('https://blooming-dusk-00596.herokuapp.com/api/issues/'+this.issue_id+'/comments/?text='+this.comment_text+' &api_key=9zWzwy3pR5wrVcukdvz2', {headers: {Accept: '*/*'}})
    },
    vote: function() {
      axios
        .post('https://blooming-dusk-00596.herokuapp.com/api/issues/'+this.issue_id+'/vote?api_key=9zWzwy3pR5wrVcukdvz2', {headers: {Accept: '*/*'}})      
    },
    unvote: function() {
      axios
        .post('https://blooming-dusk-00596.herokuapp.com/api/issues/'+this.issue_id+'/unvote?api_key=9zWzwy3pR5wrVcukdvz2', {headers: {Accept: '*/*'}})      
    }
  }

}
</script>

<style>

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