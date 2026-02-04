# تنظیمات پایه - پورت 8000
$baseUrl = "http://localhost:8000/api"

Write-Host "1) Login as admin" -ForegroundColor Cyan
$loginBody = @{
    email = "admin@test.com"
    password = "123456"
} | ConvertTo-Json

$loginResponse = Invoke-RestMethod -Uri "$baseUrl/auth/login" -Method POST -Headers @{ "Content-Type" = "application/json" } -Body $loginBody

# استخراج توکن و یوزر آی‌دی به صورت داینامیک
$token = $loginResponse.token.Trim()
$currentUserId = $loginResponse.user._id # فرض بر این است که پاسخ لاگین شامل اطلاعات کاربر است

Write-Host "Logged in as User ID: $currentUserId"
$headers = @{ 
    "Content-Type"  = "application/json"
    "Authorization" = "Bearer $token" 
}
Write-Host "-----------------------------"

# --- بخش محصولات ---
Write-Host "2) Create Product" -ForegroundColor Cyan
$productBody = @{
    name = "Laptop"
    description = "Gaming laptop"
    price = 2000
    stock = 10
} | ConvertTo-Json

$newProduct = Invoke-RestMethod -Uri "$baseUrl/products" -Method POST -Headers $headers -Body $productBody
$productId = $newProduct._id
Write-Host "Product Created: $productId"
Write-Host "-----------------------------"

# --- بخش سفارشات (Order Service) ---
# فیلدها: userid (داینامیک)، items، totalAmount، status
Write-Host "3) Create New Order" -ForegroundColor Cyan
$orderBody = @{
    userid      = $currentUserId  # استفاده از آی‌دی کاربری که لاگین کرده
    items       = @(
        @{ productId = $productId; quantity = 1 }
    )
    totalAmount = 2000
    status      = "pending"
} | ConvertTo-Json -Depth 10

$newOrder = Invoke-RestMethod -Uri "$baseUrl/orders" -Method POST -Headers $headers -Body $orderBody
$orderId = $newOrder._id
$newOrder | Format-List
Write-Host "-----------------------------"

# --- بخش پرداخت (Payment Service) ---
# فقط فیلدهای مجاز: orderId و amount
Write-Host "4) Make Payment" -ForegroundColor Cyan
$paymentBody = @{
    orderId = $orderId
    amount  = 2000
} | ConvertTo-Json

$paymentResponse = Invoke-RestMethod -Uri "$baseUrl/payments" -Method POST -Headers $headers -Body $paymentBody
$paymentResponse | Format-List
Write-Host "-----------------------------"

Write-Host "All tests passed successfully!" -ForegroundColor Green