from django.db import models
from db.base_model import BaseModel


# Create your models here.
class CarBrand(BaseModel):
    """   婚车品牌模型类   """
    name = models.CharField(max_length=20, verbose_name="婚车品牌")
    logoimage = models.ImageField(upload_to='carbrand', verbose_name="婚车品牌图片")

    class Meta:
        db_table = 'df_car_brand'
        verbose_name = "婚车品牌"
        verbose_name_plural = verbose_name

    def __str__(self):
        return self.name


class CarType(BaseModel):
    """   车型模型类   """
    name = models.CharField(max_length=20, verbose_name="车型")
    # 富文本类型：带有格式的文本
    # detail = HTMLField(blank=True, verbose_name="商品详情")
    image = models.ImageField(upload_to='carbrand', verbose_name="车型图片")

    def __str__(self):
        return self.name

    class Meta:
        db_table = "df_car_type"
        verbose_name = "车型"
        verbose_name_plural = verbose_name


class Car(BaseModel):
    """   婚车模型类   """
    type = models.ForeignKey("CarType", verbose_name="车型")
    brand = models.ForeignKey("CarBrand",verbose_name="品牌")
    name = models.CharField(max_length=20, verbose_name="车名")
    color = models.CharField(max_length=20,verbose_name="婚车颜色")
    image = models.ImageField(upload_to='carbrand', verbose_name="婚车图片")

    def __str__(self):
        return self.name

    class Meta:
        db_table = "df_car"
        verbose_name = "婚车"
        verbose_name_plural = verbose_name

