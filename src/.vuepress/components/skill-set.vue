<template>
    <div class="container">
        <div class="skill-set" v-for="skill in skills">
            <h3>{{skill.name}}</h3>
            <span v-for="subskill in skill.subskills">
                <skill :name="subskill.name" :rating="subskill.rating" :title="subskill.title"></skill>
            </span>
        </div>
    </div>    
</template>
<script>
import skill from './skill';
export default {
    components: {
        skill
    },
    data(){
        return {
            skills: [
                {
                    name: 'Javascript',
                    rating: 'vg',
                    subskills: [
                        {
                            name: 'VanilaJS',
                            rating: 'vg',
                            title: 'ES6, DOM, Asynchronus JS, Functional JS'
                        },
                        {
                            name: 'Angular',
                            rating: 'g',
                            title: 'Type Script, Angular Material, Redux/NgRx, AngularFire, NgCli, Angular Router, Angular Forms'
                        },
                        {
                            name: 'Vue',
                            rating: 'g',
                            title: 'Vue 3, Vue Cli, Vuepress, Vuex, Quasar, Nuxt'
                        },
                        {
                            name: 'React',
                            rating: 'g',
                            title: 'React, Redux, Next'
                        },
                        {
                            name: 'Node.js',
                            rating: 'g',
                            title: 'Express, Passport, Mongoose'
                        },
                        {
                            name: 'Mocha/Chai',
                            rating: 'aa',
                            title: ''
                        },
                        {
                            name: 'Grunt',
                            rating: 'g',
                            title: ''
                        }
                    ]
                },
                {
                    name: 'Machine Learning',
                    rating: 'a',
                    subskills: [
                        {
                            name: 'Python',
                            rating: 'aa',
                            title: 'Python 3, Bottle, Django'
                        },
                        {
                            name: 'Keras',
                            rating: 'a',
                            title: 'Keras'
                        },
                        {
                            name: 'Tensorflow',
                            rating: 'b',
                            title: 'Tensorflow, TFX, Tensorflow 2.0, Tensorflow.js'
                        },
                        {
                            name: 'NLTK',
                            rating: 'a',
                            title: 'NLTK'
                        },
                        {
                            name: 'Web Scraping',
                            rating: 'aa',
                            title: 'Beautiful Soup'
                        },
                        {
                            name: 'Utilities',
                            rating: 'a',
                            title: 'Pandas, Scikit Learn, Numpy'
                        }
                    ]
                },
                {
                    name: 'Blockchain',
                    rating: 'aa',
                    subskills: [
                        {
                            name: 'Ethereum',
                            rating: 'aa',
                            title: 'Concept, Geth, Remix, Networks'
                        },
                        {
                            name: 'Solidity',
                            rating: 'aa',
                            title: 'Solidity'
                        },
                        {
                            name: 'Web3',
                            rating: 'a',
                            title: 'Web3.js'
                        },
                        {
                            name: 'Truffle',
                            rating: 'a',
                            title: 'Truffle, Ganache'
                        },
                        {
                            name: 'Other Blockchains',
                            rating: 'b',
                            title: 'Hyper Ledger, Loom, Zilliqa'
                        }
                    ]
                },
                {
                    name: 'Cloud',
                    rating: 'aa',
                    subskills: [
                        {
                            name: 'AWS',
                            rating: 'aa',
                            title: 'EC2, ECS, Elastic Beanstalk, Lambda, IAM, S3, ...'
                        },
                        {
                            name: 'Firebase',
                            rating: 'aa',
                            title: 'Firebase Hosting, Firestore, API\'s, Firebase Authentication'
                        },
                        {
                            name: 'GCP',
                            rating: 'a',
                            title: ''
                        },
                        {
                            name: 'Heroku',
                            rating: 'aa',
                            title: ''
                        }
                    ]
                },
                {
                    name: 'Java',
                    rating: 'aa',
                    subskills: [
                        {
                            name: 'JavaSE',
                            rating: 'g',
                            title: ''
                        },
                        {
                            name: 'Maven',
                            rating: 'aa',
                            title: ''
                        },
                        {
                            name: 'JSP/Servlet',
                            rating: 'a',
                            title: ''
                        },
                        {
                            name: 'JDBC',
                            rating: 'a',
                            title: ''
                        },
                        {
                            name: 'JAX-RS',
                            rating: 'a',
                            title: ''
                        }
                    ]
                },
                {
                    name: 'Dot net',
                    rating: 'a',
                    subskills: [
                        {
                            name: 'C#',
                            rating: 'aa',
                            title: ''
                        },
                        {
                            name: 'ASP MVC',
                            rating: 'a',
                            title: ''
                        }
                    ]
                },
                {
                    name: 'Database',
                    rating: 'aa',
                    subskills: [
                        {
                            name: 'MySQL',
                            rating: 'aa',
                            title: ''
                        },
                        {
                            name: 'Oracle',
                            rating: 'g',
                            title: ''
                        },
                        {
                            name: 'PLSQL',
                            rating: 'g',
                            title: ''
                        },
                        {
                            name: 'MongoDB',
                            rating: 'aa',
                            title: ''
                        }
                    ]
                }
            ]
        }
    }
    
}
</script>
<style scoped>
.skill-set {
    color: rgb(112, 109, 109);
    text-transform: uppercase;
    margin-bottom: 2rem;
}

.skill-set:last-child {
    margin-bottom: 0rem;
}

.skill-set > h3 {
    border-bottom: 1px solid lightgray;
}
</style>
