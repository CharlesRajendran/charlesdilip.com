const config = require('../../keys');

module.exports = {
    title: 'Charles Dilip',
    description: 'Learner, Always tend to learn something new each and every day. Developer who loves web development, and also interested in Cloud, Machine Learning and Blockchain related work.',
    themeConfig: {
        nav: [
            { text: 'Blog', link: '/blog/' },
            { 
                text: 'Javascript',
                link: '/javascript/',
                items: [
                    // {
                    //     text: 'Vanila JS', 
                    //     link: '/javascript/vanila/'
                    // },
                    // {
                    //     text: 'Angular', 
                    //     link: '/javascript/angular/'
                    // },
                    {
                        text: 'VueJS',
                        link: '/javascript/vue/'
                    },
                    {
                        text: 'Node.js',
                        link: '/javascript/nodejs/'
                    },
                    {
                        text: 'Performance',
                        link: '/javascript/performance/'
                    }
                ]
            },
            { 
                text: 'Cloud Computing',
                link: '/cloud/',
                items: [
                    {
                        text: 'Serverless', 
                        link: '/cloud/serverless/'
                    },
                    {
                        text: 'AWS', 
                        link: '/cloud/aws/'
                    }
                ]
            },
            { 
                text: 'Blockchain',
                link: '/blockchain/',
                items: [
                    {
                        text: 'General', 
                        link: '/blockchain/general/'
                    },
                    {
                        text: 'Ethereum', 
                        link: '/blockchain/ethereum/'
                    },
                    {
                        text: 'Bitcoin', 
                        link: '/blockchain/bitcoin/'
                    },
                ]
            },
            { 
                text: 'Machine Learning',
                link: '/ml/',
                items: [
                    // {
                    //     text: 'Nueral Nets', 
                    //     link: '/ml/deepnueralnets/'
                    // },
                    {
                        text: 'NLP', 
                        link: '/ml/nlp/'
                    }
                ]
            },
            { 
                text: 'MISC',
                link: '/misc/',
                items: [
                    // {
                    //     text:  'Design', 
                    //     link: '/misc/design/'
                    // },
                    {
                        text: 'Web Assembly', 
                        link: '/misc/webasm/'
                    },
                    {
                        text: 'Database',
                        link: '/misc/database/'
                    }
                ]
            },
            { text: 'About Me', link: '/about/' },
            { text: 'Resume', link: 'https://charlesrajendran.github.io/cv/index.html'}
        ],
        sidebar: {
            '/about/': [
                'education',
                'experience',
                'skills',
                'social'
            ],
            '/javascript/vue/': [
                'core',
                'vuex',
                'vuetify',
                'quasar'
            ],
            '/javascript/nodejs/': [
                {
                    title: 'Modules',
                    collapsable: true,
                    children: [
                      'EsModules'
                    ]
                },
            ],
            '/blog/': [
                {
                    title: 'WebAssembly',
                    collapsable: true,
                    children: [
                      'IntroToWebAssembly'
                    ]
                },
                {
                    title: 'Blockchain',
                    collapsable: true,
                    children: [
                        'WhatWhyBlochchain',
                        'HowBitcoinWorks'
                    ]
                },
                {
                    title: 'Machine Learning',
                    collapsable: true,
                    children: [
                        'TextclassificationusingBOW',
                        'KMeansClustering'
                    ]
                },
                {
                    title: 'Database',
                    collapsable: true,
                    children: [
                        '/misc/database/NoSQLDatabaseDesign'
                    ]
                },
                {
                    title: 'Javascript',
                    collapsable: true,
                    children: [
                        '/javascript/nodejs/EsModules'
                    ]
                }
            ],
            '/misc/database/': [
                {
                    title: 'NoSQL',
                    collapsable: true,
                    children: [
                      'NoSQLDatabaseDesign',
                    ]
                }
            ],
            '/blockchain/ethereum/': [
                'solidity'
            ],
            '/cloud/aws/': [
                'Textract'
            ]
        }
    },
    head: [
        ['link', { rel: 'icon', href: '/images/favicon.ico' }],
        ['meta', { name: 'keywords', content: 'Charles Rajendran, Charles Dilip, Srilankan Software Developer, Blockchain Engineer, Machine Learning Enthusiast, Cloud, Javascript Developer'}],
        ['meta', { name: 'description', content: 'Charles Dilp Rajendran\'s Portfolio, Cloud, Blockchain, Machine Learning, Javascript, Web Developer, who is also good at web design'}],
        ['script', { src: "//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js" }],
        ['script', {}, '(adsbygoogle = window.adsbygoogle || []).push({  google_ad_client: "ca-pub-7621720733506275",  enable_page_level_ads: true });']
    ],
    ga: config.google.analytics,
    markdown: {
        lineNumbers: true
    },
    serviceWorker: {
        updatePopup: true
    },
    plugins: [
        [
          'vuepress-plugin-rss',
          {
            base_url: '/',
            site_url: 'https://charlesdilip.tech',
            copyright: '2019 Charles Dilip',
            filter: (frontmatter) => { return [true|false] },
            count: 20
          }
        ]
    ]
}