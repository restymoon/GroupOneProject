from django.db import models
from db.base_model import BaseModel


# Create your models here.

class Hotelreserve(BaseModel):
    """ 酒店预定模型类"""
    name = models.CharField(max_length=20, verbose_name="宴席类型名称")
    tablenum = models.CharField(max_length=20, verbose_name="预定桌数")
    tableprice = models.CharField(max_length=20, verbose_name="每桌预算")

    class Meta:
        db_table = 'df_hotel_reserve'
        verbose_name = "酒店预定页面"
        verbose_name_plural = verbose_name

    def __str__(self):
        return self.name

# class HotelType(BaseModel):
#     '''宴席类型模型类'''
#     name = models.CharField(max_length=20, verbose_name="种类名称")
#
#     class Meta:
#         db_table = 'df_hotel_type'
#         verbose_name = "案例种类"
#         verbose_name_plural = verbose_name
#
#     def __str__(self):
#         return self.name

class Hotel(BaseModel):
    """ 酒店模型类 """
    hotelreserve = models.ForeignKey("Hotelreserve",verbose_name="酒店预订")
    name = models.CharField(max_length=20, verbose_name="酒店名字")
    cover_image = models.ImageField(upload_to="example", verbose_name="酒店图片")
    desc = models.CharField(max_length=256, default='', verbose_name="备注")
    city = models.CharField(max_length=20, verbose_name="城市")
    area = models.CharField(max_length=20, verbose_name="地区")



    class Meta:
        db_table = 'df_hotel'
        verbose_name = "酒店"
        verbose_name_plural = verbose_name

    def __str__(self):
        return self.name

   


