build-dev:
	docker build -t react-app-dev -f Dockerfile.dev .

###################

build-local:
	docker build -t react-app-production:local --build-arg CADDYFILE=Caddyfile_local --build-arg BASE_URL=http://localhost:3000/api --build-arg PREVIEW=true -f Dockerfile.production .

###################

build-production:
	docker build \
		-t react-app-production:production \
		--build-arg CADDYFILE=Caddyfile_production \
		--build-arg BASE_URL=https://nat.livechat.com/api \
		-f Dockerfile.production .
}