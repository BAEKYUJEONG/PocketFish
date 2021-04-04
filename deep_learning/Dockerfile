FROM python:3.8-slim-buster

WORKDIR /app

COPY requirements.txt requirements.txt
COPY flask_deploy.py flask_deploy.py
COPY model model
RUN pip3 install -r requirements.txt

COPY . .

CMD [ "python3", "flask_deploy.py"]
