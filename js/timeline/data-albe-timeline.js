var timelineMonths = {
    pt: ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'],
    en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
};

var timelineJobsRaw = [
    {
        id: 'cielo',
        start: '2026-04-06',
        end: null,
        active: true,
        logo: 'images/experience/cielo.png',
        key: 'cielo'
    },
    {
        id: 'safra',
        start: '2020-09-16',
        end: '2026-03-31',
        active: false,
        logo: 'images/experience/safra.png',
        key: 'safra'
    },
    {
        id: 'everis',
        start: '2017-05-16',
        end: '2020-09-14',
        active: false,
        logo: 'images/experience/everis.png',
        key: 'everis',
        blocks: ['engineering', 'architecture']
    },
    {
        id: 'ibm',
        start: '2016-04-04',
        end: '2017-05-14',
        active: false,
        logo: 'images/experience/ibm.png',
        key: 'ibm'
    },
    {
        id: 'tecnoplast',
        start: '2012-07-18',
        end: '2016-04-02',
        active: false,
        logo: 'images/experience/tecnoplast.png',
        key: 'tecnoplast'
    }
];

var currentTimelineLang = 'en';
var openModalJobId = null;

function parseDate(dateStr) {
    var parts = dateStr.split('-');
    return new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
}

function formatDateLabel(date, lang) {
    var months = timelineMonths[lang] || timelineMonths.en;
    return date.getDate() + ' de ' + months[date.getMonth()] + ' de ' + date.getFullYear();
}

function formatDateLabelEn(date) {
    var months = timelineMonths.en;
    return date.getDate() + ' ' + months[date.getMonth()] + ' ' + date.getFullYear();
}

function formatShortDate(dateStr, lang) {
    var date = parseDate(dateStr);
    if (lang === 'pt') {
        return formatDateLabel(date, lang);
    }
    return formatDateLabelEn(date);
}

function addDays(dateStr, days) {
    var date = parseDate(dateStr);
    date.setDate(date.getDate() + days);
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    var d = date.getDate();
    return y + '-' + (m < 10 ? '0' : '') + m + '-' + (d < 10 ? '0' : '') + d;
}

function computeEndDates(jobs) {
    var sorted = jobs.slice().sort(function(a, b) {
        return parseDate(b.start) - parseDate(a.start);
    });

    sorted.forEach(function(job, index) {
        if (job.end) return;
        if (job.active) {
            job.end = null;
            return;
        }
        if (index === 0) {
            var prev = sorted[index + 1];
            if (prev) {
                job.end = addDays(prev.start, -1);
            }
        } else {
            var newer = sorted[index - 1];
            job.end = addDays(newer.start, -1);
        }
    });

    return sorted;
}

function monthsBetween(startDate, endDate) {
    var months = (endDate.getFullYear() - startDate.getFullYear()) * 12;
    months += endDate.getMonth() - startDate.getMonth();
    if (endDate.getDate() < startDate.getDate()) {
        months--;
    }
    return Math.max(months, 0);
}

function formatDuration(totalMonths, lang) {
    var years = Math.floor(totalMonths / 12);
    var months = totalMonths % 12;

    if (lang === 'pt') {
        var parts = [];
        if (years > 0) parts.push(years + (years === 1 ? ' ano' : ' anos'));
        if (months > 0) parts.push(months + (months === 1 ? ' mês' : ' meses'));
        return parts.join(' ') || '0 meses';
    }

    var enParts = [];
    if (years > 0) enParts.push(years + (years === 1 ? ' year' : ' years'));
    if (months > 0) enParts.push(months + (months === 1 ? ' month' : ' months'));
    return enParts.join(' ') || '0 months';
}

function formatPeriod(job, lang) {
    var startLabel = formatShortDate(job.start, lang);
    var endLabel = job.active || !job.end
        ? I18n.t('experience.present')
        : formatShortDate(job.end, lang);
    var endDate = job.active || !job.end ? new Date() : parseDate(job.end);
    var duration = formatDuration(monthsBetween(parseDate(job.start), endDate), lang);
    return startLabel + ' - ' + endLabel + ' · ' + duration;
}

function formatSummaryDuration(years, months, lang) {
    if (lang === 'pt') {
        if (years > 0 && months > 0) {
            return years + (years === 1 ? ' ano' : ' anos') + ' e ' + months + (months === 1 ? ' mês' : ' meses');
        }
        if (years > 0) {
            return years + (years === 1 ? ' ano' : ' anos');
        }
        return months + (months === 1 ? ' mês' : ' meses');
    }

    if (years > 0 && months > 0) {
        return years + (years === 1 ? ' year' : ' years') + ' and ' + months + (months === 1 ? ' month' : ' months');
    }
    if (years > 0) {
        return years + (years === 1 ? ' year' : ' years');
    }
    return months + (months === 1 ? ' month' : ' months');
}

function calcTotalExperience(jobs, lang) {
    if (!jobs.length) return '';
    var sorted = jobs.slice().sort(function(a, b) {
        return parseDate(a.start) - parseDate(b.start);
    });
    var first = sorted[0];
    var totalMonths = monthsBetween(parseDate(first.start), new Date());
    var years = Math.floor(totalMonths / 12);
    var months = totalMonths % 12;
    return I18n.t('experience.totalExperience')
        .replace('{years}', years)
        .replace('{months}', months);
}

