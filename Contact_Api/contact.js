function submit() {
  var first_Name = document.getElementById("fName").value;
  var last_Name = document.getElementById("lName").value;
  var phone_No = document.getElementById("phone_No").value;

  document.getElementById("fName").value = "";
  document.getElementById("lName").value = "";
  document.getElementById("phone_No").value = "";

  setTimeout(() => {
    location.reload();
  }, 2000);
  function api_call() {
    fetch("https://average-fish-sundress.cyclic.app/addContact", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        firstName: first_Name,
        lastName: last_Name,
        phoneNumber: phone_No,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        return data;
      });
  }

  api_call();
}

var id;
function get_api() {
  fetch("https://average-fish-sundress.cyclic.app/allContacts", {
    method: "GET",
    headers: { "Content-type": "application/json" },
  })
    .then((response) => response.json())
    .then((data) => {
      var tableBody = document.querySelector("#table_container tbody");
      data.forEach((item) => {
        var row = document.createElement("tr");
        row.setAttribute("id", "table_row");
        row.innerHTML = `
           <td id="fName">${item.firstName}</td>
           <td id="lName">${item.lastName}</td>
           <td id="Phone">${item.phoneNumber}</td>  
           <td>${item._id}</td>
        `;
        this.id = item._id;

        // For Delete Button
        var del = document.createElement("button");
        del.innerHTML = "Delete";
        del.setAttribute("class", "delete_btn");
        row.appendChild(del);

        del.addEventListener("click", () => {
          setTimeout(() => {
            location.reload();
          }, 2000);
          fetch(
            `https://average-fish-sundress.cyclic.app/removeContact/${item._id}`,
            {
              method: "DELETE",
            }
          )
            .then((res) => res.text()) // or res.json()
            .then((res) => console.log(res));
        });
        tableBody.appendChild(row);

        // for edit button

        var edit_btn = document.createElement("button");
        edit_btn.setAttribute("id", "editBtn");
        edit_btn.innerHTML = "Edit";
        row.appendChild(edit_btn);

        edit_btn.addEventListener("click", (event) => {
          var modal = document.getElementById("myModal");
          var close = document.getElementsByClassName("close")[0];
          function show() {
            modal.style.display = "block";
          }
          show();
          close.onclick = function () {
            modal.style.display = "none";
          };
          var savebtn = document.getElementById("save_data");

          var save_fName = document.getElementById("save_fName").value = item.firstName;
          var save_lName = document.getElementById("save_lName").value = item.lastName;
          var save_phoneNo = document.getElementById("save _phoneNo").value = item.phoneNumber;


          // For save Button
          savebtn.addEventListener("click", (event) => {
            event.preventDefault();

            var update_fName = document.getElementById("save_fName").value;
            var update_lName = document.getElementById("save_lName").value;
            var update_phone_No = document.getElementById("save _phoneNo").value;
            const payload = {
              firstName: update_fName,
              lastName: update_lName,
              phoneNumber: update_phone_No,
              _id : id
            };

            fetch(`https://average-fish-sundress.cyclic.app/updateContact/`, {
              method: "PUT",
              headers: { "content-type": "application/json" },
              body: JSON.stringify(payload),
            });
          });
        });
      });
    });
}
get_api();
