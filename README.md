# ECR Demo - Node.js Microservices & REST API

A comprehensive demonstration of cloud-native application architecture combining a RESTful Todo CRUD API with a distributed microservices system (Order, Inventory, Supplier services). Built with Node.js/Express, containerized with Docker, and orchestrated on AWS ECS using CloudFormation Infrastructure as Code.

## Table of Contents

- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [Services Overview](#services-overview)
- [Prerequisites](#prerequisites)
- [Local Development Setup](#local-development-setup)
- [Running Services Locally](#running-services-locally)
- [Building & Dockerizing](#building--dockerizing)
- [AWS Deployment with CloudFormation](#aws-deployment-with-cloudformation)
- [API Documentation](#api-documentation)
- [Repository Pattern](#repository-pattern)
- [Troubleshooting](#troubleshooting)

## Architecture

### High-Level Overview

```
┌─────────────────────────────────────────────────────────┐
│                    AWS Cloud                             │
│  ┌────────────────────────────────────────────────────┐  │
│  │           API Gateway (Load Balancer)              │  │
│  └──────────────┬───────────────────────────────────┘  │
│                 │                                        │
│     ┌───────────┼───────────┬───────────┐               │
│     │           │           │           │               │
│  ┌──▼──┐    ┌──▼──┐    ┌──▼──┐    ┌──▼──┐            │
│  │Todo │    │Order│    │Inv. │    │Supp.│            │
│  │API  │    │Srv. │    │Srv. │    │Srv. │            │
│  └─────┘    └──┬──┘    └──┬──┘    └──┬──┘            │
│                 │          │          │                │
│             ┌───┴──────────┼──────────┘                │
│             │ Inter-service Communication             │
│             │ (REST HTTP Calls)                       │
│             └───────────────────────────────          │
│                                                        │
│  ┌─────────────────────────────────────────────────┐ │
│  │  CloudWatch Logs & Container Insights           │ │
│  └─────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────┘
```

## Project Structure

```
ecr-demo/
├── README.md                          # This file
├── infra/                             # AWS CloudFormation Templates
│   ├── ecr-repositories.yml           # ECR registries for container images
│   ├── ecs-cluster.yml                # ECS cluster & task definitions
│   └── api-gateway.yml                # API Gateway & load balancing
│
├── todo-api/                          # REST API Service (Port 3001)
│   ├── src/
│   │   ├── index.js                   # Application entry point
│   │   ├── server.js                  # Express server setup
│   │   ├── controllers/
│   │   │   └── TodoController.js      # Request handlers
│   │   ├── routes/
│   │   │   └── todoRoutes.js          # API route definitions
│   │   ├── repositories/
│   │   │   └── TodoRepository.js      # Data access layer
│   │   ├── models/
│   │   │   └── Todo.js                # Data models
│   │   └── middleware/
│   │       └── errorHandler.js        # Error handling middleware
│   ├── Dockerfile
│   ├── .dockerignore
│   └── package.json
│
├── order-service/                     # Microservice (Port 3002)
│   ├── src/
│   │   ├── index.js
│   │   ├── server.js
│   │   ├── controllers/
│   │   │   └── OrderController.js
│   │   ├── routes/
│   │   │   └── orderRoutes.js
│   │   ├── repositories/
│   │   │   └── OrderRepository.js
│   │   ├── services/
│   │   │   └── OrderService.js        # Business logic & orchestration
│   │   ├── client/
│   │   │   ├── InventoryClient.js     # Calls to Inventory Service
│   │   │   └── SupplierClient.js      # Calls to Supplier Service
│   │   ├── models/
│   │   │   └── Order.js
│   │   └── middleware/
│   │       └── errorHandler.js
│   ├── Dockerfile
│   ├── .dockerignore
│   └── package.json
│
├── inventory-service/                 # Microservice (Port 3003)
│   ├── src/
│   │   ├── index.js
│   │   ├── server.js
│   │   ├── controllers/
│   │   │   └── InventoryController.js
│   │   ├── routes/
│   │   │   └── inventoryRoutes.js
│   │   ├── repositories/
│   │   │   └── InventoryRepository.js
│   │   ├── models/
│   │   │   └── Inventory.js
│   │   └── middleware/
│   │       └── errorHandler.js
│   ├── Dockerfile
│   ├── .dockerignore
│   └── package.json
│
└── supplier-service/                  # Microservice (Port 3004)
    ├── src/
    │   ├── index.js
    │   ├── server.js
    │   ├── controllers/
    │   │   └── SupplierController.js
    │   ├── routes/
    │   │   └── supplierRoutes.js
    │   ├── repositories/
    │   │   └── SupplierRepository.js
    │   ├── models/
    │   │   └── Supplier.js
    │   └── middleware/
    │       └── errorHandler.js
    ├── Dockerfile
    ├── .dockerignore
    └── package.json
```

## Services Overview

### 1. Todo API (REST Service)
**Port:** 3001  
**Purpose:** Simple CRUD API for Todo items  
**Technology:** Express.js + In-memory storage

A standalone REST API service for managing todo items with basic CRUD operations.

### 2. Order Service (Microservice)
**Port:** 3002  
**Purpose:** Order management and orchestration  
**Technology:** Express.js + Service clients

Manages orders and coordinates with Inventory and Supplier services to check availability and get pricing.

### 3. Inventory Service (Microservice)
**Port:** 3003  
**Purpose:** Product inventory management  
**Technology:** Express.js + In-memory storage

Manages product inventory and availability information.

### 4. Supplier Service (Microservice)
**Port:** 3004  
**Purpose:** Supplier and pricing information  
**Technology:** Express.js + In-memory storage

Maintains supplier information and product pricing.

## Prerequisites

### Local Development
- **Node.js**: v16+ (LTS recommended)
- **npm**: v7+
- **Docker**: Latest version (for containerization)
- **Docker Compose**: Optional (for orchestrating local containers)

### AWS Deployment
- **AWS Account** with appropriate permissions
- **AWS CLI**: Configured with credentials
- **AWS IAM Permissions** for:
  - CloudFormation (create/update stacks)
  - ECR (create repositories, push images)
  - ECS (create clusters, task definitions, services)
  - IAM (create roles)
  - CloudWatch (create log groups)
  - VPC (create/manage networking)

## Local Development Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd ecr-demo
```

### 2. Install Dependencies
Install dependencies for all services:

```bash
# Todo API
cd todo-api
npm install
cd ..

# Order Service
cd order-service
npm install
cd ..

# Inventory Service
cd inventory-service
npm install
cd ..

# Supplier Service
cd supplier-service
npm install
cd ..
```

### 3. Verify Node.js & npm
```bash
node --version    # v16.0.0 or higher
npm --version     # v7.0.0 or higher
```

## Running Services Locally

### Option 1: Run All Services in Separate Terminals

**Terminal 1 - Todo API:**
```bash
cd todo-api
npm run dev
# Output: Todo API listening on port 3001
```

**Terminal 2 - Inventory Service:**
```bash
cd inventory-service
npm run dev
# Output: Inventory Service listening on port 3003
```

**Terminal 3 - Supplier Service:**
```bash
cd supplier-service
npm run dev
# Output: Supplier Service listening on port 3004
```

**Terminal 4 - Order Service:**
```bash
cd order-service
npm run dev
# Output: Order Service listening on port 3002
```

> **Important:** Start Inventory and Supplier services before Order Service, as Order Service depends on them.

### Option 2: Run Individual Service
```bash
cd <service-directory>
npm run dev
```

### Testing Services Locally

Once all services are running, test the APIs:

```bash
# Test Todo API
curl http://localhost:3001/api/todos

# Test Inventory Service
curl http://localhost:3003/api/inventory

# Test Supplier Service
curl http://localhost:3004/api/suppliers

# Test Order Service (depends on other services)
curl http://localhost:3002/api/orders
```

## Building & Dockerizing

### Build Docker Images

Each service has its own `Dockerfile`. Build them individually or all at once.

#### Build Todo API
```bash
cd todo-api
docker build -t todo-api:latest .
cd ..
```

#### Build Order Service
```bash
cd order-service
docker build -t order-service:latest .
cd ..
```

#### Build Inventory Service
```bash
cd inventory-service
docker build -t inventory-service:latest .
cd ..
```

#### Build Supplier Service
```bash
cd supplier-service
docker build -t supplier-service:latest .
cd ..
```

#### Build Script (All Services)
```bash
#!/bin/bash
for service in todo-api order-service inventory-service supplier-service; do
  echo "Building $service..."
  docker build -t $service:latest ./$service
done
```

### Run Containers Locally

```bash
# Inventory Service
docker run -p 3003:3003 inventory-service:latest

# Supplier Service
docker run -p 3004:3004 supplier-service:latest

# Order Service
docker run -p 3002:3002 \
  -e INVENTORY_SERVICE_URL=http://localhost:3003 \
  -e SUPPLIER_SERVICE_URL=http://localhost:3004 \
  order-service:latest

# Todo API
docker run -p 3001:3001 todo-api:latest
```

### Using Docker Compose (Optional)

Create `docker-compose.yml` in the project root:

```yaml
version: '3.8'

services:
  inventory-service:
    build: ./inventory-service
    ports:
      - "3003:3003"
    environment:
      - PORT=3003

  supplier-service:
    build: ./supplier-service
    ports:
      - "3004:3004"
    environment:
      - PORT=3004

  order-service:
    build: ./order-service
    ports:
      - "3002:3002"
    environment:
      - PORT=3002
      - INVENTORY_SERVICE_URL=http://inventory-service:3003
      - SUPPLIER_SERVICE_URL=http://supplier-service:3004
    depends_on:
      - inventory-service
      - supplier-service

  todo-api:
    build: ./todo-api
    ports:
      - "3001:3001"
    environment:
      - PORT=3001
```

Run with Docker Compose:
```bash
docker-compose up
```

## AWS Deployment with CloudFormation

### Step 1: Set Up AWS CLI and Credentials

```bash
aws configure
# Enter your AWS Access Key ID, Secret Access Key, region, and output format
```

### Step 2: Create ECR Repositories

First, deploy the ECR repository template:

```bash
aws cloudformation create-stack \
  --stack-name ecr-demo-repositories \
  --template-body file://infra/ecr-repositories.yml \
  --region us-east-1
```

Wait for the stack to create:
```bash
aws cloudformation wait stack-create-complete \
  --stack-name ecr-demo-repositories \
  --region us-east-1
```

### Step 3: Build and Push Docker Images to ECR

Get your AWS account ID:
```bash
AWS_ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)
AWS_REGION=us-east-1
```

Login to ECR:
```bash
aws ecr get-login-password --region $AWS_REGION | \
  docker login --username AWS --password-stdin $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com
```

Build and push each service:

```bash
# Todo API
docker build -t $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/todo-api:latest ./todo-api
docker push $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/todo-api:latest

# Order Service
docker build -t $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/order-service:latest ./order-service
docker push $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/order-service:latest

# Inventory Service
docker build -t $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/inventory-service:latest ./inventory-service
docker push $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/inventory-service:latest

# Supplier Service
docker build -t $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/supplier-service:latest ./supplier-service
docker push $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/supplier-service:latest
```

### Step 4: Create ECS Cluster and Task Definitions

```bash
aws cloudformation create-stack \
  --stack-name ecr-demo-ecs-cluster \
  --template-body file://infra/ecs-cluster.yml \
  --capabilities CAPABILITY_NAMED_IAM \
  --parameters \
    ParameterKey=TodoApiImage,ParameterValue=$AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/todo-api:latest \
    ParameterKey=OrderServiceImage,ParameterValue=$AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/order-service:latest \
    ParameterKey=InventoryServiceImage,ParameterValue=$AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/inventory-service:latest \
    ParameterKey=SupplierServiceImage,ParameterValue=$AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/supplier-service:latest \
  --region us-east-1
```

Wait for completion:
```bash
aws cloudformation wait stack-create-complete \
  --stack-name ecr-demo-ecs-cluster \
  --region us-east-1
```

### Step 5: Create ECS Services

Create a new CloudFormation template for ECS Services (`infra/ecs-services.yml`) or manually create services via AWS Console:

```bash
# List available task definitions
aws ecs list-task-definitions --region us-east-1

# Get cluster name from outputs
CLUSTER_NAME=$(aws cloudformation describe-stacks \
  --stack-name ecr-demo-ecs-cluster \
  --region us-east-1 \
  --query 'Stacks[0].Outputs[?OutputKey==`ECSClusterName`].OutputValue' \
  --output text)
```

### Step 6: Set Up API Gateway

```bash
aws cloudformation create-stack \
  --stack-name ecr-demo-api-gateway \
  --template-body file://infra/api-gateway.yml \
  --capabilities CAPABILITY_NAMED_IAM \
  --region us-east-1
```

### Step 7: Verify Deployment

Check stack status:
```bash
aws cloudformation describe-stacks \
  --stack-name ecr-demo-ecs-cluster \
  --region us-east-1

# Get API Gateway URL
aws cloudformation describe-stacks \
  --stack-name ecr-demo-api-gateway \
  --region us-east-1 \
  --query 'Stacks[0].Outputs' \
  --region us-east-1
```

### Step 8: Monitor Logs

View container logs in CloudWatch:
```bash
aws logs tail /ecs/ecr-demo --follow --region us-east-1
```

## API Documentation

### Todo API (Port 3001)

#### Get All Todos
```bash
GET /api/todos
```

Response:
```json
[
  {
    "id": 1,
    "title": "Learn Node.js",
    "completed": false,
    "createdAt": "2026-06-01T10:00:00Z"
  }
]
```

#### Create Todo
```bash
POST /api/todos
Content-Type: application/json

{
  "title": "Learn Docker",
  "completed": false
}
```

#### Get Todo by ID
```bash
GET /api/todos/:id
```

#### Update Todo
```bash
PUT /api/todos/:id
Content-Type: application/json

{
  "title": "Master Docker",
  "completed": true
}
```

#### Delete Todo
```bash
DELETE /api/todos/:id
```

---

### Order Service (Port 3002)

#### Get All Orders
```bash
GET /api/orders
```

#### Create Order
```bash
POST /api/orders
Content-Type: application/json

{
  "customerId": "CUST-001",
  "items": [
    {
      "productId": "PROD-001",
      "quantity": 2
    }
  ]
}
```

#### Get Order by ID
```bash
GET /api/orders/:id
```

#### Update Order Status
```bash
PUT /api/orders/:id/status
Content-Type: application/json

{
  "status": "shipped"
}
```

#### Delete Order
```bash
DELETE /api/orders/:id
```

---

### Inventory Service (Port 3003)

#### Get All Inventory
```bash
GET /api/inventory
```

#### Create Product
```bash
POST /api/inventory
Content-Type: application/json

{
  "productId": "PROD-001",
  "name": "Widget",
  "quantity": 100
}
```

#### Check Product Availability
```bash
GET /api/inventory/:productId
```

---

### Supplier Service (Port 3004)

#### Get All Suppliers
```bash
GET /api/suppliers
```

#### Create Supplier
```bash
POST /api/suppliers
Content-Type: application/json

{
  "supplierId": "SUP-001",
  "name": "Tech Supplies Inc",
  "contactEmail": "contact@techsupplies.com"
}
```

#### Get Supplier by ID
```bash
GET /api/suppliers/:id
```

## Repository Pattern

This project implements the **Repository Pattern** to abstract data access logic, enabling easy switching from in-memory storage to a real database.

### Benefits
- **Decoupling**: Business logic is decoupled from data access
- **Testability**: Repositories can be mocked for unit testing
- **Flexibility**: Easy to swap implementations (Map → MongoDB → PostgreSQL)
- **Maintainability**: Centralized data access logic

### Example: TodoRepository

```javascript
// In-memory implementation
export class TodoRepository {
  constructor() {
    this.todos = new Map();
    this.nextId = 1;
  }

  findAll() {
    return Array.from(this.todos.values());
  }

  findById(id) {
    return this.todos.get(parseInt(id));
  }

  create(title, completed) {
    const id = this.nextId++;
    const todo = new Todo(id, title, completed);
    this.todos.set(id, todo);
    return todo;
  }

  update(id, title, completed) {
    const todo = this.todos.get(parseInt(id));
    if (todo) {
      todo.title = title;
      todo.completed = completed;
      return todo;
    }
    return null;
  }

  delete(id) {
    return this.todos.delete(parseInt(id));
  }
}
```

### Future: Database Implementation

Replace the in-memory Map with database calls:

```javascript
// Future MongoDB implementation
export class TodoRepository {
  constructor(mongoClient) {
    this.collection = mongoClient.db('ecr-demo').collection('todos');
  }

  async findAll() {
    return await this.collection.find({}).toArray();
  }

  async findById(id) {
    return await this.collection.findOne({ _id: id });
  }

  async create(title, completed) {
    const result = await this.collection.insertOne({ title, completed });
    return { _id: result.insertedId, title, completed };
  }
  // ...
}
```

## Troubleshooting

### Services Won't Start

**Issue:** Port already in use
```bash
# Find process using port
lsof -i :3001

# Kill the process (macOS/Linux)
kill -9 <PID>
```

**Issue:** Module not found error
```bash
# Reinstall dependencies
npm install
```

### Docker Build Fails

**Issue:** Node modules not found
```bash
# Clean build
docker build --no-cache -t <service-name>:latest ./<service-directory>
```

### AWS Deployment Issues

**Issue:** ECR login fails
```bash
# Re-authenticate
aws ecr get-login-password --region us-east-1 | \
  docker login --username AWS --password-stdin $AWS_ACCOUNT_ID.dkr.ecr.us-east-1.amazonaws.com
```

**Issue:** CloudFormation stack creation failed
```bash
# Check stack events
aws cloudformation describe-stack-events \
  --stack-name <stack-name> \
  --region us-east-1
```

### Inter-service Communication Issues

**Issue:** Order Service can't reach Inventory Service
```bash
# Verify service URLs in environment variables
# For local: http://localhost:3003
# For Docker: http://inventory-service:3003
# For AWS: Use ECS service discovery DNS
```

## Environment Variables

### Todo API
- `PORT`: Server port (default: 3001)

### Order Service
- `PORT`: Server port (default: 3002)
- `INVENTORY_SERVICE_URL`: URL to Inventory Service
- `SUPPLIER_SERVICE_URL`: URL to Supplier Service

### Inventory Service
- `PORT`: Server port (default: 3003)

### Supplier Service
- `PORT`: Server port (default: 3004)

## Next Steps

1. **Add Authentication**: Implement JWT authentication for API endpoints
2. **Add Database**: Replace in-memory storage with PostgreSQL/MongoDB
3. **Add Caching**: Implement Redis caching for frequently accessed data
4. **Add Message Queue**: Use AWS SQS/SNS for async communication
5. **Add CI/CD**: Set up GitHub Actions for automated testing and deployment
6. **Add Monitoring**: Implement APM with DataDog or New Relic
7. **Add API Documentation**: Generate Swagger/OpenAPI documentation

## License

MIT

## Support

For issues, questions, or contributions, please refer to the project repository.
