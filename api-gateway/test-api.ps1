Write-Host "1) Login as admin"

$loginBody = @{
    email = "admin@test.com"
    password = "123456"
} | ConvertTo-Json

$response = Invoke-RestMethod `
    -Uri "http://localhost:3000/api/auth/login" `
    -Method POST `
    -Headers @{ "Content-Type" = "application/json" } `
    -Body $loginBody

$token = $response.token.Trim()

Write-Host "JWT Token:"
Write-Host $token
Write-Host "-----------------------------"


$headers = @{
    "Content-Type"  = "application/json"
    "Authorization" = "Bearer $token"
}

Write-Host "2) Create Product"

$productBody = @{
    name = "Laptop"
    description = "Gaming laptop"
    price = 2000
    stock = 10
} | ConvertTo-Json

$newProduct = Invoke-RestMethod `
    -Uri "http://localhost:3000/api/products" `
    -Method POST `
    -Headers $headers `
    -Body $productBody

$newProduct | Format-List
Write-Host "-----------------------------"


Write-Host "3) Get All Products"

$allProducts = Invoke-RestMethod `
    -Uri "http://localhost:3000/api/products" `
    -Method GET

$allProducts | Format-List
Write-Host "-----------------------------"


Write-Host "4) Update Product"

$updateBody = @{
    name = "Laptop Pro"
    price = 2200
    stock = 8
} | ConvertTo-Json

$updatedProduct = Invoke-RestMethod `
    -Uri "http://localhost:3000/api/products/$($newProduct._id)" `
    -Method PUT `
    -Headers $headers `
    -Body $updateBody

$updatedProduct | Format-List
Write-Host "-----------------------------"


Write-Host "5) Delete Product"

$deleted = Invoke-RestMethod `
    -Uri "http://localhost:3000/api/products/$($newProduct._id)" `
    -Method DELETE `
    -Headers $headers

$deleted | Format-List
Write-Host "-----------------------------"


Write-Host "6) Products After Deletion"

$afterDelete = Invoke-RestMethod `
    -Uri "http://localhost:3000/api/products" `
    -Method GET

$afterDelete | Format-List
