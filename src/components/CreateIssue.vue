<template>
  <div >
    <div class="header pt-5 text-left">
      <h1>New issue</h1>
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
      <textarea v-model="Description" name="issue[Description]" id="issue_Description" cols="100" rows="5"></textarea>
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
      <button v-on:click="create" type="button" class="btn btn-outline-dark" data-disable-with="Create Issue">
        Create Issue</button>
      <button type="button" class="btn btn-outline-dark"><router-link to="/">Back</router-link></button>
      
    
    </div>
</form>
  <form>

  </form>
</div>
  </div>
</template>



<script>
  import axios from 'axios';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

  export default {
    name: 'CreateIssue',
    data() {
      return {
        Title: '',
        Description: '',
        Type: '',
        Priority: '',
        Assignee: ''
      };
    },
    methods: {
      create: function() {
        axios
          .post('https://blooming-dusk-00596.herokuapp.com/api/issues?Title='+this.Title+'&Description='+this.Description+'&Type='+this.Type+'&Priority='+this.Priority+'&asignee_id='+this.Assignee+'&api_key=9zWzwy3pR5wrVcukdvz2', {headers: {Accept: '*/*'}})
          .then(
            sleep(800)
            .then(() => {this.$router.push({ name: 'issues'})})
          )
      }
    }
  }	

</script>
