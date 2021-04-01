# Debouncing and Throttling

Throttling and debouncing give us control over the rate at which a function is called. They are especially useful when we are dealing with event handler assignments. There are scenarios where we may invoke functions when it isn’t necessary. Consider a callback that we want to execute on window resize. Does it make sense to fire the callback as we resize? Most likely not. We want to wait til the user has finished interaction and then fire the callback.

## What’s the difference between throttling and debouncing?

### Throttling

Let's start with a analogy being ordering drinks at a bar. You go to a bar and the barman has a policy of only allowing you to order a drink every 45 minutes (Or things get crazy). You order a drink in the first minute and they hand one over. You then try and order one every minute after. The barman denies you until the 45th minute when the then tired barman hands over the next drink. You won’t get another drink for another 45 minutes. With throttling, you may want one last invocation to happen after the throttle is over. This will be one of the denied invocations. Imagine you order a drink in the 15th minute and get denied. In the 45th minute, you don’t order but the barman sends a waiter over with the drink from that 15th minute order. 

### Debouncing 

With debouncing, it’s like “Hey, I’m not going to execute that function until I know there are no more changes inbound”. Imagine ordering food at a restaurant. You start listing off items to the waiter/waitress and at the end they ask “Is that everything?” If it is, they leave you to it and go get your food and drinks. If it isn’t, you add to the order and then they ask you again until they are clear to proceed.


## Example use cases

- Throttling a button click so we can’t spam click
- Throttling an API call
- Throttling a mousemove/touchmove event handler
- Debouncing a resize event handler
- Debouncing a scroll event handler
- Debouncing a save function in an autosave feature (Google Docs)

**Note: Throttling is likely used less than debouncing.**

## Real example for throttling
- For throttling, let’s consider that first use case, stopping click spamming. We have a button in our app that when clicked, makes an API call of some kind. Let’s say to enter a competition. With throttling we can restrict the amount the API would get hit. The user may be clicking 20 times a second but we only fire the handler once per second.

## Real example for debouncing
- For debouncing, let’s consider the auto save feature. Auto save tries to save the state of the application every time the user makes an update or interacts. We can debounce the save until a user hasn’t made any updates or interacted for a set period of time. That way we don’t spam the save function and make unnecessary saves. This will help performance.

## Implementing throttle and debounce
There are various implementations of throttle and debounce. The majority will achieve the same goal. Their implementations revolve around the use of `setTimeout`.

### Debounce implementation

The below example is a real usecase for e-commerce site search bar. We never want to call the server call process for each character press, so we will call the function only when user give some time in between, here it is 400ms.

```js
function search(e) {
  console.log(e.target.value);
}

function debounce(func, delay) {
  let timer;
  return function() {
      const context = this;
      const arg = arguments;
      clearTimeout(timer);
      timer = setTimeout(() => func.apply(context, arg), delay);
  };
}

document.querySelector('input').addEventListener('keypress', debounce(search, 400));
```

### Throttle Implementation



