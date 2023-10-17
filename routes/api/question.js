const express = require('express')
const router = express.Router();
const question_api = require('../../controllers/question')
const passport = require('passport')

// Create a question
router.post(
    "/create",
    passport.authenticate("jwt", { session: false }),
    question_api.create
  );
  // Delete a question
  router.delete(
    "/delete/:id",
    passport.authenticate("jwt", { session: false }),
    question_api.delete
  );

router.put(
  "/edit/:id",
  passport.authenticate("jwt",{session:false}),
  question_api.edit
)
  // Get details of question with id as id
  router.get("/:id", question_api.get);


  router.get('/search/:query', question_api.searchQuestions);
  
  module.exports = router;
  