# Email Marketing Agent 📧
## Overview
The Email Marketing Agent is an intelligent solution designed to streamline the creation and distribution of marketing emails. Powered by Mastra AI using Groq model, this agent automatically generates well-structured marketing emails based on user input and delivers them to a designated Telex channel. With a focus on efficiency, scalability, and automation, this tool eliminates the hassle of manual email drafting while ensuring consistency in tone and messaging. It also features built-in logging to track sent drafts, providing visibility into email campaigns.

## ✨ Features
✅ AI-generated marketing emails (Mastra AI + Groq)  
✅ Structured email content (subject, body, CTA)  
✅ Telex channel integration for email dispatch  
✅ Basic logging for tracking email drafts  
✅ Scalable & extendable architecture (NestJS)

## 🛠 Tech Stack
- **Backend:** NestJS, TypeScript
- **AI Integration:** Mastra AI, Groq
- **Messaging:** Telex
- **Logging:** Winston, NestJS Logger

## 📌 Prerequisites
Ensure you have the following installed:
- Node.js (>= 18)
- NestJS CLI (`npm install -g @nestjs/cli`)

## 🚀 Installation & Setup
### Clone the Repository
```sh
git clone https://github.com/yourusername/email-marketing-agent.git
cd email-marketing-agent
```
### Install Dependencies
```sh
npm install
```


## 📌 Usage Guide

### 1️⃣ Start Server
```sh
npm run start
```

### 2️⃣ Generate a Marketing Email
  - Send a **POST** request to:
POST /email/generate



## 🛠 Contributing Guide

We welcome contributions! Follow these steps:
1. Fork the repository  
2. Create a new feature branch:
   ```
   git checkout -b feature-new-feature
   ```  
3. Commit changes:
   ```
   git commit -m "Added new feature"
   ```  
4. Push to GitHub:
   ```
   git push origin feature-new-feature
   ```  
5. Submit a Pull Request  