function calcExperienceSummary(jobs, lang) {
    if (!jobs.length) return '';

    var sorted = jobs.slice().sort(function(a, b) {
        return parseDate(a.start) - parseDate(b.start);
    });
    var totalMonths = monthsBetween(parseDate(sorted[0].start), new Date());
    var years = Math.floor(totalMonths / 12);
    var months = totalMonths % 12;
    var count = jobs.length;

    var companiesLabel = count === 1
        ? I18n.t('experience.companySingular')
        : I18n.t('experience.companyPlural').replace('{count}', count);

    var duration = formatSummaryDuration(years, months, lang);

    return I18n.t('experience.summary')
        .replace('{companies}', companiesLabel)
        .replace('{duration}', duration);
}

function calcGanttProps(job, careerStart, careerEnd) {
    var start = parseDate(job.start);
    var end = job.active || !job.end ? new Date() : parseDate(job.end);
    var totalMs = careerEnd - careerStart;
    if (totalMs <= 0) return { left: 0, width: 100 };

    var left = ((start - careerStart) / totalMs) * 100;
    var width = ((end - start) / totalMs) * 100;
    left = Math.max(0, Math.min(left, 100));
    width = Math.max(2, Math.min(width, 100 - left));

    return {
        left: left.toFixed(2),
        width: width.toFixed(2)
    };
}

function getJobTranslation(key, field) {
    return I18n.t('timeline.' + key + '.' + field);
}

function getJobDetails(job) {
    var details = {
        company: getJobTranslation(job.key, 'company'),
        role: getJobTranslation(job.key, 'role'),
        description: getJobTranslation(job.key, 'description'),
        blocks: []
    };

    if (job.blocks) {
        job.blocks.forEach(function(blockKey) {
            details.blocks.push({
                title: getJobTranslation(job.key, blockKey),
                text: getJobTranslation(job.key, blockKey + 'Text')
            });
        });
    }

    return details;
}

function buildTimelineJobs(lang) {
    currentTimelineLang = lang;
    return computeEndDates(timelineJobsRaw.map(function(job) {
        return Object.assign({}, job);
    }));
}

function renderExperienceRow(job, lang, careerStart, careerEnd) {
    var details = getJobDetails(job);
    var gantt = calcGanttProps(job, careerStart, careerEnd);
    var barClass = job.active ? 'experience-bar experience-bar--active' : 'experience-bar';
    var badgeHtml = job.active
        ? '<span class="experience-badge">' + I18n.t('experience.active') + '</span>'
        : '';

    return (
        '<button class="experience-row" type="button" data-id="' + job.id + '" aria-label="' + details.company + '">' +
            '<div class="experience-rail"><span class="experience-node' + (job.active ? ' experience-node--active' : '') + '"></span></div>' +
            '<div class="experience-content">' +
                '<div class="experience-header">' +
                    '<img class="experience-logo" src="' + job.logo + '" alt="">' +
                    '<div class="experience-meta">' +
                        '<div class="experience-title-row">' +
                            '<span class="experience-company">' + details.company + '</span>' +
                            badgeHtml +
                        '</div>' +
                        '<p class="experience-period">' + formatPeriod(job, lang) + '</p>' +
                    '</div>' +
                '</div>' +
                '<div class="experience-bar-track">' +
                    '<div class="' + barClass + '" style="left:' + gantt.left + '%;width:' + gantt.width + '%"></div>' +
                '</div>' +
            '</div>' +
        '</button>'
    );
}

function renderModalBody(job, lang) {
    var details = getJobDetails(job);
    var blocksHtml = '';

    if (details.description) {
        blocksHtml += '<p class="timeline-card-text">' + details.description + '</p>';
    }

    details.blocks.forEach(function(block) {
        blocksHtml += '<p class="timeline-card-text"><strong>' + block.title + '</strong> ' + block.text + '</p>';
    });

    return (
        '<div class="experience-modal-card glass-card">' +
            '<img class="timeline-card-logo" src="' + job.logo + '" alt="">' +
            '<h5 class="timeline-card-company">' + details.company + '</h5>' +
            '<h6 class="timeline-card-role">' + details.role + '</h6>' +
            '<p class="experience-modal-period">' + formatPeriod(job, lang) + '</p>' +
            blocksHtml +
        '</div>'
    );
}

function openExperienceModal(id, lang) {
    var jobs = buildTimelineJobs(lang);
    var job = jobs.find(function(j) { return j.id === id; });
    if (!job) return;

    openModalJobId = id;
    var modalBody = document.getElementById('experienceModalBody');
    var modalTitle = document.getElementById('experienceModalTitle');

    if (modalBody) {
        modalBody.innerHTML = renderModalBody(job, lang);
    }
    if (modalTitle) {
        modalTitle.textContent = getJobDetails(job).company;
    }

    $('#experienceModal').modal('show');
}

function bindExperienceModal(lang) {
    var container = document.getElementById('myTimeline');
    if (!container) return;

    container.onclick = function(e) {
        var row = e.target.closest('.experience-row');
        if (row) {
            openExperienceModal(row.getAttribute('data-id'), lang);
        }
    };
}

function renderTimeline(lang) {
    var element = document.getElementById('myTimeline');
    if (!element) return;

    var jobs = buildTimelineJobs(lang);
    var sortedAsc = jobs.slice().sort(function(a, b) {
        return parseDate(a.start) - parseDate(b.start);
    });
    var careerStart = parseDate(sortedAsc[0].start);
    var careerEnd = new Date();

    var rowsHtml = jobs.map(function(job) {
        return renderExperienceRow(job, lang, careerStart, careerEnd);
    }).join('');

    element.innerHTML =
        '<div class="experience-timeline">' +
            '<p class="experience-summary">' + calcExperienceSummary(jobs, lang) + '</p>' +
            '<div class="experience-list">' + rowsHtml + '</div>' +
        '</div>';

    bindExperienceModal(lang);

    if (openModalJobId && $('#experienceModal').hasClass('show')) {
        openExperienceModal(openModalJobId, lang);
    }
}
