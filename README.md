Hide forms options based on Agent group membership
==================================================

Hide ticket form options based on the current agents group membership. The app will hide all the options that are set on the settings page as a comma separtated list. 

``` javascript
123,145,2000
```

In a JSON object create the group to allowed forms. 

``` javascript 
{"1": ["123", "145"], "2": ["2000"]}
```
