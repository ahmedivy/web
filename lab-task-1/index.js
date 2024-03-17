$(document).ready(function () {
  $("#contactForm").validate({
    rules: {
      name: {
        required: true,
        minlength: 3,
      },
      email: {
        required: true,
        email: true,
      },
      message: {
        required: true,
        minlength: 10,
      },
    },
    messages: {
      name: {
        required: "Please enter your name",
        minlength: "Your name must be at least 3 characters long",
      },
      email: {
        required: "Please enter your email",
        email: "Please enter a valid email address",
      },
      message: {
        required: "Please enter a message",
        minlength: "Your message must be at least 10 characters long",
      },
    },
  });
});
