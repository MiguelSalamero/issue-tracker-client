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
          <p><b v-if="comment.user_id === 1">Miguel</b>
          <b v-else-if="comment.user_id === 2">Cristian R.</b>
          <b v-else-if="comment.user_id === 3">Carles Farré</b>
          <b v-else-if="comment.user_id === 4">sisu psicologo</b>
          <b v-else-if="comment.user_id === 5">Jaume Malgosa Broto</b>
          <b v-else-if="comment.user_id === 6">Marc obiols rubio</b>
          <b v-else-if="comment.user_id === 7">Miguel Salamero</b>
          </p>
          <p style="font-size: 100%">{{comment.text}}</p>
          <p class="text-muted" style="font-size: 90%">
          {{comment.created_at | dateshow}}
            •
            <a v-on:click="deleteComment(comment.id)" href="#">Delete</a>
            •
            <a v-on:click="editComment(comment.id)" href="#">Edit</a>
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
          Create Comment
          </button>
        </div>
      </form>    
    </div>

    
  </div>

</div>
</div>

  <div class= "pt-5" style="float:left;">
      <div class="">
        <div class="row pb-3">
          <div class="">
              <a v-on:click="status('Open')" v-if = "issue.Status === 'Resolved'" class="btn btn-primary" style="color: white">Open</a>
              <a v-on:click="status('Resolved')" v-else class="btn btn-primary" style="color: white">Resolve</a> 
          </div>
          
           <div>
              <div class="dropdown2">
                <button type="button" class="btn btn-secondary dropdown-toggle">Workflow</button>
                <div class="dropdown-content">
                    <li><a v-on:click="status('New')" href="#"> New</a></li> 
                    <li><a v-on:click="status('Open')" href="#">Open</a></li> 
                    <li><a v-on:click="status('On hold')" href="#">On hold</a></li> 
                    <li><a v-on:click="status('Duplicate')" href="#">Duplicate</a></li> 
                    <li><a v-on:click="status('Invalid')" href="#">Invalid</a></li> 
                    <li><a v-on:click="status('Closed')" href="#">Closed</a></li> 
                </div>
              </div>
          </div> 
          
          <div class="">
            <button type="button" class="btn btn-light"> Attach </button> 
          </div>
    
          <div class="">
            <button class="btn btn-light">
                <router-link :to="{ name: 'EditIssue', params: { id: issue.id }}"> Edit </router-link>
            </button>
          </div>
    
          <div class="">
            <button class="btn btn-light" value="deleteIssue" v-on:click="deleteIssue">
                Delete
            </button>
          </div>

          <div class="" >
            <button class="btn btn-light">     
              <router-link to="/">Back</router-link>
            </button>
          </div>

      </div>
    </div>
    <div class="issue-attrs">
          <dl>
            <dt> Asignee </dt>
              <dd><a v-if="assigneeName !== null" href="#">{{assigneeName}}</a>
              <a v-else href="">-</a></dd>
          </dl>
          <dl>
            <dt> Type </dt>
              <dd><a href=""> {{issue.Type}}</a></dd>
          </dl>
          <dl>
            <dt>Priority</dt>
              <dd><a href="#"> {{issue.Priority}}</a></dd>
          </dl>
          <dl>
            <dt>Status</dt>
            <dd><a href="#">{{issue.Status}}</a></dd>
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
                {{issue.Watchers}} -
                <a v-on:click="watch" class="vote" rel="nofollow" href="#">Watch </a>
                <a v-on:click="unwatch" class="vote" rel="nofollow" href="#">Unwatch</a>
              </dd>
          </dl>
        </div>
      </div>
  </div>
</template>























<script>

import axios from 'axios';
import moment from 'moment';


