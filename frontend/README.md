# Sorting Algorithm Visualizer + Terrafom

Welcome to the Sorting Algorithm Visualizer project! This platform allows you to visualize the working of popular sorting algorithms, including Bubble Sort and Insertion Sort.

## About the Project

The project aims to provide an interactive way for students to understand the functioning of sorting algorithms through visualization.I have recently added Terraform IaC for easy deployment.

## Live Deployment

To view the project live, visit: [Sorting Algorithm Visualizer.](http://sorting-website-bucket20250218200211800200000001.s3-website.ap-south-1.amazonaws.com/)

## Sorting Algorithms

### Bubble Sort

Bubble Sort is a simple sorting algorithm that repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order.

```javascript
// Pseudo code for Bubble Sort
function bubbleSort(arr) {
  let n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        swap(arr, j, j + 1);
      }
    }
  }
}
```

### Insertion Sort

Insertion Sort is a simple sorting algorithm that builds the final sorted array one element at a time by repeatedly picking the next element and placing it in the correct position.

```javascript
// Pseudo code for Insertion Sort
function insertionSort(arr) {
  let n = arr.length;
  for (let i = 1; i < n; i++) {
    let key = arr[i];
    let j = i - 1;
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j = j - 1;
    }
    arr[j + 1] = key;
  }
}
```

Start visualizing sorting algorithms now and gain a deeper understanding of their operations!

## How to Run Locally

To run this project locally, follow these steps:

1. Clone this repository to your local machine.
2. Navigate to the project directory in your terminal.
3. Run `npm install` to install the dependencies.
4. Run `npm start` to start the development server.
5. Open your browser and visit `http://localhost:3000` to view the project.

## Deployment using Terraform

This project has been deployed to AWS S3 using Terraform.

### Prerequisites

- Install [Terraform](https://developer.hashicorp.com/terraform/downloads)
- Configure AWS CLI with appropriate credentials (`aws configure`)

### Terraform Setup and Deployment

Terraform files are located in the `terraform` folder. To deploy the project using Terraform, follow these steps:

1. Navigate to the `terraform` directory:
   ```sh
   cd terraform
   ```
2. Initialize Terraform:
   ```sh
   terraform init
   ```
3. Apply the Terraform configuration:
   ```sh
   terraform apply -auto-approve
   ```

### Terraform Variables

The Terraform configuration uses the following variables:

```hcl
variable "region" {
    type = string
    default = "ap-south-1"
}

variable "bucket_prefix" {
    type = string
    default = "sorting-website-bucket"
}
```

### Terraform Outputs

After deployment, Terraform provides the following outputs:

```hcl
output "bucket_name" {
  value = aws_s3_bucket.main_bucket.bucket
}

output "bucket_url" {
  value = aws_s3_bucket_website_configuration.example.website_endpoint
}
```

Once deployed, the website will be available at the `bucket_url` outputted by Terraform.

