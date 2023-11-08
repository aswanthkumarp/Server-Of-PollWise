const Question = require('../models/question');
const User = require('../models/user');
const Option = require('../models/option');


// Create question
module.exports.create = async function (req, res) {
  try {
    // Fetches user requested
    let userID = req.user.id;
    let user = await User.findById(userID);

    // If no user found
    if (!user) {
      return res.status(401).json({
        message: 'No user found',
      });
    }

    if (!req.body.title) {
      return res.status(400).json({
        message: 'Bad Request',
      });
    }
    // Question to be created
    let newQuestion = {
      title: req.body.title,
      user: userID,
    };
    // Creates the question
    let question = await Question.create(newQuestion);
    // Creates the options if sent with questions

    if (req.body.options) {
      for (let option of req.body.options) {
        let optn = await Option.create({
          title: option,
          question: question._id,
        });
        // Adds the options to questions collection for referance
        question.options.push(optn);
      }
      question.save();
    }
    return res.status(200).json({
      message: 'Question created',
      data: {
        question: question,
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: {
        message: 'Internal Server Error',
      },
    });
  }
};
// Returns Question populated with user and options
module.exports.get = async function (req, res) {
  try {
    let questionID = req.params.id;
    let question = await Question.findById(questionID)
      .populate('options')
      .populate('user');

    if (!question) {
      return res.status(400).json({
        message: 'No Question Found',
      });
    }

    return res.status(200).json({
      message: 'Question Found',
      data: question,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      message: {
        message: 'Internal Server Error',
      },
    });
  }
};

// delete
module.exports.delete = async function (req, res) {
  let question = await Question.findById(req.params.id);
  if (!question)
    return res.status(400).json({
      message: 'No data Found',
    });
  // Checks if the user requested is the user who created the question
  if (!question.user.equals(req.user.id)) {
    return res.status(401).json({
      message: 'Unauthorized',
    });
  }
  // Deletes the associated options
  for (ops of question.options) {
    let option = await Option.findById(ops);
    if (option.votes > 4) {
      return res.status(401).json({
        message: 'You cannot delete the question',
      });
    }
    option.deleteOne();
  }
  question.deleteOne();

  return res.status(200).json({
    message: 'Question and associated options deleted successfully',
  });
};

// module.exports.edit = async function (req, res) {
//   try {
//     const questionId = req.params.id;
//     const updatedTitle = req.body.title;
//     const updatedOptions = req.body.options;

//     if (!questionId || !updatedTitle || !updatedOptions) {
//       return res.status(400).json({
//         message: "Bad Request",
//       });
//     }

//     const question = await Question.findById(questionId).populate("options");

//     if (!question) {
//       return res.status(400).json({
//         message: "Question not found",
//       });
//     }

//     question.title = updatedTitle;

//     // Update the options
//     question.options = [];
//     for (const optionTitle of updatedOptions) {
//       const option = await Option.create({
//         title: optionTitle,
//         question: question._id,
//       });
//       question.options.push(option);
//     }

//     await question.save();

//     return res.status(200).json({
//       message: "Question updated successfully",
//       data: question,
//     });// need to fetch the question by ID, update its title and options as needed,
//     // and save the changes in your database.
//   } catch (err) {
//     console.log(err);
//     return res.status(500).json({
//       message: 'Internal Server Error',
//     });
//   }
// };

// Edit a question
// Edit a question
module.exports.edit = async function (req, res) {
  try {
    const questionId = req.params.id;
    const updatedTitle = req.body.title;
    const updatedOptions = req.body.options;

    if (!questionId || !updatedTitle || updatedOptions === undefined) {
      return res.status(400).json({
        message: 'Bad Request',
      });
    }

    const question = await Question.findById(questionId).populate('options');

    if (!question) {
      return res.status(400).json({
        message: 'Question not found',
      });
    }

    // Update the title
    question.title = updatedTitle;

    // Clear votes and update option titles
    for (let i = 0; i < question.options.length; i++) {
      question.options[i].title = updatedOptions[i];
      question.options[i].votes = 0; // Clear votes
      await question.options[i].save();
    }

    // Create new options if needed
    for (let i = question.options.length; i < updatedOptions.length; i++) {
      const option = new Option({
        title: updatedOptions[i],
        question: question._id,
        votes: 0, // Initialize votes for new options
      });
      await option.save();
      question.options.push(option);
    }

    // Remove any extra options if they exist
    while (question.options.length > updatedOptions.length) {
      const deletedOption = question.options.pop();
      await deletedOption.remove();
    }

    await question.save();

    // Fetch the updated question with all options properly populated
    const updatedQuestion = await Question.findById(questionId).populate(
      'options'
    );

    return res.status(200).json({
      message: 'Question updated successfully',
      data: updatedQuestion,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: 'Internal Server Error',
    });
  }
};

// Search for questions by title
module.exports.searchQuestions = async (req, res) => {
  try {
    const query = req.params.query;

    const questions = await Question.find({
      title: { $regex: query, $options: 'i' },
    }).populate('options');

    return res
      .status(200)
      .json({ message: 'Questions Found', data: questions });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};
