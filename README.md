# Team7 - <a href="https://docs.google.com/presentation/d/1fXDuaQTFJ4bg_YPg_7X8dFeDI59nn6NiXu4h0UlOCjc/edit#slide=id.g56768d2de0_0_17">The Seven Deadly Sins
</a>

[![Build Status](https://travis-ci.com/ucsd-cse112/team7.svg?token=qBqr7uFuKBZWkbpLiMwe&branch=dev)](https://travis-ci.com/ucsd-cse112/team7)
[![This project is using Percy.io for visual regression testing.](https://percy.io/static/images/percy-badge.svg)](https://percy.io/7-Deadly-Sins/Team7)
[![Maintainability](https://api.codeclimate.com/v1/badges/2c5eb5cea98f2e51d1c2/maintainability)](https://codeclimate.com/repos/5cda76f15edc6166400005f9/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/2c5eb5cea98f2e51d1c2/test_coverage)](https://codeclimate.com/repos/5cda76f15edc6166400005f9/test_coverage)

<img src="pages/index/img/devilbus1.jpg" alt="drawing" width="500"/>

# Common IssuesTODO

# Our Products:
- NPM package of our custom web components (rate, checkbox, upload, comment): **pandoras-box**
  - <a href="https://www.npmjs.com/package/pandoras-box">Follow this link to install</a>
  - Please followhere
- Extensible evaluation web service: **Rateit**
  - <a href="https://ucsd-cse112.github.io/team7/pages/rateit/requestor.html">Try out making a evaluation requestor</a>
  - <a href="https://ucsd-cse112.github.io/team7/pages/rateit/evaluator.html">Try out rating on a subject</a>
  - User guide for Rateit is here


# Repo Overview: 
- **bash_scripts**: The script files run by bash are in this folder, e.g. linting script
Config: Configuration files for wepack are in this folder; no need to touch this folder unless 
- **coverage**: The test coverage are auto-generated into this folder
Docs: The API docs are auto-generated into this folder (which only exist in master branch)
- **manual**: The files to generate the manual documentation are in this folder
- **pages**: All files that have a web page to be displayed goes into this folder; js files are stored in “script” subfolders
  - **element**: Stores all of our web components related files
- **test**: The unit tests run by Karma are in this folder
- **testcafe**: The browser-testing files for testcafe and saucelab are in this folder
- **stories**: The test files for pixel testing are in this folder


# Our Build Pipeline


# Development Process Introduction
We followed the agile lifecycle to develop our products and the build pipeline in the following three sprints: 
1. <a href="https://github.com/ucsd-cse112/team7/tree/master#sprint-0-setup--pipeline-creation--web-compenent"> Sprint 0 </a> <br>
2. <a href="https://github.com/ucsd-cse112/team7/tree/master#sprint-1--porting-web-component"> Sprint 1 </a> <br>
3. <a href="https://github.com/ucsd-cse112/team7/tree/master#sprint-2-more-web-components-npm-package-and-web-service"> Sprint 2 </a> <br>


### Technologies Used:
<img src="https://github.com/ucsd-cse112/team7/blob/master/readmeImg/tools.png" alt="tools" width="700"/>

<a href="https://github.com/typicode/husky"> Husky: </a>  <br>
Style Enforcement: this can enforce our code to be consistent and readable, so that all teammates or the users read the code smoothly.<br>
<a href="https://eslint.org/"> Linting: </a>  <br>
Linting is used to enforce code styling rules to create cleaner and easier to read code. <br>
<a href="https://esdoc.org/"> ESDoc: </a> <br>
Use as part of the pipeline! Husky will go through the folder we specify (the scripts folder as of now), go through our comments in the code, and generate documentation in the docs folder <br>
<a href="https://travis-ci.com/"> Travis CI: </a> <br>
Atuo triggered tool integrated with github. <br>
<a href="https://mochajs.org/"> Mocha & Chai: </a> <br>
Mocha is a feature-rich JavaScript test framework we chose that runs on Node.js and in the browser.  <br>
<a href="https://www.notion.so/e146255dd95148a7abdfb41cd8bff459?v=4502d4859c154af988a896f890256c93&p=be37e0ef71174c389ad12d0b0a033b62"> Karma: </a> <br>
Karma is a tool that enables the running of source code (i.e. JavaScript) against real browsers via the CLI. <br>
<a href="https://docs.codeclimate.com/docs/configuring-test-coverage"> Code Climate </a> <br>
Code Climate provides meaningful and actionable engineering insights for the entire engineering organization. <br>

### Important Links:
<a href="https://www.notion.so/Seven-Deadly-Sins-c27870141b8343caaf2c4414337df549">Notion</a> <br>
<a href="https://ucsd-cse112.github.io/team7/">Team Website</a> <br>

<br>

## TEAM PROCESS
## Sprint 0: Setup & Pipeline Creation & Web Compenent
What we did in sprint 0 are:
* Create To-do list for members
* Find the instructions for the first tools we decided to use
* We created our first development pipeline! Check out our pipeline <a href="https://docs.google.com/presentation/d/1g0a8AYT_qCtn9QqohVH0l6wIGkoRYUuJsH-dkygo4wY/edit#slide=id.p">HERE!</a>
* We also have our first attempt of web component, <a href="https://www.notion.so/Hello-World-8687d7dc16db4c48ad78daa76a97e80b">core-hello</a>

#### Our pipeline in sprint 0: </br>
<img src="https://github.com/ucsd-cse112/team7/blob/master/readmeImg/sprint1_pipeline.png" alt="sprint0_pipeline" width="700"/>

## Sprint 1 : Porting Web Component
In this sprint, we ported some awesome web components:
### Component 1: Rating
##### Attributes
- **`v-model`** (number): The value of the starts, or the number of stars selected
- **`max`** (number): The number of stars in the rating bar
- **`disabled`** (boolean): If true, then the rating bar is not clickable and not modifiable
- **`low-threshold`** (number): The threshold value between low and medium level. This value is included in the low level
- **`high-threshold`** (number): The threshold value between medium and high level. This value is included in the high level
- **`colors`** (string, or array of string) : The color of the icons. If it is an array (has to be array size of 3), each entry corresponds to each level determined by low-threshold and high-threshold
- **`void-color`** (string): The color of the unselected icons
- **`disabled-void-color`** (string): The color of the unselected icons when disabled
- **`icons`** (string, or array of string): The icon type used for the rating, specifically the CSS code of the icon in the format of "\XXXX". If it is an array (has to be array size of 3), each entry corresponds to each level determined by low-threshold and high-threshold. This is modified from the original icon-classes which uses class name instead
- **`void-icon`** (string): The icon type of the unselected rating item. This is modified from the original void-icon-class from Element
- **`disabled-void-icon`** (string): The icon type of the unselected rating item when disabled. This is modified from the original disabled-void-icon-class from Element
- **`show-text`** (boolean): If true, display the text next to the rating bar
- **`show-score`** (boolean): If true, display the current rating score. This attribute is prioritized over show-text, so score will be displayed instead of text
- **`text-color`** (string): The color of the text
- **`texts`** (array of string): The array of displayed text whose entries will correspond to each rating score
- **`score-template`** (string): The template format for the displayed score. If score-template="{value} Points", then "2 Points" will be displayed

### Component 2: Checkbox
##### Attributes
- **`v-model`** (string): A value represented by the checkbox. It will not appear on the frontend unless used by other html tags
- **`true-label`** (string): The v-model value when checked
- **`false-label`** (string): The v-model value when unchecked
- **`disabled`** (boolean): If true, then the checkbox is not clickable and not modifiable
- **`border`** (boolean): If true, border will be added around the checkbox
- **`size`** ("medium," "small," or "mini"): The size of the border. Only these three string value is acceptable; otherwise, the default value which is "medium" will be used
- **`checked`** (boolean): Corresponds to whether the checkbox is checked or not
- **`name`** (string): The "name" attribute used by the original checkbox

#### Our pipeline in sprint 1:</br>
<img src="https://github.com/ucsd-cse112/team7/blob/master/readmeImg/sprint2_pipeline.png" alt="sprint1_pipeline" width="900"/>



## Sprint 2: More web components, npm package, and web service!
* In this sprint, we ported more fantastic Web Components: upload and comment
* We also combined our web components into a website! The ideas of our website:  
  1. course reviews forum (or a general one) 
  2. Smth similar to roten tomato
  3. Smth similar to ratemyprofessor
  4. Smth similar to the meme creater done in CSE134B
  5. smth similar to when2meet
  6. smth similar to reddit + rating
* For the backend of this service, we used the real time database of firebase. 
* Check out our web service for evaluation <a href="https://ucsd-cse112.github.io/team7/pages/rateit/requestor.html">Rateit</a>!!*
* What's more, we even published our web components to npm !
  1. <a href="https://www.npmjs.com/package/pandoras-box">Current Package</a>
  2. Try to install our packages with
  
          npm install pandoras-box
      
      and import it using
    
          import "pandoras-box"
  3. Now you can use the web components we builded! For example, you can create a html file and try out our RATER:
     
          <!DOCTYPE html>
          <html lang="en">
          <head>
            <script type="module" src="index.js"></script>
          </head>
          <body>
            <sds-rate class= "card-text" author = "Team7" des="Max 10 stars with blue colored custom texts" img="img/1.jpg" 
                                    max = "10" show-text="1" text-color="blue" low-threshold="3" high-threshold="8"
                                    icons="\e901,\e902,\e903" void-icon="\e900" 
                                    style="font-family: icomoon!important;"
                                    colors="rgb(153, 169, 191); rgb(247, 186, 42); rgb(255, 153, 0)"
                                    texts = "Get Out!,Seriously?,Nah,Hmm,OK,Good,Nice,Wow,Bang,You're the BEST"></sds-rate>
          </body>
          </html>
       index.js
       
          import "pandoras-box"; // runs the code in index.js of our package, which imports the web components

### Component 3: Upload
##### Attributes
- **`hide-file-list`** (boolean): If true, the list of files that are uploaded will not be shown
- **`drag`** (boolean): If true, the upload will enable upload through drag and drop files
- **`display-thumbnail`** (boolean): If true, the file list will be displayed along with a thumbnail

### Component 4: Comment
##### Attributes
- **`color`** (string): The color of the comment box
- **`Disabled`** (boolean): If true, the user cannot make any comments but only view other’s comment
- **`hide-comment`** (boolean): If true, the user cannot view other’s comments
- **`show-rating`** (boolean): If true, rate bar will be integrated into the comment web components so that users can add rating to the comments
- **`show-tags`** (boolean): If true, checkbox will be integrated into the comment web components so that users can add tags to the comments
- **`init-with`** (string): The subject, or the database entry name, which will be fetched when the comment component is initialized

### Our Final Pipeline Diagram:
<img src="https://github.com/ucsd-cse112/team7/blob/master/readmeImg/final_pipeline.png" alt="final_pipeline" width="900"/>

# Team Members:
Name | Role
---- | ---
Etsu Nakahara   | Lead/Comms  |
Li-An Yang      | Co-lead/Comms  |
Chunan Huang   | Quality Assurance |
Christian Schroeder    | Quality Assurance |
Eric Shaoan Liu | DevOps |
Dan Nguyen      | DevOps |
Cortez Page         |  Tool&Utility |
Ethan Brand         |  Tool&Utility |
Yiming Wang       | Coders  |
Ryan Murase      | Coders  |
