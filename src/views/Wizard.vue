<template>
  <div>
    <v-layout row class="mb-3">
      <v-flex xs10>
        <div class="headline font-weight-regular">Configuration Wizard</div>
        <div>
          Hello there! Welcome to the configuration wizard. This is where you'll begin creating your shiny new
          configuration. Each cycle through the steps below sets up a configration section for one source file. One or
          more source files can be included in a single confgiuration. Once you reach the end of step
          {{ Math.max(...steps.map((s) => s.number), 0) }}, you will have the opportunity to add a configuration for a
          new file or complete the configuration wizard. For each step, complete the required fields then click
          "Continue". Once the initial configuration has been created, you can view and change your initial
          configuration and explore advanced options.
        </div>
      </v-flex>
      <v-flex xs2 class="text-xs-right mr-3">
        <v-btn color="error" to="/" class="mt-4">Exit Configuration Wizard</v-btn>
      </v-flex>
    </v-layout>
    <v-stepper v-model="e6" vertical>
      <template v-for="step in steps">
        <v-stepper-step :complete="e6 > step.number" :key="step.number" :step="step.number" class="body-2">
          {{ step.name }}
        </v-stepper-step>
        <v-stepper-content :step="step.number" :key="step.number + 'content'">
          <v-card color="lightgray" flat class="mb-3" height="200px"></v-card>
          <v-btn color="primary" @click="e6 = step.number + 1">Continue</v-btn>
          <v-btn flat>Cancel</v-btn>
        </v-stepper-content>
      </template>
    </v-stepper>
  </div>
</template>

<script>
export default {
  data() {
    return {
      e6: 1,
      steps: [
        { number: 1, name: 'File Settings' },
        { number: 2, name: 'Column Configuration' },
        { number: 3, name: 'Secure Fields' },
        { number: 4, name: 'Verify and Create' },
      ],
    }
  },
  methods: {},
}
</script>
