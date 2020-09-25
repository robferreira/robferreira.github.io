//Json Object
var listSkill = [{
        name: 'JAVA',
        progress: '95'
    },
    {
        name: 'Apache Nifi',
        progress: '98'
    }, {
        name: 'Apache kafka',
        progress: '70'
    },
    {
        name: 'Elasticsearch',
        progress: '70'
    }, {
        name: 'Jenkins/Cloudbees',
        progress: '75'
    },
    {
        name: 'HDFS',
        progress: '55'
    }, {
        name: 'Apache camel',
        progress: '95'
    },
    {
        name: 'Google Firebase',
        progress: '80'
    }, {
        name: 'Ionic 3',
        progress: '90'
    },
    {
        name: 'Groovy',
        progress: '70'
    }, {
        name: 'jQuery',
        progress: '60'
    },
    {
        name: 'HTML5',
        progress: '60'
    }, {
        name: 'CSS3',
        progress: '60'
    },
    {
        name: 'WordPress',
        progress: '98'
    }, {
        name: 'Angular',
        progress: '98'
    },
    {
        name: 'SEO',
        progress: '30'
    }
];

var element = document.getElementById('mySkills');

listSkill.forEach(function(skill) {
    var name = skill.name;
    var progress = skill.progress;
    el = '<div class="col-md-6 animate-box" ><div class="progress-wrap ftco-animate"><h3>' + name + '</h3><div class="progress"><div class="progress-bar color-1" role="progressbar" aria-valuenow="' + progress + '" aria-valuemin="0" aria-valuemax="100" style="width:' + progress + '%"><span>' + progress + '%</span></div></div></div></div>'
    element.innerHTML += el;
});