FROM postgis/postgis:13-3.2
RUN apt-get update && \
    apt-get -y upgrade && \
    apt-get install -y postgis curl

RUN \
fileid="14JjsYRzPOEHeeiXmEAZaN_PTWzBFHc2g" && \
filename="geodata.tar.gz" && \
html=`curl -c ./cookie -s -L "https://drive.google.com/uc?export=download&id=${fileid}"` &&\
curl -Lb ./cookie "https://drive.google.com/uc?export=download&`echo ${html}|grep -Po '(confirm=[a-zA-Z0-9\-_]+)'`&id=${fileid}" -o ${filename}  && \
tar -xvzf geodata.tar.gz
