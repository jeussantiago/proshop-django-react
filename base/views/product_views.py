from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from rest_framework import status
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger

from base.models import Product, Review
from base.serializers import ProductSerializer


@api_view(['GET'])
def getProducts(request):
    query = request.query_params.get('keyword')
    if not query:
        query = ''

    products = Product.objects.filter(name__icontains=query).order_by('_id')
    # products = Product.objects.all()

    page = request.query_params.get('page')
    paginator = Paginator(products, 8)

    try:
        products = paginator.page(page)
    except PageNotAnInteger:
        products = paginator.page(1)
    except EmptyPage:
        # if we have 10 pages and user passes in page 40 or a page with no content
        # return the last page
        products = paginator.page(paginator.num_pages)

    if not page:
        page = 1

    page = int(page)

    serializer = ProductSerializer(products, many=True)
    return Response({
        'products': serializer.data,
        'page': page,
        'pages': paginator.num_pages
    })


@api_view(['GET'])
def getTopProducts(request):
    # >= (gte)
    products = Product.objects.filter(rating__gte=4).order_by('-rating')[0:5]
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getProduct(request, pk):
    product = Product.objects.get(_id=pk)
    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAdminUser])
def createProduct(request):
    # create a default product with prefilled/baseline data
    # send user to product edit page
    # user can then edit the product from there
    user = request.user
    # default image is set up in models.py
    product = Product.objects.create(
        user=user,
        name='Sample Name',
        price=0,
        brand='Sample Brand',
        countInStock=0,
        category='Sample Category',
        description=''
    )

    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)


@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateProduct(request, pk):
    data = request.data
    product = Product.objects.get(_id=pk)

    product.name = data['name']
    product.price = data['price']
    product.brand = data['brand']
    product.countInStock = data['countInStock']
    product.category = data['category']
    product.description = data['description']

    product.save()

    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)


@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteProduct(request, pk):
    product = Product.objects.get(_id=pk)
    product.delete()
    return Response('Product Deleted')


@api_view(['POST'])
def uploadImage(request):
    data = request.data

    product_id = data['product_id']
    product = Product.objects.get(_id=product_id)

    product.image = request.FILES.get('image')
    product.save()

    return Response('Image was uploaded')


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createProductReview(request, pk):
    user = request.user
    product = Product.objects.get(_id=pk)
    data = request.data

    # 1. Review already exists - if customer writes a review,
    # should not let them write another review
    alreadyExists = product.review_set.filter(user=user).exists()
    if alreadyExists:
        content = {'detail': 'You already reviewed this product.'}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)

    # 2. Submitted a review but no rating or rating of 0
    # tell them there needs to be a rating
    elif data['rating'] == 0:
        content = {'detail': 'Please select a rating.'}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)

    # 3. Valid review - create review
    else:
        review = Review.objects.create(
            product=product,
            user=user,
            name=user.first_name,
            rating=data['rating'],
            comment=data['comment']
        )

        # update product by increasing the number of reviews ...
        reviews = product.review_set.all()
        product.numReviews = len(reviews)
        # ... and calculating new rating
        total_rating = sum(review.rating for review in reviews)
        product.rating = total_rating / len(reviews)
        product.save()

        return Response('Review Added')
