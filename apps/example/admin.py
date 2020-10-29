from django.contrib import admin
from example.models import Example,ExampleType,ExampleImage
# Register your models here.

admin.site.register(ExampleImage)
admin.site.register(Example)
admin.site.register(ExampleType)
