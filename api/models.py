from django.db import models
from django.contrib.auth.models import User

class Category(models.Model):
    name = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

class Product(models.Model):
    name = models.CharField(max_length=200)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    stock = models.IntegerField()
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    image = models.ImageField(upload_to='products/', blank=True, null=True)

    def __str__(self):
        return self.name

class Order(models.Model):
    # SARAN 1: Gunakan SET_NULL agar order history tidak ikut terhapus
    # jika user di-delete.
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)
    total = models.DecimalField(max_digits=10, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=20, default='pending')
    
    # SARAN 2: Tambahkan field ini untuk checkout
    shipping_address = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"Order {self.id} - {self.user.username if self.user else 'Guest'}"

class OrderItem(models.Model):
    # SARAN 3: Tambahkan related_name='items'
    # Ini akan sangat membantu di Serializer nanti (langkah selanjutnya)
    order = models.ForeignKey(Order, related_name='items', on_delete=models.CASCADE)
    
    # SARAN 4: Gunakan SET_NULL agar item di order history tidak hilang
    # jika produk dihapus dari toko.
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True)
    quantity = models.IntegerField()
    price = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"{self.quantity} x {self.product.name if self.product else 'Produk Dihapus'}"