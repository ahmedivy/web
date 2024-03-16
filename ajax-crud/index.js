function listProjects() {
  $.ajax({
    url: "http://localhost:3000/projects",
    method: "GET",
    success: function (response) {
      console.log(response);

      var projectList = "";
      for (var i = 0; i < response.length; i++) {
        projectList += `<div class="card my-3">
         <div class="card-body" id="project-${response[i]._id}">
           <h5 class="card-title
           ">${response[i].title}</h5>
           <p class="card-text">${response[i].description}</p>
           <button data-id="${response[i]._id}"
           class="btn btn-primary">Edit</button>
           <button data-id="${response[i]._id}"
              class="btn btn-danger">Delete</button>
         </div>
        </div>`;
      }

      if (response.length === 0) {
        projectList = "No projects found";
      }

      $("#projectsList").html(projectList);
    },
  });
}

function addProject(event) {
  event.preventDefault();
  var title = $("#title").val();
  var description = $("#description").val();

  console.log(title, description);

  $.ajax({
    url: "http://localhost:3000/projects/",
    method: "POST",
    data: { title, description },
    success: function (response) {
      console.log(response);
      listProjects();

      // clear the form
      $("#title").val("");
      $("#description").val("");
    },

    error: function (response) {
      console.log(response);
    },
  });
}

$(document).ready(function () {
  listProjects();
  $("#addProjectForm").submit(addProject);

  // select all buttons where text is Edit
  $(document).on("click", "button:contains('Edit')", function () {
    var id = $(this).data("id");
    $.ajax({
      url: `http://localhost:3000/projects/${id}`,
      method: "GET",
      success: function (response) {
        console.log(response);
        $("#updateId").val(response._id);
        $("#updateTitle").val(response.title);
        $("#updateDescription").val(response.description);

        $("#updateProjectModal").modal("show");

        $("#updateProjectButton")
          .off("click")
          .click(function () {
            var title = $("#updateTitle").val();
            var description = $("#updateDescription").val();

            $.ajax({
              url: `http://localhost:3000/projects/${id}`,
              method: "PUT",
              data: { title, description },
              success: function (response) {
                console.log(response);
                listProjects();
                $("#updateProjectModal").modal("hide");
              },
            });
          });
      },
    });
  });

  $(document).on("click", "button:contains('Delete')", function () {
    var id = $(this).data("id");
    $.ajax({
      url: `http://localhost:3000/projects/${id}`,
      method: "DELETE",
      success: function (response) {
        console.log(response);
        listProjects();
      },
    });
  });
});
