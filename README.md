# node-spdy performance test

## Requirements

* curl
* make
* h2load

## Running the Tests

```
make
```

or

```
make deps
make test-http1
make test-http2
```

## Results as of 2017-02-01

### Node's `https` Module

```
TLS Protocol: TLSv1.2
Cipher: ECDHE-RSA-AES128-GCM-SHA256
Server Temp Key: ECDH P-256 256 bits
Application protocol: http/1.1
...
finished in 12.50s, 8003.10 req/s, 7.33MB/s
```

### node-spdy

```
TLS Protocol: TLSv1.2
Cipher: ECDHE-RSA-AES128-GCM-SHA256
Server Temp Key: ECDH P-256 256 bits
Application protocol: h2
...
finished in 27.31s, 3661.89 req/s, 2.95MB/s
```

## Upstream Discussion

https://github.com/spdy-http2/node-spdy/issues/304
