clean:
	rm -rf node_modules
	rm -rf package-lock.json

install:
	npm install

run: install
	node App.js

docker-build:
	docker build -t frontend .

docker-run:
	docker run -td  -p 3000:3000  frontend

docker-push:
	docker push rohank2002/frontend:latest
