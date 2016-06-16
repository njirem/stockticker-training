let connection = Rx.Observable.webSocket('ws://localhost:9000');

let price$ = connection;

let throttledPrice$ = price$;

let throttledDelta$ = throttledPrice$;

price$.subscribe(addPointToChart);
throttledPrice$.subscribe(updatePrice);
throttledDelta$.subscribe(showFloatingDelta);