axios.defaults.headers.post['Accept'] = '*/*';
axios.defaults.headers.put['Accept'] = '*/*';
axios.defaults.headers.delete['Accept'] = '*/*';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

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
    this.fetchDataIssue()
    this.fetchDataComments()
  },
  filters: {
    dateshow: function(value) {
      return moment(value).fromNow();
    }
  },
  methods: {
    fetchDataIssue: function() {
      this.issue_id = this.$route.params.id
      axios
        .get('https://blooming-dusk-00596.herokuapp.com/api/issues/'+this.$route.params.id+'/?api_key=9zWzwy3pR5wrVcukdvz2', {headers: {Accept: '*/*'}})
        .then(res => {
          this.issue = res.data.issue;
          this.creatorName = res.data.userCreatorName;
          this.assigneeName = res.data.userAssignedName;
          this.$forceUpdate() 
        })

    },
    fetchDataComments: function() {
      axios
        .get('https://blooming-dusk-00596.herokuapp.com/api/issues/'+this.issue_id+'/comments/?api_key=9zWzwy3pR5wrVcukdvz2', {headers: {Accept: '*/*'}})
        .then(res => {
          this.comments = res.data;
        })
    },
    createComment: function() {
      axios
        .post('https://blooming-dusk-00596.herokuapp.com/api/issues/'+this.issue_id+'/comments/?text='+this.comment_text+' &api_key=9zWzwy3pR5wrVcukdvz2')
        .then(
          sleep(800)
            .then(() => {this.fetchDataComments()})
        )
      this.comment_text = ""
    },
    deleteComment: function(idComment) {
      axios
        .delete('https://blooming-dusk-00596.herokuapp.com/api/issues/'+this.issue_id+'/comments/'+idComment+' ?api_key=9zWzwy3pR5wrVcukdvz2')
        .then(
          sleep(800)
            .then(() => {this.fetchDataComments()})
        )
    },
    editComment: function(idComment) {
      axios
        .put('https://blooming-dusk-00596.herokuapp.com/api/issues/'+this.issue_id+'/comments/'+idComment+'?text='+this.comment_text+'&api_key=9zWzwy3pR5wrVcukdvz2')
        .then(
          sleep(800)
            .then(() => {this.fetchDataComments()})
        )
       this.comment_text = ""
    },
    vote: function() {
      axios
        .post('https://blooming-dusk-00596.herokuapp.com/api/issues/'+this.issue_id+'/vote?api_key=9zWzwy3pR5wrVcukdvz2')
        .then(
          sleep(800)
            .then(() => {this.fetchDataIssue()})
        )
            
    },
    unvote: function() {
      axios
        .post('https://blooming-dusk-00596.herokuapp.com/api/issues/'+this.issue_id+'/unvote?api_key=9zWzwy3pR5wrVcukdvz2')
        .then(
          sleep(800)
            .then(() => {this.fetchDataIssue()})
        )
    },
    watch: function() {
      axios
        .post('https://blooming-dusk-00596.herokuapp.com/api/issues/'+this.issue_id+'/watch?api_key=9zWzwy3pR5wrVcukdvz2')      
        .post('https://blooming-dusk-00596.herokuapp.com/api/issues/'+this.issue_id+'/vote?api_key=9zWzwy3pR5wrVcukdvz2')  
      this.$nextTick(() => {this.fetchDataIssue()})
      this.$forceUpdate() 
    },
    unwatch: function() {
      axios
        .post('https://blooming-dusk-00596.herokuapp.com/api/issues/'+this.issue_id+'/unwatch?api_key=9zWzwy3pR5wrVcukdvz2')
        .then(
          sleep(800)
            .then(() => {this.fetchDataIssue()})
        )
    },
    status: function(newIssueStatus) {
      var text = "changed the status to "+newIssueStatus
      axios
        .put('https://blooming-dusk-00596.herokuapp.com/api/issues/'+this.issue_id+'/status?Status='+newIssueStatus+'&api_key=9zWzwy3pR5wrVcukdvz2')
        .then(res => {
          if (res.status == 200) {
            sleep(800)
            .then(() => {this.$nextTick(() => {
              this.fetchDataIssue(),
              axios
                .post('https://blooming-dusk-00596.herokuapp.com/api/issues/'+this.issue_id+'/comments/?text='+text+' &api_key=9zWzwy3pR5wrVcukdvz2'),
              sleep(800)
              .then(() => this.fetchDataComments())
            })})
          }
        })
    },
    deleteIssue: function() {
      axios
        .delete('https://blooming-dusk-00596.herokuapp.com/api/issues/'+this.issue_id+'?api_key=9zWzwy3pR5wrVcukdvz2')
        .then(res => {
          if (res.status == 200) {
            this.$router.push({ name: 'issues' })
          }
        })
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
