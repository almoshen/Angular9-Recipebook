// let form = document.getElementById('loginForm');
// let divSuccess = document.getElementById('success');

function loginUser(e){
      e.preventDefault();
      const password = document.getElementById('password').value;
      const username = document.getElementById('username').value;
      
      var xhr = new XMLHttpRequest();

      xhr.open("POST", "/api/auth/login", true);
      xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      // xhr.send(formData);
      xhr.send(JSON.stringify({
        "username": username,
        "password": password
      }));


      xhr.onload = function(){
        if(this.status == 200){
          let removeElement = document.getElementById('message-temp');
            if (removeElement !== null)
                removeElement.remove();
            let modalbody = document.getElementById('modal-body');
            modalbody.className = 'alert alert-success';
            // modalbody.removeChild();
            var newDiv =  document.createElement('p');
            newDiv.id = 'message-temp';
            var node = document.createTextNode("Welcome back "+username+". You are not logged!");
            newDiv.appendChild(node);

            // newDiv.createTextNode('Check the fields missing');
            modalbody.appendChild(newDiv);
          setTimeout(function() {
            window.location.href = '/';
          }, 2000);

          // var user = JSON.parse(this.responseText);

        }else if (this.status == 400){
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
        console.log("start login.js");
        
        form.addEventListener('submit', function(event) {
          if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
          }

          // Check if the fields are missing
          let isValid = true;
          for (var i = 0, element; element = form.elements[i++];) {
              if (element.id === "password" && element.validity.valid == false)
                  isValid = false;
              if (element.id === "username" && element.validity.valid == false)
                  isValid = false;
          }
          if (isValid) {
            loginUser(event);
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
