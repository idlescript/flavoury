const createError = require('http-errors');
const express = require('express');
const session = require('express-session');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const multer  = require('multer');

const app = express();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const userDirectory = req.session.userId;
    cb(null, path.join(__dirname, '/uploads', userDirectory));   //not sure works or not, can't check because session keeps being destroyed!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  },
  filename: function (req, file, cb) {
    const fileExtension = path.extname(file.originalname);
    const newFilename = Date.now() + '-' + Math.round(Math.random() * 1E4)+fileExtension;
    cb(null, newFilename);
  }
});

const uploadRecipeImage = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 2, // 2 MB
  },
  // Check file extension is jpg, jpeg, or png
  fileFilter: function (req, file, cb) {
    const allowedExtensions = ['.jpg', '.jpeg', '.png'];
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowedExtensions.includes(ext)) {
      // File extension is correct
      cb(null, true);
    } else {
      // File extension is wrong
      cb(new Error('Only .jpg, .jpeg, and .png files are allowed'));
    }
  }
}).single('recipeImage');


app.post('/recipe/upload-image', function (req, res, next) {
  console.log('req.session: '+typeof req.session);
  uploadRecipeImage(req, res, function(err) { 
    if (err instanceof multer.MulterError) {
      // Multer error occurred when uploading
      return res.status(400).json({ error: 'Error uploading file' });
    } else if (err) {
      // Unknown error occurred when uploading
      return res.status(500).json({ error: 'Internal server error' });
    }

    console.log(`req.file: ${JSON.stringify(req.file)}`);
    console.log(`req.body: ${JSON.stringify(req.body)}`);
    return res.status(200).json({ message: 'File uploaded successfully' });
  })
});


//create database schema, use in development only
const initDB = require('./models/initDB');
initDB.initializeDatabase();

const pageRouter = require('./routes/pageRoutes');
const userRouter = require('./routes/userRoutes');
const recipeRouter = require('./routes/recipeRoutes');

app.use(
  session({
    secret: 'Tqrtypnxfumgkdaljvebrsiczhw',
    resave: false,
    saveUninitialized: true,
  })
);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', pageRouter);
app.use('/user', userRouter);
app.use('/recipe', recipeRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
