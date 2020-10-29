from django.db import models
from db.base_model import BaseModel

# Create your models here.
class WeddingType(BaseModel):
    """ 婚礼种类模型类"""
    name = models.CharField(max_length=20, verbose_name="种类名称")

    class Meta:
        db_table = 'df_wedding_type'
        verbose_name = "婚礼种类"
        verbose_name_plural = verbose_name

    def __str__(self):
        return self.name


class WeddingSKU(BaseModel):
    """   婚礼SKU模型类   """
    type = models.ForeignKey("WeddingType", verbose_name="婚礼种类")
    user = models.ForeignKey("team.Staff", verbose_name="设计师")
    name = models.CharField(max_length=20, verbose_name="婚礼名称")
    desc = models.CharField(max_length=256, verbose_name="婚礼简介")
    cover_image = models.ImageField(upload_to="wedding", verbose_name="婚礼封面图片")

    def __str__(self):
        return self.name

    class Meta:
        db_table = "df_wedding_sku"
        verbose_name = "婚礼"
        verbose_name_plural = verbose_name


class Decorate(BaseModel):
    '''  婚礼现场场地模型类  '''
    weddingsku = models.ForeignKey("WeddingSKU", verbose_name="婚礼")
    name = models.CharField(max_length=20, verbose_name="布置场地名称")
    image = models.ImageField(upload_to="wedding", verbose_name="布置场地图片")
    desc = models.CharField(max_length=256, verbose_name="布置场地简介")

    class Meta:
        db_table = 'df_decorate'
        verbose_name = "布置场地"
        verbose_name_plural = verbose_name

    def __str__(self):
        return self.name


class WeddingImage(BaseModel):
    """   婚礼图片模型类   """
    sku = models.ForeignKey("WeddingSKU", verbose_name="婚礼")
    image = models.ImageField(upload_to="wedding", verbose_name="图片路径")

    class Meta:
        db_table = "df_wedding_image"
        verbose_name = "婚礼图片"
        verbose_name_plural = verbose_name


class DressType(BaseModel):
    '''  礼服种类模型类  '''
    name = models.CharField(max_length=20, verbose_name="种类名称")
    cover_image = models.ImageField(upload_to="dress", verbose_name="礼服类型封面图片")

    class Meta:
        db_table = 'df_dress_type'
        verbose_name = "礼服种类"
        verbose_name_plural = verbose_name

    def __str__(self):
        return self.name


class Dress(BaseModel):
    '''  礼服模型类  '''
    type = models.ForeignKey("DressType", verbose_name="礼服种类")
    name = models.CharField(max_length=20, verbose_name="礼服名称")
    desc = models.CharField(max_length=256, verbose_name="礼服简介")
    image=models.ImageField(upload_to="dress", verbose_name="礼服图片")

    def __str__(self):
        return self.name

    class Meta:
        db_table = "df_dress_sku"
        verbose_name = "礼服"
        verbose_name_plural = verbose_name
