from litellm import completion
import time
from pathlib import Path
from rich.console import Console
from rich.panel import Panel
from utils.file_utils import load_tickets, save_results
from utils.display_utils import display_ticket_info
import argparse
import os
import yaml

class TestCaseGenerator:
    def __init__(self, prompt_path, model, temperature):
        self.console = Console()
        self.prompt_path = Path(prompt_path)
        self.model = model
        self.temperature = temperature
        self.test_case_prompt = self.load_prompt()

    def load_prompt(self):
        """Load the test case prompt from a file."""
        with open(self.prompt_path, 'r') as file:
            return file.read()

    def generate_test_cases(self, ticket):
        """Generate test cases for a single Jira ticket."""
        try:
            prompt = self.test_case_prompt.format(
                key=ticket['key'],
                type=ticket['type'],
                summary=ticket['summary'],
                description=ticket.get('description', 'N/A'),
                story=ticket.get('user_story', 'N/A'),
                technical_details=ticket.get('technical_details', 'N/A'),
                acceptance_criteria=ticket.get('acceptance_criteria', 'N/A'),
                system=ticket.get('system', 'N/A')
            )
            
            response = completion(
                model=self.model, 
                messages=[{
                    "role": "user",
                    "content": prompt
                }],
                temperature=self.temperature
            )
            return response.choices[0].message.content
        except Exception as e:
            self.console.print(f"[red]Error generating test cases: {str(e)}")
            return None

    def run_generation(self, input_file, output_file):
        """Run test case generation for all tickets."""
        self.console.print("[bold blue]🚀 Starting Test Case Generator for Jira Tickets[/bold blue]")
        
        tickets = load_tickets(input_file)
        results = {"test_cases": []}
        
        for idx, ticket in enumerate(tickets['tickets'], 1):
            self.console.print(f"\n[cyan]Processing Ticket {idx}/{len(tickets['tickets'])}[/cyan]")
            
            display_ticket_info(ticket)
            
            self.console.print("\n[yellow]Generating test cases...[/yellow]")
            test_cases = self.generate_test_cases(ticket)
            
            if test_cases:
                self.console.print(Panel(test_cases, title=f"Generated Test Cases for {ticket['key']}"))
                
                results["test_cases"].append({
                    "ticket_key": ticket['key'],
                    "ticket_summary": ticket['summary'],
                    "test_cases": test_cases
                })
                
                save_results(results, output_file)
            
            time.sleep(1)  # Small delay to prevent overwhelming the model
        
        self.console.print(f"\n[green]✅ Test cases generated and saved to {output_file}[/green]")

def load_config(config_file):
    """Load configuration from a YAML file."""
    with open(config_file, 'r') as file:
        return yaml.safe_load(file)

def main():
    parser = argparse.ArgumentParser(
        description='Generate test cases from Jira tickets using a local LLM.',
        formatter_class=argparse.ArgumentDefaultsHelpFormatter
    )
    parser.add_argument('input_file', help='Path to JSON file containing Jira tickets')
    parser.add_argument('--output', help='Output file path')
    parser.add_argument('--prompt', help='Path to the prompt file')
    parser.add_argument('--model', help='AI model to use for generating test cases')
    parser.add_argument('--temperature', type=float, help='Temperature setting for the AI model')
    parser.add_argument('--config', default='config.yaml', help='Path to the configuration file')

    args = parser.parse_args()

    # Load configuration from file
    config = {}
    if os.path.isfile(args.config):
        config = load_config(args.config)

    # Merge CLI arguments with config file defaults
    input_file = args.input_file
    output_file = args.output or config.get('output', 'test_cases_output.json')
    prompt_path = args.prompt or config.get('prompt', 'prompts/test_case_prompt.txt')
    model = args.model or config.get('model', 'ollama/mistral')
    temperature = args.temperature if args.temperature is not None else config.get('temperature', 0.7)

    # Validate file paths
    if not os.path.isfile(input_file):
        parser.error(f"The input file {input_file} does not exist.")
    if not os.path.isfile(prompt_path):
        parser.error(f"The prompt file {prompt_path} does not exist.")
    
    generator = TestCaseGenerator(prompt_path, model, temperature)
    generator.run_generation(input_file, output_file)

if __name__ == "__main__":
    main()