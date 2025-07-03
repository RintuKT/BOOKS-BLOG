import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import session from 'express-session';
import multer from 'multer';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'static')));
app.use('/media', express.static(path.join(__dirname, 'media')));

// Session configuration
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }
}));

// Set EJS as template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'templates'));

// Create media directories if they don't exist
const mediaDir = path.join(__dirname, 'media');
const profilePicsDir = path.join(mediaDir, 'profile_pics');
const categoryDir = path.join(mediaDir, 'category');

[mediaDir, profilePicsDir, categoryDir].forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Mock data for posts (replacing Django models)
const posts = [
  {
    id: 1,
    title: "The Alchemist",
    content: "A wonderful book about following your dreams and personal legend.",
    author: "Paulo Coelho",
    date_posted: new Date('2024-01-15'),
    images: "/media/category/the-alchemist-a-graphic-novel.jpg"
  },
  {
    id: 2,
    title: "Wings of Fire",
    content: "An inspiring autobiography of Dr. A.P.J. Abdul Kalam.",
    author: "A.P.J. Abdul Kalam",
    date_posted: new Date('2024-01-10'),
    images: "/media/category/Wings_of_Fire_by_A_P_J_Abdul_Kalam_Book_Cover.jpg"
  },
  {
    id: 3,
    title: "Book Review Collection",
    content: "A collection of various book reviews and recommendations.",
    author: "Book Reviewer",
    date_posted: new Date('2024-01-05'),
    images: "/media/category/81BE7eeKzAL._AC_UF10001000_QL80_.jpg"
  }
];

// Routes
app.get('/', (req, res) => {
  res.render('home', { posts: posts, user: req.session.user });
});

app.get('/about', (req, res) => {
  res.render('about', { user: req.session.user });
});

app.get('/login', (req, res) => {
  res.render('login');
});

app.get('/register', (req, res) => {
  res.render('register');
});

app.get('/profile', (req, res) => {
  if (!req.session.user) {
    return res.redirect('/login');
  }
  res.render('profile', { user: req.session.user });
});

app.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://localhost:${PORT}`);
});