from django.urls import path, include
from rest_framework.routers import DefaultRouter

# 1. Import RegisterView
from .views import (
    CategoryViewSet, 
    ProductViewSet, 
    OrderViewSet, 
    CreateOrderView,
    RegisterView  # <-- TAMBAHKAN INI
) 

router = DefaultRouter()
router.register(r'categories', CategoryViewSet)
router.register(r'products', ProductViewSet)
router.register(r'orders', OrderViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('orders/create/', CreateOrderView.as_view(), name='create-order'),
    
    # 2. TAMBAHKAN URL BARU DI SINI
    path('register/', RegisterView.as_view(), name='register'),
]