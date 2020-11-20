//Json Object
var data = [{
        time: '2020-09-16',
        body: [{
                tag: 'img',
                attr: {
                    src: 'images/experience/safra.jpg',
                    width: '100px',
                    cssclass: 'img-responsive'
                }
            },
            {
                tag: 'h5',
                content: 'BANCO SAFRA'
            }, {
                tag: 'h6',
                content: 'SYSTEMS ANALYST'
            },
            {
                tag: 'p',
                content: 'Collaborate in the development of the data platform, including data governance'
            }
        ]
    },
    {
        time: '2017-05-16',
        body: [{
                tag: 'img',
                attr: {
                    src: 'images/experience/everis.jpg',
                    width: '100px',
                    cssclass: 'img-responsive'
                }
            },
            {
                tag: 'h5',
                content: 'EVERIS BRASIL'
            }, {
                tag: 'h6',
                content: 'DEVELOPER'
            },
            {
                tag: 'b',
                content: 'Data Engineering:'
            },
            {
                tag: 'p',
                content: 'Development of the decentralization platform of ingestions and data handling at the Santander company, designing and thinking about the platform architecture, development of flows data for the use of Squads that wish to enter data in Big Data in an automated way.'
            },
            {
                tag: 'b',
                content: 'Architecture:'
            },
            {
                tag: 'p',
                content: 'Development on the Big Data platform in the company Santander, project where I worked developing architectural products for data use, whether ingestion, consumption, data handling, that is, technologies to facilitate the usability of users with the Big Data platform, task automation tools, collector configurations, among others other tasks.'
            }
        ]
    },
    {
        time: '2016-04-04',
        body: [{
                tag: 'img',
                attr: {
                    src: 'images/experience/ibm.png',
                    width: '100px',
                    cssclass: 'img-responsive'
                }
            },
            {
                tag: 'h5',
                content: 'IBM BRASIL'
            }, {
                tag: 'h6',
                content: 'SYSTEMS SPECIALIST'
            },
            {
                tag: 'p',
                content: 'Development on the Big Data platform at Produban Brasil, from Santander Group, a project where I worked developing collectors, technologies to facilitate the usability of users the platform, tools of task automation, collector configurations, among other tasks.'
            }
        ]
    },
    {
        time: '2012-06-18',
        body: [{
                tag: 'img',
                attr: {
                    src: 'images/experience/tecnoplast.png',
                    width: '100px',
                    cssclass: 'img-responsive'
                }
            },
            {
                tag: 'h5',
                content: 'TECNOPLAST INDÚSTRIA E COMÉRCIO LTDA'
            }, {
                tag: 'h6',
                content: 'TECHNICAL SUPPORT ANALYST'
            },
            {
                tag: 'p',
                content: 'Responsible for User Support, maintenance on servers, maintenance on Oracle and SQL server databases, network and computer maintenance, ERP support (LOGIX - TOTVS) Creation and Maintenance of the website and Intranet systems.'
            }
        ]
    }
];

$(document).ready(function() {

    $("#myTimeline").albeTimeline(data);

});