
$(".registration-form").submit(function (event) {
  event.preventDefault();

  console.log($(".name"));
  var userData = {
    name: $(".name").val(),
    username: $(".username").val(),
    email: $(".email").val(),
    password: $(".password").val(),
    confirmPassword: $(".confirmPassword").val(),
  };
  console.log(userData);
  fetch("http://localhost:5001/api/auth/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  })
  .then((response)=> response.json())
    .then((data) => {
      console.log(data);
      if(data.exists){
        alert("User already exists");
        return ;
      }

      // Redirect to a protected page or perform other actions
      window.location.href = "/client/user.html";
    })
    .catch((error) => {
      console.error("Login error:", error);
    });
});

var usernamy, namy, emaily;
$(".login-form").submit(function (event) {
  event.preventDefault();

  var credentials = {
    username: $(".username").val(),
    password: $(".password").val(),
  };

  fetch("http://localhost:5001/api/auth/signin", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  })
  .then((response)=> response.json())
    .then((data) => {
      const auths=data.data;
      console.log(auths);
      const { username, email, name } = auths;
      usernamy=username;
      namy=name;
      emaily=email;

      console.log(usernamy, emaily, namy);

      // Redirect to a protected page or perform other actions
      window.location.href = "/client/user.html";
    })
    .catch((error) => {
      console.error("Login error:", error);
    });
});
