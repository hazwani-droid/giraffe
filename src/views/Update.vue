<template>
  <v-row class="d-flex justify-center align-center fill-height" style="min-height: 100vh">
    <v-col cols="12" md="6">
      <v-card>
          <v-row>
            <v-spacer></v-spacer>
            <v-card-title class="justify-center"> Add Company </v-card-title>
            <v-spacer></v-spacer>
            <v-btn plain fab @click="updateD = false" text color="primary">
              <v-icon dark> mdi-close </v-icon>
            </v-btn>
          </v-row>

          <v-card-text>
            <v-container>
             
                <v-form>
                <v-text-field
                  label="Company Name"
                  required
                    color="blue accent-3"
                 
                ></v-text-field>

                <v-text-field
                  label="Ticker Label"
                      color="blue accent-3"
                  
                ></v-text-field>
                <v-text-field
                  label="No. of Employee"
                     color="blue accent-3"
                
                ></v-text-field>

                <v-text-field
                  label="Stock Price"
                    color="blue accent-3"
               
                ></v-text-field>

                <v-text-field
                  label="Market Capitalization"
                      color="blue accent-3"
                 
                ></v-text-field>

                <v-text-field
                  label="Directors"
                      color="blue accent-3"
               
                ></v-text-field>

                

                <v-text-field
                  label="Sector"
                  
                     color="blue accent-3"
                ></v-text-field>

                <v-text-field
                  label="Industry"
                  dense
                      color="blue accent-3"
                ></v-text-field>
                <v-text-field
                  label="Price per Earning Ratio"
                     color="blue accent-3"
                
                ></v-text-field>

                <v-textarea
                  label="Cypher Query to be executed"
                  dense
                 
                ></v-textarea>
                <small
                  >*Please refer<v-btn
                    @click="dialog2 = !dialog2"
                    plain
                    x-small
                    color="primary"
                    class="text-none"
                    >this</v-btn
                  >for Cypher queries guideline</small
                >
                </v-form>
             
            
              <v-dialog v-model="dialog2" max-width="500px">
                <v-card>
                  <v-row>
                    <v-spacer></v-spacer>
                    <v-card-title class="justify-center">
                      Cypher Query Guideline
                    </v-card-title>
                    <v-spacer></v-spacer>
                    <v-btn
                      plain
                      fab
                      @click="dialog2 = false"
                      text
                      color="primary"
                    >
                      <v-icon dark> mdi-close </v-icon>
                    </v-btn>
                  </v-row>
                  <v-card-text
                    >1. Please specify a label name for each node starting with
                    a capital letter.</v-card-text
                  >
                  <v-card-text
                    >2. Each node property name has to be short and simple
                    without spacing.</v-card-text
                  >
                  <v-card-text
                    >3. Example below shows the query of retrieving a company's
                    node director's property with the specified
                    name.</v-card-text
                  >
                  <v-card-text
                    >e.g MATCH p=(Company {director: 'Siew Wei
                    Mak'})-[r:DIRECTED_BY]->() RETURN p .</v-card-text
                  >

                  <v-card-text
                    >4. Always refer to the Neo4j documentation for further
                    encounters.</v-card-text
                  >
                </v-card>
              </v-dialog>
              <v-row>
                <v-col align="center">
                  <p>
                    Update existing company?
                    <v-btn class="text-none" color="blue darken-1" plain
                      >Update</v-btn
                    >
                  </p>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="updateD = false">
              Close
            </v-btn>
            <v-btn color="blue darken-1" text @click="updateD = false">
              Save Record
            </v-btn>
          </v-card-actions>
        </v-card>
    </v-col>
  </v-row>
</template>

 <script>
 export default {
    data: () => ({
   dialog2: false
  }),
 }
 </script>
 
