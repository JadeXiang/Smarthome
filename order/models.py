

# Create your models here.
from django.contrib.auth.models import User
from colorfield.fields import ColorField
from django.db import models
from product.models import Product


class Order(models.Model):

    user = models.ForeignKey(User, related_name='orders', on_delete=models.CASCADE)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    phone = models.CharField(max_length=100)
    email = models.EmailField(max_length=100,blank=True, null=True)
    address = models.CharField(max_length=100,blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    color = ColorField(default='#409EFF')
    paid_amount = models.DecimalField(max_digits=8, decimal_places=2, blank=True, null=True)


    class Meta:
        ordering = ['-created_at', ]

    def __str__(self):
        return self.first_name


class OrderItem(models.Model):
    order = models.ForeignKey(Order, related_name='items', on_delete=models.CASCADE)
    product = models.ForeignKey(Product, related_name='items', on_delete=models.CASCADE)
    price = models.DecimalField(max_digits=8, decimal_places=2)
    quantity = models.IntegerField(default=1)
    color = ColorField(default='#409EFF')

    def __str__(self):
        return '%s' % self.id