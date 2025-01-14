import json
import sys
from rich.console import Console

console = Console()

def load_tickets(file_path):
    """Load Jira tickets from a JSON file."""
    try:
        with open(file_path, 'r') as f:
            return json.load(f)
    except FileNotFoundError:
        console.print(f"[red]Error: Could not find file {file_path}")
        sys.exit(1)

def save_results(results, output_file):
    """Save test cases to a file."""
    with open(output_file, 'w') as f:
        json.dump(results, f, indent=2)