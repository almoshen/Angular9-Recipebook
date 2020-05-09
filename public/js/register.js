// let form = document.getElementById('registerForm');
// let divSuccess = document.getElementById('success');

function RegisterUser(e){
      e.preventDefault();
      const password = document.getElementById('password').value;
      const username = document.getElementById('username').value;
      const firstname = document.getElementById('username').value;
      const lastname = document.getElementById('username').value;
      const email = document.getElementById('username').value;
      

      var xhr = new XMLHttpRequest();

      xhr.open("POST", "/api/auth/registration", true);
      xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      // xhr.send(formData);
      xhr.send(JSON.stringify({
        "username": username,
        "password": password,
        "firstname": firstname,
        "lastname": lastname,
        "email": email
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
            var node = document.createTextNode("Welcome "+username+" to the community. You are not logged!");
            newDiv.appendChild(node);

            // newDiv.createTextNode('Check the fields missing');
            modalbody.appendChild(newDiv);
          setTimeout(function() {
            window.location.href = '/';
          }, 2000);

          // var user = JSON.parse(this.responseText);

        }else if (this.status == 401) {
          // console.log(this.responseText);
          
          const response = JSON.parse(this.responseText);
          
          let removeElement = document.getElementById('message-temp');
            if (removeElement !== null)
                removeElement.remove();
            let modalbody = document.getElementById('modal-body');
            modalbody.className = 'alert alert-warning';
            var newDiv =  document.createElement('p');
            newDiv.id = 'message-temp';
            var node = document.createTextNode(response.message.errors.username.message);
            newDiv.appendChild(node);
            modalbody.appendChild(newDiv);
        } else {
          const response = JSON.parse(this.responseText);
          let removeElement = document.getElementById('message-temp');
            if (removeElement !== null)
                removeElement.remove();
            let modalbody = document.getElementById('modal-body');
            modalbody.className = 'alert alert-danger';
            var newDiv =  document.createElement('p');
            newDiv.id = 'message-temp';
            var node = document.createTextNode("Error: "+response.message);
            newDiv.appendChild(node);
            modalbody.appendChild(newDiv);
        }
      };
}




  (function() {
    'use strict';
    window.addEventListener('load', function() {
      // Fetch all the forms we want to apply custom Bootstrap validation styles to
      var forms = document.getElementsByClassName('register-needs-validation');
      // Loop over them and prevent submission
      var validation = Array.prototype.filter.call(forms, function(form) {
        console.log("start register.js");
        form.addEventListener('submit', function(event) {
          if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
          }

          // Check if the fields are missing
          let isValid = true;
          for (var i = 0, element; element = form.elements[i++];) {
              if (element.id === "firstname" && element.validity.valid == false)
                  isValid = false;
              if (element.id === "email" && element.validity.valid == false)
              isValid = false;
              if (element.id === "username" && element.validity.valid == false)
              isValid = false;
              if (element.id === "password" && element.validity.valid == false)
              isValid = false;
              if (element.id === "accept-terms" && element.validity.valid == false)
              isValid = false;
          }
          if (isValid) {
            RegisterUser(event);
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
