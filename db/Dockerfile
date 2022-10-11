FROM postgis/postgis:13-3.2

RUN \
    echo "en_US.UTF-8 UTF-8" > /etc/locale.gen && \
    locale-gen en-US.UTF-8
RUN locale

RUN apt-get update 
RUN apt-get install -y --no-install-recommends apt-utils
RUN apt-get -y upgrade
RUN apt-get install -y postgis curl

RUN \
fileid="14JjsYRzPOEHeeiXmEAZaN_PTWzBFHc2g" && \
filename="geodata.tar.gz" && \
html=`curl -c ./cookie -s -L "https://drive.google.com/uc?export=download&id=${fileid}"` &&\
curl -Lb ./cookie "https://drive.google.com/uc?export=download&`echo ${html}|grep -Po '(confirm=[a-zA-Z0-9\-_]+)'`&id=${fileid}" -o ${filename}  && \
tar -xvzf geodata.tar.gz
