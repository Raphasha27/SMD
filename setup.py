from setuptools import setup, find_packages

setup(
    name="sumbandila_backend",
    version="1.0.0",
    packages=find_packages(),
    install_requires=[
        "fastapi",
        "uvicorn",
        "supabase",
        "python-dotenv",
        "requests",
    ],
)
