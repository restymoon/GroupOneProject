from django.db import models
from db.base_model import BaseModel



# Create your models here.
class ExampleType(BaseModel):
    """ 案例种类模型类"""
    name = models.CharField(max_length=20, verbose_name="种类名称")

    class Meta:
        db_table = 'df_example_type'
        verbose_name = "案例种类"
        verbose_name_plural = verbose_name

    def __str__(self):
        return self.name


class Example(BaseModel):
    """ 案例模型类 """
    type = models.ForeignKey("ExampleType", verbose_name="案例种类")
    wedding = models.ForeignKey("wedding.WeddingSKU", verbose_name="婚礼")
    user = models.ForeignKey("user.User",verbose_name="评论人")
    name = models.CharField(max_length=20, verbose_name="案例名称")
    cover_image = models.ImageField(upload_to="example", verbose_name="案例封面图片")
    prov = models.CharField(max_length=20, verbose_name="省")
    city = models.CharField(max_length=20, verbose_name="城市")
    comment = models.CharField(max_length=256, default='', verbose_name="新人评论")

    class Meta:
        db_table = 'df_example'
        verbose_name = "案例"
        verbose_name_plural = verbose_name

    def __str__(self):
        return self.name


class ExampleImage(BaseModel):
    """   案例图片模型类   """
    example = models.ForeignKey("Example", verbose_name="案例")
    image = models.ImageField(upload_to="example", verbose_name="图片路径")

    class Meta:
        db_table = "df_example_image"
        verbose_name = "案例图片"
        verbose_name_plural = verbose_name
