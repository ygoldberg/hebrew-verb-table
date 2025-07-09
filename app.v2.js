const { createApp } = Vue;

createApp({
  data() {
    return {
      verbs: [],
      selectedVerb: null,
      isPreview: location.pathname.includes('/preview/'),
      appVersion: "0.1",
      dataVersion: null
    };
  },
  methods: {
    selectVerb(verb) {
      this.selectedVerb = verb;
    }
  },
  mounted() {
    const path = location.pathname;
    let basePath = '';

    if (path.includes('/preview/')) {
      basePath = '/hebrew-verb-table/preview/';
    } else if (path.includes('/hebrew-verb-table/')) {
      basePath = '/hebrew-verb-table/';
    } else {
      basePath = './'; // for local dev
    }

    fetch(basePath + 'data.json')
      .then(res => res.json())
      .then(json => {
        this.verbs = json.verbs;
        this.dataVersion = json.version;
      });
  },
  template: `
    <div>
      <div v-if="isPreview" style="background: #ffe58f; padding: 10px; text-align: center; font-weight: bold;">
        Preview Mode — This is a development build.
      </div>
      <div v-if="!selectedVerb">
        <table>
          <thead>
            <tr>
              <th>Shoresh (שׁוֹרֶשׁ)</th>
              <th>English Meaning</th>
              <th>Conjugation Family</th>
              <th>Infinitive</th>
              <th>Present Masc. Sg.</th>
              <th>Present Masc. Pl.</th>
              <th>Present Fem. Sg.</th>
              <th>Present Fem. Pl.</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="verb in verbs" :key="verb.shoresh" class="clickable-row" @click="selectVerb(verb)">
              <td class="hebrew">{{ verb.shoresh }}</td>
              <td>{{ verb.english }}</td>
              <td>{{ verb.family }}</td>
              <td class="hebrew">{{ verb.infinitive }}</td>
              <td class="hebrew">{{ verb.present_masc_sg }}</td>
              <td class="hebrew">{{ verb.present_masc_pl }}</td>
              <td class="hebrew">{{ verb.present_fem_sg }}</td>
              <td class="hebrew">{{ verb.present_fem_pl }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div v-else id="single-verb">
        <button @click="selectedVerb = null">← Back to all verbs</button>
        <div id="verb-details">
          <h2 class="hebrew">{{ selectedVerb.shoresh }}</h2>
          <p><strong>English:</strong> {{ selectedVerb.english }}</p>
          <p><strong>Conjugation Family:</strong> {{ selectedVerb.family }}</p>
          <p><strong>Infinitive:</strong> <span class="hebrew">{{ selectedVerb.infinitive }}</span></p>
          <p><strong>Present Masc. Sg.:</strong> <span class="hebrew">{{ selectedVerb.present_masc_sg }}</span></p>
          <p><strong>Present Masc. Pl.:</strong> <span class="hebrew">{{ selectedVerb.present_masc_pl }}</span></p>
          <p><strong>Present Fem. Sg.:</strong> <span class="hebrew">{{ selectedVerb.present_fem_sg }}</span></p>
          <p><strong>Present Fem. Pl.:</strong> <span class="hebrew">{{ selectedVerb.present_fem_pl }}</span></p>
        </div>
      </div>

      <footer style="text-align: center; margin-top: 2em; font-size: 0.9em; color: #666;">
        App version: {{ appVersion }} | Data version: {{ dataVersion || 'loading...' }}
      </footer>
    </div>
  `
}).mount('#app');