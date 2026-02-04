# تنظیمات پایه
$baseUrl = "http://localhost:8000/api"

Write-Host "1) Login as admin" -ForegroundColor Cyan

$loginBody = @{
    email = "admin@test.com"
    password = "123456"
} | ConvertTo-Json

$response = Invoke-RestMethod `
    -Uri "$baseUrl/auth/login" `
    -Method POST `
    -Headers @{ "Content-Type" = "application/json" } `
    -Body $loginBody

$token = $response.token.Trim()

Write-Host "JWT Token: $token"
Write-Host "-----------------------------"

$headers = @{
    "Content-Type"  = "application/json"
    "Authorization" = "Bearer $token"
}

# --- بخش محصولات ---

Write-Host "2) Create Product" -ForegroundColor Cyan

$productBody = @{
    name = "Laptop"
    description = "Gaming laptop"
    price = 2000
    stock = 10
} | ConvertTo-Json

$newProduct = Invoke-RestMethod `
    -Uri "$baseUrl/products" `
    -Method POST `
    -Headers $headers `
    -Body $productBody

$productId = $newProduct._id
$newProduct | Format-List
Write-Host "-----------------------------"

# --- بخش سفارشات (Order Service) ---

Write-Host "3) Create New Order" -ForegroundColor Cyan

$orderBody = @{
    productId = $productId
    quantity = 1
    address = "Tehran, Iran"
} | ConvertTo-Json

$newOrder = Invoke-RestMethod `
    -Uri "$baseUrl/orders" `
    -Method POST `
    -Headers $headers `
    -Body $orderBody

$orderId = $newOrder._id
$newOrder | Format-List
Write-Host "-----------------------------"

Write-Host "4) Get My Orders" -ForegroundColor Cyan

$myOrders = Invoke-RestMethod `
    -Uri "$baseUrl/orders/my-orders" `
    -Method GET `
    -Headers $headers

$myOrders | Format-Table
Write-Host "-----------------------------"

Write-Host "5) Get Order by ID" -ForegroundColor Cyan

$orderDetail = Invoke-RestMethod `
    -Uri "$baseUrl/orders/$orderId" `
    -Method GET `
    -Headers $headers

$orderDetail | Format-List
Write-Host "-----------------------------"

# --- بخش پرداخت (Payment Service) ---

Write-Host "6) Make Payment for Order" -ForegroundColor Cyan

$paymentBody = @{
    orderId = $orderId
    amount = 2000
    paymentMethod = "Credit Card"
} | ConvertTo-Json

$paymentResponse = Invoke-RestMethod `
    -Uri "$baseUrl/payments" `
    -Method POST `
    -Headers $headers `
    -Body $paymentBody

$paymentResponse | Format-List
Write-Host "-----------------------------"

# --- پاکسازی و تست نهایی محصولات ---

Write-Host "7) Update Product (Check consistency)" -ForegroundColor Cyan

$updateBody = @{
    name = "Laptop Pro"
    price = 2200
    stock = 9
} | ConvertTo-Json

$updatedProduct = Invoke-RestMethod `
    -Uri "$baseUrl/products/$productId" `
    -Method PUT `
    -Headers $headers `
    -Body $updateBody

$updatedProduct | Format-List
Write-Host "-----------------------------"

Write-Host "8) Delete Product" -ForegroundColor Cyan

$deleted = Invoke-RestMethod `
    -Uri "$baseUrl/products/$productId" `
    -Method DELETE `
    -Headers $headers

$deleted | Format-List
Write-Host "-----------------------------"

Write-Host "Test Finished Successfully!" -ForegroundColor Green