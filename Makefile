default: ssl

.PHONY: ssl
ssl:
	openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -sha256 -days 365
	@echo "\nNow set TRACER_APP_PASS environmental variable to match the password you chose."