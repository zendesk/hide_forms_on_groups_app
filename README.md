:warning: *Use of this software is subject to important terms and conditions as set forth in the License file* :warning:

# Hide forms options App

Hide ticket form options based on the current agents group membership. The app will hide all the options that are set on the settings page as a comma separtated list. 

``` javascript
123,145,2000
```

In a JSON object create the group to allowed forms. If the Agent does not have visibility to the default ticket form the 1st form ID in the array will be used as the default form. 

``` javascript 
{"1": [123, 145], "2": [2000]}
```

### Note:
If the agent opens a ticket with a form ID that they do not have permission to view, they will not be able to see the that form. If they change the form the will not be able to select the original form since they do not have permissions. They need to cancel the update in order to get the original form back. 