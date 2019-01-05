// Dependencies
const express = require('express');
const router = express.Router();
const Joi = require('joi');
const mongoose = require('mongoose');
const Book = require('../models/book');

// Getting all books
router.get('/books', (req, res) => {
  Book.find()
    .then(result => {
      res.send(result);
    }).catch(err => {
      res.status(400).send(err)
    })
})

// Adding a new Book
router.post('/add', (req, res) => {
  // Setting Schema so i can validate it
  const validating = bookValidating(req.body);
  if (validating.error) {
    res.status(400).send(validating.error.details);
  } else {
    const book = new Book({
      _id: new mongoose.Types.ObjectId(),
      image: req.body.image,
      title: req.body.title,
      author: req.body.author,
      publishedDate: req.body.publishedDate
    });
    //  Checking the Mongoose Schema Validating
    const v = book.validateSync();
    // If the validateSync returns any string, that means that there is somthing wrong in saving the data
    if (v)
      res.status(400).send('Something went wrong!');
    //  IF the above if didn't wokred then the program can contiue to the below lines
    book.save()
      .then(result => {
        //  IF the book saved in the database
        res.send('You added a book');
        pdf.bookn(`../${pdfName}.pdf`, function(err) {
          if (err)
          return res.status(500).send(err);
      })
      .catch(err => {
        //  IF the book hasn't saved in the database

        res.status(401).send(err);
        console.log(err);
      });
  }
});

router.get('/download/:id', function(req, res){
  pdfName = req.params.id;
  console.log(pdfName);
  var file = `./${pdfName}.pdf`;
  res.download(file);
  console.log(__dirname);
});


// PUT to edit book
router.put('/:id', (req, res) => {
  // If req.body is valid
  const validating = bookValidating(req.body);
  //  If the validation fails
  if (validating.error) {
    res.status(400).send(validating.error.details);
  } else {
    //  You can use updateMany
    Book.updateOne({ _id: req.params.id }, { $set: req.body })
      .then(result => {
        res.send(`Number of updated books is ${result.n}`);
      }).catch(err => {
        res.status(400).send(err);
      });
  }
});

// Deleting a book
router.delete('/:id', (req, res) => {
  Book.remove({ _id: req.params.id }).then(result => {
    res.send(`Number of deleted books is ${result.n}`)
  }).catch(err => {
    res.status(400).send(err);
  });
});

//  To validate the POST PUT requestes
function bookValidating(book) {
  const bookSchema = {
    'image': Joi.string().required(),
    'title': Joi.string().required(),
    'author': Joi.string().min(5).required(),
    'publishedDate': Joi.string().required()
  }
  return Joi.validate(book, bookSchema);
}

//  Expoting the router so app.js can use it in a MiddleWare
module.exports = router;