FROM python:3.11

COPY ./src/* .
COPY requirements.txt requirements.txt

RUN pip install -r requirements.txt

EXPOSE 80

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "80"]
