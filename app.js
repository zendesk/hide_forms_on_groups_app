(function() {
  var GROUPS = {};
  return {
    events: {
      'app.activated':'whenChanged',
      'getGroups.done': 'storeUserData', 
      'ticket.form.id.changed': 'hideFormOption',
      'revelForms.ready':'showForm'
    },
    requests: {
      getGroups: function(id){
        return {
          url:      '/api/v2/users/'+ id + '.json?include=groups',
          type:     'GET',
          proxy_v2: true
        };
      }
    },
    whenChanged: function(data) {
      if (data.firstLoad) {
        //hide all options when the app 1st loads
        _.defer(this.hideFormOption.bind(this));
        //get the list of groups the current user is a member of
         this.ajax('getGroups', this.currentUser().id());
      }
      
    },
    hideFormOption: function() {
      //build a array of the fields to hide
      var arrFormID = this.setting('formIDMap').split(',');
      //hide the fields in the settings array when the app loads
      arrFormID.forEach(function(key){
        // hide all form in the settings but the current form
        if(key !== this.ticket().form().id().toString()){
          this.ticketFields('ticket_form_id').options(key).hide();
        }
      }, this);
      // trigger the showForm function passing in a obj with the current ticket form ID as currentID
      this.trigger('revelForms.ready', {"currentID":this.ticket().form().id()});
    },
    //build a array of group id's for the currently logged in user
    userGroup: function(grpObj){
      var ids = _.pluck(grpObj, 'id');
      return _.map(ids, function(group){
        return group.toString();
      });
    },
    storeUserData: function(data){
      //build a global var with the current users groups 
      GROUPS = data || GROUPS;
      // trigger the showForm function passing in a obj with the current ticket form ID as currentID
      this.trigger('revelForms.ready', {"currentID":this.ticket().form().id()});
    },
    showForm: function(formID){
      // create a JSON object with the group to form mappings
      var groupMap = JSON.parse(this.setting('groupsIDMap') || '{}');
      //a list of form availiable for the current user. 
      var loadedList = [];
      //display forms allowed for current user. 
      this.userGroup(GROUPS.groups).forEach(function(key){
        //skip if group in not in settings
        if(groupMap[key] !== undefined){
          //if in settings show the forms for that group
          groupMap[key].forEach(function(gKey){
            loadedList.push(gKey);
            this.ticketFields('ticket_form_id').options(gKey).show();
          }, this);
        }
      }, this);
      if(!_.contains(loadedList, formID.currentID)){
        //if default form is not visible set the default to the 1st form in the list
          this.ticket().form().id(loadedList[0]);
        }
    }
  };
}());
