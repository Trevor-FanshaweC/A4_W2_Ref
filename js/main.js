// // todo => use a key to track the current video, or just pass the video in as a ref to the function and grab its source
// import Vue from 'https://cdn.jsdelivr.net/npm/vue@2.6.11/dist/vue.esm.browser.js';
Vue.component('player', {
  props: ['movie'],

  template: `
    <div>
      <h3 class="movie-title">{{ movie.videotitle }}</h3>
      <video :src="'video/' + movie.videosource" autoplay></video>
      <div class="movie-details">
        <p>{{ movie.videodescription }}</p>
      </div>
    </div>
  `
});

Vue.component('poster', {
  props: {
    vidsource: String,
    thumb: String,
    mindex: Number,
    movie: Object
  },

  template: `
    <li>
        <a :href="vidsource" v-on:click.prevent="$emit('make-selection', movie)">
        <span>{{ mindex}}</span>
          <img :src="'images/' + thumb">
        </a>
      </li>
  `
})

var vm = new Vue({
  el: "#app",

  data: {
    mainmessage: "Welcome to my Vue Video App",

    // mock up the user - this well eventually come from the database UMS (user management system)
    user: {
      isAdmin: true,
      avatar: null,
      isLoggedIn: true
    },

    // this data would also come from the database, but we'll just mock it up for now
    videodata: [
      { name: "Star Wars The Force Awakens", thumb: "forceawakens.jpg", vidsource: "forceawakens.mp4", description: "yet another star wars movie" },
      { name: "Stranger Things", thumb: "strangerthings.jpg", vidsource: "strangerthings.mp4", description: "don't get lost in the upside down" },
      { name: "Marvel's The Avengers", thumb: "avengers.jpg", vidsource: "avengers.mp4", description: "will they make black widow action figures this time?" }
    ],

    movie: {
      videotitle: "video title goes here",
      videodescription: "video description goes here",
      videosource: ""
    },

    // videotitle: "video title goes here",
    // videodescription: "video description goes here",
    // videosource: "",
    showDetails: false
  },

  methods: {
    userLogin() {
      // call the login route, or just mock up the funtionality for now
      console.log('do login on click');

      this.user.isLoggedIn = (this.user.isLoggedIn) ? false : true;
    },

    setUserPreferences() {
      // set the user prefs if user has admin rights
      console.log('set prefs here');
    },

    logClicked({ name, description, vidsource }) {
      debugger;
      // set the observables / bound data so that the view updates
      this.movie.videotitle = name;
      this.movie.videodescription = description;
      this.movie.videosource = vidsource;

      this.showDetails = true;
      //document.querySelector('video').scrollIntoView(false);
      setTimeout(function () { window.scrollTo(0, 1200); }, 500);
    },

    scrollBackUp() {
      window.scrollTo(0, 0);
      this.showDetails = false;
      this.videosource = "";
    },

    fetchUserData() {
      // just a stub method call for now
      console.log('get any users here');

      const url = '/admin/index.php?getUsers=true';

      fetch(url)
        .then(res => res.json())
        .then(data => {
          this.user = data;
        })
    }
  },

  created: function () {
    console.log('vue instance created');

    this.fetchUserData();
  }
});
