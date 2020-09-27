<script src="https://apis.google.com/js/platform.js?onload=renderButton" async defer></script>


<template>
  <div id="app">
    <meta name="google-signin-client_id" content="877138643526-74o4cnlp6ckl52ld0smmgac0phpn93hh.apps.googleusercontent.com">
    
    <h1>You would sign in here</h1>
    <b-container class="container">
      <h3 style="text-align: center;">Sign in</h3>
      <div class="g-signin2" data-onsuccess="onSignIn"></div>
    </b-container>
  </div>
</template>



<!--<script>
  function onSuccess(googleUser) {
    console.log('Logged in as: ' + googleUser.getBasicProfile().getName());
  }
  function onFailure(error) {
    console.log(error);
  }
  function renderButton() {
    gapi.signin2.render('my-signin2', {
      'scope': 'profile email',
      'width': 240,
      'height': 50,
      'longtitle': true,
      'theme': 'dark',
      'onsuccess': onSuccess,
      'onfailure': onFailure
    });
  }
</script>-->

<script>
export default {
  name: "Signup",
};
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #1a222b;

  background-color: rgb(129, 115, 148);
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
}

.container {
  border: 2px solid;
  border-radius: 10px;
  background-color: rgb(140, 133, 150);
}
</style>
