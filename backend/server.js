const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const categories = {
  programming: new Set([
    "programming",
    "coding",
    "development",
    "software",
    "code",
  ]),
  javascript: new Set([
    "javascript",
    "js",
    "node.js",
    "nodejs",
    "node",
    "javascript programming",
    "learn javascript",
    "javascript tutorial",
  ]),
  react: new Set([
    "react",
    "react.js",
    "reactjs",
    "react js",
    "react native",
    "react framework",
    "learn react",
    "react tutorial",
    "react development",
  ]),
  python: new Set([
    "python",
    "python programming",
    "learn python",
    "python tutorial",
    "python development",
    "python coding",
  ]),
  webdev: new Set([
    "web development",
    "web dev",
    "website",
    "web design",
    "frontend",
    "backend",
    "full stack",
    "fullstack",
  ]),
  shopping: new Set([
    "shopping",
    "shop",
    "buy",
    "purchase",
    "store",
    "online shopping",
  ]),
  clothing: new Set([
    "clothing",
    "clothes",
    "apparel",
    "fashion",
    "wear",
    "dress",
    "garments",
  ]),
  furniture: new Set([
    "furniture",
    "sofa",
    "chair",
    "table",
    "bed",
    "couch",
    "furnishings",
    "home decor",
  ]),
  electronics: new Set([
    "electronics",
    "gadgets",
    "devices",
    "smartphones",
    "laptops",
    "computers",
    "tablets",
  ]),
  greetings: new Set([
    "hello",
    "hi",
    "hey",
    "greetings",
    "good morning",
    "good afternoon",
    "good evening",
  ]),
  farewell: new Set(["bye", "goodbye", "see you", "farewell", "good night"]),
  gratitude: new Set(["thanks", "thank you", "appreciate it", "grateful"]),
  help: new Set([
    "help",
    "assist",
    "support",
    "guidance",
    "what can you do",
    "capabilities",
  ]),
};

class Dataset {
  constructor() {
    this.entries = [];
    this.categoryMap = new Map();
    this.initializeDefaultResponses();
    this.initializeChatPatterns();
    this.initializeDataset();
  }

  initializeDefaultResponses() {
    this.defaultResponses = {
      react: {
        answer:
          "https://reactjs.org - Official React documentation and tutorials for learning React development.",
        confidence: 0.9,
        category: "react",
      },
      javascript: {
        answer:
          "https://developer.mozilla.org/en-US/docs/Web/JavaScript - Comprehensive JavaScript documentation and tutorials.",
        confidence: 0.9,
        category: "javascript",
      },
      python: {
        answer:
          "https://python.org - Official Python website with documentation, tutorials, and resources.",
        confidence: 0.9,
        category: "python",
      },
      webdev: {
        answer:
          "https://developer.mozilla.org - Comprehensive web development documentation and tutorials.",
        confidence: 0.9,
        category: "webdev",
      },
      programming: {
        answer:
          "https://freecodecamp.org - Free coding tutorials and certification courses.",
        confidence: 0.8,
        category: "programming",
      },
      shopping: {
        answer:
          "https://amazon.com - World's largest online shopping platform.",
        confidence: 0.8,
        category: "shopping",
      },
      clothing: {
        answer:
          "https://myntra.com - Premier fashion and clothing shopping destination.",
        confidence: 0.8,
        category: "clothing",
      },
      furniture: {
        answer:
          "https://ikea.com - Affordable furniture and home decor solutions.",
        confidence: 0.8,
        category: "furniture",
      },
      electronics: {
        answer: "https://bestbuy.com - Great deals on electronics and gadgets.",
        confidence: 0.8,
        category: "electronics",
      },
      // Chatbot responses
      greetings: {
        answer: "Hello! How can I assist you today?",
        confidence: 0.9,
        category: "greetings",
      },
      farewell: {
        answer: "Goodbye! Have a great day!",
        confidence: 0.9,
        category: "farewell",
      },
      gratitude: {
        answer: "You're welcome! Let me know if you need anything else.",
        confidence: 0.9,
        category: "gratitude",
      },
      help: {
        answer:
          "I can help you with: \n- Programming and development questions\n- Web development resources\n- Shopping recommendations\n- General questions and guidance\nJust ask me anything!",
        confidence: 0.9,
        category: "help",
      },
    };
  }

