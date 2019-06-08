# Web Components
These are the web components that come out of pandoras-box
## Hello World
### About
Writes out "Hello World" + whatever is in the slot

`<core-hello>Peter</core-hello>`
### Attributes
- **`rainbow`**: does an animated ranbow effect with CSS 

`<core-hello rainbow>Peter</core-hello>`

- **`lang`**: support "Hello world -name-" in 3 different languages: Spanish, Chinese, and English.
There's a bonus language too! If you set this attribute to "team7", "Hello World" turns into "We Love" instead!

`<core-hello lang = "English">Peter</core-hello>`

## Checkbox
### About
It's a checkbox! It lets you check and uncheck things.

`<sds-checkbox></sds-checkbox>`
### Attributes
- **`v-model`** (string): A value represented by the checkbox. It will not appear on the frontend unless used by other html tags
- **`true-label`** (string): The v-model value when checked
- **`false-label`** (string): The v-model value when unchecked
- **`disabled`** (boolean): If true, then the checkbox is not clickable and not modifiable
- **`border`** (boolean): If true, border will be added around the checkbox
- **`size`** ("medium," "small," or "mini"): The size of the border. Only these three string value is acceptable; otherwise, the default value which is "medium" will be used
- **`checked`** (boolean): Corresponds to whether the checkbox is checked or not
- **`name`** (string): The "name" attribute used by the original checkbox

## Rater
A component that let's you rate things! You can choose how many stars (or an icon of your choosing) to have as the max number. Default values:
`<sds-rate></sds-rate>`
### Attributes
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
## Comment

`<sds-comment></sds-commment>`

### Attributes

## Upload

Lets you load an image to display. When images are uploaded, a list forms underneath to show you what images you've just uploaded. Images are uploaded to firbase. You can also cancel an upload by clicking the "x" that shows up next to each upload on the right hand side.

`<sds-upload></sds-upload>`

### Attributes
- **`display-thumbnail`** (boolean): If true, then each uploaded image in the list underneath is accompanied by its thumbnail image so that users can see what they queued to upload.