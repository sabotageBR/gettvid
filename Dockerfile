FROM evandromoura/wildfly:nettools-2.0

	LABEL MAINTAINER Evandro Moura <evandromoura@gmail.com>
	
	USER root
	
	RUN yum install gcc openssl-devel bzip2-devel libffi-devel zlib-devel xz-devel wget make -y
	RUN cd /usr/src && wget https://www.python.org/ftp/python/3.7.11/Python-3.7.11.tgz && tar xzf Python-3.7.11.tgz && cd Python-3.7.11 && ./configure --enable-optimizations && make altinstall
	RUN rm -rf /usr/src/Python-3.7.11.tgz
	RUN ln -s /usr/local/bin/python3.7 /usr/local/bin/python3
		
	RUN  curl -L https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp -o /usr/local/bin/yt-dlp
	RUN chmod a+rx /usr/local/bin/yt-dlp
	
	RUN yum update -y
	#USER jboss
	
	ARG cliente

	ENV PYTHONIOENCODING=utf-8

	COPY kubernetes/docker-entrypoint.sh $JBOSS_HOME/docker-entrypoint.sh
	
	#RUN chown jboss $JBOSS_HOME/docker-entrypoint.sh && \
	# 	chmod a+x $JBOSS_HOME/docker-entrypoint.sh

	#KUBE_PING
	#COPY kubernetes/kubeping-module $JBOSS_HOME/modules/system/layers/base/org/jgroups/kubernetes
	
	#CONEXAO
	COPY kubernetes/standalone.xml $JBOSS_HOME/standalone/configuration/standalone.xml
	COPY kubernetes/postgresql-42.2.23.jre6.jar $JBOSS_HOME/standalone/deployments/

	#BUILD
	COPY /target/gettvid.war $JBOSS_HOME/standalone/deployments/
	
	#PORTAS
	EXPOSE 8080 8009 9990 7600 8888
	
	

	ENTRYPOINT $JBOSS_HOME/docker-entrypoint.sh