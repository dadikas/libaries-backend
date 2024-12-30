After stopping a container, you can run it again by following these steps:

### **1. Restart an Existing Container**
```bash
docker start <container_name_or_id>
```

#### **Check Stopped Containers**:
```bash
docker ps -a
```


### **2. Restart with `docker-compose`**

```bash
docker-compose up
```

To run it in detached mode (background):
```bash
docker-compose up -d
```

To rebuild the image before starting:
```bash
docker-compose up --build
```

---

### **3. If the Container Was Removed**

#### **Run from an Existing Image**:
List your available images:
```bash
docker images
```

Then run the container again:
```bash
docker run -d --name <container_name> -p <host_port>:<container_port> <image_name>
```
For example:
```bash
docker run -d --name my_postgres -e POSTGRES_PASSWORD=postgres -p 5432:5432 postgres:14
```

---

### **4. Automatically Restart Containers**
To ensure a container restarts automatically after stopping, you can use the `--restart` option when creating it:

```bash
docker run --name my_postgres --restart always -e POSTGRES_PASSWORD=postgres -p 5432:5432 postgres:14
```

---

### **5. Remove and Recreate (If Necessary)**
If you want to start fresh, you can remove the old container and recreate it:

```bash
docker rm <container_name_or_id>
docker-compose up --build
```

### **6. Debugging Issues**
If you're facing issues, always check the logs to understand what happened:

```bash
docker logs <container_name_or_id>
```


### **7. Delete all dockers images**
Unix

To delete all containers including its volumes use,
```bash
docker rm -vf $(docker ps -aq)
```
To delete all the images,
```bash
docker rmi -f $(docker images -aq)
```
Windows - Powershell
```bash
docker images -a -q | % { docker image rm $_ -f }
```

```bash
for /F %i in ('docker images -a -q') do docker rmi -f %i
```