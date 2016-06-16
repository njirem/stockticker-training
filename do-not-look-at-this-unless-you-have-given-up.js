let connection = Rx.Observable.defer(() => Rx.Observable.webSocket('ws://localhost:9000'))
    .do(null, connectionLost)
    .retry()
    .share();

let price$ = connection.pluck('price');

let throttledPrice$ = price$.throttleTime(2000);

let throttledDelta$ = throttledPrice$
    .bufferCount(2, 1)
    .map(([previous, current]) => current - previous)
    .filter(delta => delta !== 0);

price$.subscribe(addPointToChart);
throttledPrice$.subscribe(updatePrice);
throttledDelta$.subscribe(showFloatingDelta);
