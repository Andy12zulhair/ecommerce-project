from rest_framework import serializers
from .models import Product, Order, OrderItem, Category 
from django.contrib.auth.models import User
# 1. Import validator password
from django.contrib.auth.password_validation import validate_password 

# --- Serializer Anda yang sudah benar ---
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class ProductSerializer(serializers.ModelSerializer):
    category = CategorySerializer() 
    class Meta:
        model = Product
        fields = '__all__'

class ProductMiniSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['id', 'name', 'price', 'image']

class OrderItemSerializer(serializers.ModelSerializer):
    product = ProductMiniSerializer(read_only=True) 
    class Meta:
        model = OrderItem
        fields = ['product', 'quantity', 'price']

class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True) 
    user = UserSerializer(read_only=True)
    class Meta:
        model = Order
        fields = [
            'id', 
            'user', 
            'total',
            'shipping_address', 
            'status',
            'created_at', 
            'items'
        ]

# --- INI BAGIAN YANG HILANG DARI KODE ANDA ---
# 2. Tambahkan RegisterSerializer baru

class RegisterSerializer(serializers.ModelSerializer):
    """
    Serializer untuk registrasi pengguna baru.
    """
    
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True, label="Konfirmasi Password")
    email = serializers.EmailField(required=True)

    class Meta:
        model = User
        fields = ('username', 'email', 'password', 'password2')

    def validate(self, attrs):
        # Cek apakah kedua password sama
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password": "Password tidak cocok."})
        
        # Cek apakah email sudah ada
        if User.objects.filter(email=attrs['email']).exists():
            raise serializers.ValidationError({"email": "Email ini sudah terdaftar."})
            
        return attrs

    def create(self, validated_data):
        # Buat pengguna baru menggunakan metode create_user()
        # yang akan otomatis meng-hash password
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        
        return user