import logging

# Set up basic configuration for logging
logging.basicConfig(
    level=logging.INFO,                     # Set the logging level to INFO
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',  # Log message format
    handlers=[
        logging.FileHandler("justiceconnect.log"),  # Log messages to a file
        logging.StreamHandler()                     # Also log messages to console
    ]
)

# Create a logger instance
logger = logging.getLogger("JusticeConnect")

# Example logging messages
logger.debug("This is a debug message")    # For debugging details
logger.info("JusticeConnect started successfully")  # For general information
logger.warning("This is a warning message") # For warnings
logger.error("An error occurred")           # For errors
logger.critical("Critical issue encountered!")  # For critical issues

# Example function to demonstrate logging
def perform_action(action_name):
    try:
        logger.info(f"Performing action: {action_name}")
        # Simulate action
        if action_name == "fail":
            raise ValueError("Simulated error")
        logger.info(f"Action {action_name} completed successfully")
    except Exception as e:
        logger.error(f"Error during {action_name}: {e}")

# Simulate some actions
perform_action("initialization")
perform_action("data processing")
perform_action("fail")  # This will trigger an error log