  initializeChatPatterns() {
    this.chatPatterns = [
      {
        pattern:
          /how (can|do) I (learn|start with) (javascript|python|react|web development)/i,
        handler: (matches) => {
          const topic = matches[3].toLowerCase();
          return (
            this.defaultResponses[topic] || {
              answer: `To learn ${topic}, I recommend starting with online tutorials and documentation. Would you like a specific resource recommendation?`,
              confidence: 0.8,
              category: "programming",
            }
          );
        },
      },
      {
        pattern:
          /what('s| is) (the best|your recommended) (way|resource|platform) (for|to) (learn|study) (javascript|python|react|web development)/i,
        handler: (matches) => {
          const topic = matches[6].toLowerCase();
          return (
            this.defaultResponses[topic] || {
              answer: `For learning ${topic}, I recommend checking official documentation and tutorials. Would you like a specific resource?`,
              confidence: 0.8,
              category: "programming",
            }
          );
        },
      },
      {
        pattern:
          /where (can|should) I (buy|find|shop for) (clothes|clothing|fashion|apparel)/i,
        handler: () => this.defaultResponses["clothing"],
      },
      {
        pattern:
          /where (can|should) I (buy|find|shop for) (furniture|home decor|furnishings)/i,
        handler: () => this.defaultResponses["furniture"],
      },
      {
        pattern:
          /where (can|should) I (buy|find|shop for) (electronics|gadgets|devices)/i,
        handler: () => this.defaultResponses["electronics"],
      },
    ];
  }

  initializeDataset() {
    this.addEntry(
      "What is the best way to learn JavaScript?",
      "https://developer.mozilla.org/en-US/docs/Web/JavaScript - Comprehensive JavaScript documentation and tutorials.",
      "javascript",
    );
    this.addEntry(
      "How do I start with React?",
      "https://reactjs.org - Official React documentation and tutorials for learning React development.",
      "react",
    );
    this.addEntry(
      "What are some good resources for learning Python?",
      "https://python.org - Official Python website with documentation, tutorials, and resources.",
      "python",
    );
    this.addEntry(
      "Where can I find good web development tutorials?",
      "https://developer.mozilla.org - Comprehensive web development documentation and tutorials.",
      "webdev",
    );
    this.addEntry(
      "What is the best online shopping platform?",
      "https://amazon.com - World's largest online shopping platform.",
      "shopping",
    );
    this.addEntry(
      "Where can I buy fashionable clothing?",
      "https://myntra.com - Premier fashion and clothing shopping destination.",
      "clothing",
    );
    this.addEntry(
      "Where can I buy affordable furniture?",
      "https://ikea.com - Affordable furniture and home decor solutions.",
      "furniture",
    );
    this.addEntry(
      "Where can I find great deals on electronics?",
      "https://bestbuy.com - Great deals on electronics and gadgets.",
      "electronics",
    );
    this.addEntry("Hello!", "Hello! How can I assist you today?", "greetings");
    this.addEntry("Goodbye!", "Goodbye! Have a great day!", "farewell");
    this.addEntry(
      "Thanks!",
      "You're welcome! Let me know if you need anything else.",
      "gratitude",
    );
    this.addEntry(
      "What can you do?",
      "I can help you with: \n- Programming and development questions\n- Web development resources\n- Shopping recommendations\n- General questions and guidance\nJust ask me anything!",
      "help",
    );
    this.addEntry(
      "What is the best resource for learning Node.js?",
      "https://nodejs.dev - Official Node.js documentation and tutorials.",
      "javascript",
    );
    this.addEntry(
      "How can I improve my Python skills?",
      "I recommend practicing with projects and using resources like https://realpython.com.",
      "python",
    );
    this.addEntry(
      "What are some good frameworks for web development?",
      "Some popular frameworks include React, Angular, and Vue.js.",
      "webdev",
    );
    this.addEntry(
      "Where can I buy a new smartphone?",
      "Check out https://amazon.com for the latest smartphones.",
      "electronics",
    );
    this.addEntry(
      "Can you recommend any online courses for web development?",
      "I suggest checking out platforms like Udemy, Coursera, or freeCodeCamp.",
      "webdev",
    );
    this.addEntry(
      "Where can I find stylish home decor?",
      "You can explore stylish options at https://ikea.com or https://wayfair.com.",
      "furniture",
    );
    this.addEntry(
      "What is a good way to learn full-stack development?",
      "Consider taking a full-stack course on platforms like Codecademy or Coursera.",
      "webdev",
    );
    this.addEntry(
      "How do I start a career in software development?",
      "Begin by learning programming languages like JavaScript or Python and building projects.",
      "programming",
    );
    this.addEntry(
      "What are some tips for online shopping?",
      "Always compare prices, read reviews, and look for discount codes!",
      "shopping",
    );
    this.addEntry(
      "How can I improve my JavaScript skills?",
      "Practice coding challenges on platforms like Codewars or LeetCode to enhance your JavaScript skills.",
      "javascript",
    );
    this.addEntry(
      "What is React used for?",
      "React is used for building user interfaces, especially for single-page applications.",
      "react",
    );
    this.addEntry(
      "Can you recommend a Python tutorial for beginners?",
      "Check out Codecademy's Python course for a great beginner-friendly tutorial.",
      "python",
    );
    this.addEntry(
      "What's the best way to learn web development?",
      "Start with HTML, CSS, and JavaScript, then move on to frameworks like React or backend technologies.",
      "webdev",
    );
    this.addEntry(
      "Where can I buy the latest smartphone?",
      "You can find the latest smartphones on websites like Amazon or Best Buy.",
      "electronics",
    );
    this.addEntry(
      "What are the top online courses for programming?",
      "Consider platforms like Udemy, Coursera, or edX for top programming courses.",
      "programming",
    );
    this.addEntry(
      "How do I create a responsive website?",
      "Use CSS frameworks like Bootstrap or Tailwind CSS to create responsive websites easily.",
      "webdev",
    );
    this.addEntry(
      "Where can I buy kitchen furniture?",
      "You can explore IKEA or Wayfair for kitchen furniture options.",
      "furniture",
    );
    this.addEntry(
      "What is the difference between React and Angular?",
      "React is a library for building UI, while Angular is a full-fledged framework.",
      "react",
    );
    this.addEntry(
      "How to get started with Node.js?",
      "Visit the official Node.js website for installation and basic tutorials.",
      "javascript",
    );
    this.addEntry(
      "Can you suggest a good book for learning Python?",
      "I recommend 'Automate the Boring Stuff with Python' by Al Sweigart.",
      "python",
    );
    this.addEntry(
      "What are the benefits of using TypeScript?",
      "TypeScript provides static typing, which helps catch errors early in the development process.",
      "javascript",
    );
    this.addEntry(
      "How can I shop for eco-friendly products?",
      "Look for brands that focus on sustainability and eco-friendly practices on platforms like Amazon or Etsy.",
      "shopping",
    );
    this.addEntry(
      "What is the best furniture for small spaces?",
      "Consider multi-functional furniture like sofa beds or nesting tables.",
      "furniture",
    );
    this.addEntry(
      "Where can I find coding bootcamps?",
      "Check websites like Course Report or SwitchUp for coding bootcamp reviews and comparisons.",
      "programming",
    );
    this.addEntry(
      "What are some must-know CSS tricks?",
      "Learn about Flexbox and CSS Grid to create responsive layouts effortlessly.",
      "webdev",
    );
    this.addEntry(
      "How do I start an online store?",
      "Use platforms like Shopify or WooCommerce to set up your online store quickly.",
      "shopping",
    );
    this.addEntry(
      "Where can I find affordable clothing?",
      "Websites like ASOS or Uniqlo often have great deals on clothing.",
      "clothing",
    );
    this.addEntry(
      "What programming languages should I learn in 2024?",
      "JavaScript, Python, and Go are among the top languages to learn in 2024.",
      "programming",
    );
    this.addEntry(
      "What are some common JavaScript frameworks?",
      "Common frameworks include Angular, Vue.js, and React.",
      "javascript",
    );
    this.addEntry(
      "Can you explain the concept of closures in JavaScript?",
      "Closures are functions that remember their outer variables and can access them even when the outer function has finished executing.",
      "javascript",
    );
    this.addEntry(
      "What is the purpose of version control?",
      "Version control systems like Git help you manage changes to code over time, making collaboration easier.",
      "programming",
    );
    this.addEntry(
      "Where can I buy sports equipment?",
      "Check out stores like Dick's Sporting Goods or Academy Sports + Outdoors for sports equipment.",
      "electronics",
    );
    this.addEntry(
      "What is the latest trend in web development?",
      "Single-page applications (SPAs) and Progressive Web Apps (PWAs) are trending in web development.",
      "webdev",
    );
    this.addEntry(
      "What should I consider when buying a laptop?",
      "Look for specifications like RAM, processor speed, battery life, and your intended usage.",
      "electronics",
    );
    this.addEntry(
      "How to improve my problem-solving skills in coding?",
      "Practice coding problems on platforms like HackerRank or LeetCode to enhance your problem-solving skills.",
      "programming",
    );
    this.addEntry(
      "Where can I find DIY home decor ideas?",
      "Pinterest is a great resource for finding creative DIY home decor ideas.",
      "furniture",
    );
    this.addEntry(
      "What is Agile methodology?",
      "Agile is a project management methodology that promotes iterative development and collaboration.",
      "programming",
    );
    this.addEntry(
      "How do I host my website?",
      "Use hosting services like Bluehost or DigitalOcean to host your website.",
      "webdev",
    );
    this.addEntry(
      "Where can I shop for children's clothing?",
      "You can find children's clothing on websites like Gap Kids or OshKosh B'gosh.",
      "clothing",
    );
    this.addEntry(
      "What is the best way to learn SQL?",
      "Online courses on platforms like Coursera or freeCodeCamp are great for learning SQL.",
      "programming",
    );
    this.addEntry(
      "How to start a blog?",
      "Choose a platform like WordPress or Medium and start writing about topics you’re passionate about.",
      "webdev",
    );
    this.addEntry(
      "Can you recommend a resource for learning React hooks?",
      "Check out the official React documentation for a comprehensive guide on hooks.",
      "react",
    );
    this.addEntry(
      "What are the best online stores for electronics?",
      "Best Buy, Newegg, and Amazon are among the best for electronics.",
      "electronics",
    );
    this.addEntry(
      "How can I get better at Java programming?",
      "Practice by building small projects and participating in coding challenges on platforms like HackerRank.",
      "java",
    );
    this.addEntry(
      "Where can I buy garden furniture?",
      "Look for garden furniture at stores like Home Depot or Lowe's.",
      "furniture",
    );
    this.addEntry(
      "What is the best language for web development?",
      "JavaScript is the most widely used language for web development.",
      "webdev",
    );
    this.addEntry(
      "How to create a successful eCommerce website?",
      "Focus on user experience, SEO, and reliable payment systems for success.",
      "shopping",
    );
    this.addEntry(
      "Where can I buy organic food online?",
      "You can find organic food on websites like Thrive Market or Amazon Fresh.",
      "shopping",
    );
    this.addEntry(
      "What is the purpose of APIs?",
      "APIs allow different software applications to communicate with each other.",
      "programming",
    );
    this.addEntry(
      "How do I learn about cloud computing?",
      "Consider taking introductory courses on platforms like Coursera or Udemy.",
      "programming",
    );
    this.addEntry(
      "What is the best resource for learning about machine learning?",
      "Check out Andrew Ng's machine learning course on Coursera.",
      "python",
    );
    this.addEntry(
      "How can I save money while shopping online?",
      "Use coupon websites or cashback apps to save money on online purchases.",
      "shopping",
    );
    this.addEntry(
      "What are the basics of digital marketing?",
      "Learn about SEO, content marketing, social media, and email marketing as basics.",
      "marketing",
    );
    this.addEntry(
      "Where can I find great deals on furniture?",
      "Check out sites like Wayfair or Overstock for deals on furniture.",
      "furniture",
    );
  }

  addEntry(question, answer, category) {
    const entry = {
      question: question.toLowerCase().trim(),
      answer: answer.trim(),
      category: category,
      keywords: this.extractKeywords(question),
    };

    this.entries.push(entry);

    if (category) {
      if (!this.categoryMap.has(category)) {
        this.categoryMap.set(category, []);
      }
      this.categoryMap.get(category).push(entry);
    }
  }

  extractKeywords(text) {
    return text
      .toLowerCase()
      .replace(/[^\w\s]/g, " ")
      .split(/\s+/)
      .filter((word) => word.length > 2);
  }

  detectCategory(text) {
    text = text.toLowerCase();
    const words = this.extractKeywords(text);

    // Check exact matches first
    for (const [category, terms] of Object.entries(categories)) {
      if (terms.has(text)) {
        return category;
      }
    }

    // Check partial matches
    for (const [category, terms] of Object.entries(categories)) {
      for (const term of terms) {
        for (const word of words) {
          if (term.includes(word) || word.includes(term)) {
            return category;
          }
        }
      }
    }

    return null;
  }

  checkPatternMatch(input) {
    for (const { pattern, handler } of this.chatPatterns) {
      const matches = input.match(pattern);
      if (matches) {
        return handler(matches);
      }
    }
    return null;
  }

  findBestMatch(input) {
    input = input.toLowerCase().trim();

    // Check pattern matches first
    const patternMatch = this.checkPatternMatch(input);
    if (patternMatch) {
      return patternMatch;
    }

    const inputWords = this.extractKeywords(input);
    const category = this.detectCategory(input);

    if (category) {
      // Try to find specific match within category
      const categoryEntries = this.categoryMap.get(category) || [];
      let bestMatch = null;
      let highestScore = 0;

      for (const entry of categoryEntries) {
        const score = this.calculateSimilarity(inputWords, entry.keywords);
        if (score > highestScore) {
          highestScore = score;
          bestMatch = entry;
        }
      }

      // Return best match or default category response
      if (bestMatch && highestScore > 0.3) {
        return {
          answer: bestMatch.answer,
          confidence: highestScore,
          category: category,
        };
      }

      return this.defaultResponses[category] || this.getGeneralResponse();
    }

    return this.findGeneralMatch(inputWords);
  }

  calculateSimilarity(inputWords, entryWords) {
    const intersection = inputWords.filter((word) => entryWords.includes(word));
    return intersection.length / Math.max(inputWords.length, entryWords.length);
  }

  findGeneralMatch(inputWords) {
    let bestMatch = null;
    let highestScore = 0;

    for (const entry of this.entries) {
      const score = this.calculateSimilarity(inputWords, entry.keywords);
      if (score > highestScore) {
        highestScore = score;
        bestMatch = entry;
      }
    }

    if (bestMatch && highestScore > 0.3) {
      return {
        answer: bestMatch.answer,
        confidence: highestScore,
        category: bestMatch.category,
      };
    }

    return this.getGeneralResponse();
  }

  getGeneralResponse() {
    return {
      answer:
        "I'm not sure I understand. Could you please rephrase your question? I can help with programming, web development, shopping, or general inquiries.",
      confidence: 0,
      category: null,
    };
  }
}

const dataset = new Dataset();

app.post("/api/chat", (req, res) => {
  const { message } = req.body;
  const result = dataset.findBestMatch(message);

  res.json({
    response: result.answer,
    confidence: result.confidence.toFixed(2),
    category: result.category,
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
