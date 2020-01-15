# DBS Technical Exam

This is a project created to fulfill the requirements for DBS.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

What things you need to install the software and how to install them

```
latest version of node.js and npm must be installed
```

### Installing

1. run the command below to get a copy of the project.

```
git clone git@github.com:ianmarquez/DBSTechnicalExam.git
```

2. install required dependencies

```
npm install
```

## Deployment

1. run the command below to start using the project.
```
npm start
```

### Supported Commands

```
C w h               #Should create a new canvas of width w and height h.

L x1 y1 x2 y2       #Should create a new line from (x1,y1) to (x2,y2). Currently only
                    #horizontal or vertical lines are supported. Horizontal and vertical lines
                    #will be drawn using the 'x' character.

R x1 y1 x2 y2       #Should create a new rectangle, whose upper left corner is (x1,y1) and
                    #lower right corner is (x2,y2). Horizontal and vertical lines will be drawn
                    #using the 'x' character.

B x y c             #Should fill the entire area connected to (x,y) with "colour" c. The
                    #behaviour of this is the same as that of the "bucket fill" tool in paint
                    #programs.

Q                   #Should quit the program.

```

## Authors

this project is written by Ian Marquez 
