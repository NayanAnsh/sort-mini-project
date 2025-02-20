######################
#This file will make S3 bucket and 
# make necessary changed for hosting a static website 
#
#####################
terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.16"
    }
  }

  required_version = ">= 1.2.0"
}

provider "aws" {
  region  = var.region
}
resource "aws_s3_bucket" "main_bucket" {
    bucket_prefix = var.bucket_prefix
  force_destroy= true
  tags = {
    Name        = "Website to virtualize realtime web traffic"
    Environment = "Dev"
  }
}
resource "aws_s3_bucket_ownership_controls" "main_controls" {
  bucket = aws_s3_bucket.main_bucket.id
  rule {
    object_ownership = "BucketOwnerPreferred"
  }
}
resource "aws_s3_bucket_public_access_block" "main_access_rules" {
  bucket = aws_s3_bucket.main_bucket.id

  block_public_acls       = false
  block_public_policy     = false
  ignore_public_acls      = false
  restrict_public_buckets = false
}
resource "aws_s3_bucket_acl" "aws_s3_bucket_acl" {
  depends_on = [
    aws_s3_bucket_ownership_controls.main_controls,
    aws_s3_bucket_public_access_block.main_access_rules,
  ]

  bucket = aws_s3_bucket.main_bucket.id
  acl    = "public-read"
}

resource "aws_s3_bucket_policy" "public_read" {
  bucket = aws_s3_bucket.main_bucket.id
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid       = "PublicReadGetObject"
        Effect    = "Allow"
        Principal = "*"
        Action    = "s3:GetObject"
        Resource  = "${aws_s3_bucket.main_bucket.arn }/*"
      }
    ]
  })
  depends_on = [ aws_s3_bucket_public_access_block.main_access_rules ]
}
resource "aws_s3_bucket_website_configuration" "example" {
  bucket = aws_s3_bucket.main_bucket.id

  index_document {
    suffix = "index.html"
  }

  error_document {
    key = "error.html"
  }

}