<template>
  <v-container class="py-12 pb-16">
    <v-row justify="center">
      <v-col cols="12" md="8">
        <h1 class="text-h4 font-weight-bold mb-2">About Me</h1>
        <p class="text-medium-emphasis mb-8">A bit about my background and skills.</p>

        <v-card rounded="lg" elevation="2" class="pa-6 mb-8">
          <p class="text-body-1">
            I'm a full-stack developer with more than 15 years of experience building and maintaining web applications across PHP, JavaScript, and cloud infrastructure. I enjoy solving problems across the entire stack, from architecting
            back-end systems and REST API integrations to creating responsive front-end experiences with modern frameworks and build tools. I care deeply about writing secure, scalable, and maintainable code that delivers long-term value.
          </p>
          <p class="text-body-1">
            Throughout my career, I've led teams, mentored developers, and collaborated with stakeholders ranging from clients and executives to cross-functional technical teams. I'm driven by continuous learning and take pride in adopting
            new technologies, improving development practices, and delivering high-quality solutions with professionalism, accountability, and a strong focus on communication and collaboration.
          </p>

          <v-row gap="4">
            <v-col cols="auto">
              <v-btn to="/Justin_Joyce_Full_Stack_Developer_Schema_App.pdf" target="_blank" color="primary" size="large" variant="elevated">
                View My Resume
              </v-btn>
            </v-col>
            <v-col cols="auto">
              <v-btn href="https://www.linkedin.com/in/justin-gregory-joyce/" target="_blank" size="large" variant="outlined">
                LinkedIN
              </v-btn>
            </v-col>
          </v-row>

        </v-card>

        <h2 class="text-h5 font-weight-bold mb-4">Experience</h2>
        <!-- Experience cards replace v-timeline for more predictable layout behaviour -->
        <v-row class="mb-8">
          <v-col cols="12" v-for="item in experience" :key="item.role">
            <v-card rounded="lg" elevation="2" class="pa-4">
              <div class="d-flex align-center mb-1">
                <v-icon color="primary" icon="mdi-briefcase-outline" class="mr-2" />
                <span class="font-weight-bold">{{ item.role }}</span>
              </div>
              <div class="text-medium-emphasis text-caption mb-2">{{ item.company }} · {{ item.period }}</div>
              <div class="text-body-2">{{ item.desc }}</div>
            </v-card>
          </v-col>
        </v-row>

        <h2 class="text-h5 font-weight-bold mb-4">Technical Skills</h2>
        <!-- Skill groups are defined in script setup and rendered as Vuetify chip groups -->
        <v-row class="mb-8">
          <v-col cols="12" md="6" v-for="group in skillGroups" :key="group.category">
            <v-card rounded="lg" elevation="2" class="pa-4 h-100">
              <h3 class="text-subtitle-1 font-weight-bold mb-3">{{ group.category }}</h3>
              <v-chip
                v-for="skill in group.skills"
                :key="skill"
                color="primary"
                variant="tonal"
                class="mr-2 mb-2"
              >
                {{ skill }}
              </v-chip>
            </v-card>
          </v-col>
        </v-row>

      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
const skillGroups = [
  {
    category: 'Frontend',
    skills: ['Vue 3', 'React', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3/Sass', 'Vuetify', 'Bootstrap'],
  },
  {
    category: 'Languages',
    skills: ['PHP', 'MySQL', 'Apex', 'Bash', 'C#/C++', 'Python', 'Perl', 'Java'],
  },
  {
    category: 'AWS',
    skills: ['IAM', 'EC2', 'Lambda', 'RDS', 'CloudFront', 'ElastiCache (Redis)', 'S3'],
  },
  {
    category: 'APIs & Data',
    skills: ['GraphQL', 'REST APIs', 'Pinia', 'Axios'],
  },
  {
    category: 'Tooling',
    skills: ['Vite', 'Webpack', 'ESLint', 'Prettier', 'Composer', 'NPM'],
  },
  {
    category: 'Other',
    skills: ['Linux', 'Apache', 'NGINX', 'WCAG/AODA', 'OOP', 'Git/SVN', 'Responsive Design', 'Symphony', 'Relational Database', 'Agile'],
  },
]

const experience = [
  {
    role: 'Web Developer',
    company: 'Skyline Group of Companies',
    period: '2019 – Present',
    desc: 'Web Developer responsible for full-stack development and support of enterprise web platforms and internal applications across Skyline Group of Companies. Deliver secure LAMP infrastructure, WordPress solutions, CRM and Salesforce integrations, accessibility compliance, and analytics implementation while maintaining high standards for code quality, security, and team mentorship.',
  },
  {
    role: 'Technical Lead',
    company: 'Bailey Creative Inc.',
    period: '2018 - 2019',
    desc: 'Web Developer providing full-stack development and technical leadership for concurrent client engagements in a fast-paced agency environment. Collaborated with company ownership on RFP development, requirements gathering, and executive client meetings while delivering custom web solutions, managing hosting infrastructure, and mentoring development teams to ensure quality and successful project delivery.',
  },
]
</script>
