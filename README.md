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

## Getting Started
