# Agile Quality Engineering Assistant (AQEA)

## Overview

Agile Quality Engineering Assistant (AQEA) is an open-source tool designed to enhance the quality assurance process in Agile development environments. By leveraging AI, AQEA generates comprehensive test cases from Jira tickets (currently in JSON format), ensuring thorough coverage of functional, technical, edge cases, and performance considerations.

## Features

- **Automated Test Case Generation**: Generate detailed test cases directly from Jira tickets.
- **Functional Testing**: Covers core business logic, user workflow validation, and integration points.
- **Technical Testing**: Validates APIs, database operations, and error handling.
- **Edge Case Handling**: Ensures boundary conditions, data validation, and error scenarios are tested.
- **Performance Testing**: Assesses load handling, response times, and resource usage.
- **Real-time Collaboration**: Facilitates collaboration between developers, QA engineers, and product owners.

## Installation

### Backend

1. Clone the repository:
  ```sh
  git clone https://github.com/yourusername/aqea.git
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

## Usage

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

## Contributing

We welcome contributions from the community. Please read our [Code of Conduct](CODE_OF_CONDUCT.md) and [Contributing Guidelines](CONTRIBUTING.md) before submitting issues or pull requests.

## License

This project is licensed under the GNU AFFERO GENERAL PUBLIC LICENSE. See the [LICENSE](LICENSE.md) file for details.

## Contact

For any questions or feedback, please contact Jonathan at jonathan@outeniquastudios.co.za.