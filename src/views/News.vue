
<template>
  <div>
    <v-container>
  <v-row no-gutters>
    <v-col md="6">
     <div class="filters">
          <v-btn class="text-capitalize" outlined @click="filter1">
            Technology
          </v-btn>
          <v-btn class="text-capitalize" outlined @click="filter2">
            Business
          </v-btn>
          <v-btn class="text-capitalize" outlined @click="filter3">
            Economy
          </v-btn>
          <v-btn class="text-capitalize" outlined @click="filter4">
            Politics
          </v-btn>
          <v-btn class="text-capitalize" outlined @click="filter5">
            Medical
          </v-btn>
          <v-btn class="text-capitalize" outlined @click="filter6">
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
              {{ 'source' }}
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
<script>
export default {
  data: () => ({
    viz: {},
    drawer: true,
    search: "",
    newArr: [
      {
        code: "001 Pharmaniaga",
        title: "Pharmaniaga's 1Q net profit up 20%, declares 0.8 sen dividend",
        keyword: "	Medical",
        source:
          "https://www.theedgemarkets.com/article/pharmaniagas-1q-net-profit-20-declares-08-sen-dividend",
      },
      {
        code: "002 Hershey opens R&D",
        title: "Chocolate maker Hershey opens new R&D centre in Malaysia",
        keyword: "	Business",
        source:
          "https://www.theedgemarkets.com/article/chocolate-maker-hershey-opens-new-rd-centre-malaysia",
      },

      {
        code: "003 1MDB audit report",
        title:
          "1MDB audit report tampering trial: Prosecution applies to call Arul Kanda as witness to testify against Najib",
        keyword: "	Politics",
        source:
          "https://www.theedgemarkets.com/article/1mdb-audit-report-tampering-trial-arul-kanda-sought-prosecution-witness",
      },
      {
        code: "004 Peninsula and sabah",
        title:
          "PM: Govt committed to eradicating development gap between peninsula and Sabah",
        keyword: "	Business",
        source:
          "https://www.theedgemarkets.com/article/pm-govt-committed-eradicating-development-gap-between-peninsula-and-sabah",
      },
      {
        code: "005 Sime Darby Plantation",
        title:
          "Sime Darby Plantation 1Q net profit grows 28%, expects lower FFB production in FY22",
        keyword: "	Economy",
        source:
          "https://www.theedgemarkets.com/article/sime-darby-plantation-1q-net-profit-grows-28-expects-lower-ffb-production-fy22",
      },
      {
        code: "006 Rising Inflation",
        title:
          "Rising inflation affects consumer purchasing power, say economists",
        keyword: "	Politics",
        source:
          "https://www.theedgemarkets.com/article/rising-inflation-affects-consumer-purchasing-power-say-economists",
      },
      {
        code: "007 MHB net profit",
        title: "MHB returns to the black in 1Q with RM2.72 million net profit",
        keyword: "	Technology",
        source:
          "https://www.theedgemarkets.com/article/mhb-posts-rm272-million-net-profit-1q-vs-rm104-million-net-loss-year-earlier",
      },
      {
        code: "008 Satellite in Malaysia",
        title:
          "Musk's Starlink plans to provide internet service via satellite in Malaysia",
        keyword: "	Medical",
        source:
          "https://www.theedgemarkets.com/article/musks-starlink-plans-provide-internet-service-satellite-malaysia",
      },
      {
        code: "009 Bursa Malaysia",
        title: "Bursa Malaysia ends higher at midday",
        keyword: "	Social",
        source:
          "https://www.theedgemarkets.com/article/pharmaniagas-1q-net-profit-20-declares-08-sen-dividend",
      },
      {
        code: "010 Palm oil export tax",
        title:
          "Zuraida: Govt still reviewing proposed cut in palm oil export tax",
        keyword: "	Social",
        source:
          "https://www.theedgemarkets.com/article/zuraida-govt-still-reviewing-proposed-cut-palm-oil-export-tax",
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
         server_url: "neo4j://5c3575e8.databases.neo4j.io:7687",
        server_user: "neo4j",
        server_password: "DxjItYHh-BDI_QedX3W-Hs2uV8YlP7YZ6pB_ggowcCM",
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
         server_url: "neo4j://5c3575e8.databases.neo4j.io:7687",
        server_user: "neo4j",
        server_password: "DxjItYHh-BDI_QedX3W-Hs2uV8YlP7YZ6pB_ggowcCM",
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
          server_url: "neo4j://5c3575e8.databases.neo4j.io:7687",
        server_user: "neo4j",
        server_password: "DxjItYHh-BDI_QedX3W-Hs2uV8YlP7YZ6pB_ggowcCM",
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
          server_url: "neo4j://5c3575e8.databases.neo4j.io:7687",
        server_user: "neo4j",
        server_password: "DxjItYHh-BDI_QedX3W-Hs2uV8YlP7YZ6pB_ggowcCM",
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
         server_url: "neo4j://5c3575e8.databases.neo4j.io:7687",
        server_user: "neo4j",
        server_password: "DxjItYHh-BDI_QedX3W-Hs2uV8YlP7YZ6pB_ggowcCM",
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
         server_url: "neo4j://5c3575e8.databases.neo4j.io:7687",
        server_user: "neo4j",
        server_password: "DxjItYHh-BDI_QedX3W-Hs2uV8YlP7YZ6pB_ggowcCM",
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
        { text: "Keyword", value: "keyword",sortable: false, },
        { text: "Source", value: "source",sortable: false, },
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
