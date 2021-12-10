Green='\033[0;32m'
RED='\033[0;31m'
Yellow='\033[0;33m'       # Yellow
NC='\033[0m' # No Color

echo " ${Green} Starting build development ${NC}"
docker-compose -f docker-compose.yml down
echo " ${Yellow} Image Down ${NC}"

echo " ${RED} Removing The image ${NC}"
docker rmi nestjs-postgres-posts-api_api  
echo " ${Yellow} Image Removed ${NC}"

echo " ${Green} Build new image ${NC}"
docker-compose -f docker-compose.yml up -d --build && docker logs posts-postgres -f
