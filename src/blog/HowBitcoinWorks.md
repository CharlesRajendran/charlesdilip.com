---
title: How Does Bitcoin Works in Detailed...
type: post
---

# How Does Bitcoin Works in Detailed...

::: warning Introduction
Bitcoin is the first application build on blockchain, so in this article we will be learning about bitcoin and how it works to understand some of the core concepts of blockchain.
:::

## Let's start with some backstory of bitcoin...

Bitcoin, the first and the most popular crypto currency in the market, is came into the picture with a white paper ([Bitcoin: A Peer-to-Peer Electronic Cash System](https://bitcoin.org/bitcoin.pdf)) released in the year of 2008 by an anonymous guy or a group named [Satoshi Nakamoto](https://en.wikipedia.org/wiki/Satoshi_Nakamoto). Then in the year of 2009, it was implemented and open sourced by Satoshi Nakamoto(SN). Till date the person or people behind SN is unknown.

## Explanation with a high level...

![](https://media.licdn.com/dms/image/C5112AQHOtpMcCflHxg/article-inline_image-shrink_400_744/0?e=1564012800&v=beta&t=PYkxcDc94cUlthqSv5_voMe-LD1rSg9JiYCa5nuHPrQ)

We all know that, blockchain is a network of nodes which are managing a shared, replicated ledger (all nodes have a copy of the ledger). First lets see about the structure of the ledger. In a high level, blockchain is a linked list of blocks (similar to the linked list of any programming language).

Let's first discuss about how blockchain works on a high level. What will happen, when a transaction needs to be recorded on a blockchain.

A new transaction will first go to a **unconfirmed transaction pool**, and then, there are people called **miners** (anyone can become a miner, if they have the bitcoin node software) in the blockchain network who will be involved in creating new blocks to the blockchain, which will contain the transactions.

When creating a block, miners will fetch some transactions from the pool and put it into the new block. Many miners will be competing to create a new block to the blockchain, therefore, there will be a puzzle to be solved to choose the miner who will be creating the next block of the chain. This puzzle solving is a compute intensive process which will consume lots of electricity, but at the same time it will make the hackers very hard to tamper the blockchain.

Once the miner creates the block, they will broadcast it to the other nodes in the blockchain network to validate the transactions in the block, and append the block to their local ledger. Once the transactions are validated, the other nodes will also add the block to their local chain and start to compete in the mining process to create the next block. That's it on a high level. Let's discuss some of the concepts in the process in detail below.

<br>

![](https://media.licdn.com/dms/image/C5112AQHs1xYtg1bPcQ/article-inline_image-shrink_400_744/0?e=1564012800&v=beta&t=eam4_ZuQ39BbnmH_PsNgY0rh4RqsLCiuG6Q_Hm-Q0EY)


## What is a Block?

Block is a custom data structure, which holds the transaction information that are happening in the blockchain. It has different information like transaction hash, block hash, timestamp and etc. In bitcoin blockchain, creation of blocks are done by people called miners. In bitcoin blockchain, at an average of every 10 minutes, a new block will be created and added to the blockchain. After creating a valid block, the miner who created the block will get 12.5 bitcoins (as of 2018) as a block reward. This is how new bitcoins are generated.

As I said before, blocks are data structures which holds different information, Let's see about some of those information briefly.

<br>

![](https://media.licdn.com/dms/image/C5112AQFz9L33HH0DzA/article-inline_image-shrink_1000_1488/0?e=1564012800&v=beta&t=vluXqJSWP43XEIaRABn0IuKvDipHHP9-5N3AlzzI7bM)

The above image shows a [block information](https://www.blockchain.com/btc/block/0000000000000000000ebb857fd5389cb27b963c6d4e7852efb5a11ceac62ee8) of the bitcoin network. You could find such information through a [block explorer](https://www.blockchain.com/explorer). Each blockchain have it's own block explorers, where you can inspect the created blocks. In the above image, not all the information are in a [actual block header](https://bitcoin.org/en/developer-reference#block-headers), some of the information above are provided by the explorer. Lets talk about some of the important information in the above image.


**Number of transactions:** Storing the transaction is the main responsibility of blocks. When creating a block, the miner nodes will fetch some transactions from the [mempool](https://www.blockchain.com/btc/unconfirmed-transactions) (unconfirmed transaction pool) and put it into the block, in this case this block contains 1119 transactions.

**Transaction Fees:** When sending a transaction, the sender should pay a transaction fee for the miners, this is what we call the gas price. Gas price will play an important role when fetching transactions from the mempool. Transactions with more gas price will get preference over old transactions and immediately put into the next block. This is a well known issue in the blockchain space, not only with bitcoin, many other popular blockchains also deal with the same issue, such as Ethereum. (we will discuss more about gas price in the coming chapters)

**Height:** Number of blocks created from the genesis block of the chain (Genesis Block is the first block in the blockchain).

**Timestamp:** Time when the block is created.

**Difficulty:** To create a block in the bitcoin blockchain, lots of miners will compete to solve a puzzle, whoever solves it first, will create the block and claim for the block reward (known as proof of work, which we will discuss in detail later). The difficulty of the puzzle is what is shown here. The average block creation time is 10 minutes, but when the computation power ( hash rate ) of the machines participating in mining process gets more and more, then the puzzle solving will take less time, or when the nodes in the network increase then the block needs to be propagated to many nodes, in such cases the time might take more than 10 minutes, therefore the difficulty will be adjusted often. Usually after every 2016 blocks (2 weeks) the difficulty will be adjusted.

**Size:** Size is the amount of data (transaction data) in the block, in bitcoin the block size is 1 MB, so when fetching transactions from the pool, it will fetch till it reach the block limit. This limitation in block is necessary to reduce the DDOS attacks by flooding with transactions.

**Nonce:** As I said before, when creating a block, the miners have to solve a puzzle, the nonce is the answer(something the miner node needs to find in the puzzle).

### Let's come to some of the more important information in the block.......

::: warning Hashing
Before discussing about the other information, let's talk a little about hash functions. In cryptography hashing is an important concept, what hash function will do is, it will map any content into fixed size character string, also unlike encryption, were you can decrypt and get the actual content, hashing is irreversible, also even a small character change will generate a completely different hash.
:::

<br>

![](https://media.licdn.com/dms/image/C5112AQF14VTshA5LBg/article-inline_image-shrink_1500_2232/0?e=1564012800&v=beta&t=f1ziN63p4V9DsEGrxxpWYyPsHkSfBAMPhBN_TkGVOR4)

**Merkle Root:** Inside the block, the transactions will be stored as a tree structure or more precisely as a merkle tree (hash tree). leaf nodes of the tree are the actual transactions. In each above level, couple of below level nodes will be added and a hash of the combination will be generated. Likewise the top node of the tree will hold the combined hash of all the transactions, this top node hash is the merkle root.

<br>

![](https://media.licdn.com/dms/image/C5112AQG4INwpnZQlkA/article-inline_image-shrink_1500_2232/0?e=1564012800&v=beta&t=4PwEYM9w_o84c50_B7MIRR_F_gZb41sQpQKd0gpg2zs)

**Hash:** Hash represent the block hash. Block Hash is generated by hashing (SHA-256 hashing algorithm) the combination of block headers(version, previous block hash, timestamp, merkle root, nbits and finally the nonce).

That's all about blocks, now let's go one step deeper into transactions.

## One step deeper into, Bitcoin Transactions

#### What is cryptography?

Cryptography is a method of storing and transmitting data in a particular form so that only those for whom it is intended can read and process it. ([copied](https://searchsoftwarequality.techtarget.com/definition/cryptography))

#### Why we need cryptography in the first place?

When communicating through some network, there might be people who has an intention of stealing the communication data. Without encryption, if a middle man intercept and get the data, they can see what's in it without any problem. In the case of encrypted data, even if the hacker intercept the connection, they will not be able to understand the data.

<br>

![](https://media.licdn.com/dms/image/C5112AQFecNF_3dDrFA/article-inline_image-shrink_1000_1488/0?e=1564012800&v=beta&t=PTTOCSY3b9ut3KBY4F2X3wEELpQk0ODPqI0MqYXkuQ4)

### There are two types of cryptography...

#### Symmetric/ Secret Key Cryptography

In symmetric key encryption, both parties in the communication will use the same key to encrypt and decrypt the data, but the problem with this encryption type is, if the middle man got the symmetric key then the hacker can get all the information regardless of encryption.

![](https://media.licdn.com/dms/image/C5112AQGjEBjLsW0R6g/article-inline_image-shrink_400_744/0?e=1564012800&v=beta&t=bRYzAr0Ivn1Bb7zQIqOttsU1aozMg15-QjX-x99WVlo)

#### Asymmetric/ Public Key Cryptography

Unlike Symmetric Key Encryption where the encryption and decryption are done by the same key, In Asymmetric cryptography each party in the transaction have two different keys(public key and private key) .

Let's take an example, let's say A and B want to communicate with each other, when A sends something to B, then A will encrypt the data with B's public key (public keys can be obtained by anyone, just like a email address) and sends it to B. On the other side, B can decrypt the data with their private key (Private key is something that should not be shared with anyone, like a password). Likewise A will also have it's own private and public key. When B want to send something to A, it will use A's public key and A will decrypt B's message with A's private key.

::: danger Note
Public key and private keys are generated using some mathematical algorithms ([RSA](https://en.wikipedia.org/wiki/RSA_(cryptosystem))).
:::

<br>

![](https://media.licdn.com/dms/image/C5112AQHNEVDZ3b5kwQ/article-inline_image-shrink_400_744/0?e=1564012800&v=beta&t=uxRXxTyuvc-v0UsH-5S5VXu6AUa9dyoYHelCikCYtV8)

In bitcoin, once you install the wallet, you can create accounts with it. Each account will have two keys (a private key and a public key) associated with it. Since the transactions are send and received using these keys, your identity will be kept private.

### Let's understand a transaction with an [actual bitcoin transaction](https://www.blockchain.com/btc/tx/d6a9c7638cc18ab04c6f7bceff0923f3938c8e6f3a542301dbc94f3635974207)...

Bitcoin transactions work slightly different from our day to day transactions. In bitcoin, transactions are interconnected in a way that you can track how the digital assets move between one account to another account.

If you think about transactions, mostly transactions might be between one sender to one receiver, but if you see the above example or most of the transactions in the block explorer, you could see that the transactions have multiple input addresses and multiple output addresses. Let's see why is that.

First of all in bitcoin, we don't have an attribute like balance. Your wallet only keep records of all your transactions, but you might see something like balance in your wallet software, this is actually addition of multiple UTXO's.

### So what is UTXO?

UTXO stands for unspent transaction outputs. When you receive bitcoins from someone, and if you didn't spent it, then those bitcoins(transaction outputs) are known as UTXO, then you can use those transaction outputs as transaction inputs when you want to sent bitcoins to some others.

Imagine a scenario where Alice wants to send 8 bitcoins to bob. Let's say before this transaction, Alice have received 20 Bitcoins from her mother, 10 Bitcoins from her father and 5 bitcoins from her brother, which makes her to own 35 bitcoins. All these three transactions gave Alice 3 different UTXOs which she can used as inputs for other transactions.

When Alice want to send bitcoins to bob, the bitcoin wallet will use the UTXOs of Alice. Here Alice want to send 8 bitcoin's to bob and one of the transaction output contains 10 bitcoins, so the wallet software will use that transaction output to send bitcoins to bob, then bob can used it as input for sending bitcoin's to some other, but one thing to note is the remaining two bitcoins, it will be send back to Alice's account as another new transaction.

<br>

![](https://media.licdn.com/dms/image/C5112AQG7iZV4z825Rw/article-inline_image-shrink_400_744/0?e=1564012800&v=beta&t=AfeLh4XVySQu4u2b9L9MUDcJfCR-xmL4lKm0vsq6Zhk)

<br>

![](https://media.licdn.com/dms/image/C5112AQFFCzPkWawmuQ/article-inline_image-shrink_1000_1488/0?e=1564012800&v=beta&t=kRZ2cCQFwxT7agOHWz0Qar2Gp6gwZJCJjHyjw76meNQ)

### Let's come to the [transaction](https://www.blockchain.com/btc/tx/d6a9c7638cc18ab04c6f7bceff0923f3938c8e6f3a542301dbc94f3635974207) in the image,

**Transaction Hash(TxID):** Transaction hash is the hashed content of a serialized transaction. A transaction contains lot of [details](https://en.bitcoin.it/wiki/Transaction#General_format_of_a_Bitcoin_transaction_.28inside_a_block.29), when generating the hash of the transaction, node will serialize all the data other than witness and perform SHA256 hash function to that serialized information.

**Inputs:** These are references to UTXO's of sender which are used in the transaction by the sender.

**Outputs:** Transaction outputs, outputs can be transactions of bitcoins from sender to receiver and transaction of returning the balance back to the sender.

When sending bitcoins, the sender is actually transferring the ownership of those bitcoins to the receiver, passing the ownership can be done with public and private key. When sending bitcoins, the current owner (sender) will lock the bitcoins with the next owner's (receiver's) public key. This locked bitcoins can only be unlocked with the receivers private key.

**Total Input:** Value of bitcoins in the input scripts

**Total Output:** Value of bitcoins in the output scripts

**Fees:** If you compare the Total Input and Total Output, those two are not same, the difference is the transaction fees that sender spent to the miner who create the block which contains this transaction.

**Confirmations:** A transaction is valid only when it gets enough confirmations, the default amount of confirmation required for a transaction is six, six confirmations means, it need to have six blocks created after the block which contain this transaction. [To know more...](https://www.buybitcoinworldwide.com/confirmations/)

::: danger Genesis Transactions 
Other than the normal transactions, there is another special type of transaction called Genesis Transaction for each block. This is the transaction of, miner getting the block reward. This transaction will not have a sender.
:::

## What is Mining then? 

Mining is the process of creating new blocks to the blockchain. Mining is the main reason why blockchain is so secure and hard to tamper, also new coins to the network is generated with mining in the form of block reward.

So how a block is created in the blockchain? We have already discussed about this in a high level above, in that we have talked about solving a puzzle to choose the miner. So what is this puzzle?

### Proof-of-Work

In the block level we talked about something call difficulty, in the above block information image, the difficulty was given in a human readable decimal format (7,019,199,231,177.17), this can also be represented in a hash format which will look something like this, 0x000000000...............(a hash with some number of leading zeros). In the mining process the miner needs to generate a hash for the block which will have a value lesser than the difficulty value, which means, we need to generate a hash, which going to have at least as much as leading zero's of the difficulty.

We already know when creating a block hash, we will take information in the block header and hash it to produce the block hash. It's not easy to get the required hash straightaway, so we will change the header information and hash it again and again till we get the required hash of the block. In the header, other than the nonce every thing else is fixed. Therefore we will apply different values for the nonce and hash the header information, until we find the real answer we are looking for. This value can be get mostly by brute forcing, therefore the person with the most computational power can generate more hashes (hash rate), and gave more chance of finding optimal nonce value or what we call **Proof of work**.

<br>

![](/images/pow.gif)

<br>

![](https://www.asynclabs.co/blog/wp-content/uploads/2018/07/proof-of-work-right-result-2.png)

Then if a miner finds the nonce, he will create the block and broad cast it to other nodes in the network, each node will check the transactions in the block for double spending, if the transactions are valid, then they will add the block to their own local ledger.

<br>

![](https://media.licdn.com/dms/image/C5112AQE5rNwSCnWOlg/article-inline_image-shrink_1500_2232/0?e=1564012800&v=beta&t=BNN5-8XTtQFWeHGtoUdY-bfkp07mCHQbQMh2F6NN-TI)

### Longest Chain Rule

When creating a block, there might be possibilities where more than one miner creating the next block. In such situations some nodes in the network might have the first miners block and some nodes might have the second miners block. At that point, there will be more than one candidate blocks will be available in the network, those blocks will wait for the next block to attach to it, which ever block gets the next block first will be kept and other candidate blocks (**Orphaned blocks**) will be detached from the blockchain.

<br>

![](https://media.licdn.com/dms/image/C5112AQHGcMkMeU5BsQ/article-inline_image-shrink_1000_1488/0?e=1564012800&v=beta&t=BDwKRP0DkrHOcXwHc2le6A7wQcNCNhJPOb8pzt6RdNI)

#### Why tampering blockchain is really hard?

When some one tamper a block, then the hash of the block will be changed, which will make all the succeeding blocks invalid, therefore the attacker needs to mine all the blocks again, but we know with the proof of work mechanism it is not easy to mine quickly, and also with longest chain rule the miners chain will be shorter than the real blockchain, that's why tampering blockchain is almost impossible right now.

<br>

![](https://media.licdn.com/dms/image/C5112AQEF6P-M0uUaPw/article-inline_image-shrink_400_744/0?e=1564012800&v=beta&t=lBtZfV9hesr8LEA1V8ZD0DZifbmwR2Ozc7_zxgCZytA)

## Some interesting facts about bitcoin...

::: tip Max No of Bitcoins
Total supply of bitcoin is 21 Million, and so far people have mined 16.7 Million bitcoins (As of Jan 2018).
:::

::: tip Mining Rewards
Block rewards will be reduced by half every four years, initially the block reward is 50 bitcoins, and in 2018, the block reward is 12.5 bitcoins, from 2020, the block reward will be 6.25 bitcoins.
:::

::: tip Final Bitcoin
Even though the remaining bitcoins to mine is just 4.3 Million, it is estimated that the last bitcoin will be mined in the year of 2140.
:::


::: tip Satoshi Fact
Satoshi Nakamoto, the creator of bitcoin is estimated to own 980,000 bitcoins.

Many people believe SN is [Nick Szabo](https://en.wikipedia.org/wiki/Nick_Szabo) (NS, reverse of SN), but in the white paper, they have mentioned **we** in many places, so it might be a group of people who represent SN.
:::

::: tip Mining pools
We can mine bitcoin with our own dedicated machines and earn the block reward, but with the scale of bitcoin, it is really hard to be the first one to solve the puzzle and create the block. [Mining pools](https://www.buybitcoinworldwide.com/mining/pools/) are group of people share their resource and work together to create blocks, so with lots of computation (hash rate), the possibility of finding the block nonce is high, but the problem is, the reward will be shared. [BTC.com](https://btc.com/), [SlushPool](https://slushpool.com/home/) are some examples.
:::

::: tip Bitcoin Scripts 
[Bitcoin script](https://en.bitcoin.it/wiki/Script) is a stack based scripting language. Input script and Output scripts in transactions are actually scripts written in this language. This is not a turing complete language, since it doesn't have loops for security purpose. If you are interested in knowing more about bitcoin scripts, [check this one](https://www.youtube.com/watch?v=6Fa04MnURhw).
:::

<br>

That's it for this article, in the next article I will jump in to Ethereum and Blockchain development. That's it guys, cheers 😉.