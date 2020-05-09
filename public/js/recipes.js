
function newRecipe(e){
  e.preventDefault();
  const title = document.getElementById('title').value;
  const instructions = document.getElementById('instructions').value;
  const calories = document.getElementById('calories').value;
  
  var xhr = new XMLHttpRequest();

  xhr.open("POST", "/api/recipe", true);
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  // xhr.send(formData);
  xhr.send(JSON.stringify({
    "title": title,
    "instructions": instructions,
    "calories": calories,
    "imagePath": "/link/to",

  }));


  xhr.onload = function(){
    if(this.status == 201){
      let removeElement = document.getElementById('message-temp');
        if (removeElement !== null)
            removeElement.remove();
        let modalbody = document.getElementById('modal-body');
        modalbody.className = 'alert alert-success';
        // modalbody.removeChild();
        var newDiv =  document.createElement('p');
        newDiv.id = 'message-temp';
        var node = document.createTextNode("The recipe "+title+" has been published!");
        newDiv.appendChild(node);

        // newDiv.createTextNode('Check the fields missing');
        modalbody.appendChild(newDiv);
      setTimeout(function() {
        window.location.href = '/recipe/list';
      }, 2000);

      // var user = JSON.parse(this.responseText);

    }else if (this.status > 400){
      // console.log(this.responseText);
      const response = JSON.parse(this.responseText);
      console.log(response.message);

      let removeElement = document.getElementById('message-temp');
        if (removeElement !== null)
            removeElement.remove();
        let modalbody = document.getElementById('modal-body');
        modalbody.className = 'alert alert-warning';
        // modalbody.removeChild();
        var newDiv =  document.createElement('p');
        newDiv.id = 'message-temp';
        var node = document.createTextNode(response.message);
        newDiv.appendChild(node);

        // newDiv.createTextNode('Check the fields missing');
        modalbody.appendChild(newDiv);
    }
  };
}




(function() {
'use strict';
window.addEventListener('load', function() {
  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  var forms = document.getElementsByClassName('needs-validation');
  // Loop over them and prevent submission
  var validation = Array.prototype.filter.call(forms, function(form) {
    console.log("start recipes.js");
    
    form.addEventListener('submit', function(event) {
      if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
      }

      // Check if the fields are missing
      let isValid = true;
      for (var i = 0, element; element = form.elements[i++];) {
        if (element.id === "title" && element.validity.valid == false)
            isValid = false;
        if (element.id === "instructions" && element.validity.valid == false)
            isValid = false;
        if (element.id === "calories" && element.validity.valid == false)
            isValid = false;
        if (element.id === "recipephoto" && element.validity.valid == false)
            isValid = false;
      }
      if (isValid) {
        newRecipe(event);
      } else {
        let removeElement = document.getElementById('message-temp');
        if (removeElement !== null)
            removeElement.remove();
        let modalbody = document.getElementById('modal-body');
        modalbody.className = 'alert alert-danger';
        // modalbody.removeChild();
        var newDiv =  document.createElement('p');
        newDiv.id = 'message-temp';
        var node = document.createTextNode("Check the required fields");
        newDiv.appendChild(node);

        // newDiv.createTextNode('Check the fields missing');
        modalbody.appendChild(newDiv);
      }

      form.classList.add('was-validated');
    }, false);
  });
}, false);
})();
