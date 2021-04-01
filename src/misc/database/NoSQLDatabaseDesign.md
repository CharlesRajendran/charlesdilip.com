# Designing a NoSQL Database

:::warning Introduction
You have to understand your domain and scenario and design accordingly, enforece constrain on domain driven basis.
:::

## Modeling Related Data

When it comes to modelling data, we can choose two ways,
- Embedded - Have the detail it self to the document
- Referenced - Have a different document and have the reference to the document

Both have it's own pros and cons, so let's see when to use what,

## When to use embedded?
- If the data is queried to gether offen by the user, for example, let's say you have a product catelog along with the name manufacture will be queried often so those needs to be stored in the same place for one fetch data, otherwise we need to write queries which will involve joins and filtering which are very expensive.
  
-  Dependant enties to gether, in sql parent child relationship items. for example in order table, order line will be child so we can put those in the same document.
  
- 1 - 1 relationship or 1 to few (if we know the amount of posible options)
  
- Volalility - if you have some data that will never change, then embed,  Employee table, college field will not change often so better to keep it in the same employee document.

## When to use referencing?
- 1 to many relationship, post document and comments will be a better example here.

- many to many relationships

- data changes quick, for example, reviews, likes and etc. so move these kind of data to the specific document.

- If the entity is used in so many places, otherwise if something changes then we have to modify many things.

::: danger Notes
Usually referencing is better when there is lots of writes to an entity, on the other hand embedding is better when you have lots of read and performance is a big factor.
:::

## Combining embedded + reference 

Practically we will not use only one approach, we will use both approaches in combination.

- We can have most frequenty used, less frequently changing items in the main document
  
- can have some parts of the content in the main document and rest in the reference specific document, for example,
  - We can have few text of the comment in the main document with a link to view the full comment
  
- Can have a summary in the main document and in detail in the referenced document. 
  - for example, we can have the overall rating, number of reviews kind of things in the main document and in detail review on how many 5 stars in the reference document.

## Normalization and Denormalization

::: warning In SQL Databases
In sql databases, normalization is an important concept and almost all the time developers expected to consider all the normalization rules while designing the database. But in NoSQL, sometimes it's optimal to not to normalise.
:::

### When denormalization is good?

- Denormalization is really useful, when we need to use some information in the entity quite often, for example, 
  - Let's say a blog database, which has an author field, which links to the author record in another document, and we might need to fetch the author's first name in almost all the cases, therefore along with the id we can have some more information (only the most frequently used information) about the user in the blog document.

## Homogeneous Data vs Hetrogeneous Data

::: warning In SQL
In sql we will have individual table for each entity, this can be done in document databases aswell, this is known as homogeneous database
:::

### How to use hetrogeneous database to better read performance?

In nosql we can have just one collection for more than on entity, this can be differentiated with an additional attribute like for instance `type`.
```json
{
    "records": [
        {
            "type": "student",
            ...
        },
        {
            "type": "teacher",
            ...
        },
        {
            "type": "courses",
            ...
        }
    ]
}
```

So, in this case we can reduce joining of collections, which saves us considerable amount of time.

## Some Extra Tips on Usecases

::: tip Simple Title Keyword Search Trick
If we want to find keyword search, may be in title, what we will use is string matching with wildcards, this is somewhat expensive, a simple trick is we can have a another attribute which holds the array of words of the title (**since nosql is strict schema free**). then we can do array contains to find the match title, which is considerably fast.

```json
    {
        "posts": [
            {
                "title": "My First Post",
                "content": "...",
                ...,
                ...,
                "keyword": ["My", "First", "Post"] 
            }
        ]
    }
```
:::

<br>

::: tip Real Time Data from IOT Devices can be optimized with aggregation per time period

IOT Devices may emit events on timely manner, may be every second or minute or etc, let's say you need to capture some data every minute, then if we create separate documents for each time then it will be lot of repeated data (device name, and other stuff that will not change), so what we can do is, we can have only one documents for may be every 60 minute aggregate changing stuff inside one document.

```json
{
    "records" : [
        {
            "devicename":"....",
            "manufacturer":"...",
            ...
            "reading": [
                { "minute1": "...." },
                ...
                { "minute59" : "...."}
            ]
        }
    ]
}
```
:::




