# Vue 2
![](https://cdn-images-1.medium.com/max/2400/1*-PlqbnwqjqJi_EVmrhmuDQ.jpeg)

## 1. Vue Instances + Data and Methods

```html{2-3}
<div id="vue-scope-area-1">
    <h1>{{message}}</h1>
    <p>{{ greet('Broooo') }}</p>
</div>
```

```js
<script>
    // vue instance will control a area in your page
    new Vue({
        el: "#vue-scope-area-1",
        data: {
            message: "Hello World..."
        },
        methods: {
            greet: function(name) {
                return `${this.message}  ${name}`
            }
        }
    })
</script>
```
<br>

## 2. Property Binding in Vue with v-bind
```html
<a v-bind:href="facebook" :target="target"> Facebook </a>
```

```js
new Vue({
    ...
    data: {
        facebook: "https://www.facebook.com",
        target: "_blank"
    }
})
```
<br>

## 3. innerHTML in vue with v-html
```html
<p v-html="twitterLinkHtml"></p>
```

```js
new Vue({
    ...
    data: {
        ...
        twitterLinkHtml: "<a href='https://twitter.com'> Twitter </a>"
    }
})
```
<br>

## 4. Event Binding in Vue
```html
<div id="vue-scope-area-4">
    <h3>{{ number }}</h3>
    <button v-on:click="increment(10)">+10</button>
    <button @click="decrement(10)">-10</button>
</div>
```

```js
new Vue({
    el: "#vue-scope-area-4",
    data: {
        number: 0
    },
    methods: {
        increment: function(value) {
            this.number += value
        },
        decrement: function(value) {
            this.number -= value
        }
    }
})
```
<br>

## 4.1 Event Modifiers documentation
```html
 <!-- Method execute only once -->
<button @click.once="alertOnce">alert once</button>

<!-- Will prevent the default behaviour, will just alert and not navigate -->
<a @click.prevent="alertOnce" href="https://facebook.com">prevent default</a>
```
<br>

## 4.2 Keyboard Modifiers
```html
<!-- Keyboard Modifiers -->
<input @keydown.tab="tabPressed" placeholder="Test Tab Pressed">
<input @keyup.13="enterPressed" placeholder="Enter Pressed" />

<!-- Multiple Key Combinations -->
<input @keydown.alt.enter="enterPressed" placeholder="Enter with Alt Key" />

<!-- Exact - this will call functions only when you press the exact key or event -->
<input @keydown.65.exact="enterPressed" placeholder="Fire Only when tou just press enter" />
```
<br>

## 5. Two way data binding with v-model
```html{2}
<div>
    <input v-model="message" />
    <h3> {{message}}</h3>
</div>
```

```js
new Vue({
    ...
    data: {
        ...
        message: ""
    }
})
```

<br>

## 6. Computed Properties
```html
<!-- Computed properties will watch for all the contributing data properties -->
<!-- Good when we want to show property update immediately -->
<div>
    <input v-model:value="message" />
    <h2> {{ message }} </h2>
    <h3>{{ reversedMessage }}</h3>
</div>
```

```js{10-14}
// here soon as message was updated, it will change the reverseMessage property
new Vue({
    ...
    data: {
        message: "hiii there"
    },
    methods: {
        ...
    },
    computed: {
        reversedMessage: function() {
            return this.message.split(" ").reverse().join(" ");
        }
    }
})
```
<br>

## 7. Class Binding
```html{2}
<button v-on:click="fill = !fill" > Toggle Fill </button>
<div class="box" v-bind:class="{blackbox: fill, whitebox: !fill}">
    ...
    ...
</div>
```

## 8. Style Binding
```html
<p v-bind:style="{fontWeight:isBold, fontSize: fontSize}"> Is Bold or Not <p>
```
<br>

## 9. Vue Conditionals (v-if, v-else-if, v-else)
```html
<h1 v-if="show == 0">Show Red</h1>
<h1 v-else-if="show == 1">Show Yellow</h1>
<h1 v-else="show == 2">Show Green</h1>
```
<br>

## 9.1 v-show to control the display property of the element
```html
<h1 v-show="show == 0">Show Red</h1>
```
<br>

## 10. Iteration with v-for
```html
<ul>
    <li v-for="founder in founders">
        {{founder.company}} - {{founder.name}}
    </li>
</ul>
```

```js
new Vue({
    ...
    data: {
        ...
        founders: [ 
            {name: "Mark Zuckerberg", company: "Facebook"},
            {name: "Bill Gates", company: "Microsoft"},
            {name: "Jackma", company: "Alibaba"},
            {name: "Jeff Bezos", company: "Amazon"}
        ]
    }
})
```
<br>

##### 10.2 With Index
```html
<li v-for="(founder, index) in founders">
    {{index +1 }}. {{founder.name}} founded {{founder.company}}
</li>
```
<br>

#### Note: If we want to ignore a containing element we can use template tag
```html
<!-- If you want not to have a container div kind of element -->
<template v-for="founder in founders">
    <h3>{{founder.name}}</h3>
    <p>{{founder.company}}</p>
</template>
```
<br>















