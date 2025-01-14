from rich.console import Console
from rich.markdown import Markdown

console = Console()

def display_ticket_info(ticket):
    """Display formatted ticket information."""
    markdown_content = f"""
    # {ticket['key']}: {ticket['summary']}
    
    **Type:** {ticket['type']}  
    **Priority:** {ticket['priority']}  
    **Component:** {ticket.get('component', 'N/A')}
    
    ## Description
    {ticket.get('description', 'N/A')}
    
    ## User Story
    {ticket.get('user_story', 'N/A')}
    
    ## Technical Details
    {ticket.get('technical_details', 'N/A')}
    
    ## Acceptance Criteria
    {ticket.get('acceptance_criteria', 'N/A')}

    ## System Under Test
    {ticket.get('acceptance_criteria', 'N/A')}
    """
    console.print(Markdown(markdown_content))