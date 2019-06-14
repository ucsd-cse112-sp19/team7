# Rateit

Do you use Reddit but want the capability to rate things rather than just upvoting or downvoting? Well, we've developed a service that does just that. 

## Requestor
Anyone who wishes to request for evaluation can type in the topic and the description, and drag in an image file of what they want to get evaluations on. They can also customize the number of rating stars and add tags to the subject.
By clicking submit, they can easily upload the evaluation form to the Internet as the data is pushed to Firebase Realtime Database, the database we decided to use for this application due to its ease of use and extensive documentation on using with javascript.

## Evaluator
With the link generated in the submission, anyone can access to the evaluation form. They can view the information about the subject and add comments and rate the subject. Once the evaluation is submitted, the evaluation will be updated and others can see all the comments have been made and the overall rating and tags.

## Customization
We also allow users to find random evaluation subjects to rate on through searching by the lookup system. The requestor can also make there evaluation form private by checking the “set as private” checkbox, so that the evaluation form cannot be accessed through search but only through link sharing. The users can also disable rate and tags and simply use Rateit for getting comments and advice.
