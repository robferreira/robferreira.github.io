var typewriterTimer = null;
var typewriterCleanTimer = null;

function write(str, done) {
    var div = document.getElementById('log');
    if (!div) return;
    var char = str.split('').reverse();
    typewriterTimer = setInterval(function() {
        if (!char.length) {
            clearInterval(typewriterTimer);
            return setTimeout(done, 1000);
        }
        var next = char.pop();
        div.innerHTML += next;
    }, 100);
}

function clean(done) {
    var div = document.getElementById('log');
    if (!div) return;
    var char = div.innerHTML;
    var nr = char.length;
    typewriterCleanTimer = setInterval(function() {
        if (nr-- === 0) {
            clearInterval(typewriterCleanTimer);
            return done();
        }
        div.innerHTML = char.slice(0, nr);
    }, 100);
}

function stopTypewriter() {
    if (typewriterTimer) clearInterval(typewriterTimer);
    if (typewriterCleanTimer) clearInterval(typewriterCleanTimer);
    var div = document.getElementById('log');
    if (div) div.innerHTML = '';
}

function startTypewriter(texts) {
    stopTypewriter();
    var atual = -1;

    function next() {
        if (atual < texts.length - 1) atual++;
        else atual = 0;
        var str = texts[atual];
        write(str, function() {
            clean(next);
        });
    }
    next();
}

function restartTypewriter(texts) {
    startTypewriter(texts);
}
