<template>
    <div class="container">
        <ul class="timeline">
            <li v-for="(exp, index) in experiences" v-bind:class="{'timeline-inverted': index % 2 === 1}">
            <div class="timeline-badge" v-bind:class="exp.color">
                {{ exp.joinedYear }}
            </div>
            <div class="timeline-panel">
                <div class="timeline-heading">
                <h3 class="timeline-title">{{ exp.position }} - {{ exp.company }}</h3>
                <h4>({{ exp.period }})</h4>
                </div>
                <div class="timeline-body">
                <p>{{ exp.work }}</p>
                </div>
            </div>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    // https://bootsnipp.com/snippets/OzQj
    data() {
        return {
            experiences: [
                {
                    company: 'Ascentic',
                    joinedYear: '2019',
                    period: '2019 April - Present',
                    position: 'Software Engineer',
                    work: 'Expected to work with an Angular, Node Project and some other internal projects aswell.',
                    tech: ['Node.JS', 'Angular', 'AWS', 'Machine Learning'],
                    color: 'success'
                },
                {
                    company: 'IFS',
                    joinedYear: '2017',
                    period: '2017 July - 2019 April',
                    position: 'Software Engineer',
                    work: 'Worked in a windows client application to a web application converter project, also mentored 7 interns both on internal and external projects.',
                    tech: ['OracleDB', 'PLSQL', 'C#', 'Internal Declarative Language', 'SVN'],
                    color: 'danger'
                },
                {
                    company: 'TicketsLK',
                    joinedYear: '2016',
                    period: '2016 Feb - 2016 Aug',
                    position: 'Trainee Software Engineer',
                    work: 'Worked with a hotel booking platform, which integrates the hotel\'s website with other booking platforms.',
                    tech: ['Javascript', 'PHP', 'JAVA', 'REST', 'GIT'],
                    color: 'danger'
                }
            ]
        }
    }
}
</script>


<style scoped>
@import 'https://fonts.googleapis.com/css?family=Montserrat';
.container {
    font-family: 'Montserrat', sans-serif;
}
.timeline {
    list-style: none;
    padding: 20px 0 20px;
    position: relative;
}

.timeline:before {
    top: 0;
    bottom: 0;
    position: absolute;
    content: " ";
    width: 3px;
    background-color: #eeeeee;
    left: 50%;
    margin-left: -1.5px;
}

.timeline > li {
    margin-bottom: 20px;
    position: relative;
}

.timeline > li:before,
.timeline > li:after {
    content: " ";
    display: table;
}

.timeline > li:after {
    clear: both;
}

.timeline > li:before,
.timeline > li:after {
    content: " ";
    display: table;
}

.timeline > li:after {
    clear: both;
}

.timeline > li > .timeline-panel {
    width: 38%;
    float: left;
    border: 1px solid #d4d4d4;
    border-radius: 2px;
    padding: 20px;
    position: relative;
    -webkit-box-shadow: 0 1px 6px rgba(0, 0, 0, 0.175);
    box-shadow: 0 1px 6px rgba(0, 0, 0, 0.175);
}

.timeline > li > .timeline-panel:before {
    position: absolute;
    top: 26px;
    right: -15px;
    display: inline-block;
    border-top: 15px solid transparent;
    border-left: 15px solid #cdd;
    border-right: 0 solid #cdd;
    border-bottom: 15px solid transparent;
    content: " ";
}

.timeline > li > .timeline-panel:after {
    position: absolute;
    top: 27px;
    right: -14px;
    display: inline-block;
    border-top: 14px solid transparent;
    border-left: 14px solid #cdd;
    border-right: 0 solid #cdd;
    border-bottom: 14px solid transparent;
    content: " ";
}

.timeline > li > .timeline-badge {
    color: #fff;
    width: 50px;
    height: 50px;
    line-height: 50px;
    /* font-size: 1.4em; */
    text-align: center;
    position: absolute;
    top: 16px;
    left: 50%;
    margin-left: -25px;
    background-color: #999999;
    /* z-index: 100; */
    border-top-right-radius: 50%;
    border-top-left-radius: 50%;
    border-bottom-right-radius: 50%;
    border-bottom-left-radius: 50%;
}

.timeline > li.timeline-inverted > .timeline-panel {
    float: right;
}

.timeline > li.timeline-inverted > .timeline-panel:before {
    border-left-width: 0;
    border-right-width: 15px;
    left: -15px;
    right: auto;
}

.timeline > li.timeline-inverted > .timeline-panel:after {
    border-left-width: 0;
    border-right-width: 14px;
    left: -14px;
    right: auto;
}

.timeline-badge.primary {
    background-color: #2e6da4 !important;
}

.timeline-badge.success {
    background-color: #3f903f !important;
}

.timeline-badge.warning {
    background-color: #f0ad4e !important;
}

.timeline-badge.danger {
    background-color: #d9534f !important;
}

.timeline-badge.info {
    background-color: #5bc0de !important;
}

.timeline-title {
    margin-top: 0;
    color: inherit;
}

.timeline-body > p,
.timeline-body > ul {
    margin-bottom: 0;
    text-align: justify;
}

.timeline-body > p + p {
    margin-top: 5px;
}

@media (max-width: 767px) {
    ul.timeline:before {
        left: 40px;
    }

    ul.timeline > li > .timeline-panel {
        width: calc(100% - 90px);
        width: -moz-calc(100% - 90px);
        width: -webkit-calc(100% - 90px);
    }

    ul.timeline > li > .timeline-badge {
        left: 15px;
        margin-left: 0;
        top: 16px;
    }

    ul.timeline > li > .timeline-panel {
        float: right;
    }

    ul.timeline > li > .timeline-panel:before {
        border-left-width: 0;
        border-right-width: 15px;
        left: -15px;
        right: auto;
    }

    ul.timeline > li > .timeline-panel:after {
        border-left-width: 0;
        border-right-width: 14px;
        left: -14px;
        right: auto;
    }
}

@media screen and (max-width: 500px) {
    .timeline > li > .timeline-panel:before, .timeline > li > .timeline-panel:after {
        border-top: 14px solid transparent;
        border-left: 14px solid #cdd;
        border-right: 0 solid #cdd;
        border-bottom: 14px solid transparent;
    }

    .timeline-panel {
        max-width: 270px;
    }
}
</style>