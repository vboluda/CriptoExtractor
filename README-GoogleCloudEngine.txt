DEPLOY CRYPTO APP GOOGLE CLOUD ENGINE
-------------------------------------

#  Create new cluster:
#       Name:cr-cluster
#       Zone: europe-west2-b

gcloud config set project cryptoextractor-257309
gcloud container clusters get-credentials  cr-cluster --zone europe-west2-b

docker build -t gcr.io/cryptoextractor-257309/crypto .
gcloud docker -- push gcr.io/cryptoextractor-257309/crypto

kubectl create -f redis-deployment.yaml
kubectl create -f redis-service.yaml

kubectl create -f mongo-deployment.yaml
kubectl create -f mongo-service.yaml
kubectl create -f mongodata-persistentvolumeclaim.yaml

kubectl create -f crypto-deployment.yaml
kubectl create -f crypto-service.yaml

kubectl get pods
kubectl get service
kubectl get services --watch

-----
UTILS
-----

#DELETE SERVICE 
kubectl get service -o wide
kubectl delete svc crypto

#STOP APP
kubectl scale --replicas=0 deployment/crypto

#RESTART APP
kubectl scale --replicas=0 deployment/crypto