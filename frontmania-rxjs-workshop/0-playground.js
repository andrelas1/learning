const {from, Observable, interval, pipe} = require("rxjs");
const {} = require("rxjs/operators");


// observables are objects with subscribe function
// observers are objects with 3 callbacks - next, error, complete (or data, error and done)
// observable grammar: (next)* (error|complete){0,1}


/*
 Operators
    OBS
cb1 cb2 cb3
 */

function subscribe(dataCb, errorCb, doneCb) {
    // implementation: Logic here to know when to call dataCt, errorCb and doneCb
} // RXJS IS THIS

/* Factories */
// from -> just abstracts the implementation of the subscribe function to whatever was passed to it
// interval -> abstracts the implementation  of the subscribe function to the setInterval function
// fromEvent -> abstracts the implementation of the subscribe function to Node/Dom events
// bindNodeCallback -> factory of a factory

/* operators */
// receive an input as observable and return an observable

/* Grammar */
// Observable.create -> enforces the RXJS grammar and creates an observable

/* example of factories */
function fromArray() {
    return new Observable(function (observer) {
        try {
            // loop and log the values
        } catch (e) {
            // handle error
        }
    })
}

// const observable = fromArray(arr);

// observable.subscribe(observer);


function tap(f) {
    return function operator(input$) {
        return new Observable(observer => {
            input$.subscribe(val => {
                f(val);
                observer.next(val);
            })
        })
    }
}

function map(f) {
    return function operator(input$) {
        return new Observable(observer => {
            input$.subscribe(val => {
                observer.next(f(val));
            })
        })
    }
}

function operator(cb) {
    return ($input) => new Observable(observer => {
        input$.subscribe(cb(observer, val));
    });
};

function filter(f) {
    return function operator(input$) {
        return new Observable(observer => {
            input$.subscribe(val => {
                if (f(val)) {
                    observer.next(val);
                }
            });
        });
    }
}

function concat(f) {
    return operator(f);
}

const a = from([1, 2, 3, 4]).pipe(
    tap(x => console.log(x)),
    map(x => x * 2),
    filter(x => x === 2)
);
a.subscribe(val => {
    console.log('VAL', val);
});

