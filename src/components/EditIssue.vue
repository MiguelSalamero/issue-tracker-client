<template>
  <div >
    <div class="header pt-5 text-left">
      <h1>Edit issue</h1>
    </div>
    <br>
    <div class="px-5 text-left">
  <form>

    <label for="issue_Title">Title</label>
    <div class="form-group">
      <div class="field">
        <input v-model="Title" type="text" name="issue[Title]" id="issue_Title">
      </div>
    </div>

    <label for="issue_Description">Description</label>
    <div class="form-group">
      <div class="field"> 
      <textarea v-model="Description" name="issue[Description]" value="issue[Description]" id="issue_Description" cols="100" rows="5"></textarea>
      </div>

    </div>
        
    <label for="issue_Type">Type</label>
    <div class="form-group">
      <div class="field">
        <select v-model="Type" name="issue[Type]" id="issue_Type">
          <option value="Bug" selected="selected">Bug</option>
          <option value="Enhancement">Enhancement</option>
          <option value="Proposal">Proposal</option>
          <option value="Task">Task</option></select>
      </div>
    </div>

    <label for="issue_Priority">Priority</label>
    <div class="field">
      <select v-model="Priority" name="issue[Priority]" id="issue_Priority">
        <option value="Trivial" selected="selected">Trivial</option>
        <option value="Minor">  Minor</option>
        <option value="Major">Major</option>
        <option value="Critical">Critical</option>
        <option value="Blocker">Blocker</option></select>
    </div>
    
    <label for="issue_Assignee">Assignee</label>
    <div class="input-group">
      <select v-model="Assignee" name="issue[asignee_id]" id="issue_asignee_id"><option value="" selected="selected">No assigned user</option>
        <option value="1">Miguel</option>
        <option value="2">Cristian R.</option>
        <option value="3">Carles Farré</option>
        <option value="4">sisu psicologo</option>
        <option value="5">Jaume Malgosa Broto</option>
        <option value="6">Marc obiols rubio</option></select>
    </div>

    <br>


    
    <div class="form-group">
      <label for="issue_Attach">Attach</label>
      <input type="file" name="issue[attachment]" id="issue_attachment">
    </div>

    <div style="float:right">
      <button v-on:click="update" type="button" class="btn btn-outline-dark" data-disable-with="Create Issue">Edit Issue</button>
      <button type="button" class="btn btn-outline-dark"><router-link :to="{ name: 'ShowIssue', params: { id: issue.id }}">Back</router-link></button>
      
    
    </div>
</form>
  <form>

  </form>
</div>
  </div>
</template>



<script>
  import axios from 'axios';

axios.defaults.headers.put['Accept'] = '*/*';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

  export default {
    name: 'EditIssue',
    data() {
      return {
        issue_id:'',
        issue: null,
        creatorName: '',
        Title: '',
        Description: '',
        Type: '',
        Priority: '',
        Assignee: ''
      };
    },
    created: function() {
      this.fetchDataIssue()
    },
    methods: {
      fetchDataIssue: function() {
        this.issue_id = this.$route.params.id
        axios
          .get('https://blooming-dusk-00596.herokuapp.com/api/issues/'+this.$route.params.id+'/?api_key=9zWzwy3pR5wrVcukdvz2', {headers: {Accept: '*/*'}})
          .then(res => {
            this.issue = res.data.issue;
            this.creatorName = res.data.userCreatorName;
            this.Assignee = res.data.userAssignedName;
            this.Title = res.data.issue.Title;
            this.Description = res.data.issue.Description;
            this.Type = res.data.issue.Type;
            this.Priority = res.data.issue.Priority;
            this.$forceUpdate() 
          })
      },
      update: function() {
        axios
          .put('https://blooming-dusk-00596.herokuapp.com/api/issues/'+this.issue_id+'?Title='+this.Title+'&Description='+this.Description+'&Type='+this.Type+'&Priority='+this.Priority+'&api_key=9zWzwy3pR5wrVcukdvz2')
          .then(
            sleep(800)
            .then(() => {this.$router.push({ name: 'ShowIssue', params: { id: this.issue_id }})})
          )
      }
    }
  }	

</script>
