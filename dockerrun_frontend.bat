docker kill Frontend
docker build --tag llois41/cc_stock_app_repository:cc_frontend .
docker run -it -d --rm -p 8080:8080 --name Frontend llois41/cc_stock_app_repository:cc_frontend