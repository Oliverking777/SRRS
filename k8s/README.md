# SRRS Kubernetes Deployment Guide

## How to Deploy

1. **Build and push your Docker image:**

   - If you only want to run your app with Docker (not Kubernetes), you can build and run the container locally:
     ```sh
     docker build -t mbah1234/srrs-frontend:latest .
     docker run -p 8080:80 mbah1234/srrs-frontend:latest
     ```
   - Then open [http://localhost:8080](http://localhost:8080) in your browser.

   - If you want to deploy to Kubernetes, you must push your image to Docker Hub:
     ```sh
     docker push mbah1234/srrs-frontend:latest
     ```

2. **Apply Kubernetes manifests:**

   - Make sure your `kubectl` context is set to your target cluster.
   - From the project root, run:
     ```sh
     kubectl apply -f k8s/deployment.yaml
     kubectl apply -f k8s/service.yaml
     # (Optional) If you have ingress:
     kubectl apply -f k8s/ingress.yaml
     ```

3. **Access your application:**

   - For `LoadBalancer` service, get the external IP:
     ```sh
     kubectl get svc srrs-frontend
     ```
   - For Ingress, use your configured domain.

4. **Scale or update as needed:**

   - Scale:
     ```sh
     kubectl scale deployment srrs-frontend --replicas=5
     ```
   - Rolling update:

     ```sh
     kubectl rollout restart deployment srrs-frontend
     ```

     kubectl rollout restart deployment srrs-frontend

     ```

     ```

# SRRS Kubernetes + Jenkins Deployment Guide

## 1. Install K3s (Kubernetes) on your VPS

```sh
curl -sfL https://get.k3s.io | sh -
export KUBECONFIG=/etc/rancher/k3s/k3s.yaml
kubectl get nodes
```

## 2. Deploy Jenkins

```sh
kubectl create namespace jenkins
kubectl apply -f k8s/jenkins-deployment.yaml
```

- Access Jenkins at: `http://your-vps-ip:30080`

## 3. Deploy your app

```sh
kubectl apply -f k8s/deployment.yaml
kubectl apply -f k8s/service.yaml
```

- Access your app at: `http://your-vps-ip:30081`

## 4. Jenkins CI/CD

- In Jenkins, create a Pipeline job using the `Jenkinsfile`.
- Add Docker Hub credentials as `dockerhub-creds`.
- On each commit, Jenkins will build, push, and deploy your app.

## 5. Open firewall ports

- Open ports 30080 (Jenkins) and 30081 (your app) in your VPS firewall.

## 6. Scaling & Updates

- Scale:
  ```sh
  kubectl scale deployment srrs-frontend --replicas=3
  ```
- Rolling update:
  ```sh
  kubectl rollout restart deployment/srrs-frontend
  ```

---

**Tip:** For production, use Ingress and SSL (cert-manager).
