from django.contrib import admin
from car.models import CarBrand,CarType,Car
# Register your models here.

admin.site.register(CarType)
admin.site.register(CarBrand)
admin.site.register(Car)
