<template>
  <b-container id="card" class="shadow postform" fluid>
    <b-row>
      <b-col cols="1" id="avatarcol">
        <nuxt-link
          v-if="user && user.user_id"
          class="nolink"
          :to="`/users/${user.user_id}`"
        >
          <img
            v-if="user && user.user_avatar && user.user_avatar.object_url"
            height="40rem"
            :src="user.user_avatar.object_url"
            alt=""
          />
        </nuxt-link>
      </b-col>
      <b-col cols="2" id="infocol">
        <p v-if="user && user.user_name" id="username">{{ user.user_name }}</p>
      </b-col>
      <b-col cols="9"></b-col>
    </b-row>
    <b-form inline @submit="newPost">
      <b-row>
        <b-col>
          <b-form-input
            id="content"
            :placeholder="placeholder"
            v-model="form.text"
          />
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <b-form-file v-model="form.attachments" accept=".jpg, .png, .gif">
          </b-form-file>
          <b-button type="submit" class="postbutton">Post</b-button>
        </b-col>
      </b-row>
    </b-form>
  </b-container>
</template>
<script>
// import moment from "moment";
import newpost from "~/queries/newpost";
import newfile from "~/queries/newfile";
export default {
  name: "PostForm",
  props: {
    user: Object,
  },
  data() {
    return {
      username: "Justin",
      placeholder: "What's on your mind?",
      form: {
        text: "",
        attachments: [],
      },
    };
  },
  methods: {
    async newPost(event) {
      event.preventDefault(); //Don't submit the page
      if (this.form.text) {
        console.log(`new post content: ${this.form.text}`);
        // post new content to database for user
        try {
          await this.$apollo
            .mutate({
              mutation: newpost,
              variables: {
                post_text: this.form.text,
                post_user_id: Number(this.user.user_id),
              },
            })
            .then(({ data }) => {
              console.log(`got data back from newPost()`);
              console.log(data);
            });
        } catch (e) {
          console.error(e);
        }
        var file = this.form.attachments;
        if (file) {
          console.log(file);
          try {
            await this.$apollo
              .mutate({
                mutation: newfile,
                variables: {
                  file,
                },
              })
              .then(({ data }) => console.log(data));
          } catch (e) {
            console.error(e);
          }
        } else {
          console.error("attachments were not defined but newFile was called");
        }
      }
    },
  },
};
</script>
<style scoped>
#username {
  margin-bottom: 0;
}
#infocol {
  padding: 0%;
  max-width: 14rem;
}
#avatarcol {
  padding: 0%;
  max-width: 14rem;
}
#content {
  overflow-wrap: break-word;
  margin-top: 2rem;
  margin-bottom: 2rem;
}

.postform {
  background-color: rgb(26, 26, 26);
  color: rgb(190, 182, 182);
  margin-top: 1rem;
}
.postbutton {
  margin-bottom: 1rem;
}
</style>