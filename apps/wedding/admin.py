from django.contrib import admin
from wedding.models import WeddingSKU,WeddingImage,WeddingType,DressType,Dress,Decorate
# Register your models here.

admin.site.register(WeddingType)
admin.site.register(WeddingImage)
admin.site.register(WeddingSKU)
admin.site.register(Decorate)
admin.site.register(Dress)
admin.site.register(DressType)
