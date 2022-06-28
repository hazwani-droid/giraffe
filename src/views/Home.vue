<template>
  <div>
    <div>
      <v-card >
        <v-img
            :aspect-ratio="16 / 9"
            dark
            gradient="to top, rgba(25,32,72,.7), rgba(25,32,72,.0)"
            height="500px"
            src="https://firebasestorage.googleapis.com/v0/b/stockneo-f9c14.appspot.com/o/graph.jpg?alt=media&token=a36972f0-9c33-4af4-b267-f5f5194abbba"
        >
          <v-card-text class="fill-height d-flex align-end">
            <v-row class="flex-column">
            
              <v-col cols="12" lg="8" md="10" xl="7">
                <h2 class="text-h3 py-3" style="line-height: 1.2">
                 STOCKNEO
                </h2>
              </v-col>
              <v-col class="d-flex align-center">
                <v-avatar class="elevation-4" color="accent">
                  <v-icon large>mdi-feather</v-icon>
                </v-avatar>

                <div class="text-h6 pl-2">Your Stock Graph Partner!</div>
              </v-col>
              <v-col class="d-flex align-right">
               
                <v-spacer></v-spacer>
                <v-btn    to= "/Screener" class="text-capitalize " color="#1976D2">Get Started</v-btn>
              </v-col>
            </v-row>
          </v-card-text>
        </v-img>
      </v-card>
    </div>

    <v-row>
      <v-col cols="12" lg="12" xl="8">
        <div>
          <div class="pt-16">
            <h2 class="text-h4 font-weight-bold pb-4">Recommended For You</h2>

            <v-row>
              <v-col v-for="i in 3" :key="i" cols="12" lg="4" md="6">
                <v-hover
                    v-slot:default="{ hover }"
                    close-delay="50"
                    open-delay="50"
                >
                  <div>
                    <v-card
                        :color="hover ? 'white' : 'transparent'"
                        :elevation="hover ? 12 : 0"
                        flat
                        hover
                        
                    >
                      <v-img
                          :aspect-ratio="16 / 9"
                          class="elevation-2"
                          gradient="to top, rgba(25,32,72,.4), rgba(25,32,72,.0)"
                          height="200px"
                          src="https://firebasestorage.googleapis.com/v0/b/stockneo-f9c14.appspot.com/o/neo4j.jpg?alt=media&token=6df6149b-c069-4ea9-a24c-aa36bd65f942"
                          style="border-radius: 16px"
                      >
                        
                      </v-img>

                      <v-card-text>
                        <div class="text-h5 font-weight-bold primary--text">
                          Knowledge Graphs

                        </div>

                        <div class="text-body-1 py-4">
                          A Neo4j knowledge graph is an insight layer of interconnected data enriched with semantics, 
                          so you can reason with the underlying data and use it confidently for complex decision-making.
                        </div>

                        <div class="d-flex align-center">
                         

                         <v-btn    class="text-capitalize"  color="primary" href="https://neo4j.com/use-cases/knowledge-graph/" target="_blank">View use cases</v-btn>
                        </div>
                      </v-card-text>
                    </v-card>
                  </div>
                </v-hover>
              </v-col>
            </v-row>


            


            
          </div>
        
      
        </div>
        </v-col>
   </v-row>
  </div>
</template>

<script>
export default {
  name: "Home",

};
</script>
