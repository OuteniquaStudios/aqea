# Agile Quality Engineering Assistant (AQEA)

## Table of Contents
- [Overview](#overview)
- [Built for Privacy and Security](#-built-for-privacy-and-security)
- [What AQEA Is and Isn't](#-what-aqea-is-and-isnt)
- [Features](#-features)
- [Prerequisites](#-prerequisites)
- [Installation](#️-installation)
  - [Backend](#backend)
  - [Frontend](#frontend)
- [Usage](#-usage)
  - [CLI](#cli)
  - [GUI](#gui)
- [Configuration](#configuration)
- [Real World Usage](#real-world-usage)
- [Future Improvements](#-future-improvements)
- [Contributing](#-contributing)
- [License](#-license)
- [Sponsorships](#-sponsorships)
  - [Why Sponsor?](#-why-sponsor)
  - [How Sponsorships Work](#-how-sponsorships-work)
  - [Get in Touch](#-get-in-touch)

## Overview

Empowering Agile teams to deliver better quality software by automating test case generation with AI.  

In Agile development, bringing QA into the early stages of the software development lifecycle (SDLC) is key to success. AQEA was built with this principle in mind. By automating test case generation during planning meetings, when tickets are being created or groomed, AQEA ensures that quality considerations are seamlessly integrated into the development process from the start.  

With AQEA, teams can:  
- Surface and refine test cases during ticket creation or grooming.  
- Enhance collaboration between QA, developers, and product owners.  
- Reduce the time spent in sprint meetings while ensuring high-quality deliverables.  

This tool transforms quality assurance into a proactive, collaborative process, enabling Agile teams to achieve faster delivery cycles without compromising on quality.  

---

### 🔒 Built for Privacy and Security  

AQEA is designed to address the strict privacy and security requirements of industries like finance and healthcare. The tool exclusively utilizes **local LLMs (Large Language Models)**, ensuring that:  
- **No sensitive data leaves your environment**: All processing occurs on your infrastructure, eliminating the risk of data exposure to third-party servers.  
- **Enterprise-ready security**: By avoiding reliance on cloud-based AI models, AQEA aligns with stringent compliance requirements such as GDPR, HIPAA, POPIA and others.  
- **Customizable and extensible**: Teams can tailor the tool to their unique workflows and security protocols without compromising data privacy.  

This local-first approach makes AQEA an ideal solution for organizations that demand the highest level of data security while leveraging cutting-edge AI capabilities.  

---

### 🧐 What AQEA Is and Isn’t  

AQEA is not designed to replace QA professionals.  
Instead, AQEA is built to support and enhance the work that QA teams already do, helping them become more efficient and aligned with Agile practices.  

Here’s why:  
- **Empowering QA Teams**: AQEA automates the repetitive and time-consuming task of generating test cases, freeing up QA engineers to focus on high-value activities such as exploratory testing, test strategy, and user acceptance testing.  
- **Collaborative Tool**: By surfacing test cases early during planning meetings, AQEA fosters stronger collaboration between QA, developers, and product owners, ensuring that quality is integrated into the process from the start.  
- **Not a Replacement, But an Ally**: AQEA’s purpose is to reduce the burden on QA teams so they can focus on more complex testing activities and decision-making, rather than spending time manually creating standard test cases.  
- **Focus on Quality, Not Automation**: The tool provides a starting point, not a final solution. QA professionals still play a key role in refining, reviewing, and executing tests to ensure the highest quality standards are met.  

---

## 🚀 Features

- **Automated Test Case Generation**: Generate detailed test cases directly from Jira tickets.
- **Functional Testing**: Covers core business logic, user workflow validation, and integration points.
- **Technical Testing**: Validates APIs, database operations, and error handling.
- **Edge Case Handling**: Ensures boundary conditions, data validation, and error scenarios are tested.
- **Performance Testing**: Assesses load handling, response times, and resource usage.
- **Real-time Collaboration**: Facilitates collaboration between developers, QA engineers, and product owners.

## 💻 Prerequisites

- Python 3.8 or higher
- Node.js and npm
- Windows/Linux/MacOS
- Ollama (local LLM server)

## 🛠️ Installation

### Backend

1. Clone the repository:
  ```sh
  git clone https://github.com/OuteniquaStudios/aqea.git
  cd aqea/backend
  ```

2. Create a virtual environment and activate it:
  ```sh
  python -m venv venv
  source venv/bin/activate  # On Windows use `venv\Scripts\activate`
  ```

3. Install the required dependencies:
  ```sh
  pip install -r requirements.txt
  ```

4. Run the FastAPI server:
  ```sh
  uvicorn main:app --reload
  ```

### Frontend

1. Navigate to the frontend directory:
  ```sh
  cd ../frontend
  ```

2. Install the dependencies:
  ```sh
  npm install
  ```

3. Start the development server:
  ```sh
  npm run dev
  ```

## 🎯 Usage

### CLI

1. Ensure you have the backend server running.
2. Use the following command to generate test cases from Jira tickets:
  ```sh
  python test_case_generator.py <input_file> --output <output_file> --prompt <prompt_file> --model <model_name> --temperature <temperature_value>
  ```
  Replace `<input_file>`, `<output_file>`, `<prompt_file>`, `<model_name>`, and `<temperature_value>` with your specific values.

3. Example usage:
  ```sh
  python test_case_generator.py tickets.json --output test_cases_output.json --prompt prompts/test_case_prompt.txt --model ollama/mistral --temperature 0.7
  ```

4. The generated test cases will be saved to the specified output file.

### GUI

1. Upload Jira tickets in JSON format through the frontend interface.
2. Edit the ticket data if necessary.
3. Generate test cases by clicking the "Generate Test Cases" button.
4. Export the generated test cases in JSON format.

## Configuration

The backend configuration can be adjusted in the `config.yaml` file. Key parameters include:
- `output`: Path to the output file for generated test cases.
- `prompt`: Path to the prompt file used for generating test cases.
- `model`: AI model used for generating test cases.
- `temperature`: Temperature setting for the AI model.


## Real World Usage

See the SDLC_WORKFLOW.md file for our recommended usage of this tool in your SDLC.

## 🔮 Future Improvements

- [ ] Integration with Jira API
- [ ] Export to various test management tools
- [ ] Support for custom ticket fields
- [ ] Batch processing with progress tracking
- [ ] Custom prompt templates
- [ ] Test case prioritization algorithm
- [ ] Dockerize for easy deployment

## 🤝 Contributing

We welcome contributions from the community. Please read our [Code of Conduct](CODE_OF_CONDUCT.md) and [Contributing Guidelines](CONTRIBUTING.md) before submitting issues or pull requests.

## 🔶 License

This project is licensed under the GNU AFFERO GENERAL PUBLIC LICENSE. See the [LICENSE](LICENSE.md) file for details.

---

### 💖 Sponsorships  

AQEA is an open-source initiative designed to enhance Agile software development processes by integrating quality assurance early in the SDLC. If you or your organization believe in the importance of better collaboration, efficiency, and security in Agile QA, you can help support this project in the following ways:  

#### 🤝 Why Sponsor?  
- **Support Innovation**: Your sponsorship helps us continuously improve AQEA and add features like Jira API integration, advanced analytics, and more.  
- **Champion Open Source**: Contribute to a tool that prioritizes privacy, security, and transparency for industries worldwide.  
- **Engage with the Community**: Join a network of like-minded professionals and organizations striving for better Agile practices.  
- **Showcase Your Commitment**: Sponsors will be acknowledged in the project README, on our website, and in other communications (optional).  

#### 💡 How Sponsorships Work  
We offer flexible sponsorship opportunities for:  
- **Financial Contributions**: Fund the development of new features, enhanced documentation, and ongoing maintenance.  
- **Resource Contributions**: Provide infrastructure, testing environments, or other tools to support development.  
- **Collaborative Development**: Work with us directly to tailor AQEA for your organization's specific needs.  

#### 📬 Get in Touch  
If you’re interested in sponsoring AQEA, please reach out to Jonathan at [jonathan@outeniquastudios.co.za](mailto:jonathan@outeniquastudios.co.za) for more details.  

Together, we can build a stronger, more efficient QA ecosystem for Agile teams everywhere!  