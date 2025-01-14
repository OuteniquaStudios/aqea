## Agile Quality Engineering Assistant (AQEA)

**Empowering Agile teams to deliver better quality software by automating test case generation with AI.**  

In Agile development, bringing QA into the early stages of the software development lifecycle (SDLC) is key to success. AQEA was built with this principle in mind. By automating test case generation during planning meetings, when tickets are being created or groomed, AQEA ensures that quality considerations are seamlessly integrated into the development process from the start.

With AQEA, teams can:
- Surface and refine test cases during ticket creation or grooming.
- Enhance collaboration between QA, developers, and product owners.
- Reduce the time spent in sprint meetings while ensuring high-quality deliverables.

This tool transforms quality assurance into a proactive, collaborative process, enabling Agile teams to achieve faster delivery cycles without compromising on quality.

## 🧐 What AQEA Is and Isn’t

**AQEA is not designed to replace QA professionals.**  
Instead, AQEA is built to **support** and **enhance** the work that QA teams already do, helping them become more efficient and aligned with Agile practices.

Here’s why:

- **Empowering QA Teams**: AQEA automates the repetitive and time-consuming task of generating test cases, freeing up QA engineers to focus on high-value activities such as exploratory testing, test strategy, and user acceptance testing.
  
- **Collaborative Tool**: By surfacing test cases early during planning meetings, AQEA fosters stronger collaboration between QA, developers, and product owners, ensuring that quality is integrated into the process from the start.

- **Not a Replacement, But an Ally**: AQEA’s purpose is to reduce the burden on QA teams so they can focus on more complex testing activities and decision-making, rather than spending time manually creating standard test cases.

- **Focus on Quality, Not Automation**: The tool provides a **starting point**, not a final solution. QA professionals still play a key role in refining, reviewing, and executing tests to ensure the highest quality standards are met.

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

See the WORKFLOW.md file for our recommended usage of this tool in your SDLC.

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

## 📬 Contact

For any questions or feedback, please contact Jonathan at jonathan@outeniquastudios.co.za.