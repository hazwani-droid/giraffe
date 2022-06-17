
<template>
  <div>
    <v-container>
      <v-alert
        class="font-italic text-center"
        border="left"
        color="accent lighten-2"
        dark
        type="info"
      >
        <h3>
          Please be noted that the articles are mostly taken from the liable sources
          and based on the popularity of the keywords.
        </h3>
      </v-alert>
      <v-row no-gutters>
        <v-col md="6">
          <div class="filters">
            <v-btn class="text-capitalize ma-2" outlined @click="filter1">
              Technology
            </v-btn>
            <v-btn class="text-capitalize ma-2" outlined @click="filter2">
              Business
            </v-btn>
            <v-btn class="text-capitalize ma-2" outlined @click="filter3">
              Economy </v-btn
            ><br />
            <v-btn class="text-capitalize ma-2" outlined @click="filter4">
              Politics
            </v-btn>
            <v-btn class="text-capitalize ma-2" outlined @click="filter5">
              Medical
            </v-btn>
            <v-btn class="text-capitalize ma-2" outlined @click="filter6">
              Social
            </v-btn>
            <script
              type="application/javascript"
              src="https://cdn.neo4jlabs.com/neovis.js/v1.5.0/neovis.js"
            ></script>
            <div>
              <div id="viz"></div>
            </div>
          </div>
        </v-col>
        <v-col md="6">
          <v-data-table
            :headers="headers"
            :items="newArr"
            item-key="code"
            class="elevation-1"
            :search="search"
            :custom-filter="filterOnlyCapsText"
          >
            <template #[`item.source`]="{ value }">
              <a target="_blank" :href="value">
                {{ "source" }}
              </a>
            </template>
            <template v-slot:top>
              <v-text-field
                v-model="search"
                label="Search for news code"
                class="mx-4"
              ></v-text-field>
            </template>
          </v-data-table>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>

