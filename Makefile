all: deps test-http1 test-http2

deps: cert.pem
	npm install
	cd public/lib && ln -sfn ../../node_modules/angular .
	cd public/lib && ln -sfn ../../node_modules/bootstrap .

cert.pem:
	openssl req -x509 -nodes -newkey rsa:4096 \
		-keyout key.pem \
		-out cert.pem \
		-days 365 \
		-subj '/C=UK/L=London/CN=example.com'

test-http1:
	node http1.js &
	make test

test-http2:
	node http2.js &
	make test

test:
	sleep 1
	h2load -n100000 -c100 -m10 https://localhost:8443/test.html || true
	curl -k https://localhost:8443/exit

http1:
	# browse to https://localhost:8443/test.html
	node http1.js

http2:
	# browse to https://localhost:8443/test.html
	node http2.js
