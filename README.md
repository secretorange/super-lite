# super-lite
Very small JavaScript wrapper around native DOM manipulation. Just the methods I needed for small bit of work. 

jQuery style syntax:

```
// On load syntax
$(function(){
  // Select on ID, class or tagname
  var e = $(".class-name");
  
  var value = e.val(); // Value
  
  // Set some html
  e.html("<p>Set some html</a>");
  
  // Set an attribute
  e.attr("data-id", "123");
  
  // Set event handlers
  e.on("click", function(){
    // Do stuff
  });
});
```
