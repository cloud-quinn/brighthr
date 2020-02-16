## Cloud Quinn BrightHR code kata

Task
We have a section of our app where users can access documents that administrators have uploaded. Please make a web page which will do the following...
1. Display the files/folders
2. Allow a user to open a folder to see it’s contents
3. Sort by name/size/date
4. Filter by filename

The recommended timebox was about an hour. As such, I was unable to complete tasks 3 and 4, but I did make a start on creating some generic helpers that could form the basis of those tasks. I also didn't have time to style the page very nicely, concentrating instead on ensuring that appropriate affordances and accessibility features were in place to make the page usable pending more in-depth design and styling work. I would have preferred, for example, to extend the Document component to return a table of key details with controls for sorting and filtering, and a download button.

## Demo

[http://brighthr.s3-website.eu-west-2.amazonaws.com/](http://brighthr.s3-website.eu-west-2.amazonaws.com/)

## Running locally

```bash
git clone 
cd brighthr
npm i
npm start
```

Running the unit tests
```npm test```