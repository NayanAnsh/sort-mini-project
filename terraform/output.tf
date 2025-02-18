output "bucket_name" {
  value = aws_s3_bucket.main_bucket.bucket
}
output "bucket_url" {
  value = aws_s3_bucket_website_configuration.example.website_endpoint
}