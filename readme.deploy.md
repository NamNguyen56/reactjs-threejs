at local:
- docker-compose up to run
- compress image at local
$ docker save -o reactjs-threejs_web-ar-spa-prod.tar reactjs-threejs_web-ar-spa-prod
- upload to server

at server:
- load image
$ docker load -i reactjs-threejs_web-ar-spa-prod.tar
- remove running container
$ docker rm -f miraboArWeb
- start new version of container
$ docker run -d --name miraboArWeb --network host reactjs-threejs_web-ar-spa-prod

test!!!!