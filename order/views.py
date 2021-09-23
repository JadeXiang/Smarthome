


from django.core.mail import send_mail, EmailMultiAlternatives
from django.conf import settings
from rest_framework import status, authentication, permissions
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.renderers import JSONRenderer
from rest_framework.views import APIView
from rest_framework.response import Response
import os

import product
from .models import Order
from .serializers import OrderSerializer, MyOrderSerializer, MyOrderItemSerializer


@api_view(['POST'])
@authentication_classes([authentication.TokenAuthentication])
@permission_classes([permissions.IsAuthenticated])
def checkout(request):
    global quantity, color, price, name
    serializer = OrderSerializer(data=request.data)
    email = request.data.get('email')


    if serializer.is_valid():

        paid_amount = sum(
            item.get('quantity') * item.get('product').price for item in serializer.validated_data['items'])

        serializer.save(user=request.user, paid_amount=paid_amount)

        for item in serializer.validated_data['items']:
            quantity = item.get('quantity')
            color = item.get('color')
            price = item.get('price')
            name = item.get('product')


        if serializer.is_valid():
            send_mail(

                subject='确认信息',

                message='支付金额：%d\n' % paid_amount +
                        '收货人姓名：%s' % request.data.get('first_name') +
                        '%s\n' % request.data.get('last_name') +
                        '商品属性:\n'+
                        '商品名:%s\n' % name +
                        '数量:%d\n' % quantity +
                        '颜色:%s\n' % color +
                        '金额:%d\n' % price ,
                from_email='481618821@qq.com',

                recipient_list=[email])
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)




class OrdersList(APIView):
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, format=None):
        orders = Order.objects.filter(user=request.user)
        serializer = MyOrderSerializer(orders, many=True)
        return Response(serializer.data)

