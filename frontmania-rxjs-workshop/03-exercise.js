const fs = require("fs");
const {bindNodeCallback, from} = require("rxjs");
const {pipe, map, flatMap} = require("rxjs/operators");

/**
 * Exercise: choose either Easy version or the Hard version of the
 * function "listAllFiles" and convert it (the internals of the function)
 * from callbacks to Observables.
 *
 * It's okay to use only methods that you have learned so far.
 */

// const readdirAs$ = bindNodeCallback(fs.readdir);
// console.log('READIR', readdirAs$('./'));
// const observable = readdirAs$('./');
// observable.subscribe(val => console.log('VAL', val));

// const observable = readdirAs$('./');

function listAllFiles_Easy2(outputFile) {
    const readdir$ = bindNodeCallback(fs.readdir);
    const files$ = readdir$('./');
    const filenames$ = files$.pipe(
        flatMap(arr => from(arr)),
        tap(filename => console.log(filename))
    );
    return filenames$;
}

function listAllFiles_Easy1(outputFile, cb) {
    const readdirAs$ = bindNodeCallback(fs.readdir);
    const observable = readdirAs$('./');
    observable.subscribe({
        next: files => {
            const a = from(files);
            a.subscribe(val1 => {
                console.log(val1)
            });
        },
        error: cb,
        complete: () => {
            cb(null)
        }
    });
}

function listAllFiles_Easy(outputFile, cb) {
    fs.readdir("./", (err1, files) => {
        if (err1) {
            cb(err1);
        } else {
            files.forEach(filename => {
                console.log(filename);
            });
            cb(null);
        }
    });
}

function listAllFiles_Hard1(outputFile, cb) {
    const unlinkFactory$ = bindNodeCallback(fs.unlink);
    const readdirFactory$ = bindNodeCallback(fs.readdir);
    const appendFactory$ = bindNodeCallback(fs.appendFile);

    const unlink$ = unlinkFactory$(outputFile);
    const readdir$ = readdirFactory$('./');
    const appendFile$ = appendFactory$(outputFile);

    unlink$.subscribe({
        next: () => {
        }
    })

    unlink$.subscribe(val => {
    });
    fs.unlink(outputFile, err1 => {
        fs.readdir("./", (err2, files) => {
            if (err2) {
                cb(err2);
            } else {
                let appended = 0;
                files.forEach(filename => {
                    fs.appendFile(
                        outputFile,
                        filename + "\n",
                        {encoding: "utf-8"},
                        err3 => {
                            if (err3) {
                                cb(err3);
                            } else {
                                appended += 1;
                                if (appended === files.length) {
                                    cb(null);
                                }
                            }
                        }
                    );
                });
            }
        });
    });
}

function listAllFiles_Hard(outputFile, cb) {
    fs.unlink(outputFile, err1 => {
        fs.readdir("./", (err2, files) => {
            if (err2) {
                cb(err2);
            } else {
                let appended = 0;
                files.forEach(filename => {
                    fs.appendFile(
                        outputFile,
                        filename + "\n",
                        {encoding: "utf-8"},
                        err3 => {
                            if (err3) {
                                cb(err3);
                            } else {
                                appended += 1;
                                if (appended === files.length) {
                                    cb(null);
                                }
                            }
                        }
                    );
                });
            }
        });
    });
}

// call listAllFiles_Easy or listAllFiles_Hard
// listAllFiles_Easy1("./03-output.txt", err => {
//     if (err) {
//         console.error("Failed because: " + err);
//         process.exit(1);
//     } else console.log("done");
// });

listAllFiles_Easy2.subscribe({next: val => {
    console.log('RESULT', val);
    }, err: () => {
    if (err) {
        console.error("Failed because: " + err);
        process.exit(1);
    } else console.log("done");
}});
