const mysql = require('mysql');
let reviewData = []
const con = mysql.createConnection({
   host: "localhost",
   user: "express",
   password: "Banaan123",
   database: "il_reviews"
});

exports.getReview = (req, res) => {
   try {
      
      con.query('SELECT * FROM reviews ORDER BY score desc;', (err, data, fields) => {
         res.status(200).json({ data })
      }) 
   } catch (error) {
      console.log(error);
   }
}

exports.getStars = (req, res) => {
   
   try {
      
      con.query('SELECT score FROM reviews ORDER BY score desc;', (err, data, fields) => {
         res.status(200).json({ data })
      }) 
   } catch (error) {
      console.log(error);
   }
} 

exports.postReview = (req, res) => {
   if (req.body.fname === '' || req.body.name === '' || req.body.score === '' || req.body.date === '') {
      res.status(400).json({statuscode: "failed"})
   }
   try {
      con.query(
         `INSERT INTO reviews (fname, name, comment, score, date) values( ?, ?, ?, ?, ? );`, [req.body.fname, req.body.name, req.body.comment, req.body.score, req.body.date],  
         (err, data, fields) => {
               if (err) {
                  res.status(400).json({statuscode: "failed"})
                  throw err
               }
               res.status(200).json({statuscode: "success"})
            })
   } catch (error) {
      console.log(error);
   }
   
}  