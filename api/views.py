from rest_framework import viewsets
# 1. IMPORT MODUL FILTER (INI YANG BARU)
from rest_framework import filters
from django_filters.rest_framework import DjangoFilterBackend

# --- Import Anda yang sudah ada ---
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAuthenticatedOrReadOnly
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db import transaction
from django.contrib.auth.models import User
from rest_framework.views import APIView   
from rest_framework import status        
from .models import Category, Product, Order, OrderItem
from .serializers import (
    CategorySerializer, 
    ProductSerializer, 
    OrderSerializer,
    RegisterSerializer
)

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [IsAuthenticatedOrReadOnly] # Allow guests to VIEW

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticatedOrReadOnly] # Allow guests to VIEW, but only auth users to EDIT
    
    # --- 2. TAMBAHKAN 3 BARIS INI (INI YANG BARU) ---
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['category']  # Untuk filter (misal: /api/products/?category=1)
    search_fields = ['name', 'description'] # Untuk pencarian (misal: /api/products/?search=iphone)
    # ---------------------------------------------

class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Order.objects.filter(user=self.request.user)

    @action(detail=False, methods=['get'])
    def my_orders(self, request):
        orders = Order.objects.filter(user=request.user)
        serializer = OrderSerializer(orders, many=True)
        return Response(serializer.data)
    
# --- VIEW UNTUK CHECKOUT (Sudah Benar) ---
class CreateOrderView(APIView):
    permission_classes = [IsAuthenticated] 

    def post(self, request):
        # ... (Kode checkout Anda sudah benar) ...
        user = request.user
        data = request.data
        
        cart_items = data.get('cartItems') 
        shipping_address = data.get('shippingAddress', 'Alamat belum diisi') 

        if not cart_items:
            return Response({"error": "Keranjang tidak boleh kosong"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            with transaction.atomic():
                total_price = 0
                for item in cart_items:
                    product = Product.objects.get(id=item['id'])
                    if product.stock < item['quantity']:
                        raise Exception(f"Stok {product.name} tidak mencukupi.")
                    
                    total_price += (product.price * item['quantity'])

                order = Order.objects.create(
                    user=user,
                    total=total_price,
                    shipping_address=shipping_address
                )

                for item in cart_items:
                    product = Product.objects.get(id=item['id'])
                    
                    OrderItem.objects.create(
                        order=order,
                        product=product,
                        quantity=item['quantity'],
                        price=product.price 
                    )
                    
                    product.stock -= item['quantity']
                    product.save()

            serializer = OrderSerializer(order)
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        except Product.DoesNotExist:
            return Response({"error": "Produk tidak ditemukan"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

# --- VIEW BARU UNTUK REGISTRASI (Sudah Benar) ---
class RegisterView(APIView):
    permission_classes = [AllowAny] # Izinkan siapa saja untuk mendaftar

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)