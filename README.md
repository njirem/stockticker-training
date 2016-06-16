# Observable Operators Exercise
This project is an exercise in using operators on Observables. 
To make things interesting the Observable in question will be served from a WebSocket.

There are two components to this project. The Server and the Client. 
The Server is already done and doesn't need any extra effort to work.
The client however is broken and you will need to fix it!

When finished, this code will display a page with a graph of the stock prices and a regularly updating price next to it (with some fancy effects).

## Setup
First we have to get everything to work.

### Server
Open a command window in the `server` folder and type these commands:

* `npm install` 
* `npm start`

Et voilá. It is doing it's thing.. No need to worry about that anymore. :-)

### Client
Open a command window in the `client` folder and type these commands:

* `npm install`
* `npm start`

And also this Server is running and should even have started your Browser.
To keep this lightweight, it isn't a live reload server, so you will have to refresh once in a while.
The client will have to get fixed to work properly though..

## Fixing the client
Below are all the steps to fixing the client.
_Don't forget to refresh the page after every attempt to see your work in action._

### Get the Price
The `price$` variable should emit the prices as JavaScript numbers.
But the incoming data in `connection` has the interface:

```typescript
interface Message {
    price: number
}
```

If you have done this correctly, you should already see something.
The Graph looks ok, but the ticker doesn't.

### Slow down the ticker
For the `throttledPrice$` Observable is shown to the right and looks really jumpy right now.
We only want to show an update every 2 seconds or so.

Way more readable this way, isn't it?

### Fix the Delta
Ok, but the Delta isn't really a Delta, is it? It just states the price.
So what do we want here?

We want to buffer the last two items every time.
And after that we want to subtract the previous item from the current item.

_And if you are a perfectionist, you might want to filter out the 0 values from the Delta's_

Well, that's it, isn't it? But what if the connection fails?

### Connection Lost?
Stop the WebSocket Server. What do you see? A frozen application. That's no fun!

Let's replace the value with a "connection lost" message.
Luckily we have a function for that, called: `connectionLost`.
Make sure the connection always calls this on an error.

### Retry
But if you start the server again. 
Nothing happens, you have to refresh the page manually. 

Manually! That's not how we were raised.

So, lets make connection retry itself.

#### But first!
The webSocket constructor doens't work properly yet.
It can only be used once. Even after completion or error, it won't reset.
To fix this we have to wrap it in like in a `defer()`,
like this `Rx.Observable.defer(() => Rx.Observable.webSocket(...))`.

This will create a new WebSocket connection on each subscribe.
But since we subscribe three times. And only want one connection.
We also have to `share()` the Observable.

#### Back on track
Ok, now we are ready to retry this.

Does it work?
And are you proud? :-)