# Define a imagem base
FROM python:3.9-slim-buster

# Define o diretório de trabalho
WORKDIR /app

# Copia o arquivo requirements.txt para o diretório de trabalho
COPY requirements.txt .

RUN apt-get update 
RUN apt-get install -y default-libmysqlclient-dev build-essential


# Instala as dependências
RUN pip install --no-cache-dir -r requirements.txt

# Copia o código fonte para o diretório de trabalho
COPY . .

# Define a porta que o servidor irá escutar
EXPOSE 8000

# Inicia o servidor FastAPI no modo de recarga
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]