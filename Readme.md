# Real-Time User Interaction Analytics with Kafka & WebSockets

## Overview

This project is a comprehensive real-time analytics platform that captures, processes, and visualizes user interactions on a website. Leveraging a distributed event-driven architecture, the system efficiently handles large volumes of user activity data using Kafka, WebSockets, Redis, and NestJS.

## Key Features

- **User Activity Tracking**  
  Captures mouse movements, button clicks, and site navigation events from the frontend and sends them in real-time via WebSockets.

- **Event Streaming with Kafka**  
  Utilizes Kafka as a message broker to ingest incoming user activity data. The backend (built with NestJS and KafkaJS) publishes these events to Kafka topics.

- **Data Processing & Redis Caching**  
  A dedicated Kafka consumer processes user activity events and caches data with Redis for fast retrieval. It then emits structured updates back to the analytics frontend via WebSockets.

- **Real-Time Data Visualization**  
  Displays live analytics through interactive charts, including scatter plots for mouse movements and dynamic bar graphs for button clicks.

## Tech Stack

- **Frontend**:  
  - React  
  - TypeScript

- **Backend**:  
  - NestJS  
  - KafkaJS  
  - WebSockets  
  - Redis

- **Data Streaming**:  
  - Apache Kafka

- **Infrastructure**:  
  - Docker (with planned deployment on AWS)

## Prerequisites

Ensure the following services are running before starting the project:

- **Kafka**: Running on port **9092**
- **Redis**: Running on port **6379**

## Installation

1. **Clone the Repository**

   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. **Install Dependencies**

   For each component, navigate to its directory and run:

   ```bash
   pnpm install
   ```

## Running the Project

### Backend

1. **Kafka Producer (Backend)**
   
   Navigate to the `backend-producer` directory and run:

   ```bash
   pnpm run start
   ```

2. **Kafka Consumer (Backend)**
   
   Navigate to the `backend-consumer` directory and run:

   ```bash
    pnpm run start
   ```

### Frontend

1. **Main Frontend**
   
   Navigate to the `frontend` directory and run:

   ```bash
   pnpm run start
   ```

2. **Analytics Frontend**
   
   Navigate to the `frontend-analyzer` directory and run:

   ```bash
   pnpm run dev
   ```

## Next Steps for Optimization

- **Performance Measurement**: Track system lag, message loss, and identify bottlenecks.
- **Stress Testing**: Simulate high traffic scenarios to ensure system stability.
- **Scaling Kafka & Load Balancing**: Optimize throughput by adding more brokers and refining load distribution.
- **Data Processing Efficiency**: Improve Redis usage and enhance WebSocket event handling.

