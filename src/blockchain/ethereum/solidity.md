# Solidity

::: warning Introduction
- Solidity is an object-oriented, high-level language for implementing smart contracts that runs in the Ethereum Virtual Machine (EVM).

- Solidity is statically typed, supports inheritance, libraries and complex user-defined types among other features.

- [Documentation](https://solidity.readthedocs.io/en/v0.5.3/)

- [Remix IDE](https://remix.ethereum.org/) - A browser based IDE to write and run solidity, It got an editor, a side pane with options like compile, run, debug and etc.

- Solidity files should end with .sol extension
:::

## Compiler Version

In solidity we need to specify the compiler version that we going to use for our program, it is a must, based on the compiler version it might have slide variations in the syntax and language features. 

::: danger Note
This will be the first line of code in the file.
:::

```
pragma solidity ^0.5.8;
```

## Contract

Solidity is a contract oriented language, in simple terms contract is the main component of solidity, which is kind of equal to classes in other object oriented programming language.

```
pragma solidity ^0.5.8;

contract App {
    
}
```


## Variables

### Variable Scope
There are two types of variable scope in solidity,

- State variables - variables that are outside of any functions called state variables, permananty stored, these variables will be persisted in the blockchain
   
- Local variables - variables inside functions, temprory storage.


### Access Modifiers

- public - The Public element can be inherited and can be accessed by external elements. All can access a public element.

- private - The Private element doesn’t get inherited and can't be accessed by external elements. It can be accessed from the current contract instance only

- internal - like protected in other programming languages, The Internal element can be inherited but can’t be accessed by external elements. Only the base contract and derived contract can access internal element.

- external - The External element can’t be inherited but it can be accessed by external elements. Current contract instance can’t access external element, it can be accessed externally only.

### Value Type
- Booleans
- Integers
  - Integers can either unsiged or signed - `uint or int`
  - We can mention the size of int variable aswell - `uint32 or uint8 or int256`
- Bytes and Strings
  - Bytes are used to store a fixed size character set. (the length of bytes is from 1 to 32. )
  - If you want to store more than that, you can use string, which has **dynamic length**.
  - advantage of bytes is, bytes1 to bytes32 use less gas, so they are better to use when you know how long data you have to store.
- Enums
  - way to create user-defined types, it used to assign names to integral constants

### Variable Declaration

Variable declarations are slidely different in solidity comparing to other programming languages.

::: danger Syntax
[type] [access-modifies] [variable-name]
:::

### Examples:

```
pragma solidity ^0.5.8;

contract App {
    string public name;
    uint private age;
    bool private isLoggedIn;
    enum Week { Mon, Tue, Wed, Thur, Fri, Sat, Sun }    
}
```