<script >
import axios from "axios";
export default {
  data: () => ({
    viz: {},
    new: [],
    drawer: true,
    search: "",
    newArr: [
      {
        code: "001 Pharmaniaga",
        title: "Pharmaniaga's 1Q net profit up 20%, declares 0.8 sen dividend",

        source:
          "https://www.theedgemarkets.com/article/pharmaniagas-1q-net-profit-20-declares-08-sen-dividend",
      },
      {
        code: "002 Hershey opens R&D",
        title: "Chocolate maker Hershey opens new R&D centre in Malaysia",

        source:
          "https://www.theedgemarkets.com/article/chocolate-maker-hershey-opens-new-rd-centre-malaysia",
      },

      {
        code: "003 1MDB audit report",
        title:
          "1MDB audit report tampering trial: Prosecution applies to call Arul Kanda as witness to testify against Najib",

        source:
          "https://www.theedgemarkets.com/article/1mdb-audit-report-tampering-trial-arul-kanda-sought-prosecution-witness",
      },
      {
        code: "004 Peninsula and sabah",
        title:
          "PM: Govt committed to eradicating development gap between peninsula and Sabah",

        source:
          "https://www.theedgemarkets.com/article/pm-govt-committed-eradicating-development-gap-between-peninsula-and-sabah",
      },
      {
        code: "005 Sime Darby Plantation",
        title:
          "Sime Darby Plantation 1Q net profit grows 28%, expects lower FFB production in FY22",

        source:
          "https://www.theedgemarkets.com/article/sime-darby-plantation-1q-net-profit-grows-28-expects-lower-ffb-production-fy22",
      },
      {
        code: "006 Rising Inflation",
        title:
          "Rising inflation affects consumer purchasing power, say economists",

        source:
          "https://www.theedgemarkets.com/article/rising-inflation-affects-consumer-purchasing-power-say-economists",
      },
      {
        code: "007 MHB net profit",
        title: "MHB returns to the black in 1Q with RM2.72 million net profit",

        source:
          "https://www.theedgemarkets.com/article/mhb-posts-rm272-million-net-profit-1q-vs-rm104-million-net-loss-year-earlier",
      },
      {
        code: "008 Satellite in Malaysia",
        title:
          "Musk's Starlink plans to provide internet service via satellite in Malaysia",

        source:
          "https://www.theedgemarkets.com/article/musks-starlink-plans-provide-internet-service-satellite-malaysia",
      },
      {
        code: "009 Bursa Malaysia",
        title: "Bursa Malaysia ends higher at midday",

        source:
          "https://www.theedgemarkets.com/article/pharmaniagas-1q-net-profit-20-declares-08-sen-dividend",
      },
      {
        code: "010 Palm oil export tax",
        title:
          "Zuraida: Govt still reviewing proposed cut in palm oil export tax",

        source:
          "https://www.theedgemarkets.com/article/zuraida-govt-still-reviewing-proposed-cut-palm-oil-export-tax",
      },
      {
        code: "011 Singapore expensive city",
        title:
          "Singapore is 13th most expensive city for expats while HK stays top: Survey - The Star Online",
        source:
          "https://www.thestar.com.my/aseanplus/aseanplus-news/2022/06/08/singapore-is-13th-most-expensive-city-for-expats-while-hk-stays-top-survey",
      },

      {
        code: " 012 Mitsubishi ASX debut",

        title:
          " 2023 Mitsubishi ASX to debut September; three- and four-cylinder petrols, and 160 hp 1.6L twin-motor PHEV - paultan.org - Paul Tan's Automotive News",
        source:
          "https://paultan.org/2022/06/08/2023-mitsubishi-asx-to-debut-september-three-and-four-cylinder-petrols-and-160-hp-1-6l-twin-motor-phev/",
      },
      {
        code: "013 China tech shares Rally",
        title:
          "China Tech Shares Rally as Game Approvals Give Nod to Recovery - Bloomberg",
        source:
          "https://www.bloomberg.com/tosv2.html?vid=&uuid=bce45b5a-e6f7-11ec-9135-7a7767755365&url=L25ld3MvYXJ0aWNsZXMvMjAyMi0wNi0wOC9jaGluYS10ZWNoLXNoYXJlcy1yYWxseS1hcy1nYW1lLWFwcHJvdmFscy1naXZlLW5vZC10by1yZWNvdmVyeQ==",
      },
      {},
      {
        code: "014 Glove stock earnings",
        title: "All eyes on glove stock earnings - The Star Online",
        source:
          "https://www.thestar.com.my/business/business-news/2022/06/08/all-eyes-on-glove-stock-earnings",
      },
      {
        code: "015 Stock Market",
        title:
          "Stock Market Today: Dow Rides Energy, U-Turn in Tech to Close Higher By Investing.com - Investing.com",
        source:
          "https://www.investing.com/news/stock-market-news/stock-market-today-dow-rides-energy-uturn-in-tech-to-close-higher-2834558",
      },
      {
        code: "016 ZTE Axon 40 Ultra hands",

        title: "ZTE Axon 40 Ultra hands-on & key features - GSMArena Official",
        source: "https://www.youtube.com/watch?v=lpTLehKjAPk",
      },
      {
        code: "017 F1 manager ",
        title: "F1 Manager 2022 - Official Gameplay Trailer - IGN",
        source: "https://www.youtube.com/watch?v=l8wvMTRnmhU",
      },
      {
        code: "018 1MDM funds for constituencies",
        title:
          "Cabinet discussed using 1MDB funds for constituencies, says ex-chief sec - Free Malaysia Today",
        source:
          "https://news.google.com/__i/rss/rd/articles/CBMihQFodHRwczovL3d3dy5mcmVlbWFsYXlzaWF0b2RheS5jb20vY2F0ZWdvcnkvbmF0aW9uLzIwMjIvMDYvMDgvY2FiaW5ldC1kaXNjdXNzZWQtdXNpbmctMW1kYi1mdW5kcy1mb3ItY29uc3RpdHVlbmNpZXMtc2F5cy1leC1jaGllZi1zZWMv0gEA?oc=5",
      },
      {
        code: "019 12% rise in Malaysia's employee",
        title:
          "Study Predicts 12% Rise In Malaysia's Employer-Sponsored Medical Benefit Costs - CodeBlue",
        source:
          "https://codeblue.galencentre.org/2022/06/08/study-predicts-12-rise-in-malaysias-employer-sponsored-medical-benefit-costs/",
      },
      {
        code: "020 The edge market top economist",
        title:
          "Top economist urges China to seize TSMC if US ramps up sanctions - The Edge Markets MY",
        source:
          " https://www.theedgemarkets.com/article/top-economist-urges-china-seize-tsmc-if-us-ramps-sanctions",
      },
    ],
    protocol: "neo4j://localhost:7687",
    host: "localhost",
    port: 7687,
    username: "Hazneo4j",
    password: "hazneo4j",
  }),

  methods: {
    filter1() {
      var config = {
        encrypted: "ENCRYPTION_ON",
        container_id: "viz",
       server_url: "neo4j://46243086.databases.neo4j.io:7687",
        server_user: "neo4j",
        server_password: "XIx343iBGlvTvANKgc32XuwQn-n6M1bH-OjhyGV7mlc",
        labels: {
          News: {
            caption: "code",
          },
          Keyword: {
            caption: "keyword",
          },
          Title: {
            caption: "title",
          },
          Source: {
            caption: "source",
          },
        },
        relationships: {
          KEYWORD_IS: {
            thickness: "count",
            caption: false,
          },
        },
        //initial_cypher: "MATCH (c)-[r]->(d) RETURN c,r,d"
        initial_cypher:
          "MATCH p=(Company)-[r:KEYWORD_IS]->(News {keyword: 'Technology'}) RETURN p ",
      };

      var viz = new NeoVis.default(config);
      viz.render();
    },
    filter2() {
      var config = {
        encrypted: "ENCRYPTION_ON",
        container_id: "viz",
         server_url: "neo4j://46243086.databases.neo4j.io:7687",
        server_user: "neo4j",
        server_password: "XIx343iBGlvTvANKgc32XuwQn-n6M1bH-OjhyGV7mlc",
        labels: {
          News: {
            caption: "code",
          },
          Keyword: {
            caption: "keyword",
          },
          Title: {
            caption: "title",
          },
          Source: {
            caption: "source",
          },
        },
        relationships: {
          KEYWORD_IS: {
            thickness: "count",
            caption: false,
          },
        },
        //initial_cypher: "MATCH (c)-[r]->(d) RETURN c,r,d"
        initial_cypher:
          "MATCH p=(Company)-[r:KEYWORD_IS]->(News {keyword: 'Business'}) RETURN p ",
      };

      var viz = new NeoVis.default(config);
      viz.render();
    },

    filter3() {
      var config = {
        encrypted: "ENCRYPTION_ON",
        container_id: "viz",
       server_url: "neo4j://46243086.databases.neo4j.io:7687",
        server_user: "neo4j",
        server_password: "XIx343iBGlvTvANKgc32XuwQn-n6M1bH-OjhyGV7mlc",
        labels: {
          News: {
            caption: "code",
          },
          Keyword: {
            caption: "keyword",
          },
          Title: {
            caption: "title",
          },
          Source: {
            caption: "source",
          },
        },
        relationships: {
          KEYWORD_IS: {
            thickness: "count",
            caption: false,
          },
        },
        //initial_cypher: "MATCH (c)-[r]->(d) RETURN c,r,d"
        initial_cypher:
          "MATCH p=(Company)-[r:KEYWORD_IS]->(News {keyword: 'Economy'}) RETURN p ",
      };

      var viz = new NeoVis.default(config);
      viz.render();
    },

    filter4() {
      var config = {
        encrypted: "ENCRYPTION_ON",
        container_id: "viz",
        server_url: "neo4j://46243086.databases.neo4j.io:7687",
        server_user: "neo4j",
        server_password: "XIx343iBGlvTvANKgc32XuwQn-n6M1bH-OjhyGV7mlc",
        labels: {
          News: {
            caption: "code",
          },
          Keyword: {
            caption: "keyword",
          },
          Title: {
            caption: "title",
          },
          Source: {
            caption: "source",
          },
        },
        relationships: {
          KEYWORD_IS: {
            thickness: "count",
            caption: false,
          },
        },
        //initial_cypher: "MATCH (c)-[r]->(d) RETURN c,r,d"
        initial_cypher:
          "MATCH p=(Company)-[r:KEYWORD_IS]->(News {keyword: 'Politics'}) RETURN p ",
      };

      var viz = new NeoVis.default(config);
      viz.render();
    },
    filter5() {
      var config = {
        encrypted: "ENCRYPTION_ON",
        container_id: "viz",
      server_url: "neo4j://46243086.databases.neo4j.io:7687",
        server_user: "neo4j",
        server_password: "XIx343iBGlvTvANKgc32XuwQn-n6M1bH-OjhyGV7mlc",
        labels: {
          News: {
            caption: "code",
          },
          Keyword: {
            caption: "keyword",
          },
          Title: {
            caption: "title",
          },
          Source: {
            caption: "source",
          },
        },
        relationships: {
          KEYWORD_IS: {
            thickness: "count",
            caption: false,
          },
        },
        //initial_cypher: "MATCH (c)-[r]->(d) RETURN c,r,d"
        initial_cypher:
          "MATCH p=(Company)-[r:KEYWORD_IS]->(News {keyword: 'Medical'}) RETURN p ",
      };

      var viz = new NeoVis.default(config);
      viz.render();
    },
    filter6() {
      var config = {
        encrypted: "ENCRYPTION_ON",
        container_id: "viz",
         server_url: "neo4j://46243086.databases.neo4j.io:7687",
        server_user: "neo4j",
        server_password: "XIx343iBGlvTvANKgc32XuwQn-n6M1bH-OjhyGV7mlc",
        labels: {
          News: {
            caption: "code",
          },
          Keyword: {
            caption: "keyword",
          },
          Title: {
            caption: "title",
          },
          Source: {
            caption: "source",
          },
        },
        relationships: {
          KEYWORD_IS: {
            thickness: "count",
            caption: false,
          },
        },
        //initial_cypher: "MATCH (c)-[r]->(d) RETURN c,r,d"
        initial_cypher:
          "MATCH p=(Company)-[r:KEYWORD_IS]->(News {keyword: 'Social'}) RETURN p ",
      };

      var viz = new NeoVis.default(config);
      viz.render();
    },
    filterOnlyCapsText(value, search, item) {
      return (
        value != null &&
        search != null &&
        typeof value === "string" &&
        value.toString().toLowerCase().indexOf(search) !== -1
      );
    },
    async news() {
      console.log("response.data.articles[i][key][j]");

      try {
        const response = await axios(
          `https://newsapi.org/v2/top-headlines?country=my&category=technology&sortBy=relevancy&apiKey=dd81e7fec49344aabd3eb9280016a82e`
        );
        console.log(response.data.articles[0]);
        for (var i = 0; i < response.data.articles.length; i++) {
          this.news[i] = response.data.articles[i];
        }

        console.log(this.news[9].title);
      } catch (error) {
        console.log("error", error);
      }
    },

    // connect() {
    //   return this.$neo4j
    //     .connect(
    //       this.protocol,
    //       this.host,
    //       this.port,
    //       this.username,
    //       this.password
    //     )
    //     .then((driver) => {
    //       // Update the context of your app
    //     });
    // },
    // driver() {
    //   // Get a driver instance
    //   return this.$neo4j.getDriver();
    // },
    // testQuery() {
    //   // // Get a session from the driver
    //   const session = this.$neo4j.getSession();

    //   // Or you can just call this.$neo4j.run(cypher, params)
    //   session
    // .run("MATCH(n:News) RETURN n")
    //     .then(function (result) {
    //       var newsArr = [];
    //       result.records.forEach(function (record) {
    //         newsArr.push({
    //           title: record._fields[0].properties.title,
    //           keyword: record._fields[0].properties.keyword,
    //         });

    //       });

    // //     })
    //     .catch(function (err) {
    //       console.log(err,"hhbj");
    //     });

    //     console.log(this.newArr)
    // },
    // // please(){
    // //   return this.connect();
    // // }
  },
  computed: {
    headers() {
      return [
        {
          text: "Code",
          align: "start",
          sortable: false,
          value: "code",
        },
        {
          text: "Title",
          value: "title",

          sortable: false,
        },
       
        { text: "Source", value: "source", sortable: false },
      ];
    },
  },
};
</script>


<style scoped>
#viz {
  width: 500px;
  height: 900px;
  border-color: #000;
  text-transform: lowercase;
}

/* .filters {
  margin-left: 400px;
} */
</style>
