# Car Penalties Management

## Project Overview

This project aims to automate the extraction and management of penalties.

## Project Structure

The project is organized into the following directories:

    project-root/
    |-- data
    | |-- cleaned
    | |-- raw
    | |-- processed
    |-- docs
    |-- models
    |-- notebooks
    |-- references
    |-- scripts
    |-- car-penalties
    | |-- __init__.py
    | |-- config.py
    | |-- dataset.py
    | |-- features.py
    | |-- plots.py
    | |-- modeling
    | | |-- __init__.py
    | | |-- predict.py
    | | |-- train.py

### Directory Descriptions

- **data/**

  - `cleaned/`: This directory contains the cleaned datasets that have undergone preprocessing to remove any anomalies or irrelevant information.
  - `raw/`: This directory holds the raw, unprocessed datasets as they were obtained from the source.
  - `processed/`: This directory includes datasets that have been further processed and transformed, ready for analysis or model training.

- **docs/**: This directory contains documentation related to the project, such as project reports, manuals, and other relevant documentation.

- **models/**: This directory is used to store trained machine learning models, including both the model architecture and the saved weights or serialized models.

- **notebooks/**: This directory holds Jupyter notebooks used for data exploration, visualization, and prototyping of models and analyses.

- **references/**: This directory contains reference materials, such as research papers, articles, and other resources that are relevant to the project.

- **scripts/**: This directory includes Python scripts for various purposes, such as data preprocessing, model training, evaluation, and utility functions.

- **car-penalties/**: This directory represents a specific module or package within the project.
  - `__init__.py`: Initialization file for the `car-penalties` module.
  - `config.py`: Configuration settings for the module.
  - `dataset.py`: Module for handling datasets related to car penalties.
  - `features.py`: Module for generating features related to car penalties.
  - `plots.py`: Module for generating plots related to car penalties.
  - `modeling/`: Subdirectory for machine learning modeling within the `car-penalties` module.
    - `__init__.py`: Initialization file for the `modeling` submodule.
    - `predict.py`: Module for making predictions using trained models.
    - `train.py`: Module for training machine learning models.

## Setting Up the Project Environment

To ensure all team members use the same library versions, follow the steps below to create a virtual environment and manage dependencies using `requirements.txt`.

### Step 1: Create a Virtual Environment

Create a virtual environment to manage your project's dependencies:

```bash
python -m venv env
```

Activate the virtual environment:

- On Windows:

```bash
.\env\Scripts\activate
```

- On Linux/macOs

```bash
source env/bin/activate
```

### Step 2: Install Required Libraries

Install the necessary libraries using pip:

### Step 3: Generate 'requirements.txt'

Generate a requirements.txt file that lists all the installed packages and their versions:

pip freeze > requirements.txt

```bash
pip freeze > requirements.txt
```

### Step 4: Team Members Install Dependencies

Team members should pull the repository, create a virtual environment, and install dependencies from 'requirements.txt':

````bash
git clone https://gitlab.com/swisspremiumnegoce/car-penalties-management.git # git clone
cd car-penalties-management
python -m venv env
.\env\Scripts\activate # On macos/Linux: source env/bin/activate
pip install -r requirements.txt```
````

By following these steps, all team members will have the same versions of the libraries, ensuring consistency across the project.
