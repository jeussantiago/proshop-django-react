from django.db import models
from django.contrib.auth.models import User

# models.ForeignKey: one to many relationship to given model, in this case, user refers to the parent model "User" or one user can have many products
#   of one product can have many reviews
# models.OneToOneField: one to one relationship to given model, in this case one order goes to one address
#   on_delete=models.CASCADE : if someone deletes the parent, then the current model item gets deleted
#       ShippingAddress -> models.OneToOneField(Order, on_delete=models.CASCADE) means that if someone deletes the order, then the ShippingAddres model item gets deleted
#   on_delete=models.SET_NULL: just sets the column item to null
#       if user is deleted, we don't want to delete the product, just set User column to null

# null: controls whether the database column allows NULL values - True means allowed null, False means not allowed null
# blank: controls wheter the form can be empty or not(does not control restrictions in the actual database),
#   True means can be empty i.e. can be left blank, False means cannot be empty
#   null=False, blank=True: This means that the form doesn't require a value but the database does
#   ; The most common use is for optional string-based fields - django indicates that you should leave an empty string in the database if no data is presented
#   null=False, blank=False: This is the default configuration and means that the value is required in all circumstances.
#   null=True, blank=True: This means that the field is optional in all circumstances - this is not the recommended way to make string-based fields optional
# DecimalField: 2 required fields, max_digits 7 == 1234567 numbers allowed to save, decimal_places 2 == 12345.67 ; 7 just allows a big enough number
# models.DateTimeField(auto_now_add=True);
#   auto_now_add: takes a snapshot of when this entry was made into the database and doesn't change it no matter what
#   auto_now_add=True means that snapshot is taken at beginning of creation, auto_now_add=False means that snapshot is taken later when you change it
# models.AutoField(primary_key=True, editable=False): have django treat this as the default primary key/id
#   ; this is a way to rename something or be the thing that is used on lookup


class Product(models.Model):
    # in this project we just have null=True, blank=True b/c we want to be able to see the database without doing anyuthing so far
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    name = models.CharField(max_length=200, null=True, blank=True)
    image = models.ImageField(null=True, blank=True, default='sample.png')
    brand = models.CharField(max_length=200, null=True, blank=True)
    category = models.CharField(max_length=200, null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    rating = models.DecimalField(
        max_digits=7, decimal_places=2, null=True, blank=True)
    numReviews = models.IntegerField(null=True, blank=True, default=0)
    price = models.DecimalField(
        max_digits=7, decimal_places=2, null=True, blank=True)
    countInStock = models.IntegerField(null=True, blank=True, default=0)
    createdAt = models.DateTimeField(auto_now_add=True)
    # models already creates a default id so we wouldn't need to do this but in the forntend, we already created it with "_id" and I don't want to go back and change it
    _id = models.AutoField(primary_key=True, editable=False)

    # default value when looping at an individual product item
    def __str__(self):
        return self.name


class Review(models.Model):
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    name = models.CharField(max_length=200, null=True, blank=True)
    rating = models.IntegerField(null=True, blank=True, default=0)
    comment = models.TextField(null=True, blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return str(self.rating)


class Order(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    paymentMethod = models.CharField(
        max_length=200, null=True, blank=True)  # paypal, stripe, etc
    taxPrice = models.DecimalField(
        max_digits=7, decimal_places=2, null=True, blank=True)
    shippingPrice = models.DecimalField(
        max_digits=7, decimal_places=2, null=True, blank=True)
    totalPrice = models.DecimalField(
        max_digits=7, decimal_places=2, null=True, blank=True)
    isPaid = models.BooleanField(default=False)
    paidAt = models.DateTimeField(auto_now_add=False, null=True, blank=True)
    isDelivered = models.BooleanField(default=False)
    deliveredAt = models.DateTimeField(
        auto_now_add=False, null=True, blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return str(self.createdAt)


class OrderItem(models.Model):
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True)
    order = models.ForeignKey(Order, on_delete=models.SET_NULL, null=True)
    name = models.CharField(max_length=200, null=True,
                            blank=True)  # product name
    qty = models.IntegerField(null=True, blank=True, default=0)
    price = models.DecimalField(
        max_digits=7, decimal_places=2, null=True, blank=True)
    image = models.CharField(max_length=200, null=True,
                             blank=True)  # url to image
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return str(self.name)


class ShippingAddress(models.Model):
    order = models.OneToOneField(
        Order, on_delete=models.CASCADE, null=True, blank=True)
    address = models.CharField(max_length=200, null=True, blank=True)
    city = models.CharField(max_length=200, null=True, blank=True)
    postalCode = models.CharField(max_length=200, null=True, blank=True)
    country = models.CharField(max_length=200, null=True, blank=True)
    shippingPrice = models.DecimalField(
        max_digits=7, decimal_places=2, null=True, blank=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return str(self.address)
