const { createApp } = Vue;

createApp({
  data() {
    return {
      verbs: [],
      selectedVerb: null
    };
  },
  methods: {
    selectVerb(verb) {
      this.selectedVerb = verb;
    }
  },
  mounted() {
    fetch('data.json')
      .then(res => res.json())
      .then(json => {
        this.verbs = json;
      });
  }
}).mount('#app');
