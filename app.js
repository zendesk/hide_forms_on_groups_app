(function() {

  return {
    events: {
      'app.activated':'hideFormOption',
      'getGroups.done': 'showForm',
      'ticket.form.id.changed': 'whenChanged'
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
    whenChanged: function() {
        _.defer(this.hideFormOption.bind(this));
    },
    //hide fields on load
    hideFormOption: function() {
      //build a array of the fields to hide
      var arrFormID = this.setting('formIDMap').split(',');
      //hide the fields in the settings array when the app loads
      arrFormID.forEach(function(key){
        this.ticketFields('ticket_form_id').options(key).hide();
      }, this);
      this.ajax('getGroups', this.currentUser().id());
    },
    //build a array of group id's for the currently logged in user
    userGroup: function(grpObj){
      var ids = _.pluck(grpObj, 'id');
      return _.map(ids, function(group){
        return group.toString();
      });
    },

    showForm: function(data){
      var groupMap = JSON.parse(this.setting('groupsIDMap') || '{}');
      this.userGroup(data.groups).forEach(function(key){
        if(groupMap[key] !== undefined){
          groupMap[key].forEach(function(gKey){
            this.ticketFields('ticket_form_id').options(gKey).show();
          }, this);
        }
      }, this);
    }
  };
}());
