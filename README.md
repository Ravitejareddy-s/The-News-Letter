# News Aggregator Website

This repository contains the source code for a news aggregator website, developed as a client-facing platform similar to Bing News. The website utilizes various technologies, including Lambda functions, DynamoDB, React, Express, Node.js, and ChatGPT, to scrape news articles from multiple sources, curate content, and provide users with a personalized and engaging news reading experience.

## Features

- **Lambda Function for Scraping:** A Lambda function is implemented to scrape news articles and blogs from popular sources like Google News and Forbes. The scraped data is then stored in a DynamoDB database for further processing.

- **Responsive User Interface:** The website's front-end is built using React, providing a responsive and user-friendly interface. Users can easily navigate through the news articles and access additional information.

- **Daily Data Refresh:** The website ensures the availability of up-to-date news by refreshing the data daily in the morning. This ensures that users always have access to the latest articles and information.

- **ChatGPT Integration:** To enhance user experience, the website leverages ChatGPT, an advanced natural language processing model. When users select an article, ChatGPT dynamically rewrites the article's title, making it more engaging and readable. Additionally, ChatGPT is used to generate concise summaries of articles, allowing users to quickly grasp the main points.

- **Admin Panel:** The website includes an administration panel that allows the admin to review and manage the articles. The admin has the authority to publish, edit, or delete posts based on their suitability for the platform, ensuring high-quality content.

## Installation

To run the project locally, follow these steps:

1. Clone the repository:

```
git clone https://github.com/your-username/news-aggregator-website.git](https://github.com/Ravitejareddy-s/The-News-Letter.git
```

2. Install dependencies for the front-end:

```
cd frontend
npm install
```

3. Install dependencies for the back-end:

```
cd ../backend
npm install
```

4. Configure the necessary environment variables. You will need to provide API keys or credentials for the scraping services and the ChatGPT integration. Refer to the documentation for more details.

5. Start the development server for the front-end:

```
cd frontend
npm run dev
```

6. Start the back-end server:

```
cd ../backend
node index.js
```

The website should now be accessible at `http://localhost:3000`.

## Contribution

Contributions to this project are welcome! If you find any issues or have ideas for improvements, please open an issue or submit a pull request. Make sure to follow the existing code style and guidelines.

## License

This project is licensed under the [MIT License](LICENSE).

## Acknowledgments

- The website was developed as part of a client project, based on their requirements for a news aggregator website.
- ChatGPT integration was made possible by OpenAI's GPT-3.5 language model.
- We acknowledge the open-source community for the various libraries and tools used in this project, which have greatly facilitated its development.# The-News-Letter
