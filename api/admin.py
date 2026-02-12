# api/admin.py
from django.contrib import admin
from .models import Category, Product, Order, OrderItem

# Buat kustomisasi untuk tampilan Produk di admin
class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'price', 'stock', 'created_at')
    list_filter = ('category',)
    search_fields = ('name', 'description')

# Buat kustomisasi untuk tampilan Order
class OrderItemInline(admin.TabularInline):
    model = OrderItem
    raw_id_fields = ['product'] # Mempermudah pencarian produk
    extra = 0 # Tidak ada form item kosong

class OrderAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'total', 'status', 'created_at')
    list_filter = ('status', 'created_at')
    search_fields = ('user__username', 'id')
    inlines = [OrderItemInline] # Tampilkan OrderItem di dalam Order

# Daftarkan model Anda
admin.site.register(Category)
admin.site.register(Product, ProductAdmin) # Gunakan kustomisasi ProductAdmin
admin.site.register(Order, OrderAdmin)     # Gunakan kustomisasi OrderAdmin