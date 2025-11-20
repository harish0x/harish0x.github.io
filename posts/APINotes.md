---
title : APInotes
tags: [study-notes, API]
style: border
color: dark
description: study-notes of API

---


# API design

# common API style

- Tunnel style (SOAP)
- URI Style(CURD)
- Hypermedia style(REST)
- Event-driven
- GraphQL
- gRPC

## 1.Tunnel-Style SOAP(Simple object Access Protocol)

- Expose as RPC-like interface and provides an interface description for binding
- It uses an XML-Centric message format
- Uses **HTTP** as a transport protocol for higher application level

## Protocol Stack (ws - *)

| WS-CDL | Collabration |
| --- | --- |
| WS-BPEC | Business process |
| WSDL,Policy,UDDI,Inspection,Meta data | Description  |
| Security        Reliable Message     Transaction Coordinated  | Quality of Services  |
| SOAP(Logical messaging )                     Other Protocols 
 XML Encoding                                        other services  | Transport and encoding  |

## Tunnel Style:Advantage and Limitation

### Advantage :

- Continues RPC line (Corba,Com/Dcom,etc)
- good *tooling* for Publisher & consumer
- strong governance model for enterprise

### Limitation :

- stack dependencies (all or nothing )
- xml-centric implementation
- ignores **HTTP** features (caching,etc)
- loss in popularity

# 2.URI Style :CURD(Create ,Read,Update,Delete)

- An object or resources -centric API
- URI and query parameter are used to identify  and filter objects
- CURD operation mapped to HTTP methods

## URI Style History

**1992**(HTTP) ——> **1995**(URI’S)——> **1998 (xml)**——> **2001(Json)** 

## protocol stack :

- HTTP protocol -RFC 2616
- URI For identification  - RFC 3986
- MIME for media type - XML,JSON,CSV

### common implementation model :

- Focus on the object / entities
- design public identifiers (URI)
    
    
    ```java
    
    https://{server}/{object}/{id}
    ```
    
- Design query rule
    
    
    ```java
    ?{name}={value}&
    ```
    
- use HTTP methods as operation on entities
- server serialize  internal object
- client use URI to pass object

## URI style advantage and disadvantage :

### Advantage :

- http path & query is “well known “
- object “tooling” is good

### Disadvantage

- URI modeling is not std
- HTTP method set is very small
- may become “chatty”

# 3.Hypermedia style :Rest(Representational State Transfer)

- Expose a task-based interface often incorporate workflow or state machine
- use media to describe link semantic, templates-based input and message structure
- provides it’s own URI’s

 

## Protocol Stacks :

- relative inside the HTTP
    - HTTP
    - X/HTML
- Basic & digest authentication
- IANA
    - media type
    - link relation

## Advantage and Disadvantage

## Advantage :

- Media types can be customized
- Growing body of guidance
- Favour services that will last many years

## Disadvantage:

- Poor “tooling” MSFI web API
- Assumed to be “too hard”
- limited use in public API

# 4.Event Driven style:

- Emphasis on event notification
- Asynchoronous communication ,”Reactive “
    
    
    ## emerging style
    
    - HTTP-Based technologies : webhook,websocket
    - Non-HTTP technologies: apache kaffa,AMQA popular with domain driven design (DDD) ,command query responsibility ,segregation CQRS,Microservices
    

# 5.Graphql and gRPC

- Opensources query langanage for API
- developed by Facebook
- intended for fexiblity of argument

### gRPC

- HTTP2-based protocol
- originated at google
- intended for high scale commnunication