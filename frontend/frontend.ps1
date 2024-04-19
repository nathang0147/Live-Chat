# frontend.ps1

function Build-Dev {
    docker build -t client:1.0 .
}

function Build-Local {
    docker build -t client-production:local --build-arg CADDYFILE=Caddyfile_local --build-arg BASE_URL=http://localhost:3000/api --build-arg PREVIEW=true -f Dockerfile.production .
}

function Build-Production {
    docker build -t client-production:production --build-arg CADDYFILE=Caddyfile_production --build-arg BASE_URL=https://livechat.superchat.com/api -f Dockerfile.production .
}