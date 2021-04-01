# Text classification using the Bag Of Words Approach

::: warning Introduction
Text Classification is an important area in machine learning, there are wide range of applications that depends on text classification. Let's take some examples.

1. Spam Filtering: This is a very matured field in text classification, filtering which email to show in the inbox and which email to put in the spam.

2. Sentiment Analysis: This is a classification task which will classify people's opinion expressed in a piece of text.

3. Intention Mining: Finding the future decision of a person based on the text.

These are some sub areas in the field of Text Classification, but there are much more use cases than these.

Machine Learning algorithms work very well with numbers, but when it comes to text, we have to do some preprocessing to make our model predict well. Let's see about these steps practically with a SMS spam filtering program.
:::

## Step 1 : Import the data.

```python
import pandas as pd
dataset = pd.read_csv('data.csv', encoding='ISO-8859-1');
```

In this example I have used a dataset from [kaggle](https://www.kaggle.com/uciml/sms-spam-collection-dataset) and imported it using a popular python library for data analysis called [pandas](https://pandas.pydata.org/). Pandas will allow us to import the data in csv and stored it into a pandas specific data structure called Data Frame. Data in data frames can be easily access, and we can perform many operations with it as well.

If you see **read_csv** function, we have passed a parameter for encoding, this is because our data set contain certain character that are not supported by the default codec of pandas **read_csv** function. Because in sms we might send emoji, non english words and etc. To know more about [encoding in python](https://docs.python.org/3/library/codecs.html#standard-encodings).

## Step 2: Preprocessing the data.

This is a very important step in text classification since machine learning algorithms are not very good at working with text comparing to numbers. So we have to remove every unwanted stuff in the text before putting the data in to the model. Let's talk about some common preprocessing steps we can do to the text.

### a. Remove none alphabetic characters.

In text classification we use words as the features, so it's important to remove unwanted characters such as numbers and punctuation marks. (emoji will represent some meaning specially when it comes to sentiment analysis, but for the scope of this article I will remove those as well. )

```python
import re
sms = re.sub('[^A-Za-z]', ' ', sms)
```

Let's come to the code, to remove the none alphabetic characters I used regular expression module of python. The sub method will take three parameters.

- Pattern - The above pattern says any character other than A-Z and a-z.
  
- Replacement - Any character matched with the above pattern will be replaced by the value in second parameter.
  
- Content

### b. Make the word lower case

Otherwise 'Go' and 'go' will be treated as two different words. Also later on we will remove stop words from the text, words in the stop word list are in lowercase so checking the existence of the word in that list is easy.

```python
sms = sms.lower()
```

### c. Remove the stop words

Stop words in text classification are words that doesn't have any impact on deciding the class of the text. For example words like the, we, a, will and etc.

Let's come to the code again, our approach to remove stop words is, we compare each word in sms against the stop word list, if the word exist in the list of stop word then we ignore those.

First we need to split the words in the sms, for this I have used a tokenizer available in the nltk library.

```python
import nltk

nltk.download('punkt')
from nltk.tokenize import word_tokenize

tokenized_sms = word_tokenize(sms)
```

Let's go through the code.

**nltk.download('punkt'):** There are number of datasets available in nltk, such as movie review data, names data and etc. The punkt dataset is one of the them and it's required to train the tokenizers in nltk.

**word_tokenize:** This tokenizer will tokenize the text, and create a list of words.

Since we got the list of words, it's time to remove the stop words in the list words.

```python
nltk.download('stopwords')
from nltk.corpus import stopwords 

for word in tokenized_sms:
    if word in stopwords.words('english'):
        tokenized_sms.remove(word)
```

### d. Stemming

Stemming is the process of finding the base word. Let's take an example, the base word for words runnable, running is run. This is very important, because in bag of word model the words appeared more frequently are used as the features for the classifier, therefore we have to remove such variations of the same word.

For stemming, again we going to use a model in nltk called **PorterStemmer**.

```python
from nltk.stem.porter import PorterStemmer
stemmer = PorterStemmer()

for i in range(len(tokenized_sms)):
    tokenized_sms[i] = stemmer.stem(tokenized_sms[i])
```

### e. Spell correction

Mostly SMS text will not have the correct spellings. So using a spell correction will be handy. For spell correction I have used a python library called [auto correct](https://github.com/phatpiglet/autocorrect).

```python
from autocorrect import spell
tokenized_sms[i] = stemmer.stem(spell(tokenized_sms[i]))
```

After all these preprocessing work, we can create the text with the list of words in the tokenized_sms list.

```python
sms_text = " ".join(tokenized_sms)
```

Here I have used these preprocessing to one sms, we have to do the same thing to all the sms in the dataset.

## Step 3: Create the model and train.

As I said before, in this article I am going to use the bag of word approach to classify. So let's understand the bag of word model.

<br>

![](https://media.licdn.com/dms/image/C5112AQEJ4JgJdu_KJQ/article-inline_image-shrink_1000_1488/0?e=1564012800&v=beta&t=8BoDORyFXQFXkStUxFiL0A8Fnd8ZF8X0Eqw9STobfQ8)

In bag of words approach, we will take all the words in every sms, then count the number of occurrences of each word. After finding the number of occurrences of each word, we will choose certain number of words that appeared more often than other words. Let's say we choose the most frequent 1000 words. Then these 1000 words are the features for our classification problem. Then when it comes to classification, the classifier, will check what are the words in the feature set appeared in the new sms text, and based on that it will decide the class of new sms.

::: tip Example
Let's take an example to understand this more clearly.

- sms 1 : Pay your connection bill of 2000. class - not spam

- sms 2 : Win 20000 by participating in the lottery. class - spam

- sms 3: Win 200 rupees by participating this competition at gamer.com. class - spam

- sms 4: I will come tomorrow. class - not spam

If you see the above example, words like Win, Participate are appeared more times than other words, therefore these are the words that will be selected as features. Also if you notice these words have appeared more when the sms is spam, therefore, if a new sms containing such words, then most probably this sms will be in the spam class. This is how the bag of words model works.
:::

Let's move to the code.

Speaking about bag of words, it seems like, we have tons of work to do, to train the model, like splitting the words in the corpus (dataset), Counting the frequency of words, selecting most frequent words as features. But the good news is, we don't have to worry about this, because sklearn provide us an excellent function called **CountVectorizer**.

```python
# creating the feature matrix 
from sklearn.feature_extraction.text import CountVectorizer
matrix = CountVectorizer(max_features=1000)
X = matrix.fit_transform(data).toarray()
```

As you can see in the above code the **CountVectorizer** method accept many parameters, such as max_features, ngram and so on, but here we are only interested in giving the number of most frequent words to choose as features.

In the above code the **CountVectorizer's fit transform** method will create a matrix, the rows in the matrix are sms and the columns are the feature words, each cell in the matrix will denote the number of times a word appeared in the sms. Such as in the below image.

![](https://media.licdn.com/dms/image/C5112AQG5BoG-N_Rf-g/article-inline_image-shrink_1500_2232/0?e=1564012800&v=beta&t=ZRom1JvkJgQB4M_zG2C5Fco7_xBSHTerg6pL0ZGrQps)

We have the X variable now for the classifier, now we need the y variable, y means the target/class whether it is a spam sms or a none spam sms. This is available in the pandas data frame object which we imported initially. After that we will split the dataset into train and test set.

```python
y = dataset.iloc[:, 0]

# split train and test data
from sklearn.model_selection import train_test_split
X_train, X_test, y_train, y_test = train_test_split(X, y)
```

## Step 4: Use a model for classification and find accuracy.

In this article I have used [Gaussian Naive Bayes](https://scikit-learn.org/stable/modules/naive_bayes.html) Model to predict the class. Naive Bayes is one classification algorithm that work well with text data, so I have used that here, Decision Tree, Random Forest are some other algorithms that work well with text data. Then the rest is quite obvious, predicting the classes for test set and calculating the accuracy by comparing the predicted results with the actual test set result.

```python
# Naive Bayes 
from sklearn.naive_bayes import GaussianNB
classifier = GaussianNB()
classifier.fit(X_train, y_train)

# Predict Class
y_pred = classifier.predict(X_test)

# Accuracy 
from sklearn.metrics import accuracy_score
accuracy = accuracy_score(y_test, y_pred)
```
I have obtained an accuracy of 80% with this classifier, but there are number of different ways we can improve this, such as,

## Improvement Strategies

### Using bigrams or trigrams over unigrams (words)

For the bag of words model here we have used words (unigram) as feature set. This might be a problem in some cases, specially in sentiment analysis. For example "This is not a good movie" is a negative text, but if we select words as features, then it will tokenize the text by words, therefore this might get classified as a positive text since it has the word "good". If it take "not good" as a feature (bigram) then it will classify such cases correctly.    


### Using TF-IDF vectors or Vector Space Model over Count Vectors

[TF-IDF vectors](https://www.quora.com/What-is-a-tf-idf-vector) - TF-IDF score represents the relative importance of a term in the document and the entire corpus. 

::: warning TF/IDF
TF(t) = (No of times term t appears in a document) / (Total no of terms in the document)

IDF(t) = log_e(Total no of documents / no of documents with term t in it)
:::

<br>

![](https://media.licdn.com/dms/image/C5112AQHW0pMPS1ylxw/article-inline_image-shrink_1000_1488/0?e=1564012800&v=beta&t=vZNtJCztPDG8_neJzaU55sGeabFkfcSYIxGRPoXoKXc)


### Vector Space Model/Word Embedding 

It is a way of representing document as vectors. There are pretrained models available for word embedding. Such as [Word2Vec](https://code.google.com/archive/p/word2vec/) and [Glove](https://nlp.stanford.edu/projects/glove/).

![](https://media.licdn.com/dms/image/C5112AQFMHthgn05FDQ/article-inline_image-shrink_1500_2232/0?e=1564012800&v=beta&t=7dB3rP74PnyS59vbrPNmi0JN2iZ9YtfWzIVc9zLGyMM)

That's it, hope you grab some knowledge out of this article 😉.

All my code is available in [Github](https://github.com/CharlesRajendran/TextClassification) and feel free to follow me on Github 😉.