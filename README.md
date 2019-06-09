# Team7 <a href="https://docs.google.com/presentation/d/1fXDuaQTFJ4bg_YPg_7X8dFeDI59nn6NiXu4h0UlOCjc/edit#slide=id.g56768d2de0_0_17">The Seven Deadly Sins
</a>

[![Build Status](https://travis-ci.com/ucsd-cse112/team7.svg?token=qBqr7uFuKBZWkbpLiMwe&branch=dev)](https://travis-ci.com/ucsd-cse112/team7)
[![This project is using Percy.io for visual regression testing.](https://percy.io/static/images/percy-badge.svg)](https://percy.io/7-Deadly-Sins/Team7)
[![Maintainability](https://api.codeclimate.com/v1/badges/2c5eb5cea98f2e51d1c2/maintainability)](https://codeclimate.com/repos/5cda76f15edc6166400005f9/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/2c5eb5cea98f2e51d1c2/test_coverage)](https://codeclimate.com/repos/5cda76f15edc6166400005f9/test_coverage)


<img src="pages/index/img/devilbus1.jpg" alt="drawing" width="500"/>
<br>

<a href="https://github.com/ucsd-cse112/team7/tree/master#-team-process-"> Team Process </a>

# ~ Team Process ~
Let's see our team process in the whole quarter, which includes 3 sprints:
## Sprint 0: Setup & Pipeline Creation & Web Compenent
What we did in sprint 0 are:
* Create To-do list for members
* Find the instructions for the first tools we decided to use
* We created our first development pipeline! Check out our pipeline <a href="https://docs.google.com/presentation/d/1g0a8AYT_qCtn9QqohVH0l6wIGkoRYUuJsH-dkygo4wY/edit#slide=id.p">HERE!</a>
* We also have our first attempt of web component, <a href="https://www.notion.so/Hello-World-8687d7dc16db4c48ad78daa76a97e80b">core-hello</a>

Our pipeline in sprint 0:
<img src="readmeImg/sprint1_pipeline.jpg" alt="drawing" width="500"/>

## Sprint 1: Porting Web Component
In this sprint, we ported some awesome web components:
### Component 1: Rating
##### Attributes
- **`v-model`** (number): The value of the starts, or the number of stars selected
- **`max`** (number): The number of stars in the rating bar
- **`disabled`** (boolean): If true, then the rating bar is not clickable and not modifiable
- **`low-threshold`** (number): The threshold value between low and medium level. This value is included in the low level
- **`high-threshold`** (number): The threshold value between medium and high level. This value is included in the high level
- **`colors`** (string, or array of string) : The color of the icons. If it is an array (has to be array size of 3), each entry corresponds to each level determined by low-threshold and high-threshold
- `**void-color**` (string): The color of the unselected icons
- `**disabled-void-color**` (string): The color of the unselected icons when disabled
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
- `**disabled**` (boolean): If true, then the checkbox is not clickable and not modifiable
- **`border`** (boolean): If true, border will be added around the checkbox
- **`size`** ("medium," "small," or "mini"): The size of the border. Only these three string value is acceptable; otherwise, the default value which is "medium" will be used
- `**checked**` (boolean): Corresponds to whether the checkbox is checked or not
- `**name**` (string): The "name" attribute used by the original checkbox

Our pipeline in sprint 1:
<img src="readmeImg/sprint2_pipeline.jpg" alt="drawing" width="500"/>


# All Members:
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
