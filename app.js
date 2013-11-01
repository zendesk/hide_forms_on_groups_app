(function() {

  return {
    events: {
      'app.activated':'hideFormOption'
    },
    //hide fields on load
    hideFormOption: function() {
      //build a array of the fields to hide
      var arrFormID = this.setting('formIDMap').split(',');
      //hide the fields in the settings array when the app loads
      arrFormID.forEach(function(key){
        this.ticketFields('ticket_form_id').options(key).hide();
      }, this);
      this.showForm();
    },
    //build a array of group id's for the currently logged in user
    userGroup: function(){
      return _.map(this.currentUser().groups(), function(group){
        return group.id().toString();
      });
    },
    showForm: function(){
      var groupMap = JSON.parse(this.setting('groupsIDMap') || '{}');
      this.userGroup().forEach(function(key){
        if(groupMap[key] !== undefined){
          groupMap[key].forEach(function(gKey){
            this.ticketFields('ticket_form_id').options(gKey).show();
          }, this);
        }
      }, this);
    }
  };
}());
