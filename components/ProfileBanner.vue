<template>
  <b-container class="shadow banner" fluid>
    <b-row>
      <b-col cols="1" id="avatarcol">
        <img height="60rem" :src="avatar" alt="" />
      </b-col>
      <b-col cols="2" id="infocol">
        <p id="username">{{ username }}</p>
      </b-col>
      <b-col cols="9"></b-col>
    </b-row>
    <b-row>
      <b-col>
        <span id="userid"> userid: {{ userid }} </span>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <p id="bio">{{ bio }}</p>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
export default {
  name: "ProfileBanner",
  props: {
    username: String,
    bio: String,
    avatar: String,
    userid: String,
  },
};
</script>
<style scoped>
.banner {
  background-color: rgb(148, 75, 144);
  margin-top: 5rem;
  color: rgb(190, 182, 182);
}
#username {
  margin-bottom: 0;
}
#infocol {
  padding: 0%;
  font-size: 3rem;
  max-width: 14rem;
}
#avatarcol {
  max-width: 14rem;
}
#userid {
  font-size: 0.7rem;
}
#bio {
  font-size: 2rem;
}
</style>