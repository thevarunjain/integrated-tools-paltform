clean:
	rm -rf node_modules
	rm -rf package-lock.json

install:
	npm install

run: install
	node App.js

docker-build:
	docker build -t rohank2002/frontend:latest .

docker-run:
	docker run -td  -p 3000:3000  frontend

docker-push:
	docker push rohank2002/frontend:latest

create-deployment:
	kubectl create -f deployment.yaml

get-deployment:
	kubectl describe deployment frontend

create-service:
	kubectl create -f service.yaml

describe-service:
	kubectl describe svc frontend-svc
