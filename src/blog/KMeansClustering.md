# Unsupervised Machine Learning (KMeans Clustering) with Scikit-Learn

::: warning Introduction
Machine learning can be divided into two main categories, supervised machine learning and unsupervised machine learning. In supervised machine learning, we initially provide the data with it's corresponding label to train the model, with the trained model we can find the label for new data.

But in unsupervised machine learning, we throw the data to the model without any labeling, the model will find patterns in the data. In Unsupervised machine learning we can't find the class of the data, but instead, we can group the data points that are similar, this process is known as clustering. There are number of clustering algorithms, in this article I will talk about **KMeans Clustering**.
:::
<br>

![](https://media.licdn.com/dms/image/C5112AQF7t2SDXqqCyw/article-inline_image-shrink_1500_2232/0?e=1564617600&v=beta&t=FRZW8jDX0q9Z7MSvEameRPMVBreljLL3vkIn9DSOeME)

## How KMeans Clustering work ?

Let's understand this step by step, with the below image

![](https://media.licdn.com/dms/image/C5112AQEou5jBWwd7Yg/article-inline_image-shrink_1500_2232/0?e=1564617600&v=beta&t=A4YEcws1Bw6LjPMW2GcQrFrY-vNcq1VNva6obzxHObU)

**Step (a)** - Unsupervised Initial Data

**Step (b)** - Choose random initial centroids (centroids are the center of the clusters.), In this example we need to separate the data set into two different clusters either red or blue, therefore we have two centroids. 

**Step (c)** - Then the other data points will be marked as either red or blue based on the closest centroid.  

**Step (d)** - After marking the points as red or blue, The coordinate of the centroids will be adjusted. The new coordinates of the centroids will be calculated by the mean value of all the points belonging to the centroid's cluster.

**Step (e)** - After the centroid adjustment, again the other data points in the cluster will be changed based on the closest centroid (As you can see in the (e) image some blue points have changed to red points and vice versa.).

Step (d) and Step (e) will be done iteratively till there is no cluster changes for any points, In other words the centroids will be adjusted till we reach a level where none of the data points will change from one cluster to another (see image (f)). If you still confused see the below gif. 

<br>

<div align="center">
    <img src="https://media.licdn.com/dms/image/C5112AQHoVp89g_kQ7g/article-inline_image-shrink_1000_1488/0?e=1564617600&v=beta&t=Vd-aARpWm6WcVM2gbu-dM63VnexV4-pIo5B4E5LQNCI">
</div>

<br>
Let's do this practically, In this example I am going to use a data set of a grocery shop's daily transaction of a month and I want to find some pattern in the product sales against the products price.

## Step 1 - Import the data and necessary libraries.
```python
import pandas as pd
import matplotlib.pyplot as plt

data = pd.read_csv('Data.csv')
```
<br>

In the above code I have imported the necessary libraries the data. If we look at our data variable, it will look something like this.

<div align="center">
<img src="https://media.licdn.com/dms/image/C5112AQG-P23m0znQqA/article-inline_image-shrink_1000_1488/0?e=1564617600&v=beta&t=gUQ59QKckMvuRV_-n5-44gfNd18WJENRfUmEyVSKdZQ">
</div>

<br>

## Step 2 - Find the optimal number of clusters(K value) for the data. To find the optimal number of clusters, we use a method call elbow method.

### What is Elbow Method?

To find the optimal number of clusters or the so called K-value, we will perform the KMeans algorithm to different number of K-values and calculate the error, (know as **with in cluster sum of square**) plot it into a graph, and finally take decision on how much to choose. 

![](https://media.licdn.com/dms/image/C5112AQGyoS1HN_LvvQ/article-inline_image-shrink_1500_2232/0?e=1564617600&v=beta&t=foW7_AV4Y-GfJ7Tx6fpu78R8ZQ_6Ik90D1874s9C28g)

### What is wcss or with in cluster sum of square? 

It is the sum of square of euclidean distance between the centroid and all the cluster points of that cluster. In simple term it will calculate the distance between centroid and each point belongs to that cluster and add everything together.
<br>

```python
X = data.iloc[:, 1:3]

# use elbow mwthod to find optimal number of clusters
from sklearn.cluster import KMeans

# with in cluster sum of squares
wcss = []
for i in range(1, 11):
    kmeans = KMeans(n_clusters =i, init="k-means++", max_iter=300, n_init=10)
    kmeans.fit(X)
    wcss.append(kmeans.inertia_)

plt.plot(range(1, 11), wcss);
plt.title("Elbow Method")
plt.xlabel("Number of Clusters")
plt.ylabel("WCSS")
plt.show()
```
<br>

In this above code first we choose the fields in the data set that are important, we only need the sold qty and unit price. Then we have chosen different number of clusters (here we test with values from 1 to 10) and applied the KMeans algorithm (ignore the parameters in the function for now) and calculated the wcss (wcss value is obtained with **kmeans.inertia_**). Finally, we plot the wcss values against the cluster number and obtained a graph (above).

So we have the graph, now we need to know how to choose the optimal k-value, actually the wcss value will decrease with the increase of the number of cluster (it will reach zero when the number of cluster is equal to the number of data point, because the centroids and the data point will be in the same place so no error at all) but we will choose the point where the last big difference in wcss happen, here, we can choose either 3 or 4. In this example I will choose 4 clusters. Once you find the optimal number of clusters then you don't need this piece of code in your program, so you can comment this code.

## Step 3 - Cluster the data with chosen k-value.

```python
kmeans = KMeans(n_clusters=4, init="k-means++", max_iter=1000, n_init=10)
y_pred = kmeans.fit_predict(X)
```
<br>

Let's go through the arguments in KMeans,

1. **n_clusters** - Number of clusters

2. **init** - KMeans algorithm have a major issue when it comes to selecting the random initial centroid location. For example in the below image,

![](https://media.licdn.com/dms/image/C5112AQGWrHz6xQ9u-g/article-inline_image-shrink_1000_1488/0?e=1564617600&v=beta&t=qD9BcD-T_CfDSpY4bwhT9AtzSJAFM_2rsVrpjBZZOcY)


The first graph shows the correct clusters, the second graph shows the **initialization trap** I talked about earlier. As you can see in the second graph even though the centroids separate the data points correctly, this is not the correct clusters. To overcome the Initialization Trap the KMeans++ algorithm can be used, to know more about [kmean++](https://en.wikipedia.org/wiki/K-means%2B%2B).

3. **max_iter** - This is to define how many iterations at most we take to adjust the centroids, if we don't limit this, then the centroids adjustment process will be performed over and over again, which might take a very long time.

4. **n_init** - Number of time the k-means algorithm will be run with different centroid seeds. This means our KMean model will test 10 different centroid location and finally among the 10 find the optimal initial location.

Then we have stored the cluster of the records in y_pred variable.

## Step 4 - Visualize the cluster

```python
#plot the scatters
'''
X[y_pred==0] - will list records which belongs to cluster 0
output:
       Qty  UnitPrice
1     1911       3.39
'''

plt.scatter(X[y_pred == 0].iloc[:, 0], X[y_pred == 0].iloc[:, 1], s=5, c="red")
plt.scatter(X[y_pred == 1].iloc[:, 0], X[y_pred == 1].iloc[:, 1], s=5, c="green")
plt.scatter(X[y_pred == 2].iloc[:, 0], X[y_pred == 2].iloc[:, 1], s=5, c="blue")
plt.scatter(X[y_pred == 3].iloc[:, 0], X[y_pred == 3].iloc[:, 1], s=5, c="purple")

# centroids X, Y Coordinates can be get through kmeans.cluster_centers_
plt.scatter(kmeans.cluster_centers_[:, 0], kmeans.cluster_centers_[:, 1], s=100, c="black", marker="*")

# I limit the y value to get rid of the outlier records
plt.ylim([0,20])
plt.xlabel("Sold Quantity")
plt.ylabel("Unit Price")
plt.show()
```
<br>

The final output look like the one below. You can see how the model as grouped the data points into 4 clusters and the stars in the graph indicate the centroid points.

![](https://media.licdn.com/dms/image/C5112AQG4A1LxvJft5g/article-inline_image-shrink_1500_2232/0?e=1564617600&v=beta&t=tq96XJuRjzZvgq1NsnoELH-grGUHkhfZ9gODbj7ys7c)

<br>

That's it 😉.

Note : All my code is available in [Github](https://github.com/CharlesRajendran/K-Means) and feel free to follow me on Github 😉.