var div = document.getElementById('log');
var texts = ['Big Data', 'Fast Data'];

function write(str, done) {
    var char = str.split('').reverse();
    var typer = setInterval(function() {
        if (!char.length) {
            clearInterval(typer);
            return setTimeout(done, 1000);
        }
        var next = char.pop();
        div.innerHTML += next;
    }, 100);
}

function clean(done) {
    var char = div.innerHTML;
    var nr = char.length;
    var typer = setInterval(function() {
        if (nr-- == 0) {
            clearInterval(typer);
            return done();
        }
        div.innerHTML = char.slice(0, nr);
    }, 100);
}

function footer(conteudos, el) {
    var atual = -1;

    function next(cb) {
        if (atual < conteudos.length - 1) atual++;
        else atual = 0;
        var str = conteudos[atual];
        write(str, function() {
            clean(next);
        });
    }
    next(next);
}
footer(texts);